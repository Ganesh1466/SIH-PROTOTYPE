import express from 'express';
import { 
  getNotifications, 
  markNotificationRead, 
  markAllRead 
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/:userId', getNotifications);
router.patch('/:id/read', markNotificationRead);
router.post('/mark-all-read', markAllRead);

export default router;
