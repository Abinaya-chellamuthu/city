import React, { useState, useEffect } from 'react';
import { Phone, Ambulance, Shield, Flame, AlertTriangle, MapPin, Send, Activity } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAppContext } from '../context/AppContext';

const Emergency = () => {
  const { role, disasterAlerts } = useAppContext();
  const [sosActive, setSosActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* DISASTER ALERTS LAYER */}
      <div style={{ marginBottom: '32px' }}>
         <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Activity size={20} color="#dc2626" /> Active Disaster Alerts
         </h3>
         <div style={{ display: 'grid', gap: '12px' }}>
            {disasterAlerts.map(a => (
              <div key={a.id} className="card" style={{ background: '#fef2f2', borderColor: '#fee2e2', borderLeftWidth: '6px' }}>
                 <div className="flex-between">
                    <div>
                      <strong style={{ color: '#991b1b', fontSize: '1rem' }}>{a.type} Caution - Severity: {a.severity}</strong>
                      <p style={{ color: '#b91c1c', marginTop: '4px', fontSize: '0.85rem' }}>{a.message}</p>
                    </div>
                    <span style={{ fontSize: '0.75rem', padding: '4px 12px', background: 'white', borderRadius: '4px', fontWeight: 'bold', color: '#dc2626' }}>LIVE ALERT</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div className="card" style={{ textAlign: 'center', background: 'white', borderColor: 'var(--border-color)', marginBottom: '40px', padding: '32px' }}>
        <h2 style={{ color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '2rem', fontWeight: '800' }}>
          <Shield size={32} /> Emergency Hub
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>One-tap access for critical citizen safety and disaster response.</p>
        
        {/* Location Display */}
        <div style={{ marginTop: '24px', padding: '12px', background: '#f1f5f9', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1e293b', fontSize: '0.9rem', fontWeight: '700' }}>
          <MapPin size={18} color="#ef4444" /> 
          BROADCASTING LOCATION: 12.9716° N, 77.5946° E
          <div className="live-indicator" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            onMouseDown={() => setSosActive(true)}
            onMouseUp={() => !sosActive && setProgress(0)}
            style={{ 
              width: '240px', 
              height: '240px', 
              borderRadius: '50%', 
              background: '#ef4444', 
              boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Progress Overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${progress}%`, background: '#dc2626', transition: 'height 0.2s' }} />
            
            <div style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900' }}>{progress === 100 ? 'SENT' : 'SOS'}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{progress === 100 ? 'Help is coming' : 'Hold to Alert'}</div>
            </div>
          </div>
          {progress === 100 && (
             <button className="btn glass-button" style={{ marginTop: '24px' }} onClick={() => { setSosActive(false); setProgress(0); }}>
               Reset Emergency Mode
             </button>
          )}
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { tag: 'Ambulance', num: '108', color: '#ef4444', icon: Ambulance },
            { tag: 'Police', num: '100', color: '#3b82f6', icon: Shield },
            { tag: 'Fire Force', num: '101', color: '#f59e0b', icon: Flame },
            { tag: 'Women Help', num: '1091', color: '#ec4899', icon: Phone },
          ].map(c => (
            <div key={c.tag} className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `6px solid ${c.color}` }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ color: c.color }}><c.icon size={24} /></div>
                <strong>{c.tag}</strong>
              </div>
              <a href={`tel:${c.num}`} style={{ fontSize: '1.25rem', fontWeight: '800' }}>{c.num}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emergency;
