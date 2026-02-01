import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CreditCard, Activity, ArrowRight, Bell } from 'lucide-react';

const DashboardStat = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="card" style={{ padding: '24px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px' }}>{title}</p>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>{value}</h3>
      </div>
      <div style={{ background: `${color}15`, padding: '10px', borderRadius: '8px', color: color }}>
        <Icon size={24} />
      </div>
    </div>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{subtext}</p>
  </div>
);

const QuickAction = ({ title, desc, to, color }) => (
  <Link to={to} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'transform 0.2s', borderLeft: `4px solid ${color}` }}>
    <div style={{ flex: 1 }}>
      <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{title}</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{desc}</p>
    </div>
    <ArrowRight size={18} color="var(--text-muted)" />
  </Link>
);

const Home = () => {
  return (
    <div>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Welcome back, Citizen</h1>
          <p style={{ marginTop: '8px' }}>Here's what's happening in your city today.</p>
        </div>
        <button className="btn glass-button" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>
          <Bell size={20} />
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid-auto-fit" style={{ marginBottom: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <DashboardStat 
          title="Active Complaints" 
          value="2" 
          subtext="1 Pending Review" 
          icon={FileText} 
          color="#ef4444" 
        />
        <DashboardStat 
          title="Due Bills" 
          value="$67.80" 
          subtext="Electricity & Water" 
          icon={CreditCard} 
          color="#f59e0b" 
        />
        <DashboardStat 
          title="City Events" 
          value="5" 
          subtext="Happening this week" 
          icon={Activity} 
          color="#3b82f6" 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        
        {/* Main Content Area */}
        <div>
          <h3 style={{ marginBottom: '16px' }}>Recent Activity</h3>
          <div className="card" style={{ overflow: 'hidden' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ 
                padding: '16px 24px', 
                borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 1 ? '#ef4444' : '#10b981' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-main)' }}>
                    {i === 1 ? 'New Complaint Reported: Pothole' : i === 2 ? 'Electricity Bill Paid' : 'Event Registration Confirmed'}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>2 hours ago</p>
                </div>
                <button className="btn glass-button" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>View</button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar / Quick Actions */}
        <div>
          <h3 style={{ marginBottom: '16px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <QuickAction title="Report Issue" desc="File a new complaint" to="/complaints" color="#ef4444" />
            <QuickAction title="Pay Bills" desc="Clear outstanding dues" to="/bills" color="#10b981" />
            <QuickAction title="Emergency SOS" desc="Get immediate help" to="/emergency" color="#ef4444" />
          </div>
        </div>

      </div>
      
      <style>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
