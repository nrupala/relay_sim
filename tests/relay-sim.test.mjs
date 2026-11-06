import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

// The engine is TypeScript; CI compiles src/lib to .test-dist (CommonJS)
// with the repo's own typescript before this suite runs:
//   npx tsc src/lib/RelaySim.ts src/lib/faultRegistry.ts src/data/Registry.ts \
//     --outDir .test-dist --module commonjs --target es2022 --skipLibCheck
//   (plus a .test-dist/package.json marking the output as CommonJS, because
//   the repo's own package.json is "type": "module")
const require = createRequire(import.meta.url);
const { RelaySim } = require('../.test-dist/lib/RelaySim.js');
const { FAULT_REGISTRY } = require('../.test-dist/lib/faultRegistry.js');
const { EQUIPMENT_TYPES } = require('../.test-dist/data/Registry.js');

const sim = new RelaySim();
const balanced = (i) => ({ Iabc: [i, i, i], Iang: [0, -120, 120] });

test('50 instantaneous overcurrent trips above 8 pu only', () => {
  assert.deepEqual(sim.run({ type: '50', ...balanced(9) }), { trip: true, time: 0.016 });
  assert.equal(sim.run({ type: '50', ...balanced(8) }).trip, false);
  assert.equal(sim.run({ type: '50', ...balanced(5) }).trip, false);
});

test('51 time overcurrent follows the IEEE very-inverse curve', () => {
  const r = sim.run({ type: '51', ...balanced(3) }); // M = 3/1.5 = 2
  assert.equal(r.trip, true);
  // t = TD * (19.61 / (M^2 - 1) + 0.491), TD = 0.5  ->  0.5 * (19.61/3 + 0.491)
  assert.ok(Math.abs(r.time - 3.5138) < 0.001, `expected ~3.5138s, got ${r.time}`);
  const atPickup = sim.run({ type: '51', ...balanced(1.5) }); // M = 1: no trip
  assert.equal(atPickup.trip, false);
  assert.equal(atPickup.time, Infinity);
  assert.equal(sim.run({ type: '51', ...balanced(1.2) }).trip, false);
});

test('50G ground element responds to residual current', () => {
  assert.equal(sim.run({ type: '50G', Iabc: [0.9, 0, 0], Iang: [0, 0, 0] }).trip, true);  // i0 = 0.3
  assert.equal(sim.run({ type: '50G', Iabc: [0.5, 0, 0], Iang: [0, 0, 0] }).trip, false); // i0 = 0.167
});

test('46 phase unbalance trips above 15% negative-sequence ratio', () => {
  assert.equal(sim.run({ type: '46', Iabc: [2, 1, 1], Iang: [0, -120, 120] }).trip, true);   // ratio 0.25
  assert.equal(sim.run({ type: '46', Iabc: [2, 1.9, 1.9], Iang: [0, -120, 120] }).trip, false); // ratio 0.025
});

test('49 thermal element trips above 1.1 pu with its fixed delay', () => {
  assert.deepEqual(sim.run({ type: '49', ...balanced(1.2) }), { trip: true, time: 10.0 });
  assert.equal(sim.run({ type: '49', ...balanced(1.0) }).trip, false);
});

test('87T differential element trips above 2 pu', () => {
  assert.equal(sim.run({ type: '87T', ...balanced(2.5) }).trip, true);
  assert.equal(sim.run({ type: '87T', ...balanced(2.0) }).trip, false);
});

test('24 volts-per-hertz trips on overexcitation, including low frequency', () => {
  assert.equal(sim.run({ type: '24', ...balanced(0), V: 1.15, f: 60 }).trip, true);
  assert.equal(sim.run({ type: '24', ...balanced(0), V: 1.05, f: 60 }).trip, false);
  assert.equal(sim.run({ type: '24', ...balanced(0), V: 1.0, f: 50 }).trip, true); // 1.0/(50/60) = 1.2
});

test('21 distance element trips inside its reach', () => {
  assert.equal(sim.run({ type: '21', ...balanced(3), V: 1.0 }).trip, true);  // Z = 0.333
  assert.equal(sim.run({ type: '21', ...balanced(1.5), V: 1.0 }).trip, false); // Z = 0.667
});

test('67 directional element needs both pickup current and trip-zone angle', () => {
  assert.equal(sim.run({ type: '67', Iabc: [2, 2, 2], Iang: [120, 0, 0] }).trip, true);
  assert.equal(sim.run({ type: '67', Iabc: [2, 2, 2], Iang: [45, 0, 0] }).trip, false);
  assert.equal(sim.run({ type: '67', Iabc: [1.2, 1.2, 1.2], Iang: [120, 0, 0] }).trip, false);
});

test('unimplemented and unknown functions never trip', () => {
  // 66 and 63 are documented in the registry/help but, per the README's
  // known limitations, the engine implements no trip behaviour for them.
  for (const type of ['66', '63', '99']) {
    assert.deepEqual(sim.run({ type, ...balanced(10) }), { trip: false, time: 0 });
  }
});

test('fault registry is complete and equipment references resolve', () => {
  assert.equal(Object.keys(FAULT_REGISTRY).length, 12);
  for (const [code, entry] of Object.entries(FAULT_REGISTRY)) {
    assert.equal(entry.code, code);
    assert.ok(entry.name && entry.explanation && entry.mathContext, `${code} needs name/explanation/math`);
  }
  for (const eq of Object.values(EQUIPMENT_TYPES)) {
    for (const code of eq.relays) {
      assert.ok(FAULT_REGISTRY[code], `${eq.id} references unknown relay ${code}`);
    }
  }
});
