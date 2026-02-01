import React from 'react';
import { useAppContext } from '../context/AppContext';
import { FileText, CreditCard, Activity, Map, PieChart, Users, TrendingUp } from 'lucide-react';

const StatCard = ({ title, val, icon: Icon, color }) => (
  <div className="card" style={{ padding: '20px', borderLeft: `4px solid ${color}` }}>
    <div className="flex-between">
      <div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>{title}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '4px' }}>{val}</div>
      </div>
      <div style={{ color: color, background: `${color}15`, padding: '8px', borderRadius: '8px' }}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const Home = () => {
  const { role, complaints, events } = useAppContext();

  if (role === 'admin') {
    return (
      <div style={{ paddingBottom: '40px' }}>
        <h1 style={{ marginBottom: '24px' }}>City Authority Dashboard 🏛️</h1>
        
        <div className="grid-auto-fit" style={{ marginBottom: '32px' }}>
          <StatCard title="Total Complaints" val={complaints.length} icon={FileText} color="#2563eb" />
          <StatCard title="Pending Review" val={complaints.filter(c=>c.status==='Pending').length} icon={Activity} color="#f59e0b" />
          <StatCard title="Active Services" val="12" icon={Users} color="#10b981" />
          <StatCard title="Budget Used" val="64%" icon={TrendingUp} color="#ef4444" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Mock Map 🌍 */}
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Map size={18} color="var(--primary)" /> Issue Hotspots Map
            </h3>
            <div style={{ height: '300px', background: '#e2e8f0', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
              {/* Dummy Map Markers */}
              <div style={{ position: 'absolute', top: '20%', left: '30%', width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} title="Pothole" />
              <div style={{ position: 'absolute', top: '40%', left: '70%', width: '12px', height: '12px', background: '#f59e0b', borderRadius: '50%', border: '2px solid white' }} title="Sanitation" />
              <div style={{ position: 'absolute', top: '60%', left: '40%', width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} title="Water Leak" />
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #cbd5e1 25%, #94a3b8 25%, #94a3b8 50%, #cbd5e1 50%, #cbd5e1 75%, #94a3b8 75%)', backgroundSize: '40px 40px', opacity: 0.1 }} />
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>Live Map Data Feed</div>
            </div>
          </div>

          {/* Analytics Chart 📊 */}
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <PieChart size={18} color="#10b981" /> Resource Allocation
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
               {['Infrastructure', 'Sanitation', 'Public Welfare', 'Digital Services'].map((lab, i) => (
                 <div key={lab}>
                   <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                     <span>{lab}</span>
                     <span>{[35, 25, 20, 20][i]}%</span>
                   </div>
                   <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', marginTop: '4px' }}>
                     <div style={{ width: `${[35, 25, 20, 20][i]}%`, height: '100%', background: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'][i], borderRadius: '4px' }} />
                   </div>
                 </div>
               ))}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '24px' }}>
              * Data represents active budget distribution for the current fiscal quarter.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Citizen Dashboard
  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>My Connect Hub 🏠</h1>
      
      <div className="grid-auto-fit" style={{ marginBottom: '32px' }}>
        <div className="card" style={{ background: 'var(--primary)', color: 'white' }}>
          <h3>Citizen Profile</h3>
          <p style={{ opacity: 0.9, marginTop: '8px' }}>Name: John Doe</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
             <div style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.7rem' }}>COMPLAINTS</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{complaints.length}</div>
             </div>
             <div style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.7rem' }}>BILLS DUE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>3</div>
             </div>
          </div>
        </div>
        
        <div className="card">
          <h3>Quick Activity</h3>
          <div style={{ marginTop: '16px' }}>
            {complaints.slice(0, 2).map(c => (
              <div key={c.id} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
                <div className="flex-between">
                  <strong>#{c.ticketId}</strong>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: '#f1f5f9' }}>{c.status}</span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{c.category} updated recently.</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Live City Feed</h3>
        <p style={{ margin: '8px 0 20px', fontSize: '0.85rem' }}>Announcements verified by the Municipal Authority.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
           {events.map(e => (
             <div key={e.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} className="live-indicator" />
                <div>
                  <div style={{ fontWeight: '600' }}>{e.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{e.date} • {e.location}</div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
