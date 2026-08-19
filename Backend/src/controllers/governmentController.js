import { AnalyticsService } from '../services/analyticsService.js';

export const getGovernmentOverview = (req, res) => {
  const data = AnalyticsService.getGovernmentOverview();
  res.json({ success: true, data });
};

export const getDistrictAnalytics = (req, res) => {
  const data = AnalyticsService.getDistrictAnalytics();
  res.json({ success: true, count: data.length, data });
};

export const getSkillDemandAnalytics = (req, res) => {
  const data = AnalyticsService.getSkillDemandIntelligence();
  res.json({ success: true, data });
};

export const getCollegeAnalytics = (req, res) => {
  const data = AnalyticsService.getCollegeAnalytics();
  res.json({ success: true, count: data.length, data });
};

export const getPlacementFunnel = (req, res) => {
  const data = AnalyticsService.getPlacementFunnel();
  res.json({ success: true, data });
};
