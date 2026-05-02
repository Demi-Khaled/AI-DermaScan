import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, BrainCircuit } from 'lucide-react';

const Home = () => {
  return (
    <div className="page-container animate-fade-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        AI-Powered Skin Health
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '3rem' }}>
        Detect, track, and analyze skin lesions with advanced machine learning. Your personal dermatologist in your pocket, now on the web.
      </p>
      
      <div className="flex gap-4 mb-4" style={{ justifyContent: 'center' }}>
        <Link to="/scan" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Start a Scan Now
        </Link>
        <Link to="/dashboard" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          View Your Dashboard
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px', marginTop: '4rem' }}>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <BrainCircuit color="var(--primary-color)" size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>AI Analysis</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Instant risk assessment using state-of-the-art neural networks.</p>
        </div>
        
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <Activity color="var(--secondary-color)" size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Progress Tracking</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Monitor changes over time with detailed scan history.</p>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <ShieldCheck color="var(--success-color)" size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Secure & Private</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Your data is encrypted and stored safely on AWS.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
