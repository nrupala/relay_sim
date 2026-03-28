import { useState } from 'react';
import { RelaySim } from './lib/RelaySim';
import { FAULT_REGISTRY, FaultTypeCode } from './lib/faultRegistry';

type FaultState = { type: FaultTypeCode; Iabc: number[] };

export default function App() {
  const [fault, setFault] = useState<FaultState>({ type: '51', Iabc: [2.5, 1.2, 1.0] });
  const sim = new RelaySim();
  const result = sim.run(fault);

  const updateCurrent = (idx: number, val: number) => {
    const newI = [...fault.Iabc];
    newI[idx] = val;
    setFault({ ...fault, Iabc: newI });
  };

  return (
    <div style={{ padding: 25, maxWidth: 1000, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: 30, borderBottom: '2px solid #eee' }}>
        <h1>⚡ Power System Relay Simulator</h1>
        <p>Active Logic: <strong>{FAULT_REGISTRY[fault.type].name} ({fault.type})</strong></p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        {/* Results Section */}
        <div style={{ background: '#f9f9f9', padding: 20, borderRadius: 10 }}>
          <h3>Simulation Status</h3>
          <div style={{ fontSize: 32, color: result.trip ? 'red' : 'green', margin: '20px 0' }}>
            {result.trip ? '🚨 TRIP INITIATED' : '✅ SYSTEM STABLE'}
          </div>
          <p><strong>Tripping Time:</strong> {result.trip ? `${result.time.toFixed(3)}s` : 'N/A'}</p>
          <p style={{ fontSize: 13, color: '#666' }}>{FAULT_REGISTRY[fault.type].desc}</p>
        </div>

        {/* Control Section */}
        <div>
          <h3>Fault Configuration</h3>
          {fault.Iabc.map((curr, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <label>Phase {String.fromCharCode(65 + i)}: {curr.toFixed(2)}pu</label>
              <input type="range" min="0" max="5" step="0.1" value={curr}
                style={{ width: '100%' }} onChange={e => updateCurrent(i, +e.target.value)} />
            </div>
          ))}

          <h3 style={{ marginTop: 20 }}>Select Function</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Object.keys(FAULT_REGISTRY).map(code => (
              <button key={code} onClick={() => setFault({ ...fault, type: code as FaultTypeCode })}
                style={{
                  padding: '8px 12px',
                  borderRadius: 5,
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  background: fault.type === code ? '#007bff' : '#fff',
                  color: fault.type === code ? '#fff' : '#000'
                }}>
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
