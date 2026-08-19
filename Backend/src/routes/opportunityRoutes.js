import express from 'express';
import { 
  createOpportunity, 
  getOpportunities, 
  getOpportunityById, 
  updateOpportunity, 
  deleteOpportunity, 
  publishOpportunity, 
  closeOpportunity 
} from '../controllers/opportunityController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public / Authenticated Employer Endpoints
router.post('/', createOpportunity);
router.get('/', getOpportunities);
router.get('/:id', getOpportunityById);
router.put('/:id', updateOpportunity);
router.delete('/:id', deleteOpportunity);
router.patch('/:id/publish', publishOpportunity);
router.patch('/:id/close', closeOpportunity);

export default router;
