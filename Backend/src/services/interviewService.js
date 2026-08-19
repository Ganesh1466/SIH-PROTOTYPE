import { initialInterviews } from '../utils/seedData.js';
import { NotificationService } from './notificationService.js';

let interviewsStore = [...initialInterviews];

export class InterviewService {
  static getAllInterviews() {
    return interviewsStore;
  }

  static getInterviewsForStudent(studentId) {
    return interviewsStore.filter(i => i.studentId === studentId);
  }

  static getInterviewsForEmployer(companyId) {
    return interviewsStore.filter(i => i.companyId === companyId);
  }

  static scheduleInterview(data) {
    const {
      applicationId,
      studentId,
      studentName,
      companyId,
      companyName,
      jobTitle,
      roundName = "Technical Round 1",
      interviewType = "Video Call",
      date,
      time,
      meetingLink = "https://meet.google.com/raj-sih-demo",
      interviewerName = "Hiring Lead",
      notes = ""
    } = data;

    const newInterview = {
      id: `int-${Date.now()}`,
      applicationId,
      studentId,
      studentName,
      companyId,
      companyName,
      jobTitle,
      roundName,
      interviewType,
      date,
      time,
      meetingLink,
      interviewerName,
      status: "SCHEDULED",
      notes,
      createdAt: new Date().toISOString()
    };

    interviewsStore.unshift(newInterview);

    // Automatically notify student
    NotificationService.createNotification({
      userId: studentId,
      title: `📅 Interview Scheduled: ${jobTitle}`,
      message: `${companyName} has scheduled your ${roundName} on ${date} at ${time}.`,
      type: "INTERVIEW",
      actionUrl: "/student/interviews"
    });

    return newInterview;
  }

  static updateInterviewStatus(interviewId, status, feedback = {}) {
    const interview = interviewsStore.find(i => i.id === interviewId);
    if (!interview) {
      throw new Error("Interview not found");
    }

    interview.status = status;
    interview.feedback = feedback;
    interview.updatedAt = new Date().toISOString();

    return interview;
  }
}
