import { useState } from 'react';
import { FAULT_REGISTRY } from './lib/faultRegistry';
import { HelpSection } from './components/HelpSection';

export default function App() {
  const [fault, setFault] = useState({
    type: '51',
    Iabc: [2.2, 1.0, 1.0],
    angles: [0, -120, 120], // Adding Phase Angles in degrees
  });

  // Convert Polar (Mag, Ang) to Cartesian (X, Y) for SVG
  const getCoords = (mag: number, deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: Math.cos(rad) * mag * 30, y: -Math.sin(rad) * mag * 30 };
  };

  return (
    <div style={{ padding: 25, maxWidth: 1200, margin: '0 auto', fontFamily: 'system-ui' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '450px 1fr', gap: 40 }}>

        {/* LEFT: PHASOR DIAGRAM */}
        <div style={{ background: '#1a202c', padding: 20, borderRadius: 15, color: '#fff' }}>
          <h3 style={{ marginTop: 0 }}>📉 Phasor Diagram (Vector)</h3>
          <svg viewBox="-100 -100 200 200" style={{ width: '100%', height: '350px' }}>
            {/* Grid Lines */}
            <circle cx="0" cy="0" r="30" fill="none" stroke="#2d3748" />
            <circle cx="0" cy="0" r="60" fill="none" stroke="#2d3748" />
            <line x1="-100" y1="0" x2="100" y2="0" stroke="#2d3748" />
            <line x1="0" y1="-100" x2="0" y2="100" stroke="#2d3748" />

            {/* Vector Arrows */}
            {fault.Iabc.map((mag, i) => {
              const pos = getCoords(mag, fault.angles[i]);
              const colors = ['#f56565', '#4299e1', '#48bb78']; // Red, Blue, Green
              return (
                <g key={i}>
                  <line x1="0" y1="0" x2={pos.x} y2={pos.y} stroke={colors[i]} strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x={pos.x + 5} y={pos.y} fill={colors[i]} fontSize="10">I{String.fromCharCode(65 + i)}</text>
                </g>
              );
            })}
          </svg>

          <div style={{ marginTop: 15, fontSize: 13, background: '#2d3748', padding: 10, borderRadius: 8 }}>
            <strong>💡 Context:</strong> {FAULT_REGISTRY[fault.type]?.context}
          </div>
        </div>

        {/* RIGHT: VECTOR CONTROLS */}
        <div>
          <h3>🔧 Vector Controls</h3>
          {fault.Iabc.map((mag, i) => (
            <div key={i} style={{ marginBottom: 20, borderBottom: '1px solid #eee', paddingBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label><strong>Phase {String.fromCharCode(65 + i)}</strong></label>
                <span style={{ color: '#718096' }}>{mag.toFixed(2)}pu ∠ {fault.angles[i]}°</span>
              </div>
              {/* Magnitude Slider */}
              <input type="range" min="0" max="3" step="0.1" value={mag} style={{ width: '100%' }}
                onChange={e => {
                  const newI = [...fault.Iabc];
                  newI[i] = +e.target.value;
                  setFault({ ...fault, Iabc: newI });
                }} />
              {/* Angle Slider */}
              <input type="range" min="-180" max="180" step="1" value={fault.angles[i]} style={{ width: '100%', opacity: 0.6 }}
                onChange={e => {
                  const newA = [...fault.angles];
                  newA[i] = +e.target.value;
                  setFault({ ...fault, angles: newA });
                }} />
            </div>
          ))}

          {/* Function Selector with Tooltips */}
          <h3>ANSI Function Selector</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {Object.keys(FAULT_REGISTRY).map(code => (
              <button key={code} title={FAULT_REGISTRY[code].desc}
                onClick={() => setFault({ ...fault, type: code })}
                style={{
                  padding: '10px 15px', borderRadius: 8, cursor: 'pointer',
                  border: fault.type === code ? '2px solid #3182ce' : '1px solid #ccc',
                  background: fault.type === code ? '#ebf8ff' : '#fff'
                }}>
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
      <HelpSection />
    </div>
  );
}