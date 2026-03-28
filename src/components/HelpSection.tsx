import { FAULT_REGISTRY } from '../lib/faultRegistry';

export const HelpSection = () => {
    return (
        <div style={{ marginTop: 50, borderTop: '2px solid #edf2f7', paddingTop: 30 }}>
            <h2 style={{ color: '#2d3748' }}>📚 Help & Reference Guide</h2>
            <p style={{ color: '#718096', marginBottom: 25 }}>
                This simulator uses standard <strong>IEEE C37.2</strong> device designations and
                <strong> IEC 60255</strong> inverse-time curves.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {Object.values(FAULT_REGISTRY).map((f) => (
                    <div key={f.code} style={{
                        background: '#fff',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#3182ce', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>{f.category}</span>
                                <span style={{ color: '#718096', fontWeight: 'bold' }}>#{f.code}</span>
                            </div>
                            <h4 style={{ margin: '0 0 10px 0', color: '#1a202c', fontSize: '18px' }}>{f.name}</h4>
                            <p style={{ fontSize: '14px', color: '#4a5568', margin: 0 }}>{f.explanation}</p>
                        </div>

                        <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px dashed #e2e8f0' }}>
                            <code style={{ fontSize: '12px', color: '#805ad5' }}>{f.mathContext}</code>
                        </div>
                    </div>
                ))}
            </div>

            <footer style={{ textAlign: 'center', marginTop: 40, padding: 20, color: '#a0aec0', fontSize: 12 }}>
                &copy; 2024 relay_sim • Open Source Training Tool • Based on IEEE C37 Standards
            </footer>
        </div>
    );
};
