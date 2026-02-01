import React from 'react';
import { Code, Terminal, Key, Globe, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const DevPortal = () => {
  const toast = useToast();
  const [copied, setCopied] = React.useState(null);

  const handleCopy = (txt) => {
    setCopied(txt);
    setTimeout(() => setCopied(null), 2000);
    toast.show.info('Endpoint copied to clipboard.');
  };

  const endpoints = [
    { method: 'GET', path: '/v1/complaints/heatmaps', desc: 'Retrieve geo-tagged issue hotspots for city planning.' },
    { method: 'POST', path: '/v1/alerts/broadcast', desc: 'Push emergency messages to specific ward-level devices.' },
    { method: 'GET', path: '/v1/sustainability/metrics', desc: 'Fetch real-time air quality and carbon offset data.' }
  ];

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div className="flex-between" style={{ marginBottom: '32px' }}>
        <div>
          <h1>Smart City API Portal 🛠️</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Open architecture for 3rd-party innovation and government transparency.</p>
        </div>
        <button className="btn btn-primary"><Key size={18} /> Generate Key</button>
      </div>

      <div className="grid-auto-fit" style={{ marginBottom: '40px' }}>
        <div className="card">
          <Terminal size={24} color="var(--primary)" style={{ marginBottom: '12px' }} />
          <h3>Easy Integration</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>RESTful endpoints and WebSocket streams for real-time city telemetry.</p>
        </div>
        <div className="card">
          <Globe size={24} color="#10b981" style={{ marginBottom: '12px' }} />
          <h3>Standardized Data</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Built on Open-Smart-City data standards (OSCD) for global interoperability.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px', background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={18} /> Core API Reference
          </h3>
        </div>
        <div style={{ padding: '0 20px' }}>
          {endpoints.map((ep, i) => (
            <div key={i} style={{ padding: '20px 0', borderBottom: i < endpoints.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div className="flex-between">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    background: ep.method === 'GET' ? '#eff6ff' : '#ecfdf5', 
                    color: ep.method === 'GET' ? '#1d4ed8' : '#059669',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    borderRadius: '4px'
                  }}>{ep.method}</span>
                  <code style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1e293b' }}>{ep.path}</code>
                </div>
                <button 
                  className="btn glass-button" 
                  style={{ padding: '4px 8px' }} 
                  onClick={() => handleCopy(`https://api.cityconnect.gov${ep.path}`)}
                >
                  {copied === `https://api.cityconnect.gov${ep.path}` ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>{ep.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: '32px', background: '#0f172a', color: '#94a3b8' }}>
         <h4 style={{ color: 'white', marginBottom: '12px' }}>Authentication Pattern</h4>
         <code style={{ fontSize: '0.8rem', display: 'block', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
            Authorization: Bearer {'<CITY_API_JWT_TOKEN>'}
         </code>
      </div>
    </div>
  );
};

export default DevPortal;
