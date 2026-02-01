import React, { useState } from 'react';
import { Plus, MapPin, Star, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAppContext } from '../context/AppContext';

const StatusBadge = ({ status, priority }) => {
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
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span style={{ padding: '4px 12px', borderRadius: '9999px', background: ui.bg, color: ui.color, border: `1px solid ${ui.border}`, fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>
        {status}
      </span>
      {priority === 'High' && (
        <span style={{ color: '#dc2626', background: '#fee2e2', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '800' }}>ESCALATED</span>
      )}
    </div>
  );
};

const Complaints = () => {
  const { role, complaints, addComplaint, updateComplaintStatus, rateComplaint, voteComplaint } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ category: '', location: '', description: '' });
  const [ratingTarget, setRatingTarget] = useState(null);
  const toast = useToast();

  const handleCitizenSubmit = (e) => {
    e.preventDefault();
    addComplaint(formData);
    setFormData({ category: '', location: '', description: '' });
    setShowForm(false);
    toast.show.success('Ticket logged on Public Ledger. Priority assigned via AI scoring.');
  };

  const handleAdminStatusUpdate = (id, curStatus) => {
    const nextStatus = curStatus === 'Pending' ? 'In Progress' : 'Resolved';
    updateComplaintStatus(id, nextStatus);
    toast.show.info(`Audit Log Updated: Resolution stage changed to ${nextStatus}`);
  };

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Civic Audit & Grievance 📋</h1>
          <p>{role.includes('admin') || role === 'ward_officer' ? 'Managing city-wide compliance and resolution.' : 'Report issues and verify community concerns.'}</p>
        </div>
        {role === 'citizen' && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={18} /> File Report
          </button>
        )}
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '32px', borderLeft: '4px solid var(--primary)' }}>
          <h3 style={{ marginBottom: '20px' }}>Immutable Complaint Entry</h3>
          <form onSubmit={handleCitizenSubmit} style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Department Category</label>
                <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="">Select Dept</option>
                  <option value="Roads">Municipal Roads</option>
                  <option value="Sanitation">Public Health & Sanitation</option>
                  <option value="Power">City Electricity Board</option>
                  <option value="Water">Hydraulic Department</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Geo-Tag (Address)</label>
                <input required type="text" placeholder="Auto-detecting location..." value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Detailed Evidence Description</label>
              <textarea required rows="3" placeholder="Explain the severity of the issue..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn btn-primary">Submit to Ledger</button>
              <button type="button" className="btn glass-button" onClick={() => setShowForm(false)}>Discard</button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '0.85rem' }}>Reference</th>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '0.85rem' }}>Audit Detail</th>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '0.85rem' }}>Status / Priority</th>
              <th style={{ textAlign: 'right', padding: '16px', fontSize: '0.85rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)', background: c.priority === 'High' ? 'rgba(239, 68, 68, 0.02)' : 'transparent' }}>
                <td style={{ padding: '16px' }}>
                   <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700' }}>WARD: {c.ward}</div>
                   <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>#{c.ticketId}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600' }}>{c.category}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.location}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <StatusBadge status={c.status} priority={c.priority} />
                  {c.priority === 'High' && (
                    <div style={{ fontSize: '0.6rem', color: '#dc2626', fontWeight: '800', marginTop: '4px', textTransform: 'uppercase' }}>
                       Escalated to Authority
                    </div>
                  )}
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  {role === 'citizen' ? (
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>{c.votes}</div>
                        <div style={{ fontSize: '0.6rem', color: '#64748b' }}>CONFIRMS</div>
                      </div>
                      <button className="btn glass-button" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => { voteComplaint(c.id); toast.show.success('Crowd-verification recorded.'); }}>
                        Verify
                      </button>
                      {c.status === 'Resolved' && !c.rating && (
                        <button className="btn glass-button" style={{ padding: '6px 12px', fontSize: '0.75rem', color: '#f59e0b' }} onClick={() => setRatingTarget(c.id)}>
                          Rate
                        </button>
                      )}
                    </div>
                  ) : (
                    <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => handleAdminStatusUpdate(c.id, c.status)}>
                      {c.status === 'Resolved' ? 'View Logs' : 'Process'}
                    </button>
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
            <p style={{ margin: '12px 0' }}>Ticket #{complaints.find(c=>c.id===ratingTarget)?.ticketId}</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
               {[1,2,3,4,5].map(s => (
                 <Star key={s} size={28} style={{ cursor: 'pointer' }} onClick={() => { rateComplaint(ratingTarget, s); setRatingTarget(null); toast.show.success('Feedback recorded.'); }} color="#f59e0b" />
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
