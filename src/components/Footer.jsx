import { Link, useNavigate } from "react-router-dom";
import './Footer.css';

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-mark">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 16 L16 10 L22 16 L16 22 Z" fill="currentColor"/>
              </svg>
            </div>
            <span>FOUNDLY</span>
          </div>
          <p className="footer-tagline">Reuniting people with what matters most.</p>
          <p className="footer-copyright">© {new Date().getFullYear()} Foundly. All rights reserved.</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Platform</h4>
            <Link to="/lost">Lost Items</Link>
            <Link to="/found">Found Items</Link>
            {/* <Link to="/report">Report Item</Link> */}
            <button
  className="footer-link-btn"
  onClick={() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/report");
    } else {
      navigate("/register");
    }
  }}
>
  Report Item
</button>
          
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Create Account</Link>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>Made with care for communities everywhere.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
