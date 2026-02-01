import React, { useState } from 'react';
import { Calendar, MapPin, Music, Mic, Heart, Flag, ArrowRight } from 'lucide-react';

const initialEvents = [
  { id: 1, title: 'Annual Food Festival', category: 'Festivals', date: 'Feb 15, 2026', location: 'City Square', desc: 'Taste dishes from over 50 local vendors.', icon: Music, color: '#ec4899' },
  { id: 2, title: 'Town Hall Meeting', category: 'Public', date: 'Feb 10, 2026', location: 'Civic Center Hall A', desc: 'Open discussion on new metro plans.', icon: Mic, color: '#3b82f6' },
  { id: 3, title: 'Free Health Checkup', category: 'Health', date: 'Feb 05, 2026', location: 'Community Hospital', desc: 'General physician and eye checkups.', icon: Heart, color: '#ef4444' },
  { id: 4, title: 'Independence Run', category: 'Sports', date: 'Mar 01, 2026', location: 'Riverfront Park', desc: '5k and 10k marathon for all ages.', icon: Flag, color: '#f59e0b' },
];

const Events = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Festivals', 'Public', 'Health', 'Sports'];

  const filteredEvents = filter === 'All' ? initialEvents : initialEvents.filter(e => e.category === filter);

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0 }}>City Events</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn ${filter === cat ? 'btn-primary' : 'glass-button'}`}
              style={{ fontSize: '0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-auto-fit">
        {filteredEvents.map(event => (
          <div key={event.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '120px', background: `${event.color}15`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: 'white', padding: '16px', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <event.icon size={32} color={event.color} />
              </div>
              <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                {event.category}
              </span>
            </div>
            
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px' }}>{event.date}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{event.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', flex: 1 }}>{event.desc}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
                <MapPin size={16} />
                {event.location}
              </div>

              <button className="btn glass-button" style={{ width: '100%', justifyContent: 'center' }}>
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
