import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MOCK_ITEMS, getCategoryIcon, formatDate, timeAgo } from '../utils/helpers';
import { Button } from '../components/Button';
import { getMyReports, getMatches, getMessages, getStats } from "../api/dashboardApi";
import './Dashboard.css';

/* const STATS = [
  { label: 'Active Reports', value: '3', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, change: '+1 this week' },
  { label: 'Potential Matches', value: '2', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, change: '1 new today', accent: true },
  { label: 'Messages', value: '1', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, change: '1 unread', unread: true },
  { label: 'Items Resolved', value: '1', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="20 6 9 17 4 12"/></svg>, change: 'All time', success: true },
];
 */
const STATUS_MAP = {
  active:   { label: 'Active',   cls: 'ds-status-active'   },
  matched:  { label: 'Matched',  cls: 'ds-status-matched'  },
  resolved: { label: 'Resolved', cls: 'ds-status-resolved' },
};

export const Dashboard = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reports');
  const [reportFilter, setReportFilter] = useState('all');
  const [dismissedMatches, setDismissedMatches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState([]);


//why we use this one - need to run code automatically when component loads, and also we need to fetch data from backend when component loads, so useEffect is the best place to do that. 
//fetch data from backend
useEffect(() => {
  console.log("Fetching dashboard...");
  const fetchData = async () => {
    try {
      const [r, m, msg, s] = await Promise.all([ // run all 4 requests at the same time, and wait for all of them to finish
        getMyReports(),
        getMatches(),
        getMessages(),
        getStats(),
      ]);

      setReports(r.data || []);
      setMatches(m.data || []);
      setMessages(msg.data || []);
      setStats([
  { label: "Reports", value: s.data.totalReports || 0 },
  { label: "Lost", value: s.data.lost || 0 },
  { label: "Found", value: s.data.found || 0 },
]);

    } catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false); // ✅ ALWAYS runs
    }
  };

  fetchData();
}, []); //[] run only once

 if (!user) {
    return (
      <div className="page">
        <div className="container ds-gate">
          <h2 className="ds-gate-title">Sign in to view your dashboard</h2>
          <p>Track your reports, matches, and messages in one place.</p>
          <div className="ds-gate-btns">
            <Button variant="primary" onClick={() => navigate('/login')}>Sign In</Button>
            <Button variant="secondary" onClick={() => navigate('/register')}>Create Account</Button>
          </div>
        </div>
      </div>
    );
  }

//matching logic - for demo purposes, we are just taking the matches from the backend and transforming them into the format we need for the UI. In a real app, this would be more complex and would involve some logic to determine which matches to show, how to calculate confidence, etc.
const transformedMatches = matches.map(item => ({
  id: item.id,
  myItem: {
    title: "Your Item",
    type: "lost",
  },
  matchItem: item,
  confidence: item.confidence || 80,
  isNew: true,
}));

//Keep only the matches-Remove matches that the user already clicked
const visibleMatches = transformedMatches.filter(
  m => !dismissedMatches.includes(m.id)
);
  
//report is like array. get all through map function.
const filteredReports = reports.map(item => ({
  ...item,
  status: item.status || "active",
  views: item.views || 0,
})).filter(r =>
  reportFilter === 'all' || r.type?.toLowerCase() === reportFilter
);

