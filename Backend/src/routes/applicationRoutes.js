import express from 'express';
import { 
  getApplications, 
  getApplicationById, 
  createApplication, 
  updateApplicationStatus 
} from '../controllers/applicationController.js';

const router = express.Router();

router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.post('/', createApplication);
router.patch('/:id/status', updateApplicationStatus);

export default router;
