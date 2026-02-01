import React, { useState } from 'react';
import { CreditCard, Zap, Droplets, Home as HomeIcon, Check, Loader, Download, TrendingUp } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const initialBills = [
  { id: 1, type: 'Electricity', provider: 'City Power Grid', amount: 45.50, dueDate: '2026-02-05', status: 'Pending', icon: Zap, color: '#eab308' },
  { id: 2, type: 'Water Supply', provider: 'Municipal Water', amount: 22.30, dueDate: '2026-02-10', status: 'Pending', icon: Droplets, color: '#3b82f6' },
  { id: 3, type: 'Property Tax', provider: 'City Council', amount: 150.00, dueDate: '2026-03-01', status: 'Pending', icon: HomeIcon, color: '#ef4444' },
  { id: 4, type: 'Internet', provider: 'FiberNet City', amount: 60.00, dueDate: '2026-01-25', status: 'Paid', icon: CreditCard, color: '#8b5cf6' },
  { id: 5, type: 'Electricity', provider: 'City Power Grid', amount: 42.10, dueDate: '2026-01-05', status: 'Paid', icon: Zap, color: '#eab308' },
];

const Bills = () => {
  const [bills, setBills] = useState(initialBills);
  const [processingId, setProcessingId] = useState(null);
  const toast = useToast();

  const handlePay = (id) => {
    setProcessingId(id);
    setTimeout(() => {
      setBills(bills.map(bill => 
        bill.id === id ? { ...bill, status: 'Paid' } : bill
      ));
      setProcessingId(null);
      toast.show.success('Payment processed successfully. Receipt emailed.');
    }, 2000);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Payments & Bills</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: '32px' }}>
        {/* Spending Analysis Card */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ margin: 0 }}>Spending Analysis</h3>
            <div style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600' }}>
              <TrendingUp size={14} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
              12% less than last month
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '16px' }}>
            {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((m, i) => (
              <div key={m} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ 
                  height: `${[40, 60, 55, 80, 45, 65][i]}%`, 
                  background: i === 5 ? 'var(--primary)' : '#e2e8f0', 
                  borderRadius: '4px',
                  marginBottom: '8px',
                  transition: 'height 1s ease'
                }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Outstanding Card */}
        <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--primary), #1e40af)', color: 'white' }}>
          <p style={{ opacity: 0.9, marginBottom: '8px' }}>Total Outstanding</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '24px', color: 'white' }}>$217.80</h2>
          <button className="btn" style={{ background: 'white', color: 'var(--primary)', width: '100%' }}>Pay All Bills</button>
        </div>
      </div>

      <div className="card">
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Bill History</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.925rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-secondary)' }}>Service</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-secondary)' }}>Amount</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-secondary)' }}>Due Date</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ textAlign: 'right', padding: '16px', color: 'var(--text-secondary)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', borderRadius: '8px', background: `${bill.color}15`, color: bill.color }}>
                      <bill.icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '500' }}>{bill.type}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{bill.provider}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px', fontWeight: '600' }}>${bill.amount.toFixed(2)}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{bill.dueDate}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem', 
                    fontWeight: '600',
                    background: bill.status === 'Paid' ? '#ecfdf5' : '#fff7ed',
                    color: bill.status === 'Paid' ? '#047857' : '#c2410c'
                  }}>
                    {bill.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  {bill.status === 'Pending' ? (
                    <button 
                      className="btn btn-primary" 
                      onClick={() => handlePay(bill.id)}
                      disabled={processingId === bill.id}
                      style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                    >
                      {processingId === bill.id ? <Loader className="spin" size={14} /> : 'Pay'}
                    </button>
                  ) : (
                    <button className="btn glass-button" style={{ padding: '6px 12px' }}>
                      <Download size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Bills;
