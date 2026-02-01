import React, { useState } from 'react';
import { Calendar, MapPin, Plus, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

const Events = () => {
  const { role, events, addEvent } = useAppContext();
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'General', date: '', location: '' });
  const toast = useToast();

  const handlePostEvent = (e) => {
    e.preventDefault();
    addEvent(formData);
    setShowAdd(false);
    toast.show.success('City Announcement Published Successfully!');
  };

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>City Announcements</h1>
          <p>Official news, festivals, and community meetings.</p>
        </div>
        {role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            <Plus size={18} /> Post Event
          </button>
        )}
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: '32px' }}>
          <h3>Post New Official Announcement</h3>
          <form onSubmit={handlePostEvent} style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <input required placeholder="Announcement Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              <input required placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-primary" type="submit">Publish</button>
              <button className="btn glass-button" type="button" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid-auto-fit">
        {events.map(event => (
          <div key={event.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '4px solid var(--primary)' }}>
            <div className="flex-between">
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>{event.date}</span>
              {event.verified && (
                <div className="verified-badge">
                  <ShieldCheck size={12} /> VERIFIED
                </div>
              )}
            </div>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{event.title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <MapPin size={14} /> {event.location}
            </div>
            <button className="btn glass-button" style={{ marginTop: '12px', justifyContent: 'center' }}>Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
