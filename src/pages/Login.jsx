import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Shield, Smartphone, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const { setRole } = useAppContext();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('citizen');
  const toast = useToast();

  const handleLogin = () => {
    if (step === 1) {
      if (phone.length < 10) return toast.show.error('Please enter a valid identifier.');
      setStep(2);
      toast.show.success('OTP sent to your registered device.');
    } else {
      setRole(selectedRole);
      // Actual navigation happens because shared state 'role' changes and layout reacts (conceptual)
      window.location.href = '/'; 
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '24px'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '40px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'var(--primary)', 
            borderRadius: '16px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white',
            marginBottom: '16px'
          }}>
            <Shield size={32} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>CityConnect</h2>
          <p style={{ color: '#64748b', marginTop: '8px' }}>Unified Civic Operating System</p>
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          {step === 1 ? (
            <>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Select Role for Demo</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {['citizen', 'ward_officer', 'admin', 'super_admin'].map(r => (
                    <button 
                      key={r} 
                      className="btn glass-button" 
                      onClick={() => setSelectedRole(r)}
                      style={{ 
                        fontSize: '0.75rem', 
                        padding: '8px', 
                        background: selectedRole === r ? 'var(--primary-light)' : 'white',
                        borderColor: selectedRole === r ? 'var(--primary)' : 'var(--border-color)'
                      }}
                    >
                      {r.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Citizen ID / Phone</label>
                <div style={{ position: 'relative' }}>
                  <Smartphone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="text" 
                    placeholder="Enter UID or Mobile" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Verification Code</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[1,2,3,4].map(i => (
                  <input key={i} type="text" maxLength="1" style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }} defaultValue={i+1} />
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '12px' }}>Didn't receive code? <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Resend</span></p>
            </div>
          )}

          <button className="btn btn-primary" onClick={handleLogin} style={{ width: '100%', height: '48px', justifyContent: 'center' }}>
            {step === 1 ? 'Login with OTP' : 'Verify & Enter'} <ArrowRight size={18} />
          </button>

          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '-8px' }}>
               <button className="btn glass-button" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ShieldCheck size={14} /> FaceID
               </button>
               <button className="btn glass-button" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ShieldCheck size={14} /> Biometric
               </button>
            </div>
          )}
          
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
            <ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Secured by Municipal Encryption Standards
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
