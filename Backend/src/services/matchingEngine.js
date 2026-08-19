import { SkillService } from './skillService.js';
import { EligibilityService } from './eligibilityService.js';

export const MIN_APPLY_MATCH_THRESHOLD = 86;

export class MatchingEngine {
  /**
   * Adapts various student profile schemas (Supabase, seedData, or raw form)
   * into a standardized internal object.
   */
  static adaptStudentProfile(student = {}) {
    // Extract Skills
    let rawSkills = [];
    if (Array.isArray(student.skills)) {
      rawSkills = student.skills.map(s => {
        if (typeof s === 'string') return s;
        return s.skill_name || s.name || s.normalized_skill || '';
      }).filter(Boolean);
    }

    // Extract Academic Info
    const cgpa = Number(student.cgpa || student.education?.cgpa || student.education?.minimum_cgpa || 7.5);
    const degree = student.degree || student.education?.degree || student.education?.highest_qualification || 'B.Tech';
    const branch = student.branch || student.education?.branch || 'Computer Science & Engineering';

    // Extract Projects & Tech Stacks
    const projects = (student.projects || student.student_projects || []).map(p => {
      let techs = [];
      if (Array.isArray(p.technologies)) {
        techs = p.technologies;
      } else if (Array.isArray(p.tech_stack)) {
        techs = p.tech_stack;
      } else if (typeof p.tech_stack === 'string') {
        techs = p.tech_stack.split(',').map(t => t.trim());
      } else if (typeof p.technologies === 'string') {
        techs = p.technologies.split(',').map(t => t.trim());
      }
      return {
        title: p.title || p.project_name || 'Project',
        technologies: techs
      };
    });

    // Extract Internships / Experience
    const internships = student.internships || (student.experience?.company_name ? [student.experience] : []);

    // Extract Preferences & Location
    const preferredLocations = student.preferredLocations || student.preferences?.preferred_locations || [];
    const preferredRoles = student.preferredRoles || student.preferences?.preferred_roles || [];
    const district = student.district || student.personal?.city || student.personal?.district || student.city || 'Jaipur';

    return {
      id: student.id || student.user_id || 'stu-user',
      name: student.name || student.personal?.full_name || 'Student',
      cgpa,
      degree,
      branch,
      skills: rawSkills,
      projects,
      internships,
      preferredLocations,
      preferredRoles,
      district
    };
  }

  /**
   * Adapts job / opportunity object into standard format
   */
  static adaptJobDetails(job = {}) {
    let requiredSkills = [];
    let preferredSkills = [];

    if (Array.isArray(job.skills)) {
      job.skills.forEach(s => {
        const name = typeof s === 'string' ? s : s.skill_name || s.name || '';
        const isReq = typeof s === 'object' ? (s.requirement_type === 'REQUIRED' || s.is_core || s.isRequired) : true;
        if (isReq) requiredSkills.push(name);
        else preferredSkills.push(name);
      });
    }

    if (requiredSkills.length === 0 && Array.isArray(job.requiredSkills)) {
      requiredSkills = [...job.requiredSkills];
    }
    if (preferredSkills.length === 0 && Array.isArray(job.preferredSkills)) {
      preferredSkills = [...job.preferredSkills];
    }

    return {
      id: job.id,
      title: job.title || '',
      companyName: job.company_name || job.companyName || 'Company',
      type: job.type || (job.opportunity_type === 'JOB' ? 'Job' : 'Internship'),
      workMode: job.work_mode || job.workMode || 'Hybrid',
      location: job.location || `${job.district || 'Jaipur'}, Rajasthan`,
      minCgpa: Number(job.minCgpa || job.education?.minimum_cgpa || 6.0),
      allowedBranches: job.allowedBranches || job.education?.branches || ['Computer Science & Engineering', 'Information Technology'],
      allowedDegrees: job.allowedDegrees || [job.education?.qualification || 'B.Tech'],
      requiredSkills,
      preferredSkills,
      hardRequirements: job.hardRequirements || requiredSkills.slice(0, 2)
    };
  }

