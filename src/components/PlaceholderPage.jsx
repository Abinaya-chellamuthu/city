import React from 'react';

const PlaceholderPage = ({ title }) => (
  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
    <h1 style={{ marginBottom: '1rem' }}>{title}</h1>
    <p style={{ color: 'var(--text-muted)' }}>This feature is coming soon.</p>
  </div>
);

export default PlaceholderPage;
