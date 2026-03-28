// src/components/FaultSelector.tsx
import { FAULT_REGISTRY } from '../lib/faultRegistry';
import type { FaultTypeCode } from '../lib/faultRegistry';

interface FaultSelectorProps {
  activeFault: FaultTypeCode;
  onSelectFault: (code: FaultTypeCode) => void;
}

export const FaultSelector = ({ activeFault, onSelectFault }: FaultSelectorProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#4a5568' }}>
        Relay Function (ANSI)
      </label>
      <select 
        value={activeFault}
        onChange={(e) => onSelectFault(e.target.value as FaultTypeCode)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {Object.values(FAULT_REGISTRY).map((f) => (
          <option key={f.code} value={f.code}>
            {f.code}: {f.name}
          </option>
        ))}
      </select>
    </div>
  );
};
