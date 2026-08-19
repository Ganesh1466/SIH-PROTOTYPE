import { OpportunityService } from '../services/opportunityService.js';
import { initialStudents } from '../utils/seedData.js';
import { MatchingEngine, MIN_APPLY_MATCH_THRESHOLD } from '../services/matchingEngine.js';
import { StudentProfileService } from '../services/studentProfileService.js';

// Format opportunity into student job card format
const formatOpportunityForStudent = (opp) => {
  const isJob = opp.opportunity_type === 'JOB';
  const reqSkills = (opp.skills || [])
    .filter(s => s.requirement_type === 'REQUIRED' || s.is_core || s.isRequired)
    .map(s => typeof s === 'string' ? s : s.skill_name || s.name);

  const prefSkills = (opp.skills || [])
    .filter(s => s.requirement_type === 'PREFERRED' || (!s.is_core && !s.isRequired))
    .map(s => typeof s === 'string' ? s : s.skill_name || s.name);

  const salaryDisplay = isJob
    ? (opp.salary_min && opp.salary_max 
        ? `₹${(opp.salary_min / 100000).toFixed(1)} - ₹${(opp.salary_max / 100000).toFixed(1)} LPA`
        : `₹6.0 - ₹10.0 LPA`)
    : (opp.is_paid 
        ? `₹${(opp.stipend_min || 10000).toLocaleString()} - ₹${(opp.stipend_max || 18000).toLocaleString()} / month`
        : 'Unpaid Internship');

  return {
    id: opp.id,
    companyId: opp.employer_id || 'comp-1',
    companyName: opp.company_name || 'TechNova Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    title: opp.title,
    type: isJob ? 'Job' : 'Internship',
    employmentType: opp.employment_type || (isJob ? 'Full Time' : 'Internship'),
    workMode: opp.work_mode || 'Hybrid',
    location: `${opp.district || 'Jaipur'}, Rajasthan`,
    salary: salaryDisplay,
    experienceLevel: opp.experience_level || (opp.experience_min ? `${opp.experience_min} - ${opp.experience_max} Years` : 'Fresher'),
    minCgpa: opp.education?.minimum_cgpa ? Number(opp.education.minimum_cgpa) : 6.5,
    allowedBranches: opp.education?.branches || ['Computer Science & Engineering', 'Information Technology'],
    allowedDegrees: [opp.education?.qualification || (isJob ? 'B.Tech' : 'B.Tech / BCA')],
    description: opp.description,
    responsibilities: opp.responsibilities || [
      'Work with engineering teams on real-world industry products.',
      'Develop modular and clean frontend/backend architectures.',
      'Participate in agile sprints and code reviews.'
    ],
    requiredSkills: reqSkills.length > 0 ? reqSkills : ['React.js', 'JavaScript'],
    preferredSkills: prefSkills.length > 0 ? prefSkills : [],
    hardRequirements: reqSkills.slice(0, 2),
    postedDate: opp.created_at ? opp.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
    deadline: opp.application_deadline || '2026-10-30',
    openPositions: opp.max_applications ? Number(opp.max_applications) : 3,
    status: opp.status === 'PUBLISHED' ? 'Active' : 'Draft',
    applicantsCount: opp.applications_count || 0
  };
};

