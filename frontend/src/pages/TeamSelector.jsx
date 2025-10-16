import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamsApi } from '../services/api';

const TeamSelector = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const response = await teamsApi.getAll();
      setTeams(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Failed to load teams. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    try {
      const teamData = {
        displayName: newTeamName.charAt(0).toUpperCase() + newTeamName.slice(1) + ' Team',
        description: `Days since tracking for ${newTeamName} team`,
        categories: ['deployment', 'meeting', 'release']
      };

      await teamsApi.createOrUpdate(newTeamName.toLowerCase(), teamData);
      navigate(`/${newTeamName.toLowerCase()}`);
    } catch (err) {
      console.error('Error creating team:', err);
      setError('Failed to create team. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner" style={{ margin: '2rem auto' }}></div>
        <p className="text-gray-600">Loading teams...</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Days Since
        </h1>
        <p className="text-xl text-gray-600">
          Track important events and milestones for your teams
        </p>
      </div>

      {error && (
        <div className="card mb-6" style={{ maxWidth: '500px', margin: '0 auto', borderLeft: '4px solid #EF4444' }}>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-2xl font-semibold mb-6">Select a Team</h2>
        
        {teams.length === 0 ? (
          <div className="mb-6">
            <p className="text-gray-600 mb-4">No teams found. Create your first team to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {teams.map(team => (
              <button
                key={team.name}
                className="btn btn-outline text-left p-4 h-auto"
                onClick={() => navigate(`/${team.name}`)}
              >
                <div className="font-semibold">{team.displayName}</div>
                <div className="text-sm text-gray-600 mt-1">{team.description}</div>
              </button>
            ))}
          </div>
        )}

        {!showCreateForm ? (
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            ➕ Create New Team
          </button>
        ) : (
          <form onSubmit={handleCreateTeam} className="text-left">
            <div className="form-group">
              <label htmlFor="teamName" className="form-label">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="form-input"
                placeholder="e.g., dxl, umoja, frontend"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Use lowercase letters, numbers, and hyphens only
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewTeamName('');
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!newTeamName.trim()}
              >
                Create Team
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TeamSelector;
