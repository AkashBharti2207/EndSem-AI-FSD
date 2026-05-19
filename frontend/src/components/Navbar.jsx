import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">SmartComplaints</Link>
      <div className="nav-links">
        {token ? (
          <>
            <span>Welcome, {user?.name || 'User'}</span>
            <Link to="/" className="btn btn-primary" style={{padding: '0.5rem 1rem'}}>Dashboard</Link>
            <button onClick={handleLogout} className="btn" style={{backgroundColor: 'transparent', color: 'var(--text-muted)'}}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn" style={{color: 'var(--text-main)'}}>Login</Link>
            <Link to="/signup" className="btn btn-primary" style={{padding: '0.5rem 1rem'}}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
