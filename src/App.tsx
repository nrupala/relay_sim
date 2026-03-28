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
  const result = sim.run(fault) || { trip: false, time: 0 }; // Fallback to safe object

  return (
    <div style={{ padding: 20 }}>
      <h1>🛡️ Relay Simulator</h1>
      {/* Always check if the key exists in registry before accessing */}
      <h3>Active Function: {FAULT_REGISTRY[fault.type]?.name || "Unknown"}</h3>

      <div style={{ color: result?.trip ? 'red' : 'green' }}>
        Status: {result?.trip ? '🚨 TRIP' : '✅ NORMAL'}
      </div>

      {/* ... rest of your UI ... */}
    </div>
  );
}
