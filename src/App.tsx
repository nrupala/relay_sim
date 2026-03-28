// src/App.tsx
import { useState } from 'react';
import { RelaySim } from './lib/RelaySim';
// 1. Ensure the import name matches exactly
import { FAULT_REGISTRY } from './lib/faultRegistry';
import type { FaultTypeCode } from './lib/faultRegistry';


export default function App() {
  // 2. State initialization using the registry keys
  const [fault, setFault] = useState({
    type: '51' as FaultTypeCode,
    Iabc: [2.5, 1.2, 1.0]
  });

  const sim = new RelaySim();
  const result = sim.run(fault);

  return (
    <div style={{ padding: 20 }}>
      {/* 3. Accessing the registry safely */}
      <h1>{FAULT_REGISTRY[fault.type].name}</h1>
      <p>{FAULT_REGISTRY[fault.type].desc}</p>

      {/* 4. Mapping the buttons using Object.keys */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {Object.keys(FAULT_REGISTRY).map((key) => (
          <button
            key={key}
            onClick={() => setFault({ ...fault, type: key as FaultTypeCode })}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
