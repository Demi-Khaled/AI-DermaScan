import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  // Mock data for UI demonstration
  const mockLesions = [
    { id: 1, name: 'Mole on Left Arm', date: '2026-05-01', risk: 'low', location: 'Left Arm' },
    { id: 2, name: 'Dark Spot Back', date: '2026-04-15', risk: 'high', location: 'Back' },
    { id: 3, name: 'Freckle near eye', date: '2026-03-20', risk: 'medium', location: 'Face' },
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'var(--success-color)';
      case 'medium': return 'var(--warning-color)';
      case 'high': return 'var(--danger-color)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Your Dashboard</h2>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '1rem' }}>
          <div><strong>Total Scans:</strong> 12</div>
          <div><strong>High Risk:</strong> <span style={{ color: 'var(--danger-color)' }}>1</span></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {mockLesions.map(lesion => (
          <div key={lesion.id} className="glass-panel" style={{ position: 'relative', overflow: 'hidden', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: getRiskColor(lesion.risk) }}></div>
            
            <h3 style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              {lesion.name}
              {lesion.risk === 'high' ? <AlertTriangle color="var(--danger-color)" size={20} /> : <CheckCircle color="var(--success-color)" size={20} />}
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Location: {lesion.location}
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Clock size={14} /> Last scanned: {lesion.date}
            </div>
            
            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-outline" style={{ width: '100%', padding: '0.5rem' }}>View History</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
