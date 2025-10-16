const express = require('express');
const { connect } = require('../utils/database');

const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    // Test database connection
    const db = await connect();
    await db.admin().ping();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

module.exports = router;
