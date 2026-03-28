import { FAULT_REGISTRY } from '../lib/faultRegistry';
import { useEffect, useRef } from 'react';

// Added a prop for the active code
export const HelpSection = ({ activeFaultCode }: { activeFaultCode?: string }) => {
    const activeRef = useRef<HTMLDivElement>(null);

    // Optional: Scroll the active fault into view when the tab opens
    useEffect(() => {
        if (activeRef.current) {
            activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [activeFaultCode]);

    return (
        <div style={{ marginTop: 20, paddingTop: 10 }}>
            <h2 style={{ color: '#1a365d', marginBottom: '10px' }}>📚 Help & Reference Guide</h2>
            <p style={{ color: '#718096', marginBottom: 25 }}>
                This simulator uses standard <strong>IEEE C37.2</strong> device designations and 
                <strong> IEC 60255</strong> inverse-time curves.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {Object.values(FAULT_REGISTRY).map((f) => {
                    const isActive = f.code === activeFaultCode;
                    
                    return (
                        <div 
                            key={f.code} 
                            ref={isActive ? activeRef : null}
                            style={{
                                background: '#fff',
                                padding: '20px',
                                borderRadius: '12px',
                                // Highlight the active fault with a blue border
                                border: isActive ? '3px solid #3182ce' : '1px solid #e2e8f0',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.3s ease',
                                boxShadow: isActive 
                                    ? '0 10px 15px -3px rgba(49, 130, 206, 0.3)' 
                                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                transform: isActive ? 'scale(1.02)' : 'scale(1)'
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ 
                                        color: isActive ? '#3182ce' : '#718096', 
                                        fontWeight: 'bold', 
                                        fontSize: '12px', 
                                        textTransform: 'uppercase' 
                                    }}>
                                        {isActive ? '🎯 CURRENTLY TESTING' : f.category}
                                    </span>
                                    <span style={{ color: '#718096', fontWeight: 'bold' }}>#{f.code}</span>
                                </div>
                                <h4 style={{ margin: '0 0 10px 0', color: '#1a202c', fontSize: '18px' }}>{f.name}</h4>
                                <p style={{ fontSize: '14px', color: '#4a5568', margin: 0 }}>{f.explanation}</p>
                            </div>

                            <div style={{ 
                                marginTop: '15px', 
                                paddingTop: '10px', 
                                borderTop: '1px dashed #e2e8f0',
                                background: isActive ? '#ebf8ff' : 'transparent',
                                borderRadius: '4px',
                                padding: isActive ? '8px' : '10px 0'
                            }}>
                                <code style={{ fontSize: '12px', color: '#805ad5', fontWeight: 'bold' }}>
                                    {f.mathContext}
                                </code>
                            </div>
                        </div>
                    );
                })}
            </div>

            <footer style={{ textAlign: 'center', marginTop: 40, padding: 20, color: '#a0aec0', fontSize: 12 }}>
                &copy; 2024 relay_sim • Open Source Training Tool • Based on IEEE C37 Standards
            </footer>
        </div>
    );
};
