import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { CATEGORIES, LOCATIONS } from '../utils/helpers';
import './ReportItem.css';

export const ReportItem = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('lost');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '', category: '', location: '', date: '', description: '', reward: '', contact: '',
  });

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    navigate(type === 'lost' ? '/lost' : '/found');
  };

  return (
    <div className="page">
      <div className="report-page">
        <div className="container report-container">
          {/* Header */}
          <div className="report-header">
            <p className="section-eyebrow">Submit a Report</p>
            <h1 className="report-title">Report an Item</h1>
            <p className="report-subtitle">Fill in the details below to help us find a match.</p>
          </div>

          {/* Type Toggle */}
          <div className="report-type-toggle">
            <button
              className={`type-btn ${type === 'lost' ? 'type-btn-lost-active' : ''}`}
              onClick={() => setType('lost')}
            >
              <span className="type-btn-icon">🔍</span>
              <div>
                <strong>I Lost Something</strong>
                <p>Report an item you've lost</p>
              </div>
            </button>
            <button
              className={`type-btn ${type === 'found' ? 'type-btn-found-active' : ''}`}
              onClick={() => setType('found')}
            >
              <span className="type-btn-icon">✅</span>
              <div>
                <strong>I Found Something</strong>
                <p>Report an item you've found</p>
              </div>
            </button>
          </div>

          {/* Progress */}
          <div className="report-progress">
            {[1, 2, 3].map(s => (
              <div key={s} className={`progress-step ${step === s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
                <div className="progress-dot">{step > s ? '✓' : s}</div>
                <span>{s === 1 ? 'Item Details' : s === 2 ? 'Location & Date' : 'Contact Info'}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="report-form-card">
            {step === 1 && (
              <div className="report-step animate-fade-up">
                <h2 className="step-form-title">Describe the Item</h2>

                <div className="form-group">
                  <label className="form-label">Item Title <span className="required">*</span></label>
                  <input
                    className="form-input"
                    placeholder="e.g. Black leather wallet, iPhone 14 Pro..."
                    value={form.title}
                    onChange={e => update('title', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category <span className="required">*</span></label>
                  <div className="form-category-grid">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        className={`form-category-chip ${form.category === cat ? 'form-category-chip-active' : ''}`}
                        onClick={() => update('category', cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description <span className="required">*</span></label>
                  <textarea
                    className="form-textarea"
                    placeholder="Describe the item in detail — color, brand, size, any identifying marks or features..."
                    rows={4}
                    value={form.description}
                    onChange={e => update('description', e.target.value)}
                  />
                  <span className="form-hint">{form.description.length}/500 characters</span>
                </div>

                {type === 'lost' && (
                  <div className="form-group">
                    <label className="form-label">Reward Offered (optional)</label>
                    <div className="form-input-prefix">
                      <span>$</span>
                      <input
                        className="form-input-inner"
                        placeholder="0"
                        type="number"
                        value={form.reward}
                        onChange={e => update('reward', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <Button variant="primary" size="lg" onClick={() => setStep(2)} disabled={!form.title || !form.category || !form.description}>
                  Continue →
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="report-step animate-fade-up">
                <h2 className="step-form-title">Where & When</h2>

                <div className="form-group">
                  <label className="form-label">Location <span className="required">*</span></label>
                  <select className="form-select" value={form.location} onChange={e => update('location', e.target.value)}>
                    <option value="">Select a location...</option>
                    {LOCATIONS.map(loc => <option key={loc}>{loc}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Exact Address / Landmark (optional)</label>
                  <input
                    className="form-input"
                    placeholder="e.g. Near the main entrance, bench by the fountain..."
                    value={form.address || ''}
                    onChange={e => update('address', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date <span className="required">*</span></label>
                  <input
                    className="form-input"
                    type="date"
                    value={form.date}
                    onChange={e => update('date', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-row">
                  <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
                  <Button variant="primary" size="lg" onClick={() => setStep(3)} disabled={!form.location || !form.date}>
                    Continue →
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="report-step animate-fade-up">
                <h2 className="step-form-title">How to Reach You</h2>
                <p className="step-form-desc">Your contact info will only be shared with verified matches.</p>

                <div className="form-group">
                  <label className="form-label">Email Address <span className="required">*</span></label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="you@example.com"
                    value={form.contact}
                    onChange={e => update('contact', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number (optional)</label>
                  <input
                    className="form-input"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Summary */}
                <div className="report-summary">
                  <h3>Report Summary</h3>
                  <div className="summary-rows">
                    <div className="summary-row"><span>Type</span><strong className={type === 'lost' ? 'summary-lost' : 'summary-found'}>{type === 'lost' ? '🔍 Lost' : '✅ Found'}</strong></div>
                    <div className="summary-row"><span>Item</span><strong>{form.title}</strong></div>
                    <div className="summary-row"><span>Category</span><strong>{form.category}</strong></div>
                    <div className="summary-row"><span>Location</span><strong>{form.location}</strong></div>
                    <div className="summary-row"><span>Date</span><strong>{form.date}</strong></div>
                    {form.reward && <div className="summary-row"><span>Reward</span><strong className="summary-reward">${form.reward}</strong></div>}
                  </div>
                </div>

                <div className="form-row">
                  <Button variant="secondary" onClick={() => setStep(2)}>← Back</Button>
                  <Button variant="primary" size="lg" loading={loading} onClick={handleSubmit} disabled={!form.contact}>
                    Submit Report
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
