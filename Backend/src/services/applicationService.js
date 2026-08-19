import { initialApplications, initialStudents, initialJobs } from '../utils/seedData.js';
import { MatchingEngine, MIN_APPLY_MATCH_THRESHOLD } from './matchingEngine.js';
import { NotificationService } from './notificationService.js';
import { StudentProfileService } from './studentProfileService.js';
import { OpportunityService } from './opportunityService.js';

let applicationsStore = [...initialApplications];

export class ApplicationService {
  static getAllApplications() {
    return applicationsStore;
  }

  static getApplicationsByStudent(studentId) {
    return applicationsStore
      .filter(app => app.studentId === studentId)
      .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
  }

  static getApplicationsByJob(jobId) {
    return applicationsStore
      .filter(app => app.jobId === jobId)
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }

  static getApplicationsByCompany(companyId) {
    // Find all jobs by company
    const companyJobs = initialJobs.filter(j => j.companyId === companyId).map(j => j.id);
    return applicationsStore.filter(app => companyJobs.includes(app.jobId));
  }

  static getApplicationById(id) {
    return applicationsStore.find(app => app.id === id);
  }

  static async createApplication({ studentId, jobId }) {
    // Check if already applied
    const existing = applicationsStore.find(a => a.studentId === studentId && a.jobId === jobId);
    if (existing) {
      return { application: existing, alreadyApplied: true };
    }

    let student = await StudentProfileService.getProfile(studentId);
    if (!student || !student.skills || student.skills.length === 0) {
      student = initialStudents.find(s => s.id === studentId) || initialStudents[0];
    }

    let job = await OpportunityService.getOpportunityById(jobId);
    if (!job) {
      job = initialJobs.find(j => j.id === jobId);
    }

    if (!student || !job) {
      throw new Error("Invalid student or job identifier");
    }

    // Calculate match score on backend
    const match = MatchingEngine.calculateMatch(student, job);

    if (match.matchScore < MIN_APPLY_MATCH_THRESHOLD) {
      throw new Error(`Application blocked: A minimum match score of ${MIN_APPLY_MATCH_THRESHOLD}% is required to apply for this role. Your current fit score is ${match.matchScore}%. Please complete recommended learning modules first.`);
    }


    const newApp = {
      id: `app-${Date.now()}`,
      studentId: student.id,
      jobId: job.id,
      studentName: student.name,
      studentAvatar: student.avatar,
      studentCollege: student.college,
      studentBranch: student.branch,
      studentCgpa: student.cgpa,
      jobTitle: job.title,
      companyId: job.companyId,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      status: "APPLIED",
      appliedDate: new Date().toISOString(),
      matchScore: match.matchScore,
      matchLevel: match.level,
      eligible: match.eligible,
      history: [
        {
          status: "APPLIED",
          changedBy: `${student.name} (Student)`,
          timestamp: new Date().toISOString(),
          note: `Application submitted with ${match.matchScore}% explainable fit score.`
        }
      ]
    };

    applicationsStore.unshift(newApp);

    // Notification to student
    NotificationService.createNotification({
      userId: student.id,
      title: `Application Submitted: ${job.title}`,
      message: `Your application to ${job.companyName} has been received and is under review.`,
      type: "APPLICATION",
      actionUrl: "/student/applications"
    });

    return { application: newApp, alreadyApplied: false };
  }

  static updateApplicationStatus(applicationId, newStatus, { changedBy = "Employer Talent Team", note = "" } = {}) {
    const app = applicationsStore.find(a => a.id === applicationId);
    if (!app) {
      throw new Error("Application not found");
    }

    const oldStatus = app.status;
    app.status = newStatus;

    // Log history
    app.history.push({
      status: newStatus,
      changedBy,
      timestamp: new Date().toISOString(),
      note: note || `Status transitioned from ${oldStatus} to ${newStatus}`
    });

    // Automatic Smart Notifications based on state
    if (newStatus === "SHORTLISTED") {
      NotificationService.createNotification({
        userId: app.studentId,
        title: `🎉 You have been Shortlisted!`,
        message: `${app.companyName} has shortlisted your profile for ${app.jobTitle}.`,
        type: "SHORTLIST",
        actionUrl: "/student/applications"
      });
    } else if (newStatus === "SELECTED") {
      NotificationService.createNotification({
        userId: app.studentId,
        title: `🎉 Congratulations! Selected for ${app.jobTitle}`,
        message: `${app.companyName} has selected you following the evaluation rounds.`,
        type: "SELECTION",
        actionUrl: "/student/applications"
      });
    } else if (newStatus === "OFFERED") {
      NotificationService.createNotification({
        userId: app.studentId,
        title: `📜 Job Offer Received!`,
        message: `${app.companyName} has rolled out an official employment offer for ${app.jobTitle}.`,
        type: "OFFER",
        actionUrl: "/student/applications"
      });
    } else if (newStatus === "JOINED") {
      NotificationService.createNotification({
        userId: app.studentId,
        title: `🏛️ Placement Confirmed with Rajasthan Tech Ed`,
        message: `Your placement at ${app.companyName} is registered in the state employment portal.`,
        type: "PLACEMENT",
        actionUrl: "/student/applications"
      });
    }

    return app;
  }
}
