import React, { useState, useEffect } from 'react';
import { Phone, Ambulance, Shield, Flame, AlertTriangle, MapPin, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Emergency = () => {
  const [sosActive, setSosActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  useEffect(() => {
    let timer;
    if (sosActive && progress < 100) {
      timer = setInterval(() => setProgress(p => p + 10), 200);
    } else if (progress === 100) {
      toast.show.error('EMERGENCY DISPATCHED. GPS coordinates 12.9716, 77.5946 sent to police and nearest hospital.', 6000);
    }
    return () => clearInterval(timer);
  }, [sosActive, progress]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ textAlign: 'center', background: '#fee2e2', borderColor: '#fecaca', marginBottom: '40px' }}>
        <h2 style={{ color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <AlertTriangle /> Critical Emergency Response
        </h2>
        <p style={{ color: '#991b1b', marginTop: '8px' }}>Press and hold the SOS button or use one-tap dialing below.</p>
        
        {/* Location Display */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#b91c1c', fontSize: '0.85rem', fontWeight: '700' }}>
          <MapPin size={16} /> 
          CURRENT GPS: 12.9716° N, 77.5946° E (Central District)
          <div className="live-indicator" style={{ background: '#dc2626' }} />
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
