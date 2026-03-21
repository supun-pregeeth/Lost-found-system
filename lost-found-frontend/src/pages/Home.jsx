import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { ItemCard } from '../components/ItemCard';
import { Button } from '../components/Button';
import { MOCK_ITEMS } from '../utils/helpers';
import './Home.css';

import wallet from '../assets/wallet.png';
import iphone from '../assets/iphone.png';
import jewelry from '../assets/jew.png';

/* Image mapping (cleaner approach) */
const CATEGORY_IMAGES = {
  wallet: wallet,
  electronics: iphone,
  jewelry: jewelry
};

const STATS = [
  { value: '12,840', label: 'Items Recovered' },
  { value: '94%', label: 'Match Rate' },
  { value: '48h', label: 'Avg. Recovery Time' },
  { value: '200+', label: 'Cities Covered' },
];

export const Home = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const urgentItems = MOCK_ITEMS.filter(i => i.urgent).slice(0, 2);
  const recentItems = MOCK_ITEMS.slice(3, 6);

  /* Search handler with login check */
  const handleSearch = (q) => {

  const token = localStorage.getItem("token");

  console.log("Token:", token);

  if (token) {
    navigate(`/lost?q=${q}`);
  } 
  else {
    navigate("/register");
  }
  };

  return (

    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-bg">
          <div className="hero-bg-circle hero-bg-circle-1" />
          <div className="hero-bg-circle hero-bg-circle-2" />
          <div className="hero-bg-grid" />
        </div>

        <div className="container hero-inner">

          <div className="hero-content">

            <div className="hero-eyebrow animate-fade-up">
              <span className="badge badge-found">
                <span className="badge-dot" />
                Live Platform
              </span>

              <span className="hero-eyebrow-text">
                Trusted by 50,000+ users
              </span>
            </div>

            <h1 className="hero-title animate-fade-up-delay-1">
              Lost something <br />
              <em>precious?</em>
            </h1>

            <p className="hero-subtitle animate-fade-up-delay-2">
              Foundly connects people who've lost belongings with those who've found them.
              Join the community helping reunite the world with what matters most.
            </p>

            {/* SEARCH BAR */}
            <div className="hero-search animate-fade-up-delay-3">

              <SearchBar
                large
                placeholder="Search for a lost wallet, phone, keys..."
                onSearch={handleSearch}
              />

            </div>

            {/* HERO ACTION BUTTONS */}
            <div className="hero-actions animate-fade-up-delay-4">

              <Link to="/lost" className="hero-action-btn hero-action-lost">
                Browse Lost Items
              </Link>

              <Link to="/found" className="hero-action-btn hero-action-found">
                See Found Items
              </Link>

              <button
  className="hero-action-btn hero-action-report"
  onClick={() => {
    if (token) {
      navigate('/report');
    } else {
      navigate('/register');
    }
  }}
>
  + Report an Item
</button>

            </div>

          </div>

          {/* HERO ITEM PREVIEW */}
          <div className="hero-visual">

            <div className="hero-card-stack">

              {MOCK_ITEMS.slice(0, 3).map((item, i) => (

                <div
                  key={item.id}
                  className={`hero-card-preview hero-card-preview-${i}`}
                >

                  <span className={`badge badge-${item.type}`}>
                    <span className="badge-dot" />
                    {item.type}
                  </span>

                  <div className="hero-card-preview-image">

                    <img
                      src={CATEGORY_IMAGES[item.category] || wallet}
                      alt={item.category}
                    />

                  </div>

                  <p className="hero-card-preview-title">
                    {item.title}
                  </p>

                  <p className="hero-card-preview-loc">
                    📍 {item.location}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* STATS BAR */}   
      <section className="stats-bar">

        <div className="container stats-inner">

          {STATS.map((stat, i) => (

            <div key={i} className="stat-item">

              <div className="stat-value">
                {stat.value}
              </div>

              <div className="stat-label">
                {stat.label}
              </div>

            </div>   

          ))}

        </div>

      </section>


      {/* URGENT ITEMS */}
      {urgentItems.length > 0 && (

        <section className="section">

          <div className="container">

            <div className="section-header">

              <div>

                <p className="section-eyebrow">⚡ Urgent</p>

                <h2 className="section-title">
                  Needs Your Help Now
                </h2>

              </div>

              <Link to="/lost?urgent=true" className="section-link">
                View all urgent →
              </Link>

            </div>

            <div className="urgent-grid">

              {urgentItems.map(item => (
                <ItemCard key={item.id} item={item} featured />
              ))}

              <div className="urgent-cta-card">

                <div className="urgent-cta-icon">🔍</div>

                <h3>Know something?</h3>

                <p>
                  Every tip helps reunite people with their belongings.
                </p>

                <Button
                  variant="primary"
                  onClick={() => navigate('/report')}
                >
                  Report a Found Item
                </Button>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* RECENT ITEMS */}
      <section className="section section-alt">

        <div className="container">

          <div className="section-header">

            <div>

              <p className="section-eyebrow">
                Recently Added
              </p>

              <h2 className="section-title">
                Latest Reports
              </h2>

            </div>

            <Link to="/lost" className="section-link">
              See all items →
            </Link>

          </div>

          <div className="items-grid">

            {recentItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}

          </div>

        </div>

      </section>

    </div>

  );
};