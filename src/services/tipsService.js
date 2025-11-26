import api from './api';

export const tipsService = {
  // Get all tips
  getAllTips: async (params = {}) => {
    const response = await api.get('/tips', { params });
    return response.data;
  },

  // Get single tip
  getTipById: async (id) => {
    const response = await api.get(`/tips/${id}`);
    return response.data;
  },

  // Create tip
  createTip: async (data) => {
    const response = await api.post('/tips', data);
    return response.data;
  },

  // Update tip
  updateTip: async (id, data) => {
    const response = await api.put(`/tips/${id}`, data);
    return response.data;
  },

  // Delete tip
  deleteTip: async (id) => {
    const response = await api.delete(`/tips/${id}`);
    return response.data;
  },

  // Like tip
  likeTip: async (id) => {
    const response = await api.post(`/tips/${id}/like`);
    return response.data;
  }
};

export default tipsService;
