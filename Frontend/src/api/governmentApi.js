import api from './axios';

export const governmentApi = {
  // 1. Dashboard & Core Analytics
  getDashboard: () => api.get('/government/dashboard'),
  getOverview: () => api.get('/government/dashboard'),
  getDistricts: (district) => api.get('/government/districts', { params: { district } }),
  getSkills: () => api.get('/government/skills'),
  getFunnel: () => api.get('/government/funnel'),
  getColleges: () => api.get('/government/colleges'),
  getPlacements: () => api.get('/government/placements'),

  // 2. Employer Verification
  getEmployers: (params) => api.get('/government/employers', { params }),
  verifyEmployer: (id, notes) => api.patch(`/government/employers/${id}/verify`, { notes }),
  rejectEmployer: (id, notes) => api.patch(`/government/employers/${id}/reject`, { notes }),
  suspendEmployer: (id, notes) => api.patch(`/government/employers/${id}/suspend`, { notes }),

  // 3. Opportunity Approvals
  getOpportunities: (params) => api.get('/government/opportunities', { params }),
  approveOpportunity: (id, notes) => api.patch(`/government/opportunities/${id}/approve`, { notes }),
  rejectOpportunity: (id, notes) => api.patch(`/government/opportunities/${id}/reject`, { notes }),
  suspendOpportunity: (id, notes) => api.patch(`/government/opportunities/${id}/suspend`, { notes }),

  // 4. Students Directory
  getStudents: (params) => api.get('/government/students', { params }),

  // 5. Reports
  getReports: (type = 'district') => api.get('/government/reports', { params: { type } }),

  // 6. Notifications
  getNotifications: () => api.get('/government/notifications'),
  createNotification: (data) => api.post('/government/notifications', data),

  // 7. Recommendations
  getRecommendations: () => api.get('/government/recommendations'),
  createRecommendation: (data) => api.post('/government/recommendations', data)
};
