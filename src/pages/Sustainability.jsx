import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Recycle, Leaf, CloudRain, Wind, TrendingUp } from 'lucide-react';

const Sustainability = () => {
  const { sustainability } = useAppContext();

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Environmental Impact 🌿</h1>
      <p style={{ marginBottom: '32px', color: 'var(--text-secondary)' }}>Monitoring our city's sustainability goals and carbon neutrality progress.</p>

      <div className="grid-auto-fit" style={{ marginBottom: '40px' }}>
        <div className="card" style={{ borderTop: '4px solid #10b981' }}>
          <div className="flex-between">
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Waste Recycled</div>
              <div style={{ fontSize: '2rem', fontWeight: '800' }}>{sustainability.wasteRecycled}%</div>
            </div>
            <Recycle size={40} color="#10b981" />
          </div>
          <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', marginTop: '16px' }}>
             <div style={{ width: '72%', height: '100%', background: '#10b981', borderRadius: '4px' }} />
          </div>
          <p style={{ fontSize: '0.75rem', marginTop: '12px', color: '#10b981' }}>↑ 4% from last quarter</p>
        </div>

        <div className="card" style={{ borderTop: '4px solid #3b82f6' }}>
          <div className="flex-between">
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Carbon Offset</div>
              <div style={{ fontSize: '2rem', fontWeight: '800' }}>{sustainability.carbonSaved}t</div>
            </div>
            <Leaf size={40} color="#3b82f6" />
          </div>
          <p style={{ fontSize: '0.85rem', marginTop: '12px' }}>Equivalent to planting 15,400 trees.</p>
        </div>

        <div className="card" style={{ borderTop: '4px solid #f59e0b' }}>
          <div className="flex-between">
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Air Quality Index</div>
              <div style={{ fontSize: '2rem', fontWeight: '800' }}>Good (42)</div>
            </div>
            <Wind size={40} color="#f59e0b" />
          </div>
          <p style={{ fontSize: '0.85rem', marginTop: '12px' }}>Updated 5 mins ago.</p>
        </div>
      </div>

      <div className="card">
        <h3>Live Sustainability Feed</h3>
        <div style={{ marginTop: '24px', display: 'grid', gap: '16px' }}>
           {[
             { t: 'Solar Grid Expansion', d: 'Added 500kW to Ward 7 Govt Buildings.', i: CloudRain },
             { t: 'Cleanliness Drive Success', d: 'Collected 2.4 tons of plastic from the Riverfront.', i: Recycle },
             { t: 'AQI Warning System', d: 'Sensors installed across Industrial Zones.', i: Wind }
           ].map((item, idx) => (
             <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingBottom: '16px', borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ background: 'var(--primary-light)', padding: '10px', borderRadius: '8px', color: 'var(--primary)' }}><item.i size={20} /></div>
                <div>
                  <div style={{ fontWeight: '600' }}>{item.t}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.d}</div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
