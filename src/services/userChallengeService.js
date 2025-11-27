import api from './api';
import { auth } from '../firebase/config';

const userChallengeService = {
  // Join a challenge
  joinChallenge: async (challengeId) => {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const response = await api.post('/user-challenges/join', {
        challengeId,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email
      });
      
      return response.data;
    } catch (error) {
      console.error('Join challenge error:', error);
      throw error;
    }
  },

  // Get user's challenges
  getUserChallenges: async (userId, status = null) => {
    try {
      const params = { userId };
      if (status) params.status = status;
      
      const response = await api.get('/user-challenges', { params });
      return response.data;
    } catch (error) {
      console.error('Get user challenges error:', error);
      throw error;
    }
  },

  // Get single challenge
  getUserChallengeById: async (id, userId) => {
    try {
      const response = await api.get(`/user-challenges/${id}`, {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('Get user challenge error:', error);
      throw error;
    }
  },

  // Update progress
  updateProgress: async (id, userId, progressData) => {
    try {
      const response = await api.post(`/user-challenges/${id}/progress`, {
        userId,
        ...progressData
      });
      return response.data;
    } catch (error) {
      console.error('Update progress error:', error);
      throw error;
    }
  },

  // Abandon challenge
  abandonChallenge: async (id, userId) => {
    try {
      const response = await api.put(`/user-challenges/${id}/abandon`, {
        userId
      });
      return response.data;
    } catch (error) {
      console.error('Abandon challenge error:', error);
      throw error;
    }
  }
};

export default userChallengeService;
