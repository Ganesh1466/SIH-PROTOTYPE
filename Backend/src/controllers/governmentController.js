import { GovernmentService } from '../services/governmentService.js';

export const getGovernmentDashboard = async (req, res) => {
  try {
    const data = await GovernmentService.getDashboardOverview();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDistrictAnalytics = async (req, res) => {
  try {
    const data = await GovernmentService.getDistrictAnalytics(req.query.district);
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSkillAnalytics = async (req, res) => {
  try {
    const data = await GovernmentService.getSkillAnalytics();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFunnelAnalytics = async (req, res) => {
  try {
    const data = await GovernmentService.getFunnelAnalytics();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGovernmentEmployers = async (req, res) => {
  try {
    const data = await GovernmentService.getEmployers(req.query);
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await GovernmentService.updateEmployerStatus(id, 'VERIFIED', req.body.notes);
    res.json({
      success: true,
      message: `Employer ${employer.companyName} verified successfully. Permitted to post job and internship opportunities.`,
      data: employer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await GovernmentService.updateEmployerStatus(id, 'REJECTED', req.body.notes);
    res.json({
      success: true,
      message: `Employer ${employer.companyName} verification rejected.`,
      data: employer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const suspendEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await GovernmentService.updateEmployerStatus(id, 'SUSPENDED', req.body.notes);
    res.json({
      success: true,
      message: `Employer ${employer.companyName} suspended from publishing opportunities.`,
      data: employer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGovernmentOpportunities = async (req, res) => {
  try {
    const data = await GovernmentService.getOpportunities(req.query);
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opp = await GovernmentService.updateOpportunityStatus(id, 'PUBLISHED', req.body.notes);
    res.json({
      success: true,
      message: `Opportunity "${opp.title}" approved and published across Rajasthan for students.`,
      data: opp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opp = await GovernmentService.updateOpportunityStatus(id, 'REJECTED', req.body.notes);
    res.json({
      success: true,
      message: `Opportunity "${opp.title}" rejected.`,
      data: opp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const suspendOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opp = await GovernmentService.updateOpportunityStatus(id, 'SUSPENDED', req.body.notes);
    res.json({
      success: true,
      message: `Opportunity "${opp.title}" suspended.`,
      data: opp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGovernmentStudents = async (req, res) => {
  try {
    const data = await GovernmentService.getStudents(req.query);
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGovernmentPlacements = async (req, res) => {
  try {
    const data = await GovernmentService.getPlacementAnalytics();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGovernmentReports = async (req, res) => {
  try {
    const { type = 'district' } = req.query;
    const data = await GovernmentService.getReportData(type);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGovernmentNotifications = async (req, res) => {
  try {
    const data = await GovernmentService.getNotifications();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGovernmentNotification = async (req, res) => {
  try {
    const data = await GovernmentService.createNotification(req.body);
    res.status(201).json({
      success: true,
      message: 'State announcement published and broadcasted successfully.',
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGovernmentRecommendations = async (req, res) => {
  try {
    const data = await GovernmentService.getRecommendations();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGovernmentRecommendation = async (req, res) => {
  try {
    const data = await GovernmentService.createRecommendation(req.body);
    res.status(201).json({
      success: true,
      message: 'Policy and training recommendation created successfully.',
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Backwards compatibility for existing overview endpoint
export const getGovernmentOverview = getGovernmentDashboard;
export const getSkillDemandAnalytics = getSkillAnalytics;
export const getCollegeAnalytics = async (req, res) => {
  try {
    const { rajasthanColleges } = await import('../utils/seedData.js');
    res.json({ success: true, count: rajasthanColleges.length, data: rajasthanColleges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getPlacementFunnel = getFunnelAnalytics;
