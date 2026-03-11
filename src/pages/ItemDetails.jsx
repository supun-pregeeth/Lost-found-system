import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS, getCategoryIcon, formatDate } from '../utils/helpers';
import './ItemDetails.css';

export const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contacted, setContacted] = useState(false);

  const item = MOCK_ITEMS.find(i => i.id === parseInt(id));
  const related = MOCK_ITEMS.filter(i => i.id !== item?.id && i.category === item?.category).slice(0, 3);

  if (!item) {
    return (
      <div className="page">
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🔍</div>
          <h2>Item not found</h2>
          <p style={{ color: 'var(--ink-40)', margin: '16px 0 32px' }}>This item may have been removed or resolved.</p>
          <Button variant="primary" onClick={() => navigate('/lost')}>Browse All Items</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="item-details-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to={`/${item.type}`}>{item.type === 'lost' ? 'Lost Items' : 'Found Items'}</Link>
            <span>›</span>
            <span>{item.title}</span>
          </nav>

          <div className="item-details-layout">
            {/* Left: Image & Gallery */}
            <div className="item-details-media">
              <div className="item-details-main-image">
                <div className="item-details-image-placeholder">
                  <span className="item-details-emoji">{getCategoryIcon(item.category)}</span>
                </div>
                <div className={`item-details-type-badge badge badge-${item.type}`}>
                  <span className="badge-dot" />
                  {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                </div>
                {item.urgent && <div className="item-details-urgent">⚡ Urgent</div>}
              </div>

              {/* Map placeholder */}
              <div className="item-details-map">
                <div className="item-details-map-inner">
                  <span>📍</span>
                  <div>
                    <strong>{item.location}</strong>
                    <p>View on map</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="item-details-info">
              <div className="item-details-header">
                <div className="item-details-meta">
                  <span className="item-details-category">{getCategoryIcon(item.category)} {item.category}</span>
                  <span className="item-details-date">{formatDate(item.date)}</span>
                </div>
                <h1 className="item-details-title">{item.title}</h1>
                {item.reward && (
                  <div className="item-details-reward">
                    🏆 <strong>{item.reward}</strong> reward offered
                  </div>
                )}
              </div>

              <div className="item-details-divider" />

              <div className="item-details-desc">
                <h3>Description</h3>
                <p>{item.description}</p>
              </div>

              <div className="item-details-divider" />

              <div className="item-details-facts">
                <div className="fact-row">
                  <span className="fact-label">📍 Last seen at</span>
                  <span className="fact-value">{item.location}</span>
                </div>
                <div className="fact-row">
                  <span className="fact-label">📅 Date</span>
                  <span className="fact-value">{formatDate(item.date)}</span>
                </div>
                <div className="fact-row">
                  <span className="fact-label">🏷 Category</span>
                  <span className="fact-value">{item.category}</span>
                </div>
                <div className="fact-row">
                  <span className="fact-label">👤 Reported by</span>
                  <span className="fact-value">{item.user?.name}</span>
                </div>
              </div>

              <div className="item-details-divider" />

              {/* Contact Card */}
              <div className="item-details-contact-card">
                <div className="contact-user">
                  <div className="contact-avatar">{item.user?.name?.[0]}</div>
                  <div>
                    <strong>{item.user?.name}</strong>
                    <p>Verified member</p>
                  </div>
                </div>

                {!contacted ? (
                  <div className="contact-actions">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 7.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 .5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.5a16 16 0 0 0 8.41 8.41l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/></svg>}
                      onClick={() => setContacted(true)}
                    >
                      Contact {item.user?.name?.split(' ')[0]}
                    </Button>
                    <Button variant="secondary" size="lg" fullWidth>
                      💬 Send a Message
                    </Button>
                  </div>
                ) : (
                  <div className="contact-success">
                    <div className="contact-success-icon">✅</div>
                    <strong>Request sent!</strong>
                    <p>You'll receive contact details once the owner verifies your identity.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Items */}
          {related.length > 0 && (
            <div className="item-details-related">
              <div className="section-header">
                <div>
                  <p className="section-eyebrow">Similar Items</p>
                  <h2 className="section-title">Related Reports</h2>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)' }}>
                {related.map(i => <ItemCard key={i.id} item={i} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
