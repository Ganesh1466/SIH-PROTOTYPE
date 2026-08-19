/**
 * Normalizes user-input skills into canonical display names and tokens
 * e.g., 'React.js', 'ReactJS', 'React JS', 'react' -> Canonical: 'React.js' (token: 'reactjs')
 */

const CANONICAL_MAP = {
  // Frontend
  'react': { token: 'reactjs', name: 'React.js' },
  'react.js': { token: 'reactjs', name: 'React.js' },
  'reactjs': { token: 'reactjs', name: 'React.js' },
  'react js': { token: 'reactjs', name: 'React.js' },
  'vue': { token: 'vuejs', name: 'Vue.js' },
  'vue.js': { token: 'vuejs', name: 'Vue.js' },
  'vuejs': { token: 'vuejs', name: 'Vue.js' },
  'angular': { token: 'angular', name: 'Angular' },
  'angularjs': { token: 'angular', name: 'Angular' },
  'next': { token: 'nextjs', name: 'Next.js' },
  'next.js': { token: 'nextjs', name: 'Next.js' },
  'nextjs': { token: 'nextjs', name: 'Next.js' },
  'javascript': { token: 'javascript', name: 'JavaScript' },
  'js': { token: 'javascript', name: 'JavaScript' },
  'typescript': { token: 'typescript', name: 'TypeScript' },
  'ts': { token: 'typescript', name: 'TypeScript' },
  'html': { token: 'html5', name: 'HTML5' },
  'html5': { token: 'html5', name: 'HTML5' },
  'css': { token: 'css3', name: 'CSS3' },
  'css3': { token: 'css3', name: 'CSS3' },
  'tailwind': { token: 'tailwindcss', name: 'Tailwind CSS' },
  'tailwindcss': { token: 'tailwindcss', name: 'Tailwind CSS' },
  'tailwind css': { token: 'tailwindcss', name: 'Tailwind CSS' },
  'bootstrap': { token: 'bootstrap', name: 'Bootstrap' },
  'redux': { token: 'redux', name: 'Redux' },
  'redux toolkit': { token: 'redux', name: 'Redux' },

  // Backend
  'node': { token: 'nodejs', name: 'Node.js' },
  'node.js': { token: 'nodejs', name: 'Node.js' },
  'nodejs': { token: 'nodejs', name: 'Node.js' },
  'express': { token: 'expressjs', name: 'Express.js' },
  'express.js': { token: 'expressjs', name: 'Express.js' },
  'expressjs': { token: 'expressjs', name: 'Express.js' },
  'nest': { token: 'nestjs', name: 'NestJS' },
  'nestjs': { token: 'nestjs', name: 'NestJS' },
  'django': { token: 'django', name: 'Django' },
  'flask': { token: 'flask', name: 'Flask' },
  'fastapi': { token: 'fastapi', name: 'FastAPI' },
  'spring': { token: 'springboot', name: 'Spring Boot' },
  'springboot': { token: 'springboot', name: 'Spring Boot' },
  'spring boot': { token: 'springboot', name: 'Spring Boot' },
  'java': { token: 'java', name: 'Java' },
  'python': { token: 'python', name: 'Python' },
  'python3': { token: 'python', name: 'Python' },
  'c++': { token: 'cpp', name: 'C++' },
  'cpp': { token: 'cpp', name: 'C++' },
  'c#': { token: 'csharp', name: 'C#' },
  'golang': { token: 'go', name: 'Golang' },
  'go': { token: 'go', name: 'Golang' },
  'php': { token: 'php', name: 'PHP' },
  'laravel': { token: 'laravel', name: 'Laravel' },

  // Databases & Cloud
  'sql': { token: 'sql', name: 'SQL' },
  'mysql': { token: 'mysql', name: 'MySQL' },
  'postgresql': { token: 'postgresql', name: 'PostgreSQL' },
  'postgres': { token: 'postgresql', name: 'PostgreSQL' },
  'mongodb': { token: 'mongodb', name: 'MongoDB' },
  'mongo': { token: 'mongodb', name: 'MongoDB' },
  'redis': { token: 'redis', name: 'Redis' },
  'supabase': { token: 'supabase', name: 'Supabase' },
  'firebase': { token: 'firebase', name: 'Firebase' },
  'docker': { token: 'docker', name: 'Docker' },
  'kubernetes': { token: 'kubernetes', name: 'Kubernetes' },
  'k8s': { token: 'kubernetes', name: 'Kubernetes' },
  'aws': { token: 'aws', name: 'AWS' },
  'gcp': { token: 'gcp', name: 'GCP' },
  'azure': { token: 'azure', name: 'Azure' },
  'git': { token: 'git', name: 'Git' },
  'github': { token: 'git', name: 'Git' },
  'rest': { token: 'restapi', name: 'REST API' },
  'rest api': { token: 'restapi', name: 'REST API' },
  'restful api': { token: 'restapi', name: 'REST API' },
  'graphql': { token: 'graphql', name: 'GraphQL' }
};

export const normalizeSkillToken = (rawSkill = '') => {
  if (!rawSkill || typeof rawSkill !== 'string') return '';
  const clean = rawSkill.trim().toLowerCase();
  return CANONICAL_MAP[clean]?.token || clean.replace(/[^a-z0-9+#.-]/g, '');
};

export const normalizeSkillDisplayName = (rawSkill = '') => {
  if (!rawSkill || typeof rawSkill !== 'string') return '';
  const clean = rawSkill.trim().toLowerCase();
  return CANONICAL_MAP[clean]?.name || rawSkill.trim();
};

export const normalizeSkill = (rawSkill = '') => {
  return normalizeSkillToken(rawSkill);
};

export const normalizeSkillList = (skills = []) => {
  if (!Array.isArray(skills)) return [];
  const tokenSet = new Set();
  const result = [];

  for (const item of skills) {
    const rawName = typeof item === 'string' ? item : item.skill_name || item.name || '';
    if (!rawName) continue;

    const token = normalizeSkillToken(rawName);
    const displayName = normalizeSkillDisplayName(rawName);

    if (!tokenSet.has(token)) {
      tokenSet.add(token);
      result.push(typeof item === 'string' ? {
        skill_name: displayName,
        normalized_skill: token,
        skill_level: 'Intermediate',
        years_experience: 1
      } : {
        ...item,
        skill_name: displayName,
        normalized_skill: token
      });
    }
  }

  return result;
};

