import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';
import { AppProvider, useAppContext } from '../context/AppContext';
import { Monitor, Languages, User as UserIcon, ShieldCheck } from 'lucide-react';

const TopHeader = () => {
  const { role, setRole, language, setLanguage, highContrast, setHighContrast } = useAppContext();

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
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          className="btn glass-button" 
          style={{ padding: '6px 12px', fontSize: '0.8rem', background: role === 'citizen' ? 'var(--primary-light)' : 'white' }}
          onClick={() => setRole('citizen')}
        >
          <UserIcon size={14} /> Citizen View
        </button>
        <button 
          className="btn glass-button" 
          style={{ padding: '6px 12px', fontSize: '0.8rem', background: role === 'admin' ? 'var(--primary-light)' : 'white' }}
          onClick={() => setRole('admin')}
        >
          <ShieldCheck size={14} /> Admin View
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn glass-button" style={{ padding: '6px', width: '32px' }} onClick={() => setHighContrast(!highContrast)} title="Accessibility">
            <Monitor size={16} />
          </button>
          <button className="btn glass-button" style={{ padding: '6px', width: '32px' }} onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} title="Language">
            <Languages size={16} />
          </button>
        </div>
        <div style={{ padding: '4px 12px', background: '#f1f5f9', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
          {language === 'en' ? 'English' : 'HINDI'}
        </div>
      </div>
    </header>
  );
};

const LayoutContent = () => {
  return (
    <div className="app-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <TopHeader />
        <main style={{ padding: '32px', background: 'var(--bg-color)', flex: 1 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
