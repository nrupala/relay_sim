import { useState, useMemo } from 'react';
import { RelaySim } from './lib/RelaySim';
import { FAULT_REGISTRY } from './lib/faultRegistry';
import { EquipmentView } from './components/EquipmentView';
import { ControlPanel } from './components/ControlPanel';
import { HelpSection } from './components/HelpSection';
import { SequencePhasor } from './components/SequencePhasor';

// --- IEEE 242 / GE PROTECTION STANDARDS ---
const EQUIPMENT_TYPES = {
  MOTOR: { id: 'motor', label: 'Industrial Motor', relays: ['46', '49', '50', '51', '66'], nominalV: 4.16 },
  TRANSFORMER: { id: 'transformer', label: 'Power Transformer', relays: ['87T', '51', '24', '63'], nominalV: 13.8 },
  BUS: { id: 'bus', label: 'Main Busbar', relays: ['87B', '50', '51G'], nominalV: 13.8 },
  LINE: { id: 'line', label: 'Transmission Line', relays: ['21', '67', '79', '50/51'], nominalV: 115 }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'motor' | 'transformer' | 'bus' | 'line'>('motor');
  const [showHelp, setShowHelp] = useState(false);
  const [fault, setFault] = useState({
    type: '51',
    Iabc: [1.2, 1.0, 1.0],
    Iang: [0, -120, 120]
  });

  // --- CORE ENGINE ---
  const sim = useMemo(() => new RelaySim(), []);
  const result = sim.run(fault as any);
  const isTripped = result?.trip;
  const config = EQUIPMENT_TYPES[activeTab.toUpperCase() as keyof typeof EQUIPMENT_TYPES];

  // --- TELEMETRY ---
    const avgI = fault.Iabc.reduce((a, b) => a + b, 0) / 3;
  const powerFactor = 0.85;
  const MW = isTripped ? 0 : (Math.sqrt(3) * config.nominalV * avgI * powerFactor).toFixed(2);
 // Symmetrical compnents
// --- SYMMETRICAL COMPONENTS (The "Invisible" Physics) ---
  const i1 = avgI; // Positive Sequence (Balanced Load)
  const i2 = (Math.max(...fault.Iabc) - Math.min(...fault.Iabc)) / 2; // Negative Sequence (Unbalance/Heat)
  const i0 = Math.abs(fault.Iabc[0] + fault.Iabc[1] + fault.Iabc[2] - 3) / 3; // Zero Sequence (Ground)


  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 380px', 
      height: '100vh', 
      backgroundColor: '#f7fafc',
      fontFamily: 'system-ui, sans-serif' 
    }}>
      
      {/* LEFT COLUMN: VISUAL LAB */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '25px', gap: '20px', overflow: 'hidden' }}>
        
        <nav style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.values(EQUIPMENT_TYPES).map((eq) => (
            <button 
              key={eq.id}
              onClick={() => { setActiveTab(eq.id as any); setShowHelp(false); }}
              style={{
                padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', border: 'none', fontWeight: 'bold',
                backgroundColor: activeTab === eq.id && !showHelp ? '#3182ce' : '#edf2f7',
                color: activeTab === eq.id && !showHelp ? '#fff' : '#4a5568'
              }}
            >
              {eq.label}
            </button>
          ))}
          <button 
            onClick={() => setShowHelp(!showHelp)}
            style={{
              padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
              border: '2px solid #3182ce', backgroundColor: showHelp ? '#3182ce' : 'transparent',
              color: showHelp ? '#fff' : '#3182ce', marginLeft: 'auto'
            }}
          >
            {showHelp ? '✕ Close Help' : '📚 ANSI Docs'}
          </button>
        </nav>

        <div style={{ 
          flex: 1, backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', 
          padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflowY: 'auto' 
        }}>
          {showHelp ? (
            <HelpSection activeFaultCode={fault.type} />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#1a365d', marginBottom: '20px' }}>{config.label} Protection Analysis</h2>
              <EquipmentView type={activeTab} isTripped={isTripped} />
              
              {isTripped && (
                <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#fff5f5', border: '2px solid #feb2b2', borderRadius: '12px' }}>
                  <h3 style={{ margin: 0, color: '#c53030' }}>🚨 {fault.type} OPERATION</h3>
                  <div style={{ marginTop: '15px', padding: '10px', background: '#fff', borderRadius: '8px', border: '1px solid #feb2b2', textAlign: 'left' }}>
                    <div style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold', marginBottom: '5px' }}>IEEE COORDINATION MATH:</div>
                    <code style={{ fontSize: '13px', color: '#2d3748', display: 'block', lineHeight: '1.6' }}>
                      {fault.type === '51' ? (
                        <>
                          Time = TD × [ (A / (M<sup>p</sup> - 1)) + B ] <br/>
                          Time = 0.5 × [ (19.61 / ({(avgI/1.5).toFixed(2)}<sup>2</sup> - 1)) + 0.491 ] = <strong>{result.time.toFixed(3)}s</strong>
                        </>
                      ) : (
                        <>Instantaneous Trip (Device 50) <br/> Time = 1 Cycle (0.016s) @ M &gt; 8.0</>
                      )}
                    </code>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: DASHBOARD & CONTROLS */}
      <aside style={{ 
        backgroundColor: '#fff', borderLeft: '1px solid #e2e8f0', padding: '25px',
        display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto'
      }}>


        <div style={{ backgroundColor: '#1a202c', padding: '20px', borderRadius: '12px', color: '#63b3ed' }}>
          <h4 style={{ color: '#a0aec0', fontSize: '11px', margin: '0 0 15px 0', textTransform: 'uppercase' }}>Telemetry (IEEE 242)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#718096' }}>LOAD CURRENT</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{avgI.toFixed(2)} pu</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#718096' }}>BUS VOLTAGE</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{config.nominalV} kV</div>
            </div>
            <div style={{ gridColumn: 'span 2', paddingTop: '10px', borderTop: '1px solid #2d3748' }}>
              <div style={{ fontSize: '10px', color: '#718096' }}>ACTIVE POWER</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: isTripped ? '#f56565' : '#48bb78' }}>{MW} MW</div>
            </div>
	<div style={{ backgroundColor: '#1a202c', padding: '20px', borderRadius: '12px', color: '#63b3ed' }}>
    {/* ... telemetry content ... */}
  	</div>
          </div>
        </div>
	 <SequencePhasor i1={i1} i2={i2} i0={i0} />
        <ControlPanel 
          availableRelays={config.relays}
          currentFault={fault}
          onUpdate={setFault}
        />

        <div style={{ marginTop: 'auto', fontSize: '11px', color: '#a0aec0', textAlign: 'center' }}>
          RelaySim v3.0 • coordination Study
        </div>
      </aside>
    </div>
  );
}
