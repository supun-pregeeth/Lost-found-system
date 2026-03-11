import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

export const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1400));
    login({ name: form.name, email: form.email, id: Date.now() });
    navigate('/');
  };

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="page">
      <div className="auth-page auth-page-register">
        <div className="auth-panel">
          <div className="auth-brand">
            <div className="auth-brand-logo">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 16 L16 10 L22 16 L16 22 Z" fill="currentColor"/>
              </svg>
            </div>
            <span>FOUNDLY</span>
          </div>

          <div className="auth-header">
            <h1 className="auth-title">Create an account</h1>
            <p className="auth-subtitle">Join thousands helping each other every day</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name <span style={{ color: 'var(--lost)' }}>*</span></label>
              <input className="form-input" placeholder="Full Name" value={form.name} onChange={e => update('name', e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address <span style={{ color: 'var(--lost)' }}>*</span></label>
              <input className="form-input" type="email" placeholder="Email Address" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Password <span style={{ color: 'var(--lost)' }}>*</span></label>
              <input className="form-input" type="password" placeholder="Password" value={form.password} onChange={e => update('password', e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password <span style={{ color: 'var(--lost)' }}>*</span></label>
              <input className="form-input" type="password" placeholder="Confirm Password" value={form.confirm} onChange={e => update('confirm', e.target.value)} />
            </div>

            <div className="auth-terms">
              <input type="checkbox" id="terms" style={{ accentColor: 'var(--gold)' }} />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <Button variant="primary" size="lg" fullWidth loading={loading} onClick={handleSubmit}>
              Create Account
            </Button>
          </div>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>

        <div className="auth-visual">
          <div className="auth-visual-content">
            <h2>Be part of something<br /><em>meaningful.</em></h2>
            <ul className="auth-visual-benefits">
              <li><span>✓</span> Free forever</li>
              <li><span>✓</span> Instant notifications</li>
              <li><span>✓</span> Secure & private</li>
              <li><span>✓</span> 200+ cities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
