import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Scan from './pages/Scan';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Activity, LayoutDashboard, Camera, User, LogIn, UserPlus, LogOut } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = token ? [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/scan', label: 'Scan', icon: <Camera size={18} /> },
    { path: '/profile', label: 'Profile', icon: <User size={18} /> }
  ] : [];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand flex items-center gap-2">
        <Activity color="var(--primary-color)" /> DermaScan Web
      </Link>
      <div className="nav-links">
        {navItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-link flex items-center gap-2 ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        
        {/* Auth Links */}
        {!token ? (
          <>
            <Link to="/login" className="nav-link flex items-center gap-2">
              <LogIn size={18} /> Login
            </Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
              <UserPlus size={16} style={{ marginRight: '6px' }} /> Sign Up
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn btn-outline flex items-center gap-2" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', color: 'var(--danger-color)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
