import React from 'react';
import { Box, Map, Layers, Activity, MousePointer2 } from 'lucide-react';

const DigitalTwin = () => {
  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '24px' }}>
        <div>
          <h1>City Digital Twin 🏗️</h1>
          <p>Real-time 3D infrastructural visualization and preventive monitoring.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button className="btn glass-button"><Layers size={18} /> Layers</button>
           <button className="btn btn-primary"><Activity size={18} /> Live Flow</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, height: '600px', background: '#0f172a', position: 'relative', overflow: 'hidden', cursor: 'crosshair' }}>
         {/* Isometric Grid Background */}
         <div style={{ 
           width: '200%', 
           height: '200%', 
           position: 'absolute', 
           top: '-50%', 
           left: '-50%',
           background: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
           backgroundSize: '40px 40px',
           transform: 'perspective(1000px) rotateX(60deg) rotateZ(45deg)',
           opacity: 0.5
         }} />

         {/* Conceptual Buildings/Indicators */}
         <div style={{ 
           position: 'absolute', 
           top: '40%', 
           left: '50%', 
           transform: 'translate(-50%, -50%)',
           textAlign: 'center'
         }}>
           <div style={{ 
             width: '80px', height: '160px', background: 'rgba(99, 102, 241, 0.3)', border: '2px solid var(--primary)', 
             display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
             borderRadius: '4px', boxShadow: '0 0 30px var(--primary)'
           }}>
             <div style={{ fontSize: '0.7rem' }}>POWER HUB</div>
           </div>
           {/* Animated Pulses */}
           <div className="pulse-ring" style={{ width: '200px', height: '100px', borderRadius: '50%', border: '2px solid var(--primary)', position: 'absolute', top: '100px', left: '-60px' }} />
         </div>

         {/* Data Overlays */}
         <div style={{ position: 'absolute', bottom: '24px', left: '24px', color: 'white' }}>
            <div className="card" style={{ background: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.1)', color: 'white', width: '200px' }}>
               <h4 style={{ marginBottom: '8px', fontSize: '0.8rem' }}>Infrastructure Health</h4>
               <div style={{ display: 'flex', gap: '4px' }}>
                  {[1,2,3,4,5,6,7,8].map(i => <div key={i} style={{ flex: 1, height: '20px', background: i > 6 ? '#ef4444' : '#10b981' }} />)}
               </div>
               <p style={{ fontSize: '0.7rem', marginTop: '8px' }}>82% Operational • 2 Alerts</p>
            </div>
         </div>

         <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px', borderRadius: '8px', backdropFilter: 'blur(8px)', fontSize: '0.8rem' }}>
               <MousePointer2 size={14} style={{ marginRight: '8px' }} />
               Hover over district to inspect telemetry.
            </div>
         </div>
      </div>

      <style>{`
        .pulse-ring {
          animation: pulse-ring 4s cubic-bezier(0.24, 0, 0.38, 1) infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.5); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DigitalTwin;
