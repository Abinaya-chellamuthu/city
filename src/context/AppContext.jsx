import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState('citizen'); // 'citizen' | 'admin'
  const [language, setLanguage] = useState('en');
  const [highContrast, setHighContrast] = useState(false);

  // Shared Data
  const [complaints, setComplaints] = useState([
    { id: 1, ticketId: 'TKT-2026-001', category: 'Pothole', location: 'Main St', desc: 'Large pothole', status: 'Pending', date: '2026-02-01', rating: 0 },
    { id: 2, ticketId: 'TKT-2026-002', category: 'Streetlight', location: '5th Ave', desc: 'Flickering light', status: 'In Progress', date: '2026-01-30', rating: 0 },
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: 'Annual Food Festival', category: 'Festivals', date: 'Feb 15, 2026', location: 'City Square', verified: true },
    { id: 2, title: 'Town Hall Meeting', category: 'Public', date: 'Feb 10, 2026', location: 'Civic Center', verified: true },
  ]);

  const [notifications, setNotifications] = useState([]);

  // Actions
  const addComplaint = (data) => {
    const newComplaint = {
      id: Date.now(),
      ticketId: `TKT-2026-0${complaints.length + 1}`,
      ...data,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      rating: 0
    };
    setComplaints([newComplaint, ...complaints]);
    return newComplaint;
  };

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    addNotification(`Complaint ${id} status updated to ${newStatus}`);
  };

  const addEvent = (data) => {
    setEvents([{ id: Date.now(), ...data, verified: true }, ...events]);
  };

  const addNotification = (msg) => {
    setNotifications([{ id: Date.now(), msg, read: false }, ...notifications]);
  };

  const rateComplaint = (id, rating) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, rating } : c));
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      language, setLanguage,
      highContrast, setHighContrast,
      complaints, addComplaint, updateComplaintStatus, rateComplaint,
      events, addEvent,
      notifications, addNotification
    }}>
      <div className={highContrast ? 'accessibility-high-contrast' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};
