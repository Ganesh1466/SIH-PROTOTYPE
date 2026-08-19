/**
 * Server-side validation for Student Career Passport
 */

export const validateStudentProfile = (payload = {}) => {
  const errors = {};
  const personal = payload.personal || {};
  const education = payload.education || {};
  const skills = Array.isArray(payload.skills) ? payload.skills : [];
  const projects = Array.isArray(payload.projects) ? payload.projects : [];
  const experience = payload.experience || { experience_type: 'fresher' };
  const preferences = payload.preferences || {};

  // 1. Personal Information Validation
  if (!personal.full_name || typeof personal.full_name !== 'string' || personal.full_name.trim().length < 2) {
    errors.full_name = "Full Name is required (minimum 2 characters).";
  }

  if (!personal.email || typeof personal.email !== 'string') {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personal.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
  }

  // Mobile number (10 digits if provided)
  if (personal.phone) {
    const cleanPhone = String(personal.phone).replace(/\D/g, '');
    if (cleanPhone.length > 0 && cleanPhone.length !== 10) {
      errors.phone = "Enter a valid 10-digit mobile number.";
    }
  }

  // 2. Education (Provide defaults if partially empty)
  if (education.cgpa !== undefined && education.cgpa !== null && education.cgpa !== '') {
    const cgpaNum = parseFloat(education.cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      errors.cgpa = "CGPA must be between 0.0 and 10.0.";
    }
  }

  // 3. Projects Validation (only validate if project object has name entered)
  if (projects.length > 0) {
    projects.forEach((proj, idx) => {
      if (proj.project_name && proj.project_name.trim().length > 0) {
        if (proj.description && proj.description.trim().length > 0 && proj.description.trim().length < 10) {
          errors[`project_${idx}_desc`] = `Project #${idx + 1} description should be at least 10 characters.`;
        }
        if (proj.github_url && !/^https?:\/\/.+/.test(proj.github_url)) {
          errors[`project_${idx}_github`] = `Project #${idx + 1} GitHub URL must start with http:// or https://`;
        }
      }
    });
  }

  // 4. Experience Validation
  if (experience.experience_type !== 'fresher' && experience.experience_type) {
    if (!experience.company_name && experience.role) {
      errors.exp_company = "Company name is required for experience.";
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
};
