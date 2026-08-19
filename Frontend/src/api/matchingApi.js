import api from './axios';

export const matchingApi = {
  calculate: (payload) => api.post('/matching/calculate', payload)
};
