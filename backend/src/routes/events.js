const express = require('express');
const { ObjectId } = require('mongodb');
const { connect } = require('../utils/database');
const { calculateDaysSince, calculateAverageDays, formatDate } = require('../utils/dateUtils');
const { validateTeamName, validateEvent } = require('../middleware/validation');
const Event = require('../models/Event');

const router = express.Router();

// Get all events for a team
router.get('/teams/:teamName/events', validateTeamName, async (req, res) => {
  try {
    const db = await connect();
    const { teamName } = req.params;
    
    const events = await db.collection('events')
      .find({ team: teamName })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Add calculated fields
    const eventsWithStats = events.map(event => ({
      ...event,
      daysSince: calculateDaysSince(event.timestamps),
      averageDays: calculateAverageDays(event.timestamps),
      lastOccurrence: event.timestamps.length > 0 
        ? formatDate(event.timestamps[event.timestamps.length - 1])
        : 'Never'
    }));
    
    res.json(eventsWithStats);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get available categories for a team
router.get('/teams/:teamName/categories', validateTeamName, async (req, res) => {
  try {
    const db = await connect();
    const { teamName } = req.params;
    
    const categories = await db.collection('events')
      .distinct('category', { 
        team: teamName, 
        category: { $ne: null } 
      });
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create new event
router.post('/teams/:teamName/events', validateTeamName, validateEvent, async (req, res) => {
  try {
    const db = await connect();
    const { teamName } = req.params;
    const { name, category } = req.body;
    
    const event = new Event({
      team: teamName,
      name,
      category,
      timestamps: []
    });
    
    const result = await db.collection('events').insertOne(event);
    const createdEvent = await db.collection('events').findOne({ _id: result.insertedId });
    
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event (add timestamp)
router.put('/teams/:teamName/events/:eventId', validateTeamName, async (req, res) => {
  try {
    const db = await connect();
    const { teamName, eventId } = req.params;
    
    if (!ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
    
    const event = await db.collection('events').findOne({
      _id: new ObjectId(eventId),
      team: teamName
    });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const now = new Date().toISOString();
    const updatedEvent = await db.collection('events').findOneAndUpdate(
      { _id: new ObjectId(eventId), team: teamName },
      { 
        $push: { timestamps: now },
        $set: { updatedAt: now }
      },
      { returnDocument: 'after' }
    );
    
    res.json(updatedEvent.value);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event
router.delete('/teams/:teamName/events/:eventId', validateTeamName, async (req, res) => {
  try {
    const db = await connect();
    const { teamName, eventId } = req.params;
    
    if (!ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
    
    const result = await db.collection('events').deleteOne({
      _id: new ObjectId(eventId),
      team: teamName
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
