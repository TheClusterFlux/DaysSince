import React, { useState, useEffect } from 'react';
import { eventsApi } from '../services/api';
import './EventForm.css';

const EventForm = ({ onSubmit, onCancel, isLoading, initialData = {}, teamName }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: null // Default to null
  });
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!teamName) return;
      
      try {
        const response = await eventsApi.getCategories(teamName);
        setAvailableCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setAvailableCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [teamName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? null : value // Convert empty string to null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData); // category is already null or a valid category
    }
  };

  return (
    <div className="event-form-container">
      <form className="event-form" onSubmit={handleSubmit}>
        <h2 className="form-title">
          {initialData._id ? 'Edit Event' : 'Add New Event'}
        </h2>
        
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Event Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Last deployment, Team standup, Code review"
            required
            disabled={isLoading}
          />
        </div>
        
        {!loadingCategories && availableCategories.length > 0 && (
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category (Optional)
            </label>
            <select
              id="category"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              className="form-select"
              disabled={isLoading}
            >
              <option value="">No Category</option>
              {availableCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || !formData.name.trim()}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Saving...
              </>
            ) : (
              initialData._id ? 'Update Event' : 'Create Event'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
