import React, { useState } from 'react';
import { Briefcase, MapPin, Search, Filter, Hammer, Users as Volunteers, Building } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Jobs = () => {
  const [cat, setCat] = useState('All');
  const [applied, setApplied] = useState([]);
  const toast = useToast();

  const allJobs = [
    { id: 101, title: 'Road Maintenance Crew', org: 'Municipal Works', type: 'Contract', tag: 'Municipal', icon: Hammer },
    { id: 102, title: 'Green Park Volunteer', org: 'City Parks', type: 'Volunteer', tag: 'Social', icon: Volunteers },
    { id: 103, title: 'Traffic Assistant', org: 'Police Dept', type: 'Part-time', tag: 'Municipal', icon: Building },
    { id: 104, title: 'Old Age Home Helper', org: 'Hope NGO', type: 'Volunteer', tag: 'Social', icon: Volunteers },
  ];

  const filtered = cat === 'All' ? allJobs : allJobs.filter(j => j.tag === cat);

  const handleApply = (title) => {
    setApplied([...applied, title]);
    toast.show.success(`Application sent for ${title}. We will contact you soon.`);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Local Opportunities 💼</h1>
      
      <div className="flex-between" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Municipal', 'Social'].map(f => (
            <button key={f} className={`btn ${cat === f ? 'btn-primary' : 'glass-button'}`} style={{ padding: '6px 16px', fontSize: '0.85rem' }} onClick={() => setCat(f)}>{f}</button>
          ))}
        </div>
        <div style={{ position: 'relative', width: '240px' }}>
           <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
           <input placeholder="Search jobs..." style={{ paddingLeft: '36px' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.map(j => (
          <div key={j.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '12px', color: 'var(--primary)' }}><j.icon size={32} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: j.tag === 'Municipal' ? '#3b82f6' : '#10b981', textTransform: 'uppercase' }}>{j.tag}</div>
              <h3 style={{ margin: '4px 0' }}>{j.title}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{j.org} • {j.type}</div>
            </div>
            {applied.includes(j.title) ? (
              <span style={{ color: '#10b981', fontWeight: '700' }}>✓ APPLIED</span>
            ) : (
              <button className="btn btn-primary" onClick={() => handleApply(j.title)}>
                {j.tag === 'Social' ? 'Join Now' : 'View & Apply'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
