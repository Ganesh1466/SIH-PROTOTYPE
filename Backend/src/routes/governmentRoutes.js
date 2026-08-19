import express from 'express';
import { 
  getGovernmentOverview, 
  getDistrictAnalytics, 
  getSkillDemandAnalytics, 
  getCollegeAnalytics, 
  getPlacementFunnel 
} from '../controllers/governmentController.js';

const router = express.Router();

router.get('/overview', getGovernmentOverview);
router.get('/districts', getDistrictAnalytics);
router.get('/skills', getSkillDemandAnalytics);
router.get('/colleges', getCollegeAnalytics);
router.get('/placements', getPlacementFunnel);

export default router;
