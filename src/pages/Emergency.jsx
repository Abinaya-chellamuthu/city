import React, { useState, useEffect } from 'react';
import { Phone, Ambulance, Shield, Flame, AlertTriangle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Emergency = () => {
  const [sosStatus, setSosStatus] = useState('idle'); // idle, holding, active
  const [holdProgress, setHoldProgress] = useState(0);
  const toast = useToast();

  useEffect(() => {
    let interval;
    if (sosStatus === 'holding') {
      interval = setInterval(() => {
        setHoldProgress(prev => {
          if (prev >= 100) {
            setSosStatus('active');
            toast.show.error('SOS Signal Sent to all nearby units. Share location enabled.', 5000);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    } else {
      setHoldProgress(0);
    }
    return () => clearInterval(interval);
  }, [sosStatus, toast.show]);

  const handleMouseDown = () => setSosStatus('holding');
  const handleMouseUp = () => setSosStatus(prev => prev === 'active' ? 'active' : 'idle');

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#ef4444', marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          <AlertTriangle size={32} /> Emergency Response Center
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          Press and hold the SOS button for 2 seconds to alert authorities.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
        
        {/* SOS Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            className="sos-button-wrapper"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            style={{ 
              position: 'relative', 
              width: '240px', 
              height: '240px', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            {/* Progress Ring */}
            <svg width="240" height="240" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
              <circle cx="120" cy="120" r="110" stroke="#fee2e2" strokeWidth="12" fill="none" />
              <circle 
                cx="120" cy="120" r="110" 
                stroke="#ef4444" 
                strokeWidth="12" 
                fill="none" 
                strokeDasharray="691"
                strokeDashoffset={691 - (691 * holdProgress) / 100}
                style={{ transition: 'stroke-dashoffset 0.05s linear' }}
              />
            </svg>
            
            {/* Inner Button */}
            <div style={{ 
              width: '180px', 
              height: '180px', 
              borderRadius: '50%', 
              background: sosStatus === 'active' ? '#10b981' : '#ef4444',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)',
              transform: sosStatus === 'holding' ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.2s',
              zIndex: 10
            }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                {sosStatus === 'active' ? 'SENT' : 'SOS'}
              </span>
              <span style={{ fontSize: '0.9rem', marginTop: '4px', opacity: 0.9 }}>
                {sosStatus === 'active' ? 'Help arriving' : 'Hold 2s'}
              </span>
            </div>
          </div>
          {sosStatus === 'active' && (
            <button className="btn" style={{ marginTop: '24px', background: '#334155', color: 'white' }} onClick={() => setSosStatus('idle')}>
              Cancel Alert
            </button>
          )}
        </div>

        {/* Contacts Grid */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { title: 'Medical (Ambulance)', num: '108', icon: Ambulance, color: '#ef4444' },
            { title: 'Police Control', num: '100', icon: Shield, color: '#3b82f6' },
            { title: 'Fire Dept', num: '101', icon: Flame, color: '#f97316' },
            { title: 'Disaster Helpline', num: '1077', icon: Phone, color: '#8b5cf6' }
          ].map((c) => (
            <div key={c.title} className="card" style={{ 
              padding: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              borderLeft: `4px solid ${c.color}`,
              cursor: 'pointer'
            }}
            onClick={() => toast.show.info(`Calling ${c.title}...`)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: `${c.color}15`, padding: '10px', borderRadius: '50%', color: c.color }}>
                  <c.icon size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>{c.title}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tap to call</span>
                </div>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>{c.num}</span>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Emergency;
