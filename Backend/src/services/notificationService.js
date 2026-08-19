import { initialNotifications } from '../utils/seedData.js';

// In-memory store initialized with seed notifications
let notificationsStore = [...initialNotifications];

export class NotificationService {
  static getNotificationsForUser(userId) {
    return notificationsStore
      .filter(n => n.userId === userId || n.userId === 'all')
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  static createNotification({ userId, title, message, type = "INFO", actionUrl = "" }) {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      title,
      message,
      type,
      read: false,
      timestamp: new Date().toISOString(),
      actionUrl
    };

    notificationsStore.unshift(newNotif);
    return newNotif;
  }

  static markAsRead(notificationId) {
    const notif = notificationsStore.find(n => n.id === notificationId);
    if (notif) {
      notif.read = true;
    }
    return notif;
  }

  static markAllAsRead(userId) {
    notificationsStore.forEach(n => {
      if (n.userId === userId || n.userId === 'all') {
        n.read = true;
      }
    });
    return true;
  }
}
