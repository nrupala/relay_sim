# Test plan — relay_sim

## Scope

The protective-relay simulation engine (`src/lib/RelaySim.ts`), the fault
registry (`src/lib/faultRegistry.ts`), and the equipment registry
(`src/data/Registry.ts`) — the parts of this training simulator whose behaviour
can be asserted headlessly. The engine's models are the README's disclosed
simplified teaching models; the suite pins their behaviour exactly as
documented, so a change to a threshold or curve fails loudly. Out of scope:
the React UI components (visual surface; the PR-checks build covers their
compilation) and the unfinished TCCPlotter/PowerAnalyzer stubs the README
names as not part of the shipped app.

## Suites

| Suite | Covers | Run it | Runs in CI |
|---|---|---|---|
| Engine tests (`tests/relay-sim.test.mjs`, Node built-in runner) | One fault scenario per implemented ANSI function — 50, 51 (IEEE very-inverse operating time asserted numerically), 50G, 46, 49, 87T, 24 (incl. low-frequency overexcitation), 21, 67 — plus: 66/63/unknown functions never trip (the README's documented limitation), and registry integrity (12 fault entries complete; every equipment relay reference resolves) | `npm ci`, compile the engine (command in `.github/workflows/tests.yml`), then `node --test tests/relay-sim.test.mjs` | Yes — Tests workflow (`.github/workflows/tests.yml`), which also runs `npm run build` |

## CI gates

- Tests workflow green on every push and pull request to `main`
  (build + engine suite).
- PR checks workflow (self-hosted runner): `npm ci` + `npm run build` on every
  pull request.
- CodeQL (javascript-typescript) on push, pull request, and weekly.

## Cadence

- Every pull request: PR checks + Tests workflow + CodeQL.
- Every push to `main`: Tests workflow + CodeQL.
- Weekly: CodeQL scheduled run.
- Every release candidate: the release-readiness run (checker + evidence reads),
  per the house Release-Readiness Standard.

## Coverage bar

No numeric floor; new functionality lands with tests per CONTRIBUTING — for
this repo, a new engine function lands with its trip/no-trip scenarios in the
engine suite in the same change.
