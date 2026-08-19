import express from 'express';
import { 
  getAllStudents, 
  getStudentById, 
  updateStudentProfile, 
  getStudentRecommendations,
  getStudentSkillGap,
  getStudentLearningPlan
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudentProfile);
router.get('/:id/recommendations', getStudentRecommendations);
router.get('/:id/skill-gap', getStudentSkillGap);
router.get('/:id/learning-plan', getStudentLearningPlan);

export default router;
