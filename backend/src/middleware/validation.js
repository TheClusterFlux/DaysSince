const validateTeamName = (req, res, next) => {
  const { teamName } = req.params;
  
  if (!teamName || !/^[a-zA-Z0-9-]+$/.test(teamName)) {
    return res.status(400).json({
      error: 'Invalid team name. Only alphanumeric characters and hyphens are allowed.'
    });
  }
  
  next();
};

const validateEvent = (req, res, next) => {
  const { name, category } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      error: 'Event name is required and must be a non-empty string.'
    });
  }
  
  // Sanitize inputs
  req.body.name = name.trim();
  if (category && typeof category === 'string') {
    req.body.category = category.trim();
  } else {
    req.body.category = null; // Allow null category
  }
  
  next();
};

const validateTeam = (req, res, next) => {
  const { displayName, description, categories } = req.body;
  
  if (!displayName || typeof displayName !== 'string' || displayName.trim().length === 0) {
    return res.status(400).json({
      error: 'Team display name is required and must be a non-empty string.'
    });
  }
  
  if (description && typeof description !== 'string') {
    return res.status(400).json({
      error: 'Team description must be a string.'
    });
  }
  
  if (categories && (!Array.isArray(categories) || !categories.every(cat => typeof cat === 'string'))) {
    return res.status(400).json({
      error: 'Categories must be an array of strings.'
    });
  }
  
  // Sanitize inputs
  req.body.displayName = displayName.trim();
  if (description) req.body.description = description.trim();
  
  next();
};

module.exports = {
  validateTeamName,
  validateEvent,
  validateTeam
};
