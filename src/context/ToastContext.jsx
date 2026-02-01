import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const show = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none',
      }}>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const icons = {
    success: <CheckCircle size={20} color="#10b981" />,
    error: <AlertCircle size={20} color="#ef4444" />,
    warning: <AlertTriangle size={20} color="#f59e0b" />,
    info: <Info size={20} color="#3b82f6" />,
  };

  const bgColors = {
    success: '#ecfdf5',
    error: '#fef2f2',
    warning: '#fffbeb',
    info: '#eff6ff',
  };

  const borderColors = {
    success: '#a7f3d0',
    error: '#fecaca',
    warning: '#fde68a',
    info: '#bfdbfe',
  };

  return (
    <div style={{
      pointerEvents: 'auto',
      background: 'white', // Using white for professional clean look
      border: `1px solid ${borderColors[toast.type]}`,
      borderLeft: `4px solid ${toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : toast.type === 'warning' ? '#f59e0b' : '#3b82f6'}`,
      borderRadius: '8px',
      padding: '16px',
      minWidth: '300px',
      maxWidth: '400px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      animation: 'slideIn 0.3s ease-out',
      color: '#1e293b'
    }}>
      <div style={{ marginTop: '2px' }}>{icons[toast.type]}</div>
      <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.4', flex: 1 }}>{toast.message}</p>
      <button 
        onClick={onClose}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: '#94a3b8' }}
      >
        <X size={16} />
      </button>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
