import { SkillService } from './skillService.js';

export class EligibilityService {
  /**
   * Checks hard constraints: Degree, Branch, CGPA, and Hard-requirement skills.
   */
  static checkEligibility(student, job) {
    const reasons = [];
    const missingHardRequirements = [];
    let eligible = true;

    // 1. CGPA check
    if (job.minCgpa && student.cgpa < job.minCgpa) {
      eligible = false;
      reasons.push(`CGPA (${student.cgpa}) is below minimum requirement of ${job.minCgpa}`);
    }

    // 2. Degree check
    if (job.allowedDegrees && job.allowedDegrees.length > 0) {
      const studentDegree = (student.degree || '').toLowerCase();
      const degreeMatched = job.allowedDegrees.some(d => studentDegree.includes(d.toLowerCase()));
      if (!degreeMatched) {
        eligible = false;
        reasons.push(`Degree (${student.degree}) does not match required degrees: ${job.allowedDegrees.join(', ')}`);
      }
    }

    // 3. Branch check
    if (job.allowedBranches && job.allowedBranches.length > 0) {
      const isAllBranchAllowed = job.allowedBranches.some(b => b.toLowerCase().includes('all'));
      if (!isAllBranchAllowed) {
        const studentBranch = (student.branch || '').toLowerCase();
        const branchMatched = job.allowedBranches.some(b => studentBranch.includes(b.toLowerCase()) || b.toLowerCase().includes(studentBranch));
        if (!branchMatched) {
          eligible = false;
          reasons.push(`Branch (${student.branch}) is not in eligible branches: ${job.allowedBranches.join(', ')}`);
        }
      }
    }

    // 4. Hard Requirement Skills Check (Strict Disqualifier)
    const normalizedStudentSkills = SkillService.normalizeSkillList(student.skills || []);
    const normalizedHardRequirements = SkillService.normalizeSkillList(job.hardRequirements || []);

    normalizedHardRequirements.forEach(reqSkill => {
      const hasSkill = normalizedStudentSkills.some(s => s.toLowerCase() === reqSkill.toLowerCase());
      if (!hasSkill) {
        missingHardRequirements.push(reqSkill);
      }
    });

    if (missingHardRequirements.length > 0) {
      eligible = false;
      reasons.push(`Missing mandatory hard-requirement skills: ${missingHardRequirements.join(', ')}`);
    }

    return {
      eligible,
      reasons: reasons.length > 0 ? reasons : ['Meets all minimum academic, branch, and mandatory skill prerequisites'],
      missingHardRequirements
    };
  }
}
