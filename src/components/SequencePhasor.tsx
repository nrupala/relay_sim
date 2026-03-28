// src/components/SequencePhasor.tsx
export const SequencePhasor = ({ i1, i2, i0 }: { i1: number, i2: number, i0: number }) => {
  return (
    <div style={{ background: '#1a202c', padding: '15px', borderRadius: '12px', marginTop: '10px' }}>
      <h5 style={{ color: '#a0aec0', fontSize: '10px', margin: '0 0 10px 0' }}>SYMMETRICAL COMPONENTS (Calculated)</h5>
      <svg viewBox="-50 -50 100 100" width="100%" height="150">
        <circle cx="0" cy="0" r="40" stroke="#2d3748" fill="none" strokeDasharray="2" />
        {/* Positive Sequence (Green - Normal) */}
        <line x1="0" y1="0" x2={i1 * 30} y2="0" stroke="#48bb78" strokeWidth="2" />
        <text x={i1 * 30} y="-5" fill="#48bb78" fontSize="6">I1 (Pos)</text>
        
        {/* Negative Sequence (Red - Motor Heat) */}
        <line x1="0" y1="0" x2={0} y2={i2 * -30} stroke="#f56565" strokeWidth="2" />
        <text x="5" y={i2 * -30} fill="#f56565" fontSize="6">I2 (Neg)</text>

        {/* Zero Sequence (Yellow - Ground Fault) */}
        <line x1="0" y1="0" x2={i0 * -20} y2={i0 * 20} stroke="#ecc94b" strokeWidth="2" />
        <text x={i0 * -25} y={i0 * 25} fill="#ecc94b" fontSize="6">3I0 (Zero)</text>
      </svg>
      <div style={{ fontSize: '10px', color: '#cbd5e0', marginTop: '5px' }}>
        {i2 > 0.15 && <span style={{ color: '#f56565' }}>⚠️ High I2: ANSI 46 Active</span>}
      </div>
    </div>
  );
};
