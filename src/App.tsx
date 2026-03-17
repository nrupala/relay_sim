import { useState } from 'react';
import { RelaySim } from './lib/RelaySim';

type Fault = {type: '50'|'51'|'21'|'87'; Iabc: number[]; Vabc?: number[]; Zload?: {re: number; im: number}};

export default function App() {
  const [fault, setFault] = useState<Fault>({type: '51' as const, Iabc: [2.5, 1.8, 1.2]});
  const sim = new RelaySim();
  const result = sim.run(fault);
  
  return (
    <div style={{display: 'flex', padding: 20, maxWidth: 1200, margin: '0 auto'}}>
      <div style={{width: '50%', paddingRight: 20}}>
        <h1>🛡️ IEEE C37 Relay Fault Simulator</h1>
        <h3>Results: {result.trip ? 'TRIP!' : 'No Trip'}</h3>
        <pre style={{background: '#f5f5f5', padding: 15, borderRadius: 8}}>
{JSON.stringify(result, null, 2)}
        </pre>
        <p><em>C37.90 Overcurrent • Mason Differential • Free OSS</em></p>
      </div>
      <div style={{width: '50%'}}>
        <h3>Controls</h3>
        <label>Ia: <input type="number" step="0.1" value={fault.Iabc[0]} onChange={e => 
          setFault({...fault, Iabc: [+e.target.value, fault.Iabc[1], fault.Iabc[2]]})} 
          style={{width: 80}} /></label><br/><br/>
        <label>Ib: <input type="number" step="0.1" value={fault.Iabc[1]} onChange={e => 
          setFault({...fault, Iabc: [fault.Iabc[0], +e.target.value, fault.Iabc[2]]})} 
          style={{width: 80}} /></label><br/><br/>
        <button onClick={() => setFault({type: '51' as const, Iabc: [3, 2, 1.5]})}>
          Test OC Fault (51)
        </button>
        <button onClick={() => setFault({type: '87' as const, Iabc: [1.1, 0.9, 1.0]})} style={{marginLeft: 10}}>
          Test Diff (87)
        </button>
      </div>
    </div>
  );
}
