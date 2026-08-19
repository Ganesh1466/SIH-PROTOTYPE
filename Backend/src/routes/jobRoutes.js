import express from 'express';
import { 
  getAllJobs, 
  getJobById, 
  createJob, 
  updateJobStatus 
} from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.patch('/:id/status', updateJobStatus);

export default router;
