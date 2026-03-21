import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

export const Navbar = () => {

  const { user, logout } = useAuth(); //it is for login and logout
  const navigate = useNavigate(); //we can navigate as we wish

  const [scrolled, setScrolled] = useState(false); // when we scroll, change navbar
  const [menuOpen, setMenuOpen] = useState(false); // To open/close menu on mobile (☰)
  const [dropdownOpen, setDropdownOpen] = useState(false); // To show/hide user dropdown
  
  const dropdownRef = useRef(null); //To detect click outside dropdown

  /* Close dropdown if clicked outside */
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  /* Navbar scroll effect */
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


        {/* Navigation links */}
        <nav className={`navbar-nav ${menuOpen ? 'navbar-nav-open' : ''}`}>

          {/* navlink knows which page is active */}
          <NavLink

           /* When we click the page, it becomes active and CSS changes */
            to="/lost"
            className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} //if true → you are on "/lost"
            onClick={() => setMenuOpen(false)}
          >
            Lost Items
          </NavLink>

          <NavLink
            to="/found"
            className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Found Items
          </NavLink>

          <button
            className="nav-link nav-link-cta"
            onClick={() => {
              setMenuOpen(false);

              const token = localStorage.getItem("token");
              if (token) {
                navigate("/report");
              } else {
                navigate("/register");
              }
            }}
          >
            + Report Item
          </button>

        </nav>


        {/* Auth section */}
        <div className="navbar-auth">

          {user ? (

            <div className="navbar-user" ref={dropdownRef}>

              {/* Avatar */}
              <div
                className="navbar-user-avatar"

                onClick={() => setDropdownOpen(!dropdownOpen)} //first click → open dropdown, second click → close dropdown
              >
                {user.name?.[0]} {/* user is an oblect. user.name ="john" */}
              </div>

              {/* Dropdown */}
              {dropdownOpen && (

                <div className="navbar-dropdown">

                  <div className="navbar-dropdown-name">
                    {user.name}
                  </div>

                  <button
                    className="navbar-dropdown-name"
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </button>

                  <button
                    className="navbar-dropdown-logout"
                    onClick={() => {

                      localStorage.removeItem("token"); //remove token from local storage
                      logout(); //update auth context
                      navigate("/login"); //navigate to login page
                    }
                  }
                  >
                    Sign out
                  </button>

                </div>

              )}

            </div>

          ) : (

            <div className="navbar-auth-links">

              <Link to="/login" className="navbar-auth-link">
                Sign in
              </Link>

              <Link to="/register" className="navbar-auth-btn">
                Join Free
              </Link>

            </div>

          )}

        </div>


        {/* Mobile menu button */}
        <button
          className="navbar-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >

          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />

        </button>

      </div>

    </header>

  );

};