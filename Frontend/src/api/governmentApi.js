import api from './axios';

export const governmentApi = {
  getOverview: () => api.get('/government/overview'),
  getDistricts: () => api.get('/government/districts'),
  getSkills: () => api.get('/government/skills'),
  getColleges: () => api.get('/government/colleges'),
  getPlacements: () => api.get('/government/placements')
};
