import React, { useState } from 'react';
import { Plus, MapPin, Image as ImageIcon, Filter, ChevronDown, Calendar, Hash, Star, Edit3 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAppContext } from '../context/AppContext';

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
    <span style={{ padding: '4px 12px', borderRadius: '9999px', background: ui.bg, color: ui.color, border: `1px solid ${ui.border}`, fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
      {status}
    </span>
  );
};

const Complaints = () => {
  const { role, complaints, addComplaint, updateComplaintStatus, rateComplaint } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ category: '', location: '', description: '' });
  const [ratingTarget, setRatingTarget] = useState(null);
  const toast = useToast();

  const handleCitizenSubmit = (e) => {
    e.preventDefault();
    addComplaint(formData);
    setFormData({ category: '', location: '', description: '' });
    setShowForm(false);
    toast.show.success('Ticket submitted successfully! Authorities notified.');
  };

  const handleAdminStatusUpdate = (id, curStatus) => {
    const nextStatus = curStatus === 'Pending' ? 'In Progress' : 'Resolved';
    updateComplaintStatus(id, nextStatus);
    toast.show.info(`Ticket status updated to ${nextStatus}`);
  };

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Civic Tickets</h1>
          <p>{role === 'admin' ? 'Monitoring city-wide issues.' : 'Report and track your civic concerns.'}</p>
        </div>
        {role === 'citizen' && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={18} /> New Ticket
          </button>
        )}
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '32px', maxWidth: '800px' }}>
          <h3>Submit New Complaint</h3>
          <form onSubmit={handleCitizenSubmit} style={{ display: 'grid', gap: '20px', marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label>Category</label>
                <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="">Select Category</option>
                  <option value="Pothole">Roads / Pothole</option>
                  <option value="Garbage">Garbage / Sanitation</option>
                  <option value="Streetlight">Electricity / Streetlight</option>
                  <option value="Water">Water / Plumbing</option>
                </select>
              </div>
              <div>
                <label>Location</label>
                <input required type="text" placeholder="e.g. 5th Cross Road" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
            </div>
            <div>
              <label>Details</label>
              <textarea required rows="3" placeholder="Describe the issue..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn glass-button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '16px' }}>Ticket ID</th>
              <th style={{ textAlign: 'left', padding: '16px' }}>Detail</th>
              <th style={{ textAlign: 'left', padding: '16px' }}>Status</th>
              <th style={{ textAlign: 'right', padding: '16px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '16px' }}>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.date}</div>
                   <div style={{ fontWeight: '600' }}>#{c.ticketId}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600' }}>{c.category}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.location}</div>
                </td>
                <td style={{ padding: '16px' }}><StatusBadge status={c.status} /></td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  {role === 'admin' && c.status !== 'Resolved' ? (
                    <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleAdminStatusUpdate(c.id, c.status)}>
                      <Edit3 size={14} /> Update
                    </button>
                  ) : role === 'citizen' && c.status === 'Resolved' && !c.rating ? (
                    <button className="btn glass-button" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#f59e0b' }} onClick={() => setRatingTarget(c.id)}>
                      Rate Service
                    </button>
                  ) : c.rating > 0 ? (
                    <div style={{ display: 'flex', gap: '2px', justifyContent: 'flex-end' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} color={i < c.rating ? "#f59e0b" : "#e2e8f0"} fill={i < c.rating ? "#f59e0b" : "none"} />)}
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tracking...</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ratingTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '320px', textAlign: 'center' }}>
            <h3>Rate Resolution</h3>
            <p style={{ margin: '12px 0' }}>How satisfied are you with the resolution of Ticket #{complaints.find(c=>c.id===ratingTarget)?.ticketId}?</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
               {[1,2,3,4,5].map(s => (
                 <Star key={s} size={28} style={{ cursor: 'pointer' }} onClick={() => { rateComplaint(ratingTarget, s); setRatingTarget(null); toast.show.success('Thank you for your feedback!'); }} color="#f59e0b" />
               ))}
            </div>
            <button className="btn glass-button" onClick={() => setRatingTarget(null)}>Skip</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
