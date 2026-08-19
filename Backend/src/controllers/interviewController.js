import { InterviewService } from '../services/interviewService.js';
import { ApplicationService } from '../services/applicationService.js';

export const getInterviews = (req, res) => {
  const { studentId, companyId } = req.query;
  let interviews = InterviewService.getAllInterviews();

  if (studentId) {
    interviews = InterviewService.getInterviewsForStudent(studentId);
  } else if (companyId) {
    interviews = InterviewService.getInterviewsForEmployer(companyId);
  }

  res.json({ success: true, count: interviews.length, data: interviews });
};

export const scheduleInterview = (req, res) => {
  const {
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
    notes
  } = req.body;

  if (!applicationId || !date || !time) {
    return res.status(400).json({ success: false, message: "applicationId, date, and time are required" });
  }

  try {
    const interview = InterviewService.scheduleInterview({
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
      notes
    });

    // Update application status to INTERVIEW_SCHEDULED
    ApplicationService.updateApplicationStatus(
      applicationId, 
      "INTERVIEW_SCHEDULED", 
      { changedBy: companyName || "Employer", note: `${roundName || 'Interview'} scheduled for ${date} at ${time}` }
    );

    res.status(201).json({
      success: true,
      message: "Interview scheduled successfully and notification sent to student",
      data: interview
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
