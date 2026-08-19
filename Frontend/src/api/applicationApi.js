import api from './axios';

export const applicationApi = {
  getAll: (params = {}) => api.get('/applications', { params }),
  getByStudent: (studentId) => api.get('/applications', { params: { studentId } }),
  getById: (id) => api.get(`/applications/${id}`),
  apply: (studentIdOrPayload, maybeJobId) => {
    if (typeof studentIdOrPayload === 'object' && studentIdOrPayload !== null) {
      return api.post('/applications', studentIdOrPayload);
    }
    return api.post('/applications', { studentId: studentIdOrPayload, jobId: maybeJobId });
  },
  updateStatus: (id, status, { changedBy, note } = {}) => api.patch(`/applications/${id}/status`, { status, changedBy, note })
};