  /**
   * Production 6-Factor Dynamic Matching Algorithm
   * Weights:
   * 1. Required Technical Skills: 50%
   * 2. Preferred / Secondary Skills: 15%
   * 3. Academic / CGPA & Degree Eligibility: 15%
   * 4. Project & Portfolio Tech Overlap: 10%
   * 5. Location & Work Mode Fit: 5%
   * 6. Role & Career Preference: 5%
   * Total: 100%
   */
  static calculateMatch(rawStudent, rawJob) {
    if (!rawStudent || !rawJob) {
      throw new Error("Student profile and Job details are required for matching");
    }

    const student = this.adaptStudentProfile(rawStudent);
    const job = this.adaptJobDetails(rawJob);

    // Step 1: Hard Eligibility Check
    const eligibility = EligibilityService.checkEligibility(student, job);

    // Step 2: Normalize Skills
    const studentSkills = SkillService.normalizeSkillList(student.skills || []);
    const requiredSkills = SkillService.normalizeSkillList(job.requiredSkills || []);
    const preferredSkills = SkillService.normalizeSkillList(job.preferredSkills || []);

    // Step 3: Required Technical Skill Matching (Weight: 50%)
    let matchedRequiredCount = 0;
    const matchedSkills = [];
    const missingSkills = [];

    requiredSkills.forEach(req => {
      const isMatch = studentSkills.some(s => s.toLowerCase() === req.toLowerCase());
      const displayName = SkillService.getDisplayName(req);
      if (isMatch) {
        matchedRequiredCount++;
        matchedSkills.push(displayName);
      } else {
        missingSkills.push(displayName);
      }
    });

    const requiredSkillScore = requiredSkills.length > 0
      ? (matchedRequiredCount / requiredSkills.length) * 50
      : 50;

    // Step 4: Preferred Skills Matching (Weight: 15%)
    let matchedPreferredCount = 0;
    const matchedPreferredSkills = [];
    const missingPreferredSkills = [];

    preferredSkills.forEach(pref => {
      const isMatch = studentSkills.some(s => s.toLowerCase() === pref.toLowerCase());
      const displayName = SkillService.getDisplayName(pref);
      if (isMatch) {
        matchedPreferredCount++;
        matchedPreferredSkills.push(displayName);
      } else {
        missingPreferredSkills.push(displayName);
      }
    });

    const preferredSkillScore = preferredSkills.length > 0
      ? (matchedPreferredCount / preferredSkills.length) * 15
      : 15;

    // Step 5: Academic / CGPA & Degree Eligibility (Weight: 15%)
    let educationScore = 8;
    if (student.cgpa >= 8.5) educationScore = 15;
    else if (student.cgpa >= 7.5) educationScore = 13;
    else if (student.cgpa >= 6.5) educationScore = 11;
    else if (student.cgpa >= job.minCgpa) educationScore = 9;

    // Step 6: Project & Portfolio Tech Overlap (Weight: 10%)
    let projectScore = 3;
    const projects = student.projects || [];
    if (projects.length >= 3) projectScore = 7;
    else if (projects.length >= 1) projectScore = 5;

    const projectTechTokens = projects
      .flatMap(p => p.technologies || [])
      .map(t => SkillService.normalizeSkill(t));

    const projectOverlap = requiredSkills.filter(req => projectTechTokens.includes(req.toLowerCase()));
    if (projectOverlap.length > 0) {
      projectScore = Math.min(10, projectScore + 3 + (projectOverlap.length > 1 ? 2 : 0));
    }

    // Step 7: Location & Work Mode Fit (Weight: 5%)
    let locationScore = 3;
    const jobLoc = (job.location || '').toLowerCase();
    const studentPreferredLocs = (student.preferredLocations || []).map(l => l.toLowerCase());
    const studentDistrict = (student.district || '').toLowerCase();
    const isRemote = (job.workMode || '').toLowerCase().includes('remote') || jobLoc.includes('remote');

    if (isRemote || studentPreferredLocs.some(loc => jobLoc.includes(loc) || loc.includes('remote')) || jobLoc.includes(studentDistrict)) {
      locationScore = 5;
    }

    // Step 8: Role & Career Preference (Weight: 5%)
    let careerPreferenceScore = 3;
    const jobTitle = (job.title || '').toLowerCase();
    const studentPreferredRoles = (student.preferredRoles || []).map(r => r.toLowerCase());

    if (studentPreferredRoles.some(role => jobTitle.includes(role) || role.includes(jobTitle))) {
      careerPreferenceScore = 5;
    }

    // Step 9: Aggregate Score Calculation
    let totalScore = Math.round(
      requiredSkillScore +
      preferredSkillScore +
      educationScore +
      projectScore +
      locationScore +
      careerPreferenceScore
    );

    // Hard eligibility cap
    if (!eligibility.eligible) {
      totalScore = Math.min(50, totalScore);
    }

    // Ensure within 0-100 range
    totalScore = Math.max(0, Math.min(100, totalScore));

    // Threshold evaluation (86% threshold)
    const isEligibleToApply = eligibility.eligible && totalScore >= MIN_APPLY_MATCH_THRESHOLD;

    // Match Level Tagging
    let level = "Low Match";
    let recommendation = "SKILL_GAP";

    if (!eligibility.eligible) {
      level = "Ineligible";
      recommendation = "INELIGIBLE";
    } else if (totalScore >= 90) {
      level = "Exceptional Match";
      recommendation = "APPLY";
    } else if (totalScore >= MIN_APPLY_MATCH_THRESHOLD) {
      level = "Strong Match";
      recommendation = "APPLY";
    } else if (totalScore >= 70) {
      level = "Potential Match";
      recommendation = "IMPROVE_SKILLS";
    } else {
      level = "Skill Gap";
      recommendation = "LEARN_PREREQUISITES";
    }

    // Explainable Reasons
    const reasons = [];
    if (requiredSkills.length > 0) {
      reasons.push(`${matchedRequiredCount}/${requiredSkills.length} mandatory core tech skills matched`);
    }
    if (matchedPreferredCount > 0) {
      reasons.push(`${matchedPreferredCount}/${preferredSkills.length} preferred bonus skills matched`);
    }
    if (eligibility.eligible) {
      reasons.push(`Academically eligible (${student.degree} • ${student.cgpa} CGPA)`);
    } else {
      reasons.push(...eligibility.reasons);
    }
    if (projectOverlap.length > 0) {
      reasons.push(`Portfolio projects demonstrate hands-on experience in required stack`);
    }
    if (locationScore === 5) {
      reasons.push(`Location / Work-mode preference aligns (${job.workMode || job.location})`);
    }

    return {
      eligible: eligibility.eligible,
      matchScore: totalScore,
      isEligibleToApply,
      minApplyThreshold: MIN_APPLY_MATCH_THRESHOLD,
      level,
      recommendation,
      matchedSkills,
      missingSkills,
      matchedPreferredSkills,
      missingPreferredSkills,
      requiredSkillStats: {
        matched: matchedRequiredCount,
        total: requiredSkills.length,
        ratio: requiredSkills.length > 0 ? (matchedRequiredCount / requiredSkills.length) : 1
      },
      reasons,
      breakdown: {
        requiredSkills: { score: Math.round(requiredSkillScore), max: 50, label: "Required Tech Skills (50%)" },
        preferredSkills: { score: Math.round(preferredSkillScore), max: 15, label: "Preferred Skills (15%)" },
        education: { score: educationScore, max: 15, label: "Education & CGPA (15%)" },
        projects: { score: projectScore, max: 10, label: "Project & Tech Stack Overlap (10%)" },
        location: { score: locationScore, max: 5, label: "Location Fit (5%)" },
        careerPreference: { score: careerPreferenceScore, max: 5, label: "Career Preference (5%)" }
      }
    };
  }
}
