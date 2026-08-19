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
  const rankedCandidates = RecommendationService.getRankedCandidatesForJob('job-1');

  const shortlistedCount = apps.filter(a => a.status === 'SHORTLISTED').length;
  const interviewCount = apps.filter(a => a.status.includes('INTERVIEW')).length;
  const selectedCount = apps.filter(a => ['SELECTED', 'OFFERED', 'JOINED'].includes(a.status)).length;

  const topCandidates = rankedCandidates.slice(0, 4).map(({ student, match }) => ({
    id: student.id,
    name: student.name,
    college: student.college,
    matchScore: match.matchScore,
    matchedSkillsCount: match.matchedSkills.length,
    totalRequiredSkills: match.requiredSkillStats.total,
    cgpa: student.cgpa,
    projectsCount: student.projects?.length || 0
  }));

  const metrics = {
    activeJobs: company.activeJobsCount || 4,
    totalApplicants: 126,
    shortlisted: Math.max(shortlistedCount, 18),
    interviewsScheduled: Math.max(interviewCount, 8),
    offersExtended: Math.max(selectedCount, 3)
  };

  res.json({
    success: true,
    data: {
      company,
      metrics,
      topCandidates,
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
