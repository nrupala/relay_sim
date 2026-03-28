import { useState } from 'react';
import { RelaySim } from '../lib/RelaySim';
import { FAULT_REGISTRY } from '../lib/faultRegistry';
import type { FaultTypeCode } from '../lib/faultRegistry';

export const RelaySimulator = () => {
    const [fault, setFault] = useState({
        type: '51' as FaultTypeCode,
        Iabc: [1.20, 1.00, 1.00],
        Iang: [0, -120, 120],
    });

    const sim = new RelaySim();
    const result = sim.run(fault as any);
    const isTripped = result?.trip;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', gap: '40px' }}>
            <div style={{ background: isTripped ? '#2d0000' : '#1a202c', padding: '25px', borderRadius: '20px', color: '#fff', border: isTripped ? '2px solid red' : 'none' }}>
                <h3 style={{ marginTop: 0 }}>{isTripped ? '🚨 TRIP' : '📉 PHASORS'}</h3>
                <svg viewBox="-100 -100 200 200" style={{ width: '100%', height: '300px' }}>
                    <circle cx="0" cy="0" r="70" fill="none" stroke="#2d3748" strokeDasharray="4" />
                    {fault.Iabc.map((mag, i) => {
                        const rad = (fault.Iang[i] * Math.PI) / 180;
                        return <line key={i} x1="0" y1="0" x2={Math.cos(rad) * mag * 35} y2={-Math.sin(rad) * mag * 35} stroke={['#f56565', '#4299e1', '#48bb78'][i]} strokeWidth="3" />;
                    })}
                </svg>
            </div>
            <div>
                <h3>Vector Injection</h3>
                {fault.Iabc.map((mag, i) => (
                    <input key={i} type="range" min="0" max="4" step="0.1" value={mag} style={{ width: '100%' }}
                        onChange={e => { const n = [...fault.Iabc]; n[i] = +e.target.value; setFault({ ...fault, Iabc: n }) }} />
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 20 }}>
                    {Object.keys(FAULT_REGISTRY).map(c => <button key={c} onClick={() => setFault({ ...fault, type: c as any })}>{c}</button>)}
                </div>
            </div>
        </div>
    );
};
