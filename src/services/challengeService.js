import api from './api';

export const challengeService = {
  // Get all challenges
  getAllChallenges: async (params = {}) => {
    const response = await api.get('/challenges', { params });
    return response.data;
  },

  // Get single challenge
  getChallengeById: async (id) => {
    const response = await api.get(`/challenges/${id}`);
    return response.data;
  },

  // Create challenge
  createChallenge: async (data) => {
    const response = await api.post('/challenges', data);
    return response.data;
  },

  // Update challenge (PATCH)
  updateChallenge: async (id, data) => {
    const response = await api.patch(`/challenges/${id}`, data);
    return response.data;
  },

  // Delete challenge
  deleteChallenge: async (id) => {
    const response = await api.delete(`/challenges/${id}`);
    return response.data;
  },

  // Increment participants
  incrementParticipants: async (id) => {
    const response = await api.post(`/challenges/${id}/increment`);
    return response.data;
  },

  // Decrement participants
  decrementParticipants: async (id) => {
    const response = await api.post(`/challenges/${id}/decrement`);
    return response.data;
  }
};

export default challengeService;