import { useAppContext } from '../context/AppContext';
import { FileText, CreditCard, Activity, Map, PieChart, Users, TrendingUp, ShieldCheck, AlertTriangle, Star, Shield, Zap } from 'lucide-react';
import CitizenID from '../components/CitizenID';

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
  const { role, complaints, events, disasterAlerts } = useAppContext();

  // 1. SUPER ADMIN VIEW (Strategic)
  if (role === 'super_admin') {
    return (
      <div style={{ paddingBottom: '40px' }}>
        <h1 style={{ marginBottom: '8px' }}>City Intelligence Command 🏙️</h1>
        <p style={{ marginBottom: '32px' }}>Strategic city-level overview for Super Administrator.</p>
        
        {/* FEATURE 16: City Performance Index */}
        <div className="card" style={{ background: 'var(--primary)', color: 'white', marginBottom: '32px', display: 'flex', gap: '32px', alignItems: 'center' }}>
           <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '8px' }}>CITY REPUTATION INDEX</h2>
              <div style={{ fontSize: '3rem', fontWeight: '900' }}>8.4<span style={{ fontSize: '1rem', opacity: 0.7 }}>/10</span></div>
              <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                Overall performance across Safety, Sanitation, and Digital Governance.
              </p>
           </div>
           <div style={{ width: '1px', height: '100px', background: 'rgba(255,255,255,0.2)' }} />
           <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                 <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>SERVICE SPEED</div>
                 <div style={{ fontWeight: 'bold' }}>92% Excellent</div>
              </div>
              <div>
                 <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>CITIZEN TRUST</div>
                 <div style={{ fontWeight: 'bold' }}>88% Stable</div>
              </div>
              <div>
                 <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>INNOVATION</div>
                 <div style={{ fontWeight: 'bold' }}>Top 5 Cities</div>
              </div>
              <div>
                 <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>SUSTAINABILITY</div>
                 <div style={{ fontWeight: 'bold' }}>Level A+</div>
              </div>
           </div>
        </div>

        <div className="grid-auto-fit" style={{ marginBottom: '32px' }}>
          <StatCard title="City Stability Index" val="94.2%" icon={ShieldCheck} color="#059669" />
          <StatCard title="Smart Infrastructure" val="Live" icon={Activity} color="#2563eb" />
          <StatCard title="Budget Efficiency" val="+12%" icon={TrendingUp} color="#059669" />
          <StatCard title="Active Population" val="4.2M" icon={Users} color="#8b5cf6" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
          <div className="card">
             <h3 style={{ marginBottom: '20px' }}>Inter-Ward Performance</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {['Ward 1 (Green Park)', 'Ward 2 (Downtown)', 'Ward 3 (Industrial)', 'Ward 4 (Suburbs)'].map((w, i) => (
                   <div key={w}>
                      <div className="flex-between" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                         <strong>{w}</strong>
                         <span>Resolution Rate: {92 - i*5}%</span>
                      </div>
                      <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px' }}>
                         <div style={{ width: `${92-i*5}%`, height: '100%', background: 'var(--primary)', borderRadius: '5px' }} />
                      </div>
                   </div>
                ))}
             </div>
          </div>
          <div className="card" style={{ background: '#fef2f2', borderColor: '#fee2e2' }}>
             <h3 style={{ color: '#991b1b', marginBottom: '16px' }}>Critical Alerts</h3>
             {disasterAlerts.map(a => (
               <div key={a.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <AlertTriangle color="#dc2626" size={24} />
                  <div>
                    <strong style={{ color: '#991b1b' }}>{a.type} Caution</strong>
                    <div style={{ fontSize: '0.85rem', color: '#b91c1c' }}>{a.message}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. ADMIN VIEW (Operational)
  if (role === 'admin') {
    return (
      <div style={{ paddingBottom: '40px' }}>
        <h1 style={{ marginBottom: '8px' }}>Operational Dashboard 🏛️</h1>
        <p style={{ marginBottom: '24px' }}>Managing city-wide services and department performance.</p>
        
        <div className="grid-auto-fit" style={{ marginBottom: '32px' }}>
          <StatCard title="Total Complaints" val={complaints.length} icon={FileText} color="#2563eb" />
          <StatCard title="Avg Resolution" val="4.2 Hrs" icon={Activity} color="#10b981" />
          <StatCard title="Staff Active" val="84%" icon={Users} color="#8b5cf6" />
          <StatCard title="Critical Pending" val={complaints.filter(c=>c.priority==='High' && c.status==='Pending').length} icon={AlertTriangle} color="#ef4444" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="card">
            <h3>Issue Hotspots Map</h3>
            <div style={{ height: '300px', background: '#e2e8f0', borderRadius: '8px', position: 'relative', overflow: 'hidden', marginTop: '16px' }}>
              <div style={{ position: 'absolute', top: '20%', left: '30%', width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />
              <div style={{ position: 'absolute', top: '40%', left: '70%', width: '12px', height: '12px', background: '#f59e0b', borderRadius: '50%', border: '2px solid white' }} />
              <div style={{ width: '100%', height: '100%', opacity: 0.1, background: 'repeating-linear-gradient(45deg, #000, #000 10px, #fff 10px, #fff 20px)' }} />
            </div>
          </div>
          <div className="card">
             <h3>Resource Allocation</h3>
             <div style={{ marginTop: '24px', display: 'grid', gap: '20px' }}>
                {['Infra', 'Sanitation', 'Public Welfare'].map((l, i) => (
                  <div key={l}>
                    <div className="flex-between" style={{ fontSize: '0.8rem' }}><span>{l}</span><span>{[40, 30, 30][i]}%</span></div>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', marginTop: '4px' }}>
                       <div style={{ width: `${[40, 30, 30][i]}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px' }} />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. WARD OFFICER VIEW (Tactical)
  if (role === 'ward_officer') {
    return (
      <div>
        <h1 style={{ marginBottom: '8px' }}>Ward Control Panel 🏘️</h1>
        <p style={{ marginBottom: '32px' }}>Localized task management for Ward 4.</p>
        <div className="grid-auto-fit" style={{ marginBottom: '32px' }}>
           <StatCard title="Assigned Tickets" val={complaints.length} icon={FileText} color="#2563eb" />
           <StatCard title="Resolved Today" val="3" icon={ShieldCheck} color="#059669" />
           <StatCard title="Pending Field Visits" val="2" icon={Map} color="#f59e0b" />
        </div>
        <div className="card">
           <h3>Daily Task List</h3>
           <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
              {complaints.filter(c => c.status !== 'Resolved').map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '6px' }}>
                   <div>
                      <strong>{c.ticketId} - {c.category}</strong>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{c.location}</div>
                   </div>
                   <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>View Detail</button>
                </div>
              ))}
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
        <CitizenID />
        
        <div className="card" style={{ background: 'var(--primary)', color: 'white', display: 'none' }}>
           {/* Legacy Profile Card Hidden */}
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

        {/* FEATURE 13: Reminders & Calendar */}
        <div className="card">
          <h3>Upcoming Reminders 📅</h3>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <div style={{ padding: '10px', background: '#fff7ed', borderLeft: '4px solid #f59e0b', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Electricity Bill Due</div>
                <div style={{ fontSize: '0.75rem', color: '#9a3412' }}>Deadline: Feb 15 (3 days left)</div>
             </div>
             <div style={{ padding: '10px', background: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Town Hall Webinar</div>
                <div style={{ fontSize: '0.75rem', color: '#1e40af' }}>Starts at 6:00 PM, Today</div>
             </div>
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
