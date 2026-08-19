import { normalizeSkillToken, normalizeSkillDisplayName } from '../utils/skillNormalizer.js';
import { standardSkills } from '../utils/seedData.js';

export class SkillService {
  static normalizeSkill(skillName) {
    if (!skillName || typeof skillName !== 'string') return '';
    return normalizeSkillToken(skillName);
  }

  static getDisplayName(skillName) {
    if (!skillName || typeof skillName !== 'string') return '';
    return normalizeSkillDisplayName(skillName);
  }

  static normalizeSkillList(skills = []) {
    if (!Array.isArray(skills)) return [];
    const normalizedSet = new Set();
    skills.forEach(s => {
      const raw = typeof s === 'string' ? s : (s.skill_name || s.name || s.normalized_skill || '');
      const normalized = this.normalizeSkill(raw);
      if (normalized) normalizedSet.add(normalized);
    });
    return Array.from(normalizedSet);
  }

  static getAllStandardSkills() {
    return standardSkills;
  }

  static getSkillCategory(skillName) {
    const normalized = this.normalizeSkill(skillName);
    const found = standardSkills.find(s => this.normalizeSkill(s.name) === normalized);
    return found ? found.category : 'General';
  }
}

