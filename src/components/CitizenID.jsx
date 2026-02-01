import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Shield, User, MapPin, QrCode } from 'lucide-react';

const CitizenID = () => {
  const { role } = useAppContext();
  
  if (role !== 'citizen') return null;

  return (
    <div className="card" style={{ 
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
      color: 'white', 
      borderRadius: '20px', 
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      {/* Glossy Overlay */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="flex-between" style={{ position: 'relative', zIndex: 1, marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={20} color="var(--primary)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px' }}>CITYCONNECT ID</span>
        </div>
        <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>ISSUED BY MUNICIPAL AUTHORITY</div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <User size={48} color="rgba(255,255,255,0.5)" />
        </div>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>John Doe</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '4px' }}>CC-UUID-9901-2026</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', opacity: 0.6, marginTop: '4px' }}>
            <MapPin size={10} /> Central District, Ward 4
          </div>
        </div>
      </div>

      <div className="flex-between" style={{ marginTop: '32px', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ fontSize: '0.6rem', opacity: 0.5, textTransform: 'uppercase' }}>Membership Level</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)' }}>GOLD CITIZEN</div>
        </div>
        <div style={{ background: 'white', padding: '4px', borderRadius: '4px' }}>
          <QrCode size={40} color="#0f172a" />
        </div>
      </div>
    </div>
  );
};

export default CitizenID;
