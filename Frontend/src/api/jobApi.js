import api from './axios';

export const jobApi = {
  getAll: (params = {}) => api.get('/jobs', { params }),
  getById: (id, params = {}) => api.get(`/jobs/${id}`, { params }),
  create: (data) => api.post('/jobs', data),
  updateStatus: (id, status) => api.patch(`/jobs/${id}/status`, { status })
};

