import { initialStudents, initialJobs } from '../utils/seedData.js';
import { MatchingEngine } from './matchingEngine.js';

export class RecommendationService {
  /**
   * Ranked job recommendations for a student.
   */
  static getRecommendedJobsForStudent(studentId) {
    const student = initialStudents.find(s => s.id === studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    const recommendations = initialJobs.map(job => {
      const matchResult = MatchingEngine.calculateMatch(student, job);
      return {
        job,
        match: matchResult
      };
    });

    // Sort by match score descending
    recommendations.sort((a, b) => b.match.matchScore - a.match.matchScore);

    return recommendations;
  }

  /**
   * Ranked candidate list for an employer job.
   */
  static getRankedCandidatesForJob(jobId) {
    const job = initialJobs.find(j => j.id === jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    const ranked = initialStudents.map(student => {
      const matchResult = MatchingEngine.calculateMatch(student, job);
      return {
        student,
        match: matchResult
      };
    });

    // Sort by match score descending
    ranked.sort((a, b) => b.match.matchScore - a.match.matchScore);

    return ranked;
  }
}
