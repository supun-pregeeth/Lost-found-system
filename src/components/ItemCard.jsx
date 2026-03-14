import { Link } from 'react-router-dom';
import { getCategoryIcon, timeAgo, truncate } from '../utils/helpers';
import './ItemCard.css';

export const ItemCard = ({ item, featured = false }) => {
  const { id, type, title, category, location, date, description, user, reward, urgent } = item;
  const username = user?.name || "User";
  return (
    <Link to={`/items/${id}`} className={`item-card ${featured ? 'item-card-featured' : ''}`}>
      {urgent && <div className="item-card-urgent-stripe" />}
      
      <div className="item-card-header">
        <div className="item-card-meta">
          <span className={`badge badge-${type?.toLowerCase()}`}>
            <span className="badge-dot" />
            {type?.toUpperCase() === 'LOST' ? 'Lost' : 'Found'}
          </span>
          {reward && <span className="item-card-reward"> {reward} reward</span>}
        </div>
        <span className="item-card-time">{timeAgo(date)}</span>
      </div>

      <div className="item-card-image-area">
        <div className="item-card-image-placeholder">
          <span className="item-card-category-icon">{getCategoryIcon(category)}</span>
        </div>
        {urgent && <div className="item-card-urgent-badge">Urgent</div>}
      </div>

      <div className="item-card-body">
        <h3 className="item-card-title">{title}</h3>
        <p className="item-card-description">{truncate(description, 90)}</p>

        <div className="item-card-footer">
          <div className="item-card-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {location}
          </div>
          <div className="item-card-user">
            <div className="item-card-avatar">{username?.charAt(0).toUpperCase()}</div>
            <span>{username}</span>
          </div>
        </div>
      </div>

      <div className="item-card-hover-line" />
    </Link>
  );
};
