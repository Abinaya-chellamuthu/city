import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Chatbot = () => {
  const [msg, setMsg] = useState([{ id: 1, s: 'bot', t: 'Welcome to City Assistant! How can I help you today? I can guide you through complaints, payments, or city events.' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const toast = useToast();

  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [msg, busy]);

  const getBotReply = (t) => {
    const l = t.toLowerCase();
    if (l.includes('bill') || l.includes('pay')) return "To pay your utilities, navigate to the 'Payments' tab. We currently accept simulated payments for Electricity and Water.";
    if (l.includes('complain') || l.includes('issue')) return "You can file a new ticket in the 'Complaints' section. Make sure to upload a photo for faster resolution!";
    if (l.includes('emergency') || l.includes('police')) return "Go to the 'Emergency' hub immediately. You will find SOS and direct dialing there.";
    if (l.includes('event')) return "The 'Events' page lists all official city announcements and festivals.";
    if (l.includes('job')) return "Check out the 'Local Jobs' board for municipal contracts and volunteer roles.";
    return "I'm not sure about that. Try asking about 'Bills', 'Complaints', or 'Emergency services'.";
  };

  const handleSend = (text) => {
    const userText = text || input;
    if (!userText.trim()) return;
    setMsg(prev => [...prev, { id: Date.now(), s: 'user', t: userText }]);
    setInput('');
    setBusy(true);
    setTimeout(() => {
      setMsg(prev => [...prev, { id: Date.now()+1, s: 'bot', t: getBotReply(userText) }]);
      setBusy(false);
    }, 1000);
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        <div style={{ padding: '16px 24px', background: '#f8fafc', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '8px', borderRadius: '50%' }}><Bot size={20} /></div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>City Assistant Bot</h3>
            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Online & Ready</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {msg.map(m => (
            <div key={m.id} style={{ alignSelf: m.s === 'user' ? 'flex-end' : 'flex-start', display: 'flex', gap: '12px' }}>
              {m.s === 'bot' && <div style={{ background: '#f1f5f9', padding: '8px', borderRadius: '50%', alignSelf: 'flex-start' }}><Bot size={16} /></div>}
              <div style={{ 
                padding: '12px 16px', 
                borderRadius: '16px', 
                background: m.s === 'user' ? 'var(--primary)' : '#f1f5f9', 
                color: m.s === 'user' ? 'white' : 'inherit',
                maxWidth: '80%',
                fontSize: '0.95rem'
              }}>
                {m.t}
              </div>
            </div>
          ))}
          {busy && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Assistant is typing...</div>}
          <div ref={endRef} />
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: '#f8fafc' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
             {['How to complain?', 'Pay Water Bill', 'SOS Numbers'].map(chip => (
               <button key={chip} className="btn glass-button" style={{ borderRadius: '20px', fontSize: '0.75rem', padding: '4px 12px' }} onClick={() => handleSend(chip)}>{chip}</button>
             ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '12px' }}>
            <input placeholder="Ask me anything..." value={input} onChange={e => setInput(e.target.value)} style={{ borderRadius: '24px' }} />
            <button className="btn btn-primary" type="submit" style={{ width: '48px', height: '48px', borderRadius: '50%', padding: 0 }}><Send size={20} /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
