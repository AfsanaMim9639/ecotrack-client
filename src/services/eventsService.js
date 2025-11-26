import api from './api';

export const eventsService = {
  // Get all events
  getAllEvents: async (params = {}) => {
    const response = await api.get('/events', { params });
    return response.data;
  },

  // Get upcoming events
  getUpcomingEvents: async (limit = 6) => {
    const response = await api.get(`/events/upcoming?limit=${limit}`);
    return response.data;
  },

  // Get single event
  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  // Create event
  createEvent: async (data) => {
    const response = await api.post('/events', data);
    return response.data;
  },

  // Update event
  updateEvent: async (id, data) => {
    const response = await api.put(`/events/${id}`, data);
    return response.data;
  },

  // Delete event
  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  // Register for event
  registerForEvent: async (id) => {
    const response = await api.post(`/events/${id}/register`);
    return response.data;
  }
};

export default eventsService;
