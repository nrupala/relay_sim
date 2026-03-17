import { useState } from 'react'
import { RelaySim, Fault } from './lib/RelaySim'

export default function App() {
  const [fault, setFault] = useState<Fault>({type:'51', Iabc:[2.5,1.8,1.2]})
  const sim = new RelaySim()
  const result = sim.run(fault)
  
  return (
    <div style={{display:'flex', padding:20}}>
      <div style={{width:'50%'}}>
        <h1>IEEE C37 Relay Sim</h1>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
      <div style={{width:'50%'}}>
        <label>Ia: <input type="number" value={fault.Iabc[0]} onChange={e=>setFault({...fault, Iabc:[+e.target.value, fault.Iabc[1], fault.Iabc[2]]})} /></label><br/>
        <button onClick={()=>setFault({type:'51', Iabc:[3,2,1.5]})}>Test OC Fault</button>
      </div>
    </div>
  )
}
