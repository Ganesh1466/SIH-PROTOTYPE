import express from 'express';
import { 
  getAllEmployers, 
  getEmployerById, 
  getEmployerDashboard, 
  getRankedCandidates 
} from '../controllers/employerController.js';

const router = express.Router();

router.get('/', getAllEmployers);
router.get('/:id', getEmployerById);
router.get('/:id/dashboard', getEmployerDashboard);
router.get('/jobs/:jobId/candidates', getRankedCandidates);

export default router;
