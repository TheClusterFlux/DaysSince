import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm.jsx';
import { eventsApi } from '../services/api';

const AddEvent = () => {
  const { teamName } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      await eventsApi.create(teamName, formData);
      navigate(`/${teamName}`);
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/${teamName}`);
  };

  return (
    <div>
      <div className="mb-6">
        <button
          className="btn btn-outline mb-4"
          onClick={() => navigate(`/${teamName}`)}
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Event</h1>
        <p className="text-gray-600 mt-2">
          Create a new event to track for the {teamName} team
        </p>
      </div>

      {error && (
        <div className="card mb-6" style={{ borderLeft: '4px solid #EF4444' }}>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <EventForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        teamName={teamName}
      />
    </div>
  );
};

export default AddEvent;
