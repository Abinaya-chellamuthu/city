import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';

const Layout = () => {
  return (
    <ToastProvider>
      <div className="app-layout" style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ 
          marginLeft: '260px', 
          flex: 1, 
          padding: '32px', 
          background: 'var(--bg-color)',
          minHeight: '100vh'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
};

export default Layout;
