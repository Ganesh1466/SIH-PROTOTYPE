import { NotificationService } from '../services/notificationService.js';

export const getNotifications = (req, res) => {
  const { userId = "stu-1" } = req.params;
  const notifications = NotificationService.getNotificationsForUser(userId);
  res.json({ success: true, count: notifications.length, data: notifications });
};

export const markNotificationRead = (req, res) => {
  const { id } = req.params;
  const updated = NotificationService.markAsRead(id);
  res.json({ success: true, message: "Marked as read", data: updated });
};

export const markAllRead = (req, res) => {
  const { userId } = req.body;
  NotificationService.markAllAsRead(userId || "stu-1");
  res.json({ success: true, message: "All notifications marked as read" });
};
