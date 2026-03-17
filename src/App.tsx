import { useState } from 'react';
import { RelaySim } from './lib/RelaySim';

type Fault = {type: '50'|'51'|'21'|'87'; Iabc: number[]; Vabc?: number[]; Zload?: {re: number; im: number}};

export default function App() {
  const [fault, setFault] = useState<Fault>({type: '51' as const, Iabc: [2.5, 1.8, 1.2]});
  const sim = new RelaySim();
  const result = sim.run(fault);
  
  return (
    <div style={{padding: 20, maxWidth: 1200, margin: '0 auto', fontFamily: 'system-ui'}}>
      <header style={{textAlign: 'center', marginBottom: 30}}>
        <h1 style={{color: '#1a365d', margin: 0}}>🛡️ IEEE C37 Relay Fault Simulator</h1>
        <p style={{color: '#666', fontSize: 16}}>Free OSS trainer • C37.90 Overcurrent + Mason Differential</p>
      </header>
      
      <div style={{display: 'flex', gap: 30}}>
        {/* Results */}
        <div style={{width: '50%', background: '#f8fafc', padding: 25, borderRadius: 12}}>
          <h3 style={{marginTop: 0}}>📊 Simulation Results</h3>
          <div style={{fontSize: 24, fontWeight: 'bold', color: result.trip ? '#c53030' : '#38a169', margin: '20px 0'}}>
            {result.trip ? '🚨 TRIP!' : '✅ No Trip'}
          </div>
          
          <div style={{background: '#edf2f7', padding: 20, borderRadius: 8, fontFamily: 'monospace'}}>
            <strong>Time:</strong> {result.time.toFixed(2)}s<br/>
            {result.zone && <><strong>Zone:</strong> {result.zone}<br/></>}
            <strong>Imax:</strong> {Math.max(...fault.Iabc).toFixed(2)}pu<br/>
            <strong>PSM:</strong> {(Math.max(...fault.Iabc)/1.5).toFixed(2)}<br/>
            <strong>Idiff:</strong> {Math.abs(fault.Iabc[0]-fault.Iabc[1]).toFixed(2)}pu
          </div>
          
          <details style={{marginTop: 20}}>
            <summary style={{cursor: 'pointer', color: '#4a5568'}}>⚙️ Formulas Used (IEEE C37.90)</summary>
            <div style={{fontSize: 14, lineHeight: 1.5, marginTop: 10}}>
              • 51: \( t = \frac{0.14}{PSM^(0.02)-1} \)s (IEC VI curve)<br/>
              • 50: Instantaneous I &gt; 1.5pu<br/>
              • 87: \( |I_a - I_b| &gt; 0.2(I_a + I_b) \) (Mason bias)
            </div>
          </details>
        </div>

        {/* Controls */}
        <div style={{width: '50%'}}>
          <h3 style={{marginTop: 0}}>🔧 Fault Setup (Per Unit)</h3>
          <div style={{background: '#f7fafc', padding: 20, borderRadius: 12}}>
            <div style={{marginBottom: 15}}>
              <label><strong>Ia (Phase A):</strong> {fault.Iabc[0].toFixed(2)}pu</label><br/>
              <input type="range" min="0" max="5" step="0.1" value={fault.Iabc[0]} 
                onChange={e => setFault({...fault, Iabc: [+e.target.value, fault.Iabc[1], fault.Iabc[2]]})} />
            </div>
            <div style={{marginBottom: 20}}>
              <label><strong>Ib (Phase B):</strong> {fault.Iabc[1].toFixed(2)}pu</label><br/>
              <input type="range" min="0" max="5" step="0.1" value={fault.Iabc[1]} 
                onChange={e => setFault({...fault, Iabc: [fault.Iabc[0], +e.target.value, fault.Iabc[2]]})} />
            </div>
            
            <div style={{display: 'flex', gap: 10}}>
              <button onClick={() => setFault({type: '51' as const, Iabc: [3, 2, 1.5]})}
                style={{flex: 1, padding: 12, background: '#3182ce', color: 'white', border: 'none', borderRadius: 8}}>
                Test OC Fault (51)
              </button>
              <button onClick={() => setFault({type: '87' as const, Iabc: [1.1, 0.9, 1.0]})}
                style={{flex: 1, padding: 12, background: '#d69e2e', color: 'white', border: 'none', borderRadius: 8}}>
                Test Diff (87)
              </button>
            </div>
          </div>
          
          <div style={{marginTop: 20, padding: 15, background: '#fff3cd', borderRadius: 8, fontSize: 14}}>
            <strong>💡 Quick Guide:</strong><br/>
            • <strong>1.0pu</strong> = CT rated current (normal load)<br/>
            • <strong>2.0pu</strong> = Heavy fault current<br/>
            • <strong>Ia ≠ Ib</strong> = Internal fault (diff trips)<br/>
            • Drag sliders → instant results!
          </div>
        </div>
      </div>
    </div>
  );
}