//regarding message
const transformedMessages = messages.map(msg => ({
  id: msg.id,
  from: msg.senderEmail,
  item: "Item",
  preview: msg.content,
  time: "now",
  unread: msg.unread,
}));

  return (
    <div className="page ds-page">

      {/* ── Top bar ── */}
      {/* <div className="ds-topbar">
        <div className="container ds-topbar-inner">
          <div className="ds-greeting">
            <div className="ds-avatar-lg">{user.name?.[0]?.toUpperCase()}</div>
            <div>
              <p className="ds-hey">Good to see you,</p>
              <h1 className="ds-name">{user.name}</h1>
            </div>
          </div>
        </div>
      </div> */}

      {/* ── Stats row ── */}
      <div className="ds-stats-band">
        <div className="container ds-stats-row">
          {stats.map(s => (
            <div key={s.label} className={`ds-stat ${s.accent ? 'ds-stat-accent' : ''} ${s.success ? 'ds-stat-success' : ''} ${s.unread ? 'ds-stat-unread' : ''}`}>
              <div className="ds-stat-icon">{s.icon}</div>
              <div className="ds-stat-body">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
              <p className="ds-stat-change">{s.change}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container ds-layout">

        {/* Left — main panel */}
        <main className="ds-main">

          {/* Tabs */}
          <div className="ds-tabs">
            {[
              { id: 'reports',  label: 'My Reports',  badge: reports.length },
              { id: 'matches',  label: 'Matches',     badge: visibleMatches.filter(m => m.isNew).length, highlight: true },
              { id: 'messages', label: 'Messages',    badge: messages.filter(m => m.unread).length },
            ].map(t => (
              <button
                key={t.id}
                className={`ds-tab ${activeTab === t.id ? 'ds-tab-active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
                {t.badge > 0 && (
                  <span className={`ds-tab-badge ${t.highlight ? 'ds-tab-badge-hi' : ''}`}>{t.badge}</span>
                )}
              </button>
            ))}
          </div>

          {/* ── REPORTS ── */}
          {activeTab === 'reports' && (
            <div className="ds-panel fade-up-1">
              <div className="ds-panel-head">
                <p className="ds-panel-title">Your reports</p>
                <div className="ds-filter-pills">
                  {['all','lost','found'].map(f => (
                    <button key={f} className={`ds-pill ${reportFilter === f ? 'ds-pill-on' : ''}`} onClick={() => setReportFilter(f)}>
                      {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ds-report-list">
                {filteredReports.map(item => {
                  const st = STATUS_MAP[item.status];
                  return (
                    <Link key={item.id} to={`/items/${item.id}`} className="ds-report-row">
                      <div className="ds-report-icon">{getCategoryIcon(item.category)}</div>
                      <div className="ds-report-info">
                        <div className="ds-report-top">
                          <span className="ds-report-title">{item.title}</span>
                          <span className={`ds-status ${st.cls}`}>{st.label}</span>
                        </div>
                        <div className="ds-report-meta">
                          <span className={`chip chip-${item.type}`}><span className="chip-dot"/>{item.type}</span>
                          <span className="ds-report-loc">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 1a5 5 0 0 1 5 5c0 4-5 9-5 9S3 10 3 6a5 5 0 0 1 5-5z"/><circle cx="8" cy="6" r="2"/></svg>
                            {item.location}
                          </span>
                          <span className="ds-report-date">{formatDate(item.date)}</span>
                        </div>
                      </div>
                      <div className="ds-report-views">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        {item.views}
                      </div>
                      <svg className="ds-report-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 4l4 4-4 4"/></svg>
                    </Link>
                  );
                })}
              </div>

              <div className="ds-panel-foot">
                <Link to="/report" className="ds-foot-cta">+ Add new report</Link>
              </div>
            </div>
          )}

          {/* ── MATCHES ── */}
          {activeTab === 'matches' && (
            <div className="ds-panel fade-up-1">
              <div className="ds-panel-head">
                <p className="ds-panel-title">Potential matches</p>
                <span className="ds-panel-sub">AI-surfaced items that may be yours</span>
              </div>

              {visibleMatches.length === 0 ? (
                <div className="ds-empty">
                  <div className="ds-empty-icon">🔍</div>
                  <p>No new matches right now. We'll notify you when something comes up.</p>
                </div>
              ) : (
                <div className="ds-match-list">
                  {visibleMatches.map(m => (
                    <div key={m.id} className={`ds-match-card ${m.isNew ? 'ds-match-new' : ''}`}>
                      {m.isNew && <span className="ds-match-new-tag">New</span>}
                      <div className="ds-match-pair">
                        <div className="ds-match-side">
                          <p className="ds-match-side-label">Your item</p>
                          <span className={`chip chip-${m.myItem.type}`}><span className="chip-dot"/>{m.myItem.type}</span>
                          <p className="ds-match-item-title">{m.myItem.title}</p>
                        </div>
                        <div className="ds-match-connector">
                          <div className="ds-match-conf">
                            <strong>{m.confidence}%</strong>
                            <span>match</span>
                          </div>
                          <svg width="20" height="12" viewBox="0 0 28 12" fill="none"><path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </div>
                        <div className="ds-match-side">
                          <p className="ds-match-side-label">Potential find</p>
                          <span className={`chip chip-${m.matchItem.type}`}><span className="chip-dot"/>{m.matchItem.type}</span>
                          <p className="ds-match-item-title">{m.matchItem.title}</p>
                          <p className="ds-match-item-meta">{m.matchItem.location} · {timeAgo(m.matchItem.date)}</p>
                        </div>
                      </div>
                      <div className="ds-match-actions">
                        <Button variant="primary" size="sm" onClick={() => setActiveTab('messages')}>Contact Reporter</Button>
                        <Button variant="secondary" size="sm" onClick={() => setDismissedMatches(p => [...p, m.id])}>Not a Match</Button>
                        <Link to={`/items/${m.matchItem.id}`} className="ds-match-view-link">View item →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── MESSAGES ── */}
          {activeTab === 'messages' && (
            <div className="ds-panel fade-up-1">
              <div className="ds-panel-head">
                <p className="ds-panel-title">Contact requests</p>
                <span className="ds-panel-sub">People reaching out about your items</span>
              </div>
              <div className="ds-msg-list">
                  {transformedMessages.map(m => (
                    <div key={m.id}>{m.preview}</div>
                    ))}
              </div>
            </div>
          )}
        </main>

        {/* Right — sidebar */}
        <aside className="ds-sidebar">

          {/* Activity feed */}
          <div className="ds-widget">
            <p className="ds-widget-title">Recent activity</p>
            <div className="ds-activity">
              {[
                { icon: '👀', text: 'Someone viewed your wallet report', time: '2h ago' },
                { icon: '🔔', text: 'New match found for MacBook Pro', time: '5h ago' },
                { icon: '✉️', text: 'Sara M. sent you a message', time: '2h ago' },
                { icon: '📤', text: 'You reported Gold Ring at The Met', time: '2d ago' },
              ].map((a, i) => (
                <div key={i} className="ds-activity-row">
                  <span className="ds-activity-icon">{a.icon}</span>
                  <div>
                    <p className="ds-activity-text">{a.text}</p>
                    <p className="ds-activity-time">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="ds-widget ds-widget-tip">
            <p className="ds-widget-title">Improve your chances</p>
            <ul className="ds-tips">
              <li>Add a photo to your report — it helps by 3×</li>
              <li>Share your report on social media</li>
              <li>Respond to messages within 24h</li>
            </ul>
            <Link to="/report" className="ds-tip-cta">Update your report →</Link>
          </div>

        </aside>
      </div>
    </div>
  );
};
