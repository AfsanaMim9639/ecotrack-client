import api from './api';

export const userChallengeService = {
  // Join a challenge
  joinChallenge: async (challengeId) => {
    const response = await api.post('/user-challenges/join', { challengeId });
    return response.data;
  },

  // Get user's challenges (uses query parameter, not path parameter)
  getUserChallenges: async (status) => {
    const params = status ? { status } : {};
    const response = await api.get('/user-challenges', { params });
    return response.data;
  },

  // Get single user challenge
  getUserChallengeById: async (id) => {
    const response = await api.get(`/user-challenges/${id}`);
    return response.data;
  },

  // Update progress
  updateProgress: async (id, data) => {
    const response = await api.post(`/user-challenges/${id}/progress`, data);
    return response.data;
  },

  // Abandon challenge
  abandonChallenge: async (id) => {
    const response = await api.put(`/user-challenges/${id}/abandon`);
    return response.data;
  }
};

export default userChallengeService;