const express = require('express');
const { connect } = require('../utils/database');
const { validateTeamName, validateTeam } = require('../middleware/validation');
const Team = require('../models/Team');

const router = express.Router();

// Get all teams
router.get('/teams', async (req, res) => {
  try {
    const db = await connect();
    const teams = await db.collection('teams')
      .find({})
      .sort({ name: 1 })
      .toArray();
    
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Get team configuration
router.get('/teams/:teamName', validateTeamName, async (req, res) => {
  try {
    const db = await connect();
    const { teamName } = req.params;
    
    const team = await db.collection('teams').findOne({ name: teamName });
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// Create or update team configuration
router.post('/teams/:teamName', validateTeamName, validateTeam, async (req, res) => {
  try {
    const db = await connect();
    const { teamName } = req.params;
    const { displayName, description, categories } = req.body;
    
    const team = new Team({
      name: teamName,
      displayName,
      description,
      categories
    });
    
    const result = await db.collection('teams').replaceOne(
      { name: teamName },
      team,
      { upsert: true }
    );
    
    const updatedTeam = await db.collection('teams').findOne({ name: teamName });
    
    if (result.upsertedCount > 0) {
      res.status(201).json(updatedTeam);
    } else {
      res.json(updatedTeam);
    }
  } catch (error) {
    console.error('Error creating/updating team:', error);
    res.status(500).json({ error: 'Failed to create/update team' });
  }
});

module.exports = router;
