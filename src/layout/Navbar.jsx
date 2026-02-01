import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, CreditCard, Ambulance, MessageSquare, Calendar, Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Complaints', path: '/complaints', icon: <FileText size={20} /> },
    { name: 'Bills', path: '/bills', icon: <CreditCard size={20} /> },
    { name: 'Emergency', path: '/emergency', icon: <Ambulance size={20} /> },
    { name: 'Chatbot', path: '/chatbot', icon: <MessageSquare size={20} /> },
    { name: 'Events', path: '/events', icon: <Calendar size={20} /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase size={20} /> },
  ];

  return (
    <nav className="glass-panel" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      marginBottom: 'var(--space-xl)',
      borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
      borderTop: 'none'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>C</div>
          <span style={{ color: 'var(--text-main)' }}>CityConnect</span>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                isActive ? 'btn glass-button active-nav' : 'btn glass-button'
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-muted)',
                gap: '0.5rem',
                border: isActive ? 'none' : '1px solid transparent'
              })}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle btn glass-button" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'none' /* Hidden by default, shown in media query */ }}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="glass-panel" style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          padding: '1rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.5rem' 
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="btn glass-button"
              style={{ justifyContent: 'flex-start', gap: '1rem' }}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
      
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
