import { FaultSelector } from './FaultSelector';

interface ControlPanelProps {
  availableRelays: string[];
  currentFault: {
    type: string;
    Iabc: number[];
  };
  onUpdate: (updatedFault: any) => void;
}

export const ControlPanel = ({ availableRelays, currentFault, onUpdate }: ControlPanelProps) => {
  const updatePhase = (index: number, val: number) => {
    const nextI = [...currentFault.Iabc];
    nextI[index] = val;
    onUpdate({ ...currentFault, Iabc: nextI });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <section>
        <h3 style={{ fontSize: '16px', color: '#2d3748', borderBottom: '2px solid #edf2f7', paddingBottom: '10px' }}>
          🔧 IEEE Testing Bench
        </h3>
        
        {currentFault.Iabc.map((mag, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Phase {String.fromCharCode(65 + i)} Current</span>
              <span style={{ color: '#3182ce', fontSize: '13px', fontFamily: 'monospace' }}>{mag.toFixed(2)} pu</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.1" 
              value={mag} 
              style={{ width: '100%', cursor: 'pointer' }}
              onChange={(e) => updatePhase(i, +e.target.value)} 
            />
          </div>
        ))}
      </section>

      <section style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Protection Logic</h4>
        <FaultSelector 
          activeFault={currentFault.type as any} 
          onSelectFault={(type) => onUpdate({ ...currentFault, type })} 
        />
        <div style={{ marginTop: '10px', fontSize: '11px', color: '#718096' }}>
          *Available ANSI codes restricted by equipment type.
        </div>
      </section>
    </div>
  );
};
