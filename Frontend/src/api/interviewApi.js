import api from './axios';

export const interviewApi = {
  getAll: (params = {}) => api.get('/interviews', { params }),
  schedule: (data) => api.post('/interviews', data)
};
