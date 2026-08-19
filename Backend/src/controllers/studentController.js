import { initialStudents } from '../utils/seedData.js';
import { RecommendationService } from '../services/recommendationService.js';
import { SkillGapService } from '../services/skillGapService.js';

let studentsStore = [...initialStudents];

export const getAllStudents = (req, res) => {
  res.json({ success: true, count: studentsStore.length, data: studentsStore });
};

export const getStudentById = (req, res) => {
  const { id } = req.params;
  const student = studentsStore.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }
  res.json({ success: true, data: student });
};

export const updateStudentProfile = (req, res) => {
  const { id } = req.params;
  const index = studentsStore.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  studentsStore[index] = {
    ...studentsStore[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({ success: true, message: "Profile updated successfully", data: studentsStore[index] });
};

export const getStudentRecommendations = (req, res) => {
  const { id } = req.params;
  try {
    const recommendations = RecommendationService.getRecommendedJobsForStudent(id);
    res.json({ success: true, count: recommendations.length, data: recommendations });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getStudentSkillGap = (req, res) => {
  const { id } = req.params;
  const { role } = req.query;
  const student = studentsStore.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }
  const result = SkillGapService.analyzeSkillGap(student, role || "Frontend Developer");
  res.json({ success: true, data: result });
};
