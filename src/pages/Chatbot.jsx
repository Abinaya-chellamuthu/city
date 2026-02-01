import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, X } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am your CityConnect Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = ['Pay Electricity Bill', 'Report Pothole', 'Emergency Numbers', 'Upcoming Events'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const generateResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('bill') || lower.includes('pay')) return "You can view and pay your electricity, water, and tax bills in the 'Payments' section.";
    if (lower.includes('complain') || lower.includes('report') || lower.includes('pothole')) return "To report an issue like a pothole or garbage, go to 'Complaints'. You can upload photos there.";
    if (lower.includes('emergency') || lower.includes('police')) return "For emergencies, please visit the 'Emergency' page immediately or dial 112.";
    if (lower.includes('event')) return "Check out the 'Events' page for upcoming festivals and meetings.";
    return "I can help with Complaints, Bills, Emergency services, and Events. What do you need?";
  };

  const handleSend = (text) => {
    const msgText = text || input;
    if (!msgText.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: msgText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = { id: Date.now() + 1, sender: 'bot', text: generateResponse(msgText) };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc' }}>
          <div style={{ padding: '8px', background: 'var(--primary)', borderRadius: '50%', color: 'white' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>City Assistant AI</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#10b981' }}>
              <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></span>
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ 
              display: 'flex', 
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              {msg.sender === 'bot' && (
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #dbeafe' }}>
                  <Bot size={20} color="var(--primary)" />
                </div>
              )}
              <div style={{ 
                maxWidth: '70%', 
                padding: '12px 18px', 
                borderRadius: '16px',
                borderTopLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                background: msg.sender === 'user' ? 'var(--primary)' : '#f1f5f9',
                color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #dbeafe' }}>
                <Bot size={20} color="var(--primary)" />
              </div>
              <div style={{ padding: '16px', background: '#f1f5f9', borderRadius: '16px', borderTopLeftRadius: '4px', display: 'flex', gap: '6px' }}>
                <span className="dot" style={{ animationDelay: '0s' }}></span>
                <span className="dot" style={{ animationDelay: '0.2s' }}></span>
                <span className="dot" style={{ animationDelay: '0.4s' }}></span>
              </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: '#f8fafc' }}>
          
          {/* Quick Replies */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
            {quickReplies.map(reply => (
               <button key={reply} 
                 onClick={() => handleSend(reply)}
                 className="btn" 
                 style={{ 
                   background: 'white', 
                   border: '1px solid var(--border-color)', 
                   borderRadius: '20px', 
                   fontSize: '0.8rem', 
                   padding: '6px 16px',
                   color: 'var(--primary)'
                 }}
               >
                 {reply}
               </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ borderRadius: '24px', paddingLeft: '20px', boxShadow: 'none' }}
            />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '50%', width: '46px', height: '46px', padding: 0 }} disabled={!input && !isTyping}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .dot {
          width: 8px;
          height: 8px;
          background: #94a3b8;
          borderRadius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
