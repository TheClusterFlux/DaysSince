import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Teams API
export const teamsApi = {
  getAll: () => api.get('/teams'),
  getByName: (teamName) => api.get(`/teams/${teamName}`),
  createOrUpdate: (teamName, data) => api.post(`/teams/${teamName}`, data),
};

// Events API
export const eventsApi = {
  getByTeam: (teamName) => api.get(`/teams/${teamName}/events`),
  create: (teamName, data) => api.post(`/teams/${teamName}/events`, data),
  update: (teamName, eventId) => api.put(`/teams/${teamName}/events/${eventId}`),
  delete: (teamName, eventId) => api.delete(`/teams/${teamName}/events/${eventId}`),
  getCategories: (teamName) => api.get(`/teams/${teamName}/categories`),
};

// Health API
export const healthApi = {
  check: () => api.get('/health'),
};

export default api;
