import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name: 'John Doe', role: 'citizen', id: 'CC-9901' }
  const [role, setRole] = useState('citizen'); // 'citizen' | 'ward_officer' | 'admin' | 'super_admin'
  const [language, setLanguage] = useState('en');
  const [highContrast, setHighContrast] = useState(false);

  // Shared Data
  const [complaints, setComplaints] = useState([
    { id: 1, ticketId: 'TKT-2026-001', category: 'Pothole', location: 'Main St', desc: 'Large pothole', status: 'Pending', priority: 'High', date: '2026-02-01', rating: 0, votes: 12, ward: 'Ward 4' },
    { id: 2, ticketId: 'TKT-2026-002', category: 'Streetlight', location: '5th Ave', desc: 'Flickering light', status: 'In Progress', priority: 'Medium', date: '2026-01-30', rating: 0, votes: 5, ward: 'Ward 2' },
  ]);

  const [disasterAlerts, setDisasterAlerts] = useState([
    { id: 1, type: 'Heatwave', severity: 'Amber', message: 'Temperature expected to reach 42°C in the next 48 hours.', date: '2026-02-01' }
  ]);

  const [sustainability, setSustainability] = useState({
    wasteRecycled: 72,
    carbonSaved: 1240,
    greenZones: 15
  });

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
      priority: 'Low',
      date: new Date().toISOString().split('T')[0],
      rating: 0,
      votes: 0,
      ward: 'Ward ' + (Math.floor(Math.random()*10)+1)
    };
    setComplaints([newComplaint, ...complaints]);
    return newComplaint;
  };

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    addNotification(`Complaint ${id} status updated to ${newStatus}`);
  };

  const voteComplaint = (id) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, votes: c.votes + 1 } : c));
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
