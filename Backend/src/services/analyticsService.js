import { 
  rajasthanDistricts, 
  rajasthanColleges, 
  skillDemandData, 
  placementFunnel,
  initialStudents,
  initialJobs,
  initialCompanies
} from '../utils/seedData.js';
import { ApplicationService } from './applicationService.js';

export class AnalyticsService {
  static getGovernmentOverview() {
    const totalStudents = 42850;
    const activeEmployers = 1284;
    const totalOpportunities = 8640;
    const overallPlacementRate = 78;

    const allApps = ApplicationService.getAllApplications();

    return {
      metrics: {
        totalStudents,
        activeEmployers,
        totalOpportunities,
        overallPlacementRate,
        registeredColleges: 142,
        verifiedCertifications: 68420,
        averagePackageLPA: "₹6.4 LPA",
        internshipToJobConversion: "64%"
      },
      districts: rajasthanDistricts,
      colleges: rajasthanColleges,
      skillDemand: skillDemandData,
      placementFunnel: placementFunnel,
      recentActivity: allApps.slice(0, 8),
      monthlyPlacementTrend: [
        { month: "Jan 2026", placed: 620, target: 550 },
        { month: "Feb 2026", placed: 780, target: 700 },
        { month: "Mar 2026", placed: 940, target: 850 },
        { month: "Apr 2026", placed: 1120, target: 1000 },
        { month: "May 2026", placed: 1280, target: 1100 },
        { month: "Jun 2026", placed: 1450, target: 1300 },
        { month: "Jul 2026", placed: 1680, target: 1500 },
        { month: "Aug 2026", placed: 1840, target: 1650 }
      ]
    };
  }

  static getDistrictAnalytics() {
    return rajasthanDistricts;
  }

  static getSkillDemandIntelligence() {
    return {
      skills: skillDemandData,
      priorityGaps: skillDemandData.filter(s => s.priority.includes("Critical") || s.priority.includes("High")),
      analysisSummary: "Cloud / DevOps and Data Science represent the highest supply-demand deficits in Rajasthan technical colleges."
    };
  }

  static getCollegeAnalytics() {
    return rajasthanColleges;
  }

  static getPlacementFunnel() {
    return placementFunnel;
  }
}
