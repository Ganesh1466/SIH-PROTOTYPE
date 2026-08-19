import express from 'express';
import { getInterviews, scheduleInterview } from '../controllers/interviewController.js';

const router = express.Router();

router.get('/', getInterviews);
router.post('/', scheduleInterview);

export default router;
