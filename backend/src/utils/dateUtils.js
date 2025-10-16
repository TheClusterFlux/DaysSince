const calculateDaysSince = (timestamps) => {
  if (!timestamps || timestamps.length === 0) {
    return 0;
  }
  
  const lastTimestamp = new Date(timestamps[timestamps.length - 1]);
  const now = new Date();
  const diffTime = Math.abs(now - lastTimestamp);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

const calculateAverageDays = (timestamps) => {
  if (!timestamps || timestamps.length < 2) {
    return 0;
  }
  
  let totalDays = 0;
  for (let i = 1; i < timestamps.length; i++) {
    const prev = new Date(timestamps[i - 1]);
    const curr = new Date(timestamps[i]);
    const diffTime = Math.abs(curr - prev);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    totalDays += diffDays;
  }
  
  return Math.round(totalDays / (timestamps.length - 1));
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

module.exports = {
  calculateDaysSince,
  calculateAverageDays,
  formatDate
};
