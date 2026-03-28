// src/App.tsx
import { useState } from 'react';
import { RelaySim } from './lib/RelaySim';
// 1. Ensure the import name matches exactly
import { FAULT_REGISTRY } from './lib/faultRegistry';
import type { FaultTypeCode } from './lib/faultRegistry';


export default function App() {
  const [fault, setFault] = useState<FaultState>({ type: '51', Iabc: [2.5, 1.2, 1.0] });
  const sim = new RelaySim();

  // 1. Safety check for simulation result
  const result = sim.run(fault) || { trip: false, time: 0 };

  // 2. Safety check for the registry entry
  const currentFaultInfo = FAULT_REGISTRY[fault.type];

  return (
    <div style={{ padding: 25, maxWidth: 1000, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: 30, borderBottom: '2px solid #eee' }}>
        <h1>🛡️ IEEE C37 Relay Simulator</h1>
        {/* Use optional chaining to prevent crash if type is missing */}
        <p>Active Logic: <strong>{currentFaultInfo?.name || "Unknown"} ({fault.type})</strong></p>
      </header>

      <div style={{ display: 'flex', gap: 40 }}>
        {/* Results section */}
        <div style={{ flex: 1, background: '#f8fafc', padding: 20, borderRadius: 12 }}>
          <h3>📊 Simulation Results</h3>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: result.trip ? '#c53030' : '#38a169' }}>
            {result.trip ? '🚨 TRIP!' : '✅ NORMAL'}
          </div>
          <p><strong>Trip Time:</strong> {result.time?.toFixed(3)}s</p>
          <p style={{ fontStyle: 'italic' }}>{currentFaultInfo?.desc}</p>
        </div>

        {/* Controls section */}
        <div style={{ flex: 1 }}>
          <h3>🔧 Function Select</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {Object.keys(FAULT_REGISTRY).map(code => (
              <button
                key={code}
                onClick={() => setFault({ ...fault, type: code as FaultTypeCode })}
                style={{
                  padding: '8px',
                  background: fault.type === code ? '#3182ce' : '#edf2f7',
                  color: fault.type === code ? 'white' : 'black',
                  border: 'none', borderRadius: 4, cursor: 'pointer'
                }}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}