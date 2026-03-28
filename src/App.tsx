import { useState } from 'react';
import { RelaySim } from './lib/RelaySim';
import { FAULT_REGISTRY } from './lib/faultRegistry';
import type { FaultTypeCode } from './lib/faultRegistry';

// --- Sub-Component: Help Card ---
const HelpCard = ({ f }: { f: any }) => (
  <div style={{
    background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s'
  }}>
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ color: '#3182ce', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', background: '#ebf8ff', padding: '2px 6px', borderRadius: '4px' }}>
          {f.category}
        </span>
        <span style={{ color: '#cbd5e0', fontWeight: 'bold' }}>#{f.code}</span>
      </div>
      <h4 style={{ margin: '0 0 8px 0', color: '#1a202c', fontSize: '17px' }}>{f.name}</h4>
      <p style={{ fontSize: '13px', color: '#4a5568', margin: 0, lineHeight: '1.5' }}>{f.explanation}</p>
    </div>
    <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px dashed #e2e8f0' }}>
      <code style={{ fontSize: '11px', color: '#805ad5', display: 'block', marginBottom: '5px' }}>{f.mathContext}</code>
      <span style={{ fontSize: '10px', color: '#a0aec0' }}>Source: {f.source}</span>
    </div>
  </div>
);

export default function App() {
  const [fault, setFault] = useState({
    type: '51' as FaultTypeCode,
    Iabc: [1.20, 1.00, 1.00],
    Iang: [0, -120, 120],
  });

  const sim = new RelaySim();
  const result = sim.run(fault as any);
  const info = FAULT_REGISTRY[fault.type];
  const isTripped = result?.trip;

  const updateVector = (idx: number, val: number, isAngle = false) => {
    const key = isAngle ? 'Iang' : 'Iabc';
    const next = [...fault[key]];
    next[idx] = val;
    setFault({ ...fault, [key]: next });
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui', backgroundColor: '#fdfdfd', color: '#2d3748' }}>

      {/* ANIMATION ENGINE */}
      <style>{`
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(229, 62, 62, 0); }
          100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
        }
        .trip-active { animation: pulse-red 1.5s infinite; border: 2px solid #e53e3e !important; }
      `}</style>

      <header style={{ marginBottom: '30px', borderBottom: '2px solid #edf2f7', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', color: '#1a365d' }}>🛡️ IEEE C37 Relay Simulator</h1>
        <p style={{ color: '#718096', margin: '5px 0' }}>Vector Analysis & Protection Training Tool</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', gap: '40px' }}>

        {/* LEFT: PHASOR & STATUS */}
        <div>
          <div style={{
            background: isTripped ? '#2d0000' : '#1a202c',
            padding: '25px', borderRadius: '20px', color: '#fff',
            transition: 'all 0.3s ease'
          }} className={isTripped ? 'trip-active' : ''}>
            <h3 style={{ marginTop: 0, fontSize: '13px', color: isTripped ? '#feb2b2' : '#a0aec0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {isTripped ? '🚨 RELAY TRIPPED' : '📉 SYSTEM PHASORS'}
            </h3>

            <svg viewBox="-100 -100 200 200" style={{ width: '100%', height: '300px' }}>
              <circle cx="0" cy="0" r="70" fill="none" stroke={isTripped ? '#4a1212' : '#2d3748'} strokeDasharray="4" />
              <line x1="-100" y1="0" x2="100" y2="0" stroke="#2d3748" />
              <line x1="0" y1="-100" x2="0" y2="100" stroke="#2d3748" />
              {fault.Iabc.map((mag, i) => {
                const rad = (fault.Iang[i] * Math.PI) / 180;
                const x = Math.cos(rad) * mag * 35;
                const y = -Math.sin(rad) * mag * 35;
                const colors = ['#f56565', '#4299e1', '#48bb78'];
                return (
                  <g key={i}>
                    <line x1="0" y1="0" x2={x} y2={y} stroke={colors[i]} strokeWidth="3" strokeLinecap="round" />
                    <text x={x + 5} y={y} fill={colors[i]} fontSize="12" fontWeight="bold">I{String.fromCharCode(65 + i)}</text>
                  </g>
                );
              })}
            </svg>

            <div style={{ marginTop: '15px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', borderLeft: '4px solid #3182ce' }}>
              <strong style={{ color: '#ebf8ff', fontSize: '13px', display: 'block', marginBottom: '5px' }}>💡 Math Context:</strong>
              <span style={{ fontSize: '13px', color: '#cbd5e0', lineHeight: '1.4' }}>{info?.mathContext}</span>
            </div>
          </div>

          <div style={{
            marginTop: '20px', padding: '20px', borderRadius: '15px',
            background: isTripped ? '#fff5f5' : '#f0fff4',
            border: `1px solid ${isTripped ? '#feb2b2' : '#c6f6d5'}`
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: isTripped ? '#c53030' : '#2f855a' }}>
              {isTripped ? 'STATUS: OPEN (TRIPPED)' : 'STATUS: CLOSED (HEALTHY)'}
            </div>
            {isTripped && <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#c53030' }}><strong>Clearing Time:</strong> {result.time.toFixed(3)}s</p>}
          </div>
        </div>

        {/* RIGHT: CONTROLS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section style={{ background: '#fff', padding: '20px', borderRadius: '15px', border: '1px solid #edf2f7' }}>
            <h3 style={{ marginTop: 0, fontSize: '18px' }}>🔧 Vector Injection (Magnitude & Angle)</h3>
            {fault.Iabc.map((mag, i) => (
              <div key={i} style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #f7fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Phase {String.fromCharCode(65 + i)}</span>
                  <code style={{ color: '#3182ce' }}>{mag.toFixed(2)}pu ∠ {fault.Iang[i]}°</code>
                </div>
                <input type="range" min="0" max="4" step="0.05" value={mag} style={{ width: '100%', marginBottom: '8px' }}
                  onChange={(e) => updateVector(i, +e.target.value)} />
                <input type="range" min="-180" max="180" step="1" value={fault.Iang[i]} style={{ width: '100%', opacity: 0.4 }}
                  onChange={(e) => updateVector(i, +e.target.value, true)} />
              </div>
            ))}
          </section>

          <section>
            <h3 style={{ margin: '10px 0', fontSize: '18px' }}>ANSI Function Selector</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {(Object.keys(FAULT_REGISTRY) as FaultTypeCode[]).map((code) => (
                <button key={code} onClick={() => setFault({ ...fault, type: code })}
                  style={{
                    padding: '12px 5px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                    border: fault.type === code ? '2px solid #3182ce' : '1px solid #e2e8f0',
                    background: fault.type === code ? '#ebf8ff' : '#fff',
                    color: fault.type === code ? '#2b6cb0' : '#4a5568',
                    fontWeight: 'bold', fontSize: '14px'
                  }}>
                  {code}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* RESTORED HELP & REFERENCE SECTION */}
      <section style={{ marginTop: '60px', borderTop: '2px solid #edf2f7', paddingTop: '30px' }}>
        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1a365d' }}>📚 Help & Reference Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {Object.values(FAULT_REGISTRY).map((f) => (
            <HelpCard key={f.code} f={f} />
          ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '50px', color: '#a0aec0', fontSize: '11px' }}>
        Built for Electrical Power Systems Training • IEEE C37 Standards Compliance
      </footer>
    </div>
  );
}
