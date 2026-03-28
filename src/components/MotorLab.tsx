import { useState, useEffect } from 'react';
import { RelaySim } from '../lib/RelaySim';

export const MotorLab = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const sim = new RelaySim();

    const current = sim.getMotorCurrentAtTime(time);
    const thermal = sim.getThermalStrain(current, time);

    useEffect(() => {
        let interval: any;
        if (isRunning && time < 10) {
            interval = setInterval(() => setTime(t => t + 0.1), 100);
        } else {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    return (
        <div style={{ padding: '20px', background: '#fff', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
            <h2>🏎️ Motor Starting & Thermal Lab (ANSI 49/51)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

                {/* Visualization */}
                <div style={{ background: '#1a202c', padding: '20px', borderRadius: '12px', color: '#fff' }}>
                    <div style={{ marginBottom: '10px' }}>Time: {time.toFixed(1)}s | Current: {current.toFixed(2)}pu</div>
                    {/* Simple Dynamic Bar for Current */}
                    <div style={{ height: '20px', background: '#2d3748', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${(current / 6) * 100}%`, height: '100%', background: current > 1.5 ? '#f6ad55' : '#48bb78', transition: '0.1s' }} />
                    </div>

                    <div style={{ marginTop: '20px' }}>Thermal Strain (Insulation Stress):</div>
                    <div style={{ height: '20px', background: '#2d3748', borderRadius: '10px', overflow: 'hidden', marginTop: '5px' }}>
                        <div style={{ width: `${thermal}%`, height: '100%', background: thermal > 90 ? '#e53e3e' : '#4299e1', transition: '0.1s' }} />
                    </div>

                    {thermal >= 100 && <div style={{ color: '#e53e3e', marginTop: '10px', fontWeight: 'bold' }}>🚨 THERMAL TRIP (Locked Rotor)</div>}
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <p style={{ fontSize: '14px', color: '#4a5568' }}>
                        <strong>The Challenge:</strong> Motors pull 600% current on start. A "judicious" relay must distinguish this from a fault.
                    </p>
                    <button onClick={() => { setTime(0); setIsRunning(true); }}
                        style={{ padding: '15px', borderRadius: '8px', background: '#3182ce', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        ⚡ Start Motor (Normal)
                    </button>
                    <button onClick={() => { setTime(0); setIsRunning(true); /* Logic for locked rotor could go here */ }}
                        style={{ padding: '15px', borderRadius: '8px', background: '#e53e3e', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        🔥 Locked Rotor Test
                    </button>
                    <button onClick={() => { setTime(0); setIsRunning(false); }} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};
