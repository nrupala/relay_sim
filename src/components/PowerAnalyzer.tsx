// src/components/PowerAnalyzer.tsx
export const PowerAnalyzer = ({ fault, isTripped }) => {
  const avgI = fault.Iabc.reduce((a, b) => a + b, 0) / 3;
  const currentV = isTripped ? 0 : 4.16; // kV
  const powerFactor = 0.85;
  const MW = isTripped ? 0 : (Math.sqrt(3) * currentV * avgI * powerFactor).toFixed(2);

  return (
    <div style={{ background: '#1a202c', color: '#63b3ed', padding: '20px', borderRadius: '12px', border: '1px solid #2d3748' }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#fff', fontSize: '12px', textTransform: 'uppercase' }}>📡 Real-Time Telemetry</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <div style={{ fontSize: '10px', color: '#a0aec0' }}>AVG CURRENT</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{avgI.toFixed(2)} pu</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#a0aec0' }}>SYSTEM VOLTAGE</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{currentV} kV</div>
        </div>
        <div style={{ gridColumn: 'span 2', borderTop: '1px solid #2d3748', paddingTop: '10px', marginTop: '5px' }}>
          <div style={{ fontSize: '10px', color: '#a0aec0' }}>ACTIVE POWER (MW)</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: isTripped ? '#f56565' : '#48bb78' }}>{MW} MW</div>
        </div>
      </div>
    </div>
  );
};
