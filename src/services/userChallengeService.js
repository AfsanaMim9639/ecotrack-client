import api from './api';

export const userChallengeService = {
  // Join a challenge
  joinChallenge: async (data) => {
    const response = await api.post('/user-challenges/join', data);
    return response.data;
  },

  // Get user's challenges
  getUserChallenges: async (userId, status = null) => {
    const params = status ? { status } : {};
    const response = await api.get(`/user-challenges/user/${userId}`, { params });
    return response.data;
  },

  // Get user statistics
  getUserStats: async (userId) => {
    const response = await api.get(`/user-challenges/user/${userId}/stats`);
    return response.data;
  },

  // Get single user challenge
  getUserChallengeById: async (id) => {
    const response = await api.get(`/user-challenges/${id}`);
    return response.data;
  },

  // Update progress percentage
  updateProgress: async (id, progressPercentage) => {
    const response = await api.put(`/user-challenges/${id}/progress`, {
      progressPercentage
    });
    return response.data;
  },

  // Add progress update
  addProgressUpdate: async (id, data) => {
    const response = await api.post(`/user-challenges/${id}/updates`, data);
    return response.data;
  },

  // Abandon challenge
  abandonChallenge: async (id) => {
    const response = await api.put(`/user-challenges/${id}/abandon`);
    return response.data;
  }
};

export default userChallengeService;