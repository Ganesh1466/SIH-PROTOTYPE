import { SkillGapService } from '../services/skillGapService.js';
import { initialStudents } from '../utils/seedData.js';

export const getLearningRoadmap = (req, res) => {
  const { studentId = "stu-1", targetRole = "Frontend Developer" } = req.query;
  const student = initialStudents.find(s => s.id === studentId) || initialStudents[0];

  const analysis = SkillGapService.analyzeSkillGap(student, targetRole);
  res.json({ success: true, data: analysis });
};
