import api from './axios';

export const notificationApi = {
  getForUser: (userId = 'stu-1') => api.get(`/notifications/${userId}`),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllRead: (userId = 'stu-1') => api.post('/notifications/mark-all-read', { userId })
};
