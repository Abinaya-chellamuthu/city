import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const initialJobs = [
  { id: 1, title: 'Park Maintenance Staff', org: 'City Parks Dept', type: 'Full-time', pay: '$15/hr', location: 'Central District', applied: false },
  { id: 2, title: 'Road Safety Volunteer', org: 'Traffic Police', type: 'Volunteer', pay: 'Unpaid', location: 'West Zone', applied: false },
  { id: 3, title: 'Teaching Assistant', org: 'Govt School No. 4', type: 'Part-time', pay: '$18/hr', location: 'North Avenue', applied: false },
  { id: 4, title: 'Sanitation Supervisor', org: 'City Sanitation', type: 'Contract', pay: '$20/hr', location: 'East Sector', applied: false },
];

const Jobs = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const toast = useToast();

  const handleApply = (id) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, applied: true } : job
    ));
    toast.show.success('Application submitted successfully!');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '8px' }}>Local Opportunities</h1>
      <p style={{ marginBottom: '32px', maxWidth: '600px' }}>
        Find employment and volunteering opportunities within your community. Partnered with local government bodies and official NGOs.
      </p>

      <div style={{ display: 'grid', gap: '16px' }}>
        {jobs.map(job => (
          <div key={job.id} className="card" style={{ 
            padding: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px',
            transition: 'transform 0.2s',
          }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '8px', 
              background: '#f1f5f9', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}>
              <Briefcase size={28} />
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{job.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{job.org}</p>
              
              <div style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {job.location}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {job.type}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: 'var(--text-main)' }}><DollarSign size={16} /> {job.pay}</span>
              </div>
            </div>

            <div>
              {job.applied ? (
                <button className="btn" disabled style={{ background: '#ecfdf5', color: '#047857', cursor: 'default', padding: '8px 20px' }}>
                  <CheckCircle size={18} style={{ marginRight: '8px' }} /> Applied
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => handleApply(job.id)} style={{ padding: '10px 24px' }}>
                  Apply Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
