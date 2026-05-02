import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Scan from './pages/Scan';
import Profile from './pages/Profile';
import { Activity, LayoutDashboard, Camera, User } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/scan', label: 'Scan', icon: <Camera size={18} /> },
    { path: '/profile', label: 'Profile', icon: <User size={18} /> }
  ];

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
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
