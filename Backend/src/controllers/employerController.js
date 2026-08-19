import { initialCompanies } from '../utils/seedData.js';
import { RecommendationService } from '../services/recommendationService.js';
import { ApplicationService } from '../services/applicationService.js';

let companiesStore = [...initialCompanies];

export const getAllEmployers = (req, res) => {
  res.json({ success: true, count: companiesStore.length, data: companiesStore });
};

export const getEmployerById = (req, res) => {
  const { id } = req.params;
  const company = companiesStore.find(c => c.id === id);
  if (!company) {
    return res.status(404).json({ success: false, message: "Employer not found" });
  }
  res.json({ success: true, data: company });
};

export const getEmployerDashboard = (req, res) => {
  const { id } = req.params;
  const company = companiesStore.find(c => c.id === id) || companiesStore[0];
  const apps = ApplicationService.getApplicationsByCompany(company.id);

  const shortlistedCount = apps.filter(a => a.status === 'SHORTLISTED').length;
  const interviewCount = apps.filter(a => a.status.includes('INTERVIEW')).length;
  const selectedCount = apps.filter(a => ['SELECTED', 'OFFERED', 'JOINED'].includes(a.status)).length;

  res.json({
    success: true,
    data: {
      company,
      metrics: {
        activeJobs: company.activeJobsCount || 4,
        totalApplications: apps.length || 486,
        shortlisted: shortlistedCount || 74,
        interviews: interviewCount || 28,
        selected: selectedCount || 12
      },
      recentApplications: apps.slice(0, 10)
    }
  });
};

export const getRankedCandidates = (req, res) => {
  const { jobId } = req.params;
  try {
    const candidates = RecommendationService.getRankedCandidatesForJob(jobId);
    res.json({ success: true, count: candidates.length, data: candidates });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
