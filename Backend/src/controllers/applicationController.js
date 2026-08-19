import { ApplicationService } from '../services/applicationService.js';

export const getApplications = (req, res) => {
  const { studentId, jobId, companyId } = req.query;
  let apps = ApplicationService.getAllApplications();

  if (studentId) {
    apps = ApplicationService.getApplicationsByStudent(studentId);
  } else if (jobId) {
    apps = ApplicationService.getApplicationsByJob(jobId);
  } else if (companyId) {
    apps = ApplicationService.getApplicationsByCompany(companyId);
  }

  res.json({ success: true, count: apps.length, data: apps });
};

export const getApplicationById = (req, res) => {
  const { id } = req.params;
  const app = ApplicationService.getApplicationById(id);
  if (!app) {
    return res.status(404).json({ success: false, message: "Application not found" });
  }
  res.json({ success: true, data: app });
};

export const createApplication = async (req, res) => {
  const { studentId, jobId } = req.body;
  if (!studentId || !jobId) {
    return res.status(400).json({ success: false, message: "studentId and jobId are required" });
  }

  try {
    const result = await ApplicationService.createApplication({ studentId, jobId });
    res.status(result.alreadyApplied ? 200 : 201).json({
      success: true,
      message: result.alreadyApplied ? "Already applied for this position" : "Application submitted successfully",
      alreadyApplied: result.alreadyApplied,
      data: result.application
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const updateApplicationStatus = (req, res) => {
  const { id } = req.params;
  const { status, changedBy, note } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: "New status is required" });
  }

  try {
    const updated = ApplicationService.updateApplicationStatus(id, status, { changedBy, note });
    res.json({
      success: true,
      message: `Application status successfully updated to ${status}`,
      data: updated
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
