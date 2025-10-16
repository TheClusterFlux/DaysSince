import React from 'react';
import { getDaysSinceText, getAverageDaysText } from '../utils/dateUtils';
import './EventCard.css';

const EventCard = ({ event, onMarkHappened, onDelete, isLoading }) => {
  const getDaysSinceColor = (days) => {
    if (days === 0) return 'success';
    if (days <= 3) return 'warning';
    if (days <= 7) return 'info';
    return 'danger';
  };

  const daysSinceColor = getDaysSinceColor(event.daysSince);

  return (
    <div className="event-card">
      <div className="event-header">
        <div className="event-title">
          <h3 className="event-name">{event.name}</h3>
          {event.category && (
            <span className={`event-category category-${event.category}`}>
              {event.category}
            </span>
          )}
        </div>
        <div className="event-actions">
          <button
            className="btn btn-success btn-sm"
            onClick={() => onMarkHappened(event._id)}
            disabled={isLoading}
          >
            ✅ Mark as happened
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(event._id)}
            disabled={isLoading}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
      
      <div className="event-stats">
        <div className={`stat-card stat-${daysSinceColor}`}>
          <div className="stat-value">{event.daysSince}</div>
          <div className="stat-label">Days Since</div>
        </div>
        
        <div className="stat-card stat-info">
          <div className="stat-value">{event.averageDays}</div>
          <div className="stat-label">Avg Days</div>
        </div>
        
        <div className="stat-card stat-neutral">
          <div className="stat-value">{event.timestamps.length}</div>
          <div className="stat-label">Occurrences</div>
        </div>
      </div>
      
      <div className="event-details">
        <p className="text-gray-600">
          <strong>Last occurrence:</strong> {event.lastOccurrence}
        </p>
        <p className="text-gray-600">
          <strong>Pattern:</strong> {getAverageDaysText(event.averageDays)}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
