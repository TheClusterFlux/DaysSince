import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard.jsx';
import { eventsApi } from '../services/api';

const Dashboard = () => {
  const { teamName } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventsApi.getByTeam(teamName);
      setEvents(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [teamName]);

  const handleMarkHappened = async (eventId) => {
    try {
      await eventsApi.update(teamName, eventId);
      await fetchEvents(); // Refresh the list
    } catch (err) {
      console.error('Error marking event as happened:', err);
      setError('Failed to update event. Please try again.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await eventsApi.delete(teamName, eventId);
      await fetchEvents(); // Refresh the list
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner" style={{ margin: '2rem auto' }}></div>
        <p className="text-gray-600">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
          <p className="text-red-600 mb-4">{error}</p>
          <button className="btn btn-primary" onClick={fetchEvents}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {teamName.charAt(0).toUpperCase() + teamName.slice(1)} Team
          </h1>
          <p className="text-gray-600 mt-2">
            Track your team's important events and milestones
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/${teamName}/add-event`)}
        >
          ➕ Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center">
          <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-xl font-semibold mb-2">No events yet</h2>
            <p className="text-gray-600 mb-4">
              Start tracking your team's events by adding your first event.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/${teamName}/add-event`)}
            >
              Add Your First Event
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onMarkHappened={handleMarkHappened}
              onDelete={handleDeleteEvent}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
