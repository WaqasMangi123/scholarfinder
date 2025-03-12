import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 
import { useLogout } from '../../hooks/useLogout'; // Import useLogout hook
import { useAuthContext } from '../../hooks/UseAuthContext';

const Navbar = () => {
  const { logout } = useLogout(); 
  const { user } = useAuthContext();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/logonew.jpeg" alt="Logo" className="logo" /> 
        </Link>
        <h2>          Hello {user.userName}!</h2>
        <div className="navbar-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/blog">Blog</Link>  {/* Blog link */}
          <Link to="/allscholorships">Scholarships</Link>  {/* Scholarships link */}
          <Link to="/tips">Tips</Link>  {/* Added Tips link */}
          <button 
            type="button" 
            onClick={logout} 
            className="btn btn-secondary" 
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
