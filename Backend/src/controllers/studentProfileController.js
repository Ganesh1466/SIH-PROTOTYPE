import { StudentProfileService } from '../services/studentProfileService.js';
import { validateStudentProfile } from '../validators/studentProfileValidator.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr-student-live-01';
    const profile = await StudentProfileService.getProfile(userId);
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load student profile.",
      error: error.message
    });
  }
};

export const saveProfile = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr-student-live-01';
    const payload = req.body;

    // Server-side validation
    const { isValid, errors } = validateStudentProfile(payload);
    if (!isValid) {
      return res.status(422).json({
        success: false,
        message: "Profile validation failed.",
        errors
      });
    }

    const savedProfile = await StudentProfileService.saveProfile(userId, payload);
    res.json({
      success: true,
      message: "Profile saved successfully.",
      data: savedProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile could not be saved. Please try again.",
      error: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  return saveProfile(req, res);
};

export const addSkill = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr-student-live-01';
    const { skill_name, skill_level, years_experience } = req.body;

    if (!skill_name || skill_name.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Skill name is required." });
    }

    const updated = await StudentProfileService.addSkill(userId, {
      skill_name,
      skill_level: skill_level || 'Intermediate',
      years_experience: years_experience || 1
    });

    res.json({
      success: true,
      message: "Skill added successfully.",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add skill.",
      error: error.message
    });
  }
};

export const removeSkill = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr-student-live-01';
    const { skillKey } = req.params;

    const updated = await StudentProfileService.removeSkill(userId, skillKey);
    res.json({
      success: true,
      message: "Skill removed successfully.",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove skill.",
      error: error.message
    });
  }
};
