import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, CreditCard, Ambulance, MessageSquare, Calendar, Briefcase, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Complaints', path: '/complaints', icon: <FileText size={20} /> },
    { name: 'Payments', path: '/bills', icon: <CreditCard size={20} /> },
    { name: 'Emergency', path: '/emergency', icon: <Ambulance size={20} /> },
    { name: 'City Chatbot', path: '/chatbot', icon: <MessageSquare size={20} /> },
    { name: 'Events', path: '/events', icon: <Calendar size={20} /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase size={20} /> },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      background: 'var(--bg-sidebar)',
      color: 'var(--text-inverse)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      borderRight: '1px solid var(--border-color)',
      padding: '24px 0'
    }}>
      <div style={{ padding: '0 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>C</div>
        <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.5px' }}>CityConnect</span>
      </div>

      <nav style={{ flex: 1, padding: '0 12px', overflowY: 'auto' }}>
        <p style={{ padding: '0 12px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px' }}>Menu</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            >
              <span className="icon-wrapper">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      <div style={{ padding: '16px 24px', borderTop: '1px solid #1e293b' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          fontSize: '0.9rem',
          width: '100%',
          justifyContent: 'flex-start',
          padding: '8px 0'
        }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <style>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 6px;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.2s;
          font-weight: 500;
          font-size: 0.95rem;
        }
        .nav-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-item.active {
          background: var(--primary);
          color: white;
        }
        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
