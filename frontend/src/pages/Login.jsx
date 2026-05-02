import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="auth-container">
        <div className="glass-panel auth-card">
          <h2 className="text-center mb-1" style={{ fontSize: '2rem', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome Back
          </h2>
          <p className="text-center mb-4" style={{ color: 'var(--text-secondary)' }}>Sign in to continue to DermaScan</p>
          
          {error && <div className="error-message text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                className="form-control" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group mb-4">
              <label className="form-label" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                className="form-control" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
              {isLoading ? 'Signing in...' : <><LogIn size={18} style={{ marginRight: '8px' }} /> Sign In</>}
            </button>
          </form>

          <div className="text-center mt-4" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
