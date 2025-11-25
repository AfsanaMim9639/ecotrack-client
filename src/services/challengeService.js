import api from './api';

// Get all challenges
export const getAllChallenges = async (filters = {}) => {
  try {
    const response = await api.get('/challenges', { params: filters });
    return response;
  } catch (error) {
    throw error;
  }
};

// Get single challenge by ID
export const getChallengeById = async (id) => {
  try {
    const response = await api.get(`/challenges/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Create new challenge
export const createChallenge = async (challengeData) => {
  try {
    const response = await api.post('/challenges', challengeData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update challenge
export const updateChallenge = async (id, challengeData) => {
  try {
    const response = await api.patch(`/challenges/${id}`, challengeData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete challenge
export const deleteChallenge = async (id) => {
  try {
    const response = await api.delete(`/challenges/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Join challenge
export const joinChallenge = async (id, userId) => {
  try {
    const response = await api.post(`/challenges/join/${id}`, { userId });
    return response;
  } catch (error) {
    throw error;
  }
};
