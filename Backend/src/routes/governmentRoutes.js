import express from 'express';
import { 
  getGovernmentDashboard,
  getGovernmentOverview,
  getDistrictAnalytics,
  getSkillAnalytics,
  getSkillDemandAnalytics,
  getFunnelAnalytics,
  getPlacementFunnel,
  getCollegeAnalytics,
  getGovernmentEmployers,
  verifyEmployer,
  rejectEmployer,
  suspendEmployer,
  getGovernmentOpportunities,
  approveOpportunity,
  rejectOpportunity,
  suspendOpportunity,
  getGovernmentStudents,
  getGovernmentPlacements,
  getGovernmentReports,
  getGovernmentNotifications,
  createGovernmentNotification,
  getGovernmentRecommendations,
  createGovernmentRecommendation
} from '../controllers/governmentController.js';

const router = express.Router();

// 1. Core Analytics & Dashboard
router.get('/dashboard', getGovernmentDashboard);
router.get('/overview', getGovernmentOverview);
router.get('/districts', getDistrictAnalytics);
router.get('/skills', getSkillAnalytics);
router.get('/skills-demand', getSkillDemandAnalytics);
router.get('/funnel', getFunnelAnalytics);
router.get('/colleges', getCollegeAnalytics);
router.get('/placements', getGovernmentPlacements);

// 2. Employer Verification System
router.get('/employers', getGovernmentEmployers);
router.patch('/employers/:id/verify', verifyEmployer);
router.patch('/employers/:id/reject', rejectEmployer);
router.patch('/employers/:id/suspend', suspendEmployer);

// 3. Opportunity Approval Workflow
router.get('/opportunities', getGovernmentOpportunities);
router.patch('/opportunities/:id/approve', approveOpportunity);
router.patch('/opportunities/:id/reject', rejectOpportunity);
router.patch('/opportunities/:id/suspend', suspendOpportunity);

// 4. Students Directory & Monitoring
router.get('/students', getGovernmentStudents);

// 5. Reports & CSV Export
router.get('/reports', getGovernmentReports);

// 6. Announcements & Notifications
router.get('/notifications', getGovernmentNotifications);
router.post('/notifications', createGovernmentNotification);

// 7. Policy & Training Recommendations
router.get('/recommendations', getGovernmentRecommendations);
router.post('/recommendations', createGovernmentRecommendation);

export default router;
