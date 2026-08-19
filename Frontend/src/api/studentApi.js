import api from './axios';

export const studentApi = {
  // Real Student Career Passport API
  getProfile: () => api.get('/student/profile'),
  saveProfile: (data) => api.post('/student/profile', data),
  updateProfile: (data) => api.put('/student/profile', data),
  addSkill: (skill) => api.post('/student/profile/skills', skill),
  removeSkill: (skillKey) => api.delete(`/student/profile/skills/${encodeURIComponent(skillKey)}`),

  // Recommendations, Skill Gap & Learning Plan
  getRecommendations: () => api.get('/students/stu-1/recommendations'),
  getSkillGap: (role = 'Frontend Developer') => api.get(`/students/stu-1/skill-gap?role=${encodeURIComponent(role)}`),
  getLearningPlan: (studentId = 'stu-1', role = 'Frontend Developer') => api.get(`/students/${studentId}/learning-plan?role=${encodeURIComponent(role)}`)
};
