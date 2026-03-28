import { useState, useEffect } from 'react';
import { RelaySim } from '../lib/RelaySim';

export const MotorLab = () => {
    const [time, setTime] = useState(0);
    const [active, setActive] = useState(false);
    const sim = new RelaySim();

    useEffect(() => {
        if (active && time < 10) { const id = setTimeout(() => setTime(time + 0.1), 100); return () => clearTimeout(id); }
    }, [active, time]);

    return (
        <div style={{ padding: 20, background: '#fff', borderRadius: 12, border: '1px solid #eee' }}>
            <h2>🏎️ Motor Lab</h2>
            <button onClick={() => { setTime(0); setActive(true) }}>⚡ Start Motor</button>
            <div style={{ marginTop: 20, height: 20, background: '#eee', borderRadius: 10 }}>
                <div style={{ width: `${(sim.getMotorCurrentAtTime(time) / 6) * 100}%`, height: '100%', background: 'orange' }} />
            </div>
            <p>Current: {sim.getMotorCurrentAtTime(time).toFixed(2)} pu</p>
        </div>
    );
};
