import React, { useState } from 'react';
import { CreditCard, Zap, Droplets, Home, TrendingDown, CheckCircle, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Bills = () => {
  const [bills, setBills] = useState([
    { id: 1, type: 'Electricity', amount: 45.20, dueDate: '2026-02-15', status: 'Pending', icon: Zap, color: '#eab308' },
    { id: 2, type: 'Water', amount: 12.60, dueDate: '2026-02-10', status: 'Pending', icon: Droplets, color: '#3b82f6' },
    { id: 3, type: 'Property Tax', amount: 120.00, dueDate: '2026-03-01', status: 'Pending', icon: Home, color: '#ef4444' },
  ]);
  const [paying, setPaying] = useState(null);
  const toast = useToast();

  const handlePay = (id) => {
    setPaying(id);
    setTimeout(() => {
      setBills(prev => prev.map(b => b.id === id ? { ...b, status: 'Paid' } : b));
      setPaying(null);
      toast.show.success('Payment Received! Token: #CC-'+Math.floor(Math.random()*90000+10000));
    }, 1500);
  };

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '24px' }}>
        <h1>Utility Payments</h1>
        <div className="card" style={{ padding: '8px 16px', background: '#ecfdf5', borderColor: '#d1fae5', color: '#047857', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} /> Secure Payment Gateway (Simulated)
        </div>
      </div>

      <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '12px 20px', borderRadius: '8px', color: '#92400e', fontSize: '0.85rem', marginBottom: '32px' }}>
        <strong>Hackathon Disclaimer:</strong> All financial transactions are currently simulated for demonstration. No real money will be charged.
      </div>

      <div className="grid-auto-fit">
        {bills.map(bill => (
          <div key={bill.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="flex-between">
              <div style={{ background: `${bill.color}15`, padding: '10px', borderRadius: '12px', color: bill.color }}>
                <bill.icon size={24} />
              </div>
              {bill.status === 'Paid' ? (
                <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                   <CheckCircle size={14} /> PAID
                </div>
              ) : (
                <div style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: '700' }}>PENDING</div>
              )}
            </div>

            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{bill.type} Bill</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800' }}>${bill.amount.toFixed(2)}</div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Due: {bill.dueDate}</div>
              {bill.status === 'Pending' && (
                <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.85rem' }} onClick={() => handlePay(bill.id)} disabled={paying === bill.id}>
                  {paying === bill.id ? 'Processing...' : 'Pay Now'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Hook for Demo 📊 */}
      <div className="card" style={{ marginTop: '32px' }}>
        <h3>Payment History & Trends</h3>
        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'flex-end', height: '120px', gap: '12px' }}>
           {[30, 45, 25, 60, 40, 50].map((h, i) => (
             <div key={i} style={{ flex: 1, background: 'var(--primary-light)', height: `${h}%`, borderRadius: '4px' }} />
           ))}
        </div>
        <div className="flex-between" style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
        </div>
      </div>
    </div>
  );
};

export default Bills;
