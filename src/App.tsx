import { useState } from 'react';
import { RelaySim } from './lib/RelaySim';
import { FAULT_REGISTRY } from './lib/faultRegistry';
import type { FaultTypeCode } from './lib/faultRegistry';

export default function App() {
  const [activeTab, setActiveTab] = useState<'graph' | 'math'>('graph');
  const [fault, setFault] = useState({
    type: '51' as FaultTypeCode,
    Iabc: [2.20, 2.40, 1.70],
    Vabc: [0.65, 0.45, 0.30]
  });

  const sim = new RelaySim();
  const result = sim.run(fault as any);
  const info = FAULT_REGISTRY[fault.type];

  // Simple SVG Phasor Graph Component
  const PhasorGraph = () => (
    <svg viewBox="-100 -100 200 200" style={{ width: '100%', height: '250px', background: '#fff', borderRadius: 8 }}>
      <circle cx="0" cy="0" r="80" fill="none" stroke="#eee" strokeWidth="1" />
      <line x1="-100" y1="0" x2="100" y2="0" stroke="#eee" />
      <line x1="0" y1="-100" x2="0" y2="100" stroke="#eee" />
      {/* Current Vectors (Simplified for visualization) */}
      <line x1="0" y1="0" x2={fault.Iabc[0] * 20} y2="0" stroke="red" strokeWidth="3" markerEnd="url(#arrow)" />
      <line x1="0" y1="0" x2={-fault.Iabc[1] * 10} y2={fault.Iabc[1] * 17} stroke="blue" strokeWidth="3" />
      <line x1="0" y1="0" x2={-fault.Iabc[2] * 10} y2={-fault.Iabc[2] * 17} stroke="green" strokeWidth="3" />
      <text x="-95" y="90" fontSize="10" fill="#999">Scale: 1 unit = 20px</text>
    </svg>
  );

  return (
    <div style={{ padding: 25, maxWidth: 1100, margin: '0 auto', fontFamily: 'system-ui', color: '#2d3748' }}>
      <header style={{ marginBottom: 20, borderBottom: '2px solid #edf2f7', paddingBottom: 15 }}>
        <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>🔵 IEEE C37 Relay Simulator</h1>
        <p style={{ color: '#718096', margin: '5px 0' }}>Active Logic: <strong>{info?.name}</strong></p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 30 }}>
        {/* LEFT: RESULTS & TABS */}
        <div style={{ background: '#f8fafc', padding: 25, borderRadius: 15, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>📊 Simulation Results</h3>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: result.trip ? '#e53e3e' : '#38a169', margin: '15px 0' }}>
            {result.trip ? '🚨 TRIP!' : '✅ NORMAL'}
          </div>

          <div style={{ background: '#fff', padding: 15, borderRadius: 8, border: '1px solid #edf2f7', marginBottom: 20 }}>
            <strong>Trip Time:</strong> {result.trip ? `${result.time.toFixed(3)}s` : '∞'}<br />
            <strong>I-Peak:</strong> {Math.max(...fault.Iabc).toFixed(2)}pu
          </div>

          {/* TABS */}
          <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: 15 }}>
            <button onClick={() => setActiveTab('graph')} style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === 'graph' ? '3px solid #3182ce' : 'none', fontWeight: activeTab === 'graph' ? 'bold' : 'normal' }}>Graph</button>
            <button onClick={() => setActiveTab('math')} style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === 'math' ? '3px solid #3182ce' : 'none', fontWeight: activeTab === 'math' ? 'bold' : 'normal' }}>Explainer</button>
          </div>

          {activeTab === 'graph' ? <PhasorGraph /> : (
            <div style={{ fontSize: 14, lineHeight: 1.6, background: '#fff', padding: 15, borderRadius: 8 }}>
              <strong>Logic Applied:</strong><br />
              {fault.type === '51' && `t = 0.14 / (PSM^0.02 - 1)`}
              {fault.type === '50' && `Trip if I > 1.5pu`}
              {fault.type === 'L-L' && `Differential check: |Ia - Ib| > 0.2 * (Ia+Ib)`}
              <br /><br />
              <span style={{ color: '#718096' }}>*Calculated using IEEE C37.90 Standard Inverse curves.</span>
            </div>
          )}
        </div>

        {/* RIGHT: CONTROLS (Same as your current working version) */}
        <div>
          {/* ... Keep your current Slider and Button code here ... */}
        </div>
      </div>
    </div>
  );
}
