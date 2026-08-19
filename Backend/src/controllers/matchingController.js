import { MatchingEngine } from '../services/matchingEngine.js';
import { initialStudents, initialJobs } from '../utils/seedData.js';
import { StudentProfileService } from '../services/studentProfileService.js';
import { OpportunityService } from '../services/opportunityService.js';

export const calculateMatch = async (req, res) => {
  const { studentId = 'stu-1', jobId, studentProfile, jobRequirements } = req.body;

  try {
    let student = studentProfile;
    let job = jobRequirements;

    if (!student && studentId) {
      student = await StudentProfileService.getProfile(studentId);
      if (!student || !student.skills || student.skills.length === 0) {
        student = initialStudents.find(s => s.id === studentId) || student;
      }
    }

    if (!job && jobId) {
      job = await OpportunityService.getOpportunityById(jobId);
      if (!job) {
        job = initialJobs.find(j => j.id === jobId);
      }
    }

    if (!student || !job) {
      return res.status(400).json({
        success: false,
        message: "Valid student and job details or identifiers are required for match calculation"
      });
    }

    const match = MatchingEngine.calculateMatch(student, job);
    res.json({
      success: true,
      data: {
        studentId: student.id || studentId,
        jobId: job.id || jobId,
        jobTitle: job.title,
        companyName: job.company_name || job.companyName,
        ...match
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

