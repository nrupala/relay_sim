import { useState, useEffect } from 'react';
import { RelaySim } from './lib/RelaySim';
import { FAULT_REGISTRY } from './lib/faultRegistry';
import type { FaultTypeCode } from './lib/faultRegistry';

export default function App() {
  const [fault, setFault] = useState({
    type: '51' as FaultTypeCode,
    Iabc: [1.20, 1.00, 1.00],
    Iang: [0, -120, 120],
  });

  const sim = new RelaySim();
  const result = sim.run(fault as any);
  const activeFault = FAULT_REGISTRY[fault.type];

  // Logic to handle "Animation" states
  const isTripped = result?.trip;

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui', backgroundColor: '#fdfdfd' }}>

      {/* CSS ANIMATIONS - Injected via style tag for simplicity */}
      <style>{`
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(229, 62, 62, 0); }
          100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
        }
        .trip-alert {
          animation: pulse-red 1.5s infinite;
          border: 2px solid #e53e3e !important;
        }
      `}</style>

      <header style={{ marginBottom: '30px', borderBottom: '2px solid #edf2f7', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0, color: '#1a365d' }}>🛡️ IEEE C37 Relay Simulator</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', gap: '40px' }}>

        {/* LEFT COLUMN: PHASOR & ANIMATED TRIP STATUS */}
        <div>
          <div style={{
            background: isTripped ? '#2d0000' : '#1a202c',
            padding: '25px', borderRadius: '20px', color: '#fff',
            transition: 'background 0.3s ease',
            position: 'relative'
          }} className={isTripped ? 'trip-alert' : ''}>

            <h3 style={{ marginTop: 0, fontSize: '14px', color: isTripped ? '#feb2b2' : '#a0aec0', textTransform: 'uppercase' }}>
              {isTripped ? '🚨 FAULT DETECTED' : '📉 SYSTEM PHASORS'}
            </h3>

            <svg viewBox="-100 -100 200 200" style={{ width: '100%', height: '320px' }}>
              <circle cx="0" cy="0" r="70" fill="none" stroke={isTripped ? '#63171b' : '#2d3748'} strokeDasharray="4" />
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
          </div>

          {/* FAULT MESSAGE PANEL */}
          <div style={{
            marginTop: '20px', padding: '20px', borderRadius: '15px',
            background: isTripped ? '#fff5f5' : '#f0fff4',
            border: `2px solid ${isTripped ? '#feb2b2' : '#c6f6d5'}`
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: isTripped ? '#c53030' : '#2f855a' }}>
              {isTripped ? 'STATUS: TRIP' : 'STATUS: NORMAL'}
            </div>

            {isTripped ? (
              <div style={{ marginTop: '10px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>⚠️ Fault Detected: {activeFault.name}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Logic:</strong> {activeFault.mathContext}</p>
                <p style={{ margin: 0, fontSize: '14px', color: '#c53030' }}><strong>Clearing Time:</strong> {result.time.toFixed(3)} seconds</p>
              </div>
            ) : (
              <p style={{ marginTop: '10px', fontSize: '14px' }}>Load current within acceptable pickup limits (1.50pu).</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section style={{ background: '#fff', padding: '20px', borderRadius: '15px', border: '1px solid #edf2f7' }}>
            <h3 style={{ marginTop: 0 }}>🔧 Vector Injection</h3>
            {fault.Iabc.map((mag, i) => (
              <div key={i} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Phase {String.fromCharCode(65 + i)}</span>
                  <span style={{ color: '#3182ce', fontSize: '14px' }}>{mag.toFixed(2)}pu</span>
                </div>
                <input type="range" min="0" max="4" step="0.1" value={mag} style={{ width: '100%' }}
                  onChange={(e) => {
                    const next = [...fault.Iabc];
                    next[i] = +e.target.value;
                    setFault({ ...fault, Iabc: next });
                  }} />
              </div>
            ))}
          </section>

          <section>
            <h3 style={{ margin: '10px 0' }}>Relay Function (ANSI)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {(Object.keys(FAULT_REGISTRY) as FaultTypeCode[]).map((code) => (
                <button key={code} onClick={() => setFault({ ...fault, type: code })}
                  style={{
                    padding: '15px 10px', borderRadius: '8px', cursor: 'pointer',
                    border: fault.type === code ? '2px solid #3182ce' : '1px solid #e2e8f0',
                    background: fault.type === code ? '#ebf8ff' : '#fff',
                    color: fault.type === code ? '#2b6cb0' : '#4a5568',
                    fontWeight: 'bold'
                  }}>
                  {code}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
