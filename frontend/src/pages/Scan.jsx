import React, { useState } from 'react';
import { UploadCloud, Check, Zap } from 'lucide-react';

const Scan = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        risk: 'low',
        confidence: 94.2,
        recommendation: 'No immediate concern, but continue regular monitoring.'
      });
    }, 2500);
  };

  return (
    <div className="page-container animate-fade-in" style={{ alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>AI Skin Analysis</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Upload an image of your skin lesion for instant AI assessment.</p>
      </div>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem' }}>
        
        {!selectedFile ? (
          <div style={{ border: '2px dashed var(--surface-border)', borderRadius: '12px', padding: '3rem', width: '100%', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--surface-border)'}>
            <input type="file" id="file-upload" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <UploadCloud size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Click to upload</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SVG, PNG, JPG or GIF (max. 5MB)</p>
            </label>
          </div>
        ) : (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img src={selectedFile} alt="Selected lesion" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px', marginBottom: '1.5rem' }} />
            
            {!result && !isAnalyzing && (
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAnalyze}>
                <Zap size={18} style={{ marginRight: '8px' }} /> Analyze Image
              </button>
            )}

            {isAnalyzing && (
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="spinner" style={{ border: '4px solid rgba(255,255,255,0.1)', borderLeftColor: 'var(--primary-color)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', marginBottom: '1rem' }}></div>
                <p>AI is analyzing the image...</p>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {result && (
              <div className="animate-fade-in" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success-color)', borderRadius: '8px', padding: '1.5rem', textAlign: 'left', marginTop: '1rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success-color)', marginBottom: '1rem' }}>
                  <Check size={20} /> Analysis Complete
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Risk Level</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'capitalize', color: 'var(--success-color)' }}>{result.risk}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Confidence</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{result.confidence}%</p>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Recommendation</span>
                  <p>{result.recommendation}</p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button className="btn btn-primary" style={{ flex: 1 }}>Save to Dashboard</button>
                  <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => {setSelectedFile(null); setResult(null);}}>Scan Another</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;
