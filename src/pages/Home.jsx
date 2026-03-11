import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { ItemCard } from '../components/ItemCard';
import { Button } from '../components/Button';
import { MOCK_ITEMS } from '../utils/helpers';
import './Home.css';

const STATS = [
  { value: '12,840', label: 'Items Recovered' },
  { value: '94%', label: 'Match Rate' },
  { value: '48h', label: 'Avg. Recovery Time' },
  { value: '200+', label: 'Cities Covered' },
];

export const Home = () => {
  const navigate = useNavigate();
  const recentItems = MOCK_ITEMS.slice(0, 3);
  const urgentItems = MOCK_ITEMS.filter(i => i.urgent).slice(0, 2);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-circle hero-bg-circle-1" />
          <div className="hero-bg-circle hero-bg-circle-2" />
          <div className="hero-bg-grid" />
        </div>

        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow animate-fade-up">
              <span className="badge badge-found"><span className="badge-dot" />Live Platform</span>
              <span className="hero-eyebrow-text">Trusted by 50,000+ users</span>
            </div>

            <h1 className="hero-title animate-fade-up-delay-1">
              Lost something<br />
              <em>precious?</em>
            </h1>

            <p className="hero-subtitle animate-fade-up-delay-2">
              Foundly connects people who've lost belongings with those who've found them.
              Join the community helping reunite the world with what matters most.
            </p>

            <div className="hero-search animate-fade-up-delay-3">
              <SearchBar
                large
                placeholder="Search for a lost wallet, phone, keys..."
                onSearch={(q) => navigate(`/lost?q=${q}`)}
              />
            </div>

            <div className="hero-actions animate-fade-up-delay-4">
              <Link to="/lost" className="hero-action-btn hero-action-lost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Browse Lost Items
              </Link>
              <Link to="/found" className="hero-action-btn hero-action-found">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                See Found Items
              </Link>
              <Link to="/report" className="hero-action-btn hero-action-report">
                + Report an Item
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-stack">
              {MOCK_ITEMS.slice(0, 3).map((item, i) => (
                <div key={item.id} className={`hero-card-preview hero-card-preview-${i}`}>
                  <span className={`badge badge-${item.type}`}>
                    <span className="badge-dot" />
                    {item.type}
                  </span>
                  <div className="hero-card-preview-emoji">{
                    item.category === 'wallet' ? '👜' :
                    item.category === 'electronics' ? '📱' :
                    item.category === 'jewelry' ? '💍' : '📦'
                  }</div>
                  <p className="hero-card-preview-title">{item.title}</p>
                  <p className="hero-card-preview-loc">📍 {item.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-inner">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Urgent Items */}
      {urgentItems.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">⚡ Urgent</p>
                <h2 className="section-title">Needs Your Help Now</h2>
              </div>
              <Link to="/lost?urgent=true" className="section-link">View all urgent →</Link>
            </div>
            <div className="urgent-grid">
              {urgentItems.map(item => (
                <ItemCard key={item.id} item={item} featured />
              ))}
              <div className="urgent-cta-card">
                <div className="urgent-cta-icon">🔍</div>
                <h3>Know something?</h3>
                <p>Every tip helps reunite people with their belongings.</p>
                <Button variant="primary" onClick={() => navigate('/report')}>Report a Found Item</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Items */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Recently Added</p>
              <h2 className="section-title">Latest Reports</h2>
            </div>
            <Link to="/lost" className="section-link">See all items →</Link>
          </div>
          <div className="items-grid">
            {recentItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works">
        <div className="container">
          <div className="section-center">
            <p className="section-eyebrow">Simple Process</p>
            <h2 className="section-title">How Foundly Works</h2>
            <p className="section-desc">Three steps to reunite you with what you've lost</p>
          </div>

          <div className="steps-grid">
            {[
              { n: '01', icon: '📝', title: 'Report', desc: 'Submit a detailed report of what you lost or found. Include photos, location, and any identifying features.' },
              { n: '02', icon: '🔗', title: 'Match', desc: 'Our smart matching system connects your report with others nearby. Get notified of potential matches instantly.' },
              { n: '03', icon: '🤝', title: 'Reunite', desc: 'Arrange a safe handover with the verified community member. Rate the experience to keep the platform trustworthy.' },
            ].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{step.n}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div className="cta-content">
            <p className="section-eyebrow" style={{color: 'var(--gold-light)'}}>Join the Community</p>
            <h2 className="cta-title">Found something? <em>Be a hero.</em></h2>
            <p className="cta-desc">Thousands of people are searching for their lost belongings. You could make someone's day.</p>
          </div>
          <div className="cta-actions">
            <Link to="/report" className="cta-btn-primary">Report Found Item</Link>
            <Link to="/register" className="cta-btn-secondary">Create Free Account</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
