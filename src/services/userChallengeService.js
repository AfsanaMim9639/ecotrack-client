import api from './api';
import { auth } from '../firebase/config';

const userChallengeService = {
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

  // Join a challenge
  joinChallenge: async (challengeId) => {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Support both endpoint styles
      const response = await api.post(`/user-challenges/join/${challengeId}`, {
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

  // Get single challenge/activity by ID
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

  
  getActivityById: async (activityId) => {
    try {
      const response = await api.get(`/user-challenges/${activityId}`);
      return response.data;
    } catch (error) {
      console.error('Get activity error:', error);
      throw error;
    }
  },

  // UPDATED - Update progress with new fields support
  updateProgress: async (id, progressData) => {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Support PATCH method (RESTful)
      const response = await api.patch(`/user-challenges/${id}/progress`, {
        userId: user.uid,
        ...progressData 
      });
      
      return response.data;
    } catch (error) {
      console.error('Update progress error:', error);
      throw error;
    }
  },

  
  updateProgressLegacy: async (id, userId, progressData) => {
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
      
      const response = await api.patch(`/user-challenges/${id}/abandon`, {
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