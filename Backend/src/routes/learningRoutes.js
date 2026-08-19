import express from 'express';
import { getLearningRoadmap } from '../controllers/learningController.js';

const router = express.Router();

router.get('/roadmap', getLearningRoadmap);

export default router;
