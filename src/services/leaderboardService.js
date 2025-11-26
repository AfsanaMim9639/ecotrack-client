import api from './api';

export const leaderboardService = {
  // Get leaderboard
  getLeaderboard: async (type = 'points', limit = 50) => {
    const response = await api.get('/leaderboard', {
      params: { type, limit }
    });
    return response.data;
  },

  // Get user's rank
  getMyRank: async () => {
    const response = await api.get('/leaderboard/my-rank');
    return response.data;
  },

  // Get top performers
  getTopPerformers: async () => {
    const response = await api.get('/leaderboard/top-performers');
    return response.data;
  }
};

export default leaderboardService;