import api from './api';

export const userService = {
  // Get or create user profile
  getOrCreateProfile: async (userData) => {
    const response = await api.post('/users/profile', userData);
    return response.data;
  },

  // Get user profile
  getUserProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Get user badges
  getUserBadges: async () => {
    const response = await api.get('/users/badges');
    return response.data;
  }
};

export default userService;