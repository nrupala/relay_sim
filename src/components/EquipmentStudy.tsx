// src/components/EquipmentStudy.tsx
import React from 'react';

interface EquipmentStudyProps {
  isTripped: boolean;
  activeFault?: {
    code: string;
    name: string;
    explanation: string;
  };
}

const renderEquipment = () => {
  const isTransformerFault = ['87T', '24', '63'].includes(activeFault?.code || '');
  
  if (isTransformerFault) {
    return (
      <div className="transformer-view">
        {/* SVG of a Transformer with a cooling fan */}
        <div style={{ fontSize: '50px' }}>{isTripped ? '💥' : '⚡'}</div>
        <p>Transformer Core {isTripped ? 'OFFLINE' : 'ENERGIZED'}</p>
      </div>
    );
  }

  return (
    <div className="motor-view">
      {/* Your current spinning motor code */}
      <div style={{ animation: isTripped ? 'none' : 'spin 1s linear infinite' }}>⚙️</div>
      <p>Induction Motor {isTripped ? 'TRIPPED' : 'RUNNING'}</p>
    </div>
  );
};

export const EquipmentStudy = ({ isTripped, activeFault }: EquipmentStudyProps) => {
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ color: '#1a365d', marginBottom: '20px' }}>🏭 Industrial Equipment Study</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
        
        {/* LEFT: VISUAL SCHEMATIC */}
        <div style={{ 
          background: '#f8fafc', 
          borderRadius: '12px', 
          padding: '40px', 
          textAlign: 'center',
          border: '2px solid #edf2f7',
          position: 'relative',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* POWER SOURCE */}
          <div style={{ width: '60px', height: '60px', border: '3px solid #2d3748', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', background: '#fff' }}>G</div>
          <div style={{ width: '4px', height: '40px', background: '#2d3748' }}></div>

          {/* CIRCUIT BREAKER VISUAL */}
          <div style={{
            width: '120px',
            padding: '20px',
            border: `4px solid ${isTripped ? '#e53e3e' : '#48bb78'}`,
            borderRadius: '8px',
            background: isTripped ? '#fff5f5' : '#f0fff4',
            transition: 'all 0.5s ease',
            position: 'relative'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>BREAKER 52-1</span>
            <div style={{ 
                height: '4px', 
                width: '100%', 
                background: isTripped ? '#e53e3e' : '#48bb78',
                transform: isTripped ? 'rotate(-45deg)' : 'rotate(0deg)',
                transformOrigin: 'left',
                transition: 'transform 0.4s'
            }}></div>
            <div style={{ marginTop: '10px', fontSize: '10px', color: isTripped ? '#c53030' : '#2f855a', fontWeight: 'bold' }}>
                {isTripped ? 'OPEN / TRIPPED' : 'CLOSED / ENERGIZED'}
            </div>
          </div>

          <div style={{ width: '4px', height: '40px', background: isTripped ? '#cbd5e0' : '#2d3748' }}></div>

          {/* THE LOAD (MOTOR) */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: `5px solid ${isTripped ? '#cbd5e0' : '#3182ce'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            animation: isTripped ? 'none' : 'spin 2s linear infinite',
          }}>
            <span style={{ fontWeight: 'bold', color: isTripped ? '#cbd5e0' : '#3182ce' }}>MOTOR</span>
          </div>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        {/* RIGHT: ANALYSIS PANEL */}
        <div>
          <div style={{ 
            padding: '20px', 
            background: isTripped ? '#fff5f5' : '#ebf8ff', 
            borderRadius: '12px',
            border: `1px solid ${isTripped ? '#feb2b2' : '#bee3f8'}`
          }}>
            <h4 style={{ margin: '0 0 10px 0' }}>System Analysis</h4>
            {isTripped ? (
              <>
                <p style={{ fontSize: '14px', color: '#c53030' }}>
                  <strong>Trip Event:</strong> The relay detected a <strong>{activeFault?.code}</strong> condition.
                </p>
                <p style={{ fontSize: '13px', color: '#4a5568' }}>
                  The circuit breaker was commanded to open to protect the motor from permanent thermal damage.
                </p>
              </>
            ) : (
              <p style={{ fontSize: '14px', color: '#2c5282' }}>
                System is operating within nominal limits. The induction motor is drawing balanced load current.
              </p>
            )}
          </div>

          <div style={{ marginTop: '20px', fontSize: '13px', color: '#718096' }}>
            <h5>Study Notes:</h5>
            <ul style={{ paddingLeft: '20px' }}>
              <li>ANSI {activeFault?.code} protects against {activeFault?.name.toLowerCase()}.</li>
              <li>Coordination interval: 300ms.</li>
              <li>CT Ratio: 100:5</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
