import api from './api';

const leaderboardService = {
  // Get leaderboard with filters
  getLeaderboard: async (type = 'points', limit = 50) => {
    try {
      const response = await api.get('/leaderboard', {
        params: { type, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Leaderboard service error:', error);
      throw error;
    }
  },

  // Get current user's rank
  getMyRank: async () => {
    try {
      const response = await api.get('/leaderboard/my-rank');
      return response.data;
    } catch (error) {
      console.error('My rank service error:', error);
      throw error;
    }
  },

  // Get top performers
  getTopPerformers: async () => {
    try {
      const response = await api.get('/leaderboard/top-performers');
      return response.data;
    } catch (error) {
      console.error('Top performers service error:', error);
      throw error;
    }
  }
};

export default leaderboardService;