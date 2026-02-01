import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ToastProvider } from '../context/ToastContext';
import { AppProvider, useAppContext } from '../context/AppContext';
import { Monitor, Languages, User as UserIcon, ShieldCheck, Zap } from 'lucide-react';

const TopHeader = () => {
  const { role, language, setLanguage, highContrast, setHighContrast } = useAppContext();

  const getRoleLabel = () => {
    switch(role) {
      case 'super_admin': return { label: 'SUPER ADMIN • STRATEGIC COMMAND', color: '#1e293b', bg: '#e2e8f0' };
      case 'admin': return { label: 'DISTRICT ADMIN • OPERATIONS', color: '#2563eb', bg: '#eff6ff' };
      case 'ward_officer': return { label: 'WARD OFFICER • TACTICAL', color: '#059669', bg: '#ecfdf5' };
      default: return { label: 'VERIFIED CITIZEN • CC-9901', color: '#64748b', bg: '#f1f5f9' };
    }
  };

  const identity = getRoleLabel();

  return (
    <header style={{ 
      height: '64px', 
      background: 'white', 
      borderBottom: '1px solid var(--border-color)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
         <div style={{ 
           padding: '6px 16px', 
           background: identity.bg, 
           color: identity.color, 
           borderRadius: '4px', 
           fontSize: '0.75rem', 
           fontWeight: '800',
           letterSpacing: '0.5px'
         }}>
           {identity.label}
         </div>
         {role === 'super_admin' && (
           <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontSize: '0.7rem', fontWeight: 'bold' }}>
              <Zap size={14} fill="#ef4444" /> LIVE INTEL
           </div>
         )}
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {/* FEATURE 12: Offline Mode Sync Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#ecfdf5', borderRadius: '16px', border: '1px solid #d1fae5' }}>
           <div className="live-indicator" style={{ width: '8px', height: '8px', background: '#10b981' }} />
           <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#047857' }}>SYSTEM SYNCED (LOCAL CACHE ACTIVE)</span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn glass-button" style={{ padding: '6px', width: '32px' }} onClick={() => setHighContrast(!highContrast)} title="Accessibility">
            <Monitor size={16} />
          </button>
          <button className="btn glass-button" style={{ padding: '6px', width: '32px' }} onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} title="Language">
            <Languages size={16} />
          </button>
        </div>
        <div style={{ padding: '4px 12px', background: '#f1f5f9', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
          {language === 'en' ? 'EN' : 'HI'}
        </div>
      </div>
    </header>
  );
};

const LayoutContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return (
      <main style={{ width: '100%', minHeight: '100vh', background: '#f8fafc' }}>
        <Outlet />
      </main>
    );
  }

  return (
    <div className="app-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <TopHeader />
        <main style={{ padding: '32px', background: 'var(--bg-color)', flex: 1 }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <AppProvider>
      <ToastProvider>
        <LayoutContent />
      </ToastProvider>
    </AppProvider>
  );
};

export default Layout;
