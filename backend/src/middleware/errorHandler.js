const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'A record with this information already exists.'
    });
  }
  
  // MongoDB validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error: ' + err.message
    });
  }
  
  // Default error
  res.status(500).json({
    error: 'Internal server error'
  });
};

module.exports = errorHandler;
