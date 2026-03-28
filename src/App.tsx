import { useState } from 'react';
import { RelaySimulator } from './components/RelaySimulator'; // Move your old App logic here
import { EquipmentStudy } from './components/EquipmentStudy';
import { MotorLab } from './components/MotorLab';
import { HelpSection } from './components/HelpSection';

type Tab = 'simulator' | 'equipment' | 'motor' | 'help';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('simulator');

  const tabStyle = (id: Tab) => ({
    padding: '12px 24px',
    cursor: 'pointer',
    border: 'none',
    background: activeTab === id ? '#3182ce' : 'transparent',
    color: activeTab === id ? '#fff' : '#4a5568',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: '0.2s'
  });

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#1a365d', marginBottom: '10px' }}>🛡️ relay_sim: Engineering Training Portal</h1>
        <nav style={{ display: 'inline-flex', background: '#edf2f7', padding: '5px', borderRadius: '12px' }}>
          <button style={tabStyle('simulator')} onClick={() => setActiveTab('simulator')}>Vector Sim</button>
          <button style={tabStyle('motor')} onClick={() => setActiveTab('motor')}>Motor Lab</button>
          <button style={tabStyle('equipment')} onClick={() => setActiveTab('equipment')}>Equipment Study</button>
          <button style={tabStyle('help')} onClick={() => setActiveTab('help')}>Help & Ref</button>
        </nav>
      </header>

      <main style={{ minHeight: '600px' }}>
        {activeTab === 'simulator' && <RelaySimulator />}
        {activeTab === 'motor' && <MotorLab />}
        {activeTab === 'equipment' && <EquipmentStudy />}
        {activeTab === 'help' && <HelpSection />}
      </main>

      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#a0aec0', fontSize: '12px' }}>
        IEEE C37 Standards Compliance • Fork1 Stable • 2024
      </footer>
    </div>
  );
}
