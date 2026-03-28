// src/components/ControlPanel.tsx
import React from 'react';
import { FAULT_REGISTRY } from '../lib/faultRegistry';

interface ControlPanelProps {
  availableRelays: string[];
  currentFault: {
    type: string;
    Iabc: number[];
  };
  onUpdate: (updatedFault: any) => void;
}

export const ControlPanel = ({ availableRelays, currentFault, onUpdate }: ControlPanelProps) => {
  
  // Update a single phase magnitude (I_A, I_B, or I_C)
  const updatePhase = (index: number, val: number) => {
    const nextI = [...currentFault.Iabc];
    nextI[index] = val;
    onUpdate({ ...currentFault, Iabc: nextI });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. VECTOR INJECTION SLIDERS */}
      <section style={{ background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #edf2f7' }}>
        <h4 style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#2d3748', borderBottom: '1px solid #edf2f7', paddingBottom: '8px' }}>
          🔧 Vector Injection (pu)
        </h4>
        
        {currentFault.Iabc.map((mag, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>
                Phase {String.fromCharCode(65 + i)}
              </span>
              <span style={{ color: '#3182ce', fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold' }}>
                {mag.toFixed(2)} pu
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.1" 
              value={mag} 
              style={{ width: '100%', cursor: 'pointer', accentColor: '#3182ce' }}
              onChange={(e) => updatePhase(i, +e.target.value)} 
            />
          </div>
        ))}
      </section>

      {/* 2. RELAY FUNCTION SELECTOR */}
      <section style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#4a5568' }}>
          Active Protection (ANSI)
        </label>
        <select 
          value={currentFault.type}
          onChange={(e) => onUpdate({ ...currentFault, type: e.target.value })}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #cbd5e0',
            backgroundColor: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            color: '#2d3748',
            cursor: 'pointer'
          }}
        >
          {/* Filters the dropdown to show ONLY relays applicable to the current equipment tab */}
          {availableRelays.map(code => (
            <option key={code} value={code}>
              {code} - {FAULT_REGISTRY[code]?.name || 'Unknown Relay'}
            </option>
          ))}
        </select>
        
        <div style={{ marginTop: '12px', fontSize: '11px', color: '#718096', fontStyle: 'italic', lineHeight: '1.4' }}>
          💡 Tip: Adjust sliders to simulate {currentFault.type === '51' ? 'Overload' : 'Fault'} conditions.
        </div>
      </section>

      {/* 3. QUICK ACTIONS */}
      <button 
        onClick={() => onUpdate({ ...currentFault, Iabc: [1.0, 1.0, 1.0] })}
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #cbd5e0',
          background: '#fff',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: '#4a5568',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = '#edf2f7')}
        onMouseOut={(e) => (e.currentTarget.style.background = '#fff')}
      >
        🔄 Reset to Nominal (1.0pu)
      </button>
    </div>
  );
};
