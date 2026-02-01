import React, { useState } from 'react';
import { Plus, MapPin, Image as ImageIcon, Filter, ChevronDown, Calendar, Hash } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const initialComplaints = [
  {
    displayId: 'TKT-2026-001',
    category: 'Pothole',
    location: 'Main Street, near Central Park',
    description: 'Large pothole causing traffic slowdown.',
    status: 'Pending',
    date: '2026-02-01',
    lastUpdate: '2 hours ago'
  },
  {
    displayId: 'TKT-2026-002',
    category: 'Streetlight',
    location: '5th Avenue & 2nd Cross',
    description: 'Streetlight flickering and going off at night.',
    status: 'In Progress',
    date: '2026-01-30',
    lastUpdate: '1 day ago'
  },
  {
    displayId: 'TKT-2026-003',
    category: 'Garbage',
    location: 'Market Road',
    description: 'Garbage not collected for 3 days.',
    status: 'Resolved',
    date: '2026-01-28',
    lastUpdate: '3 days ago'
  }
];

const StatusBadge = ({ status }) => {
  const getStyle = (s) => {
    switch (s) {
      case 'Pending': return { bg: '#fff7ed', color: '#c2410c', border: '#ffedd5' };
      case 'In Progress': return { bg: '#eff6ff', color: '#1d4ed8', border: '#dbeafe' };
      case 'Resolved': return { bg: '#ecfdf5', color: '#047857', border: '#d1fae5' };
      default: return { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
    }
  };
  const ui = getStyle(status);
  
  return (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      padding: '4px 12px', 
      borderRadius: '9999px', 
      background: ui.bg, 
      color: ui.color, 
      border: `1px solid ${ui.border}`,
      fontSize: '0.75rem', 
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }}>
      {status}
    </span>
  );
};

const Complaints = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ category: '', location: '', description: '' });
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newTicket = {
        displayId: `TKT-2026-00${complaints.length + 1}`,
        ...formData,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        lastUpdate: 'Just now'
      };
      setComplaints([newTicket, ...complaints]);
      setFormData({ category: '', location: '', description: '' });
      setShowForm(false);
      setLoading(false);
      toast.show.success('Complaint submitted successfully! Ticket ID generated.');
    }, 1000);
  };

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Civic Complaints</h1>
          <p>Manage and track your reported issues.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={18} style={{ marginRight: '8px' }} />
          New Ticket
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ padding: '32px', marginBottom: '32px', maxWidth: '800px' }}>
          <h3 style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>Submit New Complaint</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label>Issue Category</label>
                <select required 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Pothole">Values / Road Issue</option>
                  <option value="Garbage">Garbage / Sanitation</option>
                  <option value="Streetlight">Streetlight / Electricity</option>
                  <option value="Water">Water Leakage / Supply</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ position: 'relative' }}>
                <label>Location</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input required type="text" placeholder="Enter location" style={{ paddingLeft: '36px' }} 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label>Detailed Description</label>
              <textarea required placeholder="Describe the issue in detail..." rows="4" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div style={{ padding: '20px', border: '2px dashed var(--border-color)', borderRadius: '8px', textAlign: 'center', background: 'var(--bg-color)' }}>
               <ImageIcon size={24} color="var(--text-muted)" style={{ marginBottom: '8px' }} />
               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Drag and drop evidence photos here</p>
               <button type="button" className="btn glass-button" style={{ marginTop: '12px', fontSize: '0.8rem' }}>Browse Files</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" className="btn glass-button" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Professional Table Layout */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px', background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
          <button className="btn glass-button" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
            <Filter size={14} style={{ marginRight: '6px' }} /> Filter
          </button>
          <button className="btn glass-button" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
            Sort by Date <ChevronDown size={14} style={{ marginLeft: '4px' }} />
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.925rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Ticket ID</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Detail</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Location</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Status</th>
              <th style={{ textAlign: 'right', padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Action</th>
            </tr>
          </thead>
          <tbody>
             {complaints.map((item, idx) => (
               <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                 <td style={{ padding: '16px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                     <Hash size={14} color="var(--text-muted)" /> {item.displayId}
                   </div>
                 </td>
                 <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.category}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</div>
                 </td>
                 <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{item.location}</td>
                 <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <Calendar size={14} /> {item.date}
                   </div>
                 </td>
                 <td style={{ padding: '16px' }}><StatusBadge status={item.status} /></td>
                 <td style={{ padding: '16px', textAlign: 'right' }}>
                   <button className="btn glass-button" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>View</button>
                 </td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaints;
