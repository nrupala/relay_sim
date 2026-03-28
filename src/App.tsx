import { useState } from 'react';
import { RelaySim } from './lib/RelaySim';
import { FAULT_REGISTRY } from './lib/faultRegistry';
import type { FaultTypeCode } from './lib/faultRegistry';

export default function App() {
  // Enhanced state to include both Current and Voltage for 21/27 logic
  const [fault, setFault] = useState({
    type: '51' as FaultTypeCode,
    Iabc: [2.5, 1.0, 1.0],
    Vabc: [1.0, 1.0, 1.0]
  });

  const sim = new RelaySim();
  const result = sim.run(fault as any); // cast to any for quick binding
  const info = FAULT_REGISTRY[fault.type];

  // Helper to update arrays
  const updateArr = (key: 'Iabc' | 'Vabc', idx: number, val: number) => {
    const newArr = [...fault[key]];
    newArr[idx] = val;
    setFault({ ...fault, [key]: newArr });
  };

  return (
    <div style={{ padding: 25, maxWidth: 1100, margin: '0 auto', fontFamily: 'system-ui' }}>
      <header style={{ marginBottom: 30, borderBottom: '2px solid #eee', paddingBottom: 10 }}>
        <h1 style={{ margin: 0 }}>🛡️ IEEE C37 Relay Simulator</h1>
        <p style={{ color: '#666' }}>Active Logic: <strong>{info?.name} ({fault.type})</strong></p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
        {/* LEFT: RESULTS & INFO */}
        <div style={{ background: '#f8fafc', padding: 25, borderRadius: 15, border: '1px solid #e2e8f0' }}>
          <h3>📊 Simulation Results</h3>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: result.trip ? '#c53030' : '#38a169', margin: '15px 0' }}>
            {result.trip ? '🚨 TRIP!' : '✅ NORMAL'}
          </div>
          <div style={{ background: '#fff', padding: 15, borderRadius: 8, fontSize: 18 }}>
            <strong>Trip Time:</strong> {result.trip ? `${result.time.toFixed(3)}s` : '∞'}<br />
            {result.zone && <><strong>Zone:</strong> {result.zone}<br /></>}
            <strong>I-Peak:</strong> {Math.max(...fault.Iabc).toFixed(2)}pu
          </div>
          <p style={{ marginTop: 20, color: '#4a5568', fontStyle: 'italic' }}>{info?.desc}</p>
        </div>

        {/* RIGHT: CONTROLS */}
        <div>
          <h3 style={{ marginTop: 0 }}>🔧 Fault Setup (Per Unit)</h3>

          {/* Current Sliders */}
          <div style={{ background: '#fffaf0', padding: 15, borderRadius: 10, marginBottom: 15 }}>
            <strong>Amperage (I):</strong>
            {fault.Iabc.map((v, i) => (
              <div key={i} style={{ margin: '10px 0' }}>
                <label style={{ fontSize: 13 }}>Phase {String.fromCharCode(65 + i)}: {v.toFixed(2)}pu</label>
                <input type="range" min="0" max="5" step="0.1" value={v} style={{ width: '100%' }}
                  onChange={e => updateArr('Iabc', i, +e.target.value)} />
              </div>
            ))}
          </div>

          {/* Voltage Sliders (for 21/27) */}
          <div style={{ background: '#ebf8ff', padding: 15, borderRadius: 10, marginBottom: 15 }}>
            <strong>Voltage (V):</strong>
            {fault.Vabc.map((v, i) => (
              <div key={i} style={{ margin: '10px 0' }}>
                <label style={{ fontSize: 13 }}>Phase {String.fromCharCode(65 + i)}: {v.toFixed(2)}pu</label>
                <input type="range" min="0" max="1.2" step="0.05" value={v} style={{ width: '100%' }}
                  onChange={e => updateArr('Vabc', i, +e.target.value)} />
              </div>
            ))}
          </div>

          {/* Function Selector Buttons */}
          <h3>Function Select</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {(Object.keys(FAULT_REGISTRY) as FaultTypeCode[]).map(code => (
              <button key={code} onClick={() => setFault({ ...fault, type: code })}
                style={{
                  padding: '10px', borderRadius: 6, cursor: 'pointer', border: '1px solid #cbd5e0',
                  background: fault.type === code ? '#3182ce' : '#fff',
                  color: fault.type === code ? '#fff' : '#2d3748',
                  fontWeight: fault.type === code ? 'bold' : 'normal'
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
