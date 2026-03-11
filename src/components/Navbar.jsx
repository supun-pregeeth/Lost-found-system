import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-mark">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 16 L16 10 L22 16 L16 22 Z" fill="currentColor"/>
            </svg>
          </div>
          <span className="navbar-logo-text">FOUNDLY</span>
        </Link>

        {/* Nav links */}
        <nav className={`navbar-nav ${menuOpen ? 'navbar-nav-open' : ''}`}>
          <NavLink to="/lost" className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={() => setMenuOpen(false)}>
            Lost Items
          </NavLink>
          <NavLink to="/found" className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={() => setMenuOpen(false)}>
            Found Items
          </NavLink>
          <NavLink to="/report" className={({isActive}) => `nav-link nav-link-cta ${isActive ? 'nav-link-active' : ''}`} onClick={() => setMenuOpen(false)}>
            + Report Item
          </NavLink>
        </nav>

        {/* Auth */}
        <div className="navbar-auth">
          {user ? (
            <div className="navbar-user">
              <div className="navbar-user-avatar">{user.name?.[0]}</div>
              <div className="navbar-dropdown">
                <div className="navbar-dropdown-name">{user.name}</div>
                <button className="navbar-dropdown-logout" onClick={() => { logout(); navigate('/'); }}>
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-auth-links">
              <Link to="/login" className="navbar-auth-link">Sign in</Link>
              <Link to="/register" className="navbar-auth-btn">Join Free</Link>
            </div>
          )}
        </div>

        {/* Burger */}
        <button className="navbar-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>
    </header>
  );
};
