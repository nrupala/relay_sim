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
                    <div key={f.code} style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <span style={{ background: '#ebf8ff', color: '#3182ce', padding: '4px 8px', borderRadius: 4, fontWeight: 'bold', fontSize: 12 }}>
                                {f.category}
                            </span>
                            <strong style={{ fontSize: 18 }}>{f.code}</strong>
                        </div>
                        <h4 style={{ margin: '5px 0', color: '#1a202c' }}>{f.name}</h4>
                        <p style={{ fontSize: 13, color: '#4a5568', lineHeight: 1.5 }}>{f.explanation}</p>
                        <div style={{ marginTop: 15, fontSize: 12, color: '#718096', fontStyle: 'italic' }}>
                            <strong>Ref:</strong> {f.source}
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
