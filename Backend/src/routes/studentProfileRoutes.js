import express from 'express';
import { 
  getProfile, 
  saveProfile, 
  updateProfile, 
  addSkill, 
  removeSkill 
} from '../controllers/studentProfileController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authenticated user session
router.use(requireAuth);

router.get('/', getProfile);
router.post('/', saveProfile);
router.put('/', updateProfile);
router.post('/skills', addSkill);
router.delete('/skills/:skillKey', removeSkill);

export default router;