export const getAllJobs = async (req, res) => {
  try {
    const { type, location, search, workMode, eligibleOnly, studentId = 'stu-1' } = req.query;

    // 1. Fetch Student Profile for dynamic matching
    let student = null;
    try {
      student = await StudentProfileService.getProfile(studentId);
    } catch (e) {
      console.warn("Notice: Student profile lookup fallback", e.message);
    }

    if (!student || !student.skills || student.skills.length === 0) {
      student = initialStudents.find(s => s.id === studentId) || initialStudents[0];
    }

    // 2. Fetch live published opportunities strictly created by companies in Supabase / OpportunityService
    const liveOpportunities = await OpportunityService.getAllOpportunities(null, { status: 'PUBLISHED' });
    const formattedLiveJobs = liveOpportunities.map(formatOpportunityForStudent);

    // 3. Calculate real-time dynamic match scores for each real company job
    const enrichedJobs = formattedLiveJobs.map(job => {
      try {
        const matchResult = MatchingEngine.calculateMatch(student, job);
        return {
          ...job,
          matchScore: matchResult.matchScore,
          isEligibleToApply: matchResult.isEligibleToApply,
          minApplyThreshold: MIN_APPLY_MATCH_THRESHOLD,
          matchLevel: matchResult.level,
          recommendation: matchResult.recommendation,
          matchedSkills: matchResult.matchedSkills,
          missingSkills: matchResult.missingSkills,
          matchedPreferredSkills: matchResult.matchedPreferredSkills,
          missingPreferredSkills: matchResult.missingPreferredSkills,
          matchReasons: matchResult.reasons,
          matchBreakdown: matchResult.breakdown
        };
      } catch (err) {
        return {
          ...job,
          matchScore: 75,
          isEligibleToApply: false,
          minApplyThreshold: MIN_APPLY_MATCH_THRESHOLD,
          matchLevel: "Potential Match",
          recommendation: "IMPROVE_SKILLS",
          matchedSkills: job.requiredSkills?.slice(0, 1) || [],
          missingSkills: job.requiredSkills?.slice(1) || [],
          matchReasons: ["Standard match evaluation"],
          matchBreakdown: {}
        };
      }
    });

    let filtered = enrichedJobs;

    // Filters
    if (type && type.toLowerCase() !== 'all') {
      filtered = filtered.filter(j => j.type.toLowerCase() === type.toLowerCase());
    }

    if (workMode && workMode.toLowerCase() !== 'all') {
      filtered = filtered.filter(j => j.workMode.toLowerCase().includes(workMode.toLowerCase()));
    }

    if (location && location.toLowerCase() !== 'all') {
      filtered = filtered.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
    }

    if (eligibleOnly === 'true') {
      filtered = filtered.filter(j => j.isEligibleToApply);
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(j => 
        j.title.toLowerCase().includes(s) || 
        j.companyName.toLowerCase().includes(s) ||
        (j.requiredSkills || []).some(sk => sk.toLowerCase().includes(s))
      );
    }

    // Sort by match score descending
    filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error("Failed to load jobs:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId = 'stu-1' } = req.query;

    let student = null;
    try {
      student = await StudentProfileService.getProfile(studentId);
    } catch (e) {}

    if (!student || !student.skills || student.skills.length === 0) {
      student = initialStudents.find(s => s.id === studentId) || initialStudents[0];
    }

    // Check live company opportunity
    const opp = await OpportunityService.getOpportunityById(id);
    if (!opp) {
      return res.status(404).json({ success: false, message: "Job opportunity not found" });
    }

    const job = formatOpportunityForStudent(opp);
    const matchResult = MatchingEngine.calculateMatch(student, job);

    const enrichedJob = {
      ...job,
      matchScore: matchResult.matchScore,
      isEligibleToApply: matchResult.isEligibleToApply,
      minApplyThreshold: MIN_APPLY_MATCH_THRESHOLD,
      matchLevel: matchResult.level,
      recommendation: matchResult.recommendation,
      matchedSkills: matchResult.matchedSkills,
      missingSkills: matchResult.missingSkills,
      matchedPreferredSkills: matchResult.matchedPreferredSkills,
      missingPreferredSkills: matchResult.missingPreferredSkills,
      matchReasons: matchResult.reasons,
      matchBreakdown: matchResult.breakdown
    };

    return res.json({ success: true, data: enrichedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch job details" });
  }
};


export const createJob = (req, res) => {
  // Legacy alias
  return res.status(200).json({ success: true, message: "Use /api/employer/opportunities" });
};

export const updateJobStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await OpportunityService.updateStatus(id, status);
  res.json({ success: true, message: `Opportunity status updated`, data: updated });
};

