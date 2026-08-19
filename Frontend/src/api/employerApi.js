import api from './axios';

export const employerApi = {
  // Company Profile & Dashboard
  getAll: () => api.get('/employers'),
  getById: (id = 'comp-1') => api.get(`/employers/${id}`),
  getDashboard: (id = 'comp-1') => api.get(`/employers/${id}/dashboard`),
  getRankedCandidates: (jobId = 'job-1') => api.get(`/employers/jobs/${jobId}/candidates`),

  // Employer Opportunities Management (Jobs & Internships)
  getOpportunities: (params) => api.get('/employer/opportunities', { params }),
  getOpportunityById: (id) => api.get(`/employer/opportunities/${id}`),
  createOpportunity: (data, isDraft = false) => api.post(`/employer/opportunities?draft=${isDraft}`, data),
  updateOpportunity: (id, data) => api.put(`/employer/opportunities/${id}`, data),
  publishOpportunity: (id) => api.patch(`/employer/opportunities/${id}/publish`),
  closeOpportunity: (id) => api.patch(`/employer/opportunities/${id}/close`),
  deleteOpportunity: (id) => api.delete(`/employer/opportunities/${id}`),

  // Fallback legacy method
  getJobs: () => api.get('/employer/opportunities')
};
