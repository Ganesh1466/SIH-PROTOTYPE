// ====================================================================================
// RAJASTHAN STUDENT EMPLOYMENT INTELLIGENCE CONSTANTS & MOCK SEED DATA
// ====================================================================================

export const STUDENT_KPIS = {
  totalStudents: 24850,
  totalStudentsGrowth: '+12.4% from previous quarter',
  verifiedStudents: 21430,
  verifiedRate: '86.2% verification rate',
  placementReady: 16280,
  placementReadyRate: '65.5% talent pipeline',
  studentsPlaced: 8940,
  placedGrowth: '+18.2% annual growth',
  avgMatchScore: 84.6,
  matchScoreLabel: 'High algorithmic alignment'
};

export const STUDENT_EMPLOYMENT_TRENDS = [
  { month: 'Mar 2026', registered: 18200, placementReady: 11400, placed: 5200 },
  { month: 'Apr 2026', registered: 19800, placementReady: 12600, placed: 6100 },
  { month: 'May 2026', registered: 21400, placementReady: 13900, placed: 6950 },
  { month: 'Jun 2026', registered: 22800, placementReady: 14800, placed: 7800 },
  { month: 'Jul 2026', registered: 23900, placementReady: 15600, placed: 8400 },
  { month: 'Aug 2026', registered: 24850, placementReady: 16280, placed: 8940 }
];

export const TOP_STUDENT_SKILLS = [
  { skill: 'React.js', count: 7420, percentage: 72 },
  { skill: 'Python', count: 6890, percentage: 66 },
  { skill: 'SQL & Databases', count: 6450, percentage: 62 },
  { skill: 'Java', count: 5980, percentage: 58 },
  { skill: 'Node.js', count: 5120, percentage: 49 },
  { skill: 'Data Analytics', count: 4680, percentage: 45 },
  { skill: 'Cloud Computing', count: 3420, percentage: 33 },
  { skill: 'Communication', count: 8100, percentage: 78 }
];

export const EMPLOYABILITY_READINESS_DATA = [
  { name: 'Highly Ready', value: 28, count: 6958, color: '#10b981', desc: 'Direct corporate hire ready' },
  { name: 'Job Ready', value: 38, count: 9443, color: '#38bdf8', desc: 'Meets primary industry criteria' },
  { name: 'Skill Dev Required', value: 25, count: 6212, color: '#f59e0b', desc: 'Needs targeted module training' },
  { name: 'Not Ready', value: 9, count: 2237, color: '#f43f5e', desc: 'Foundational intervention needed' }
];

export const DISTRICT_STUDENT_INTELLIGENCE = [
  { district: 'Jaipur', totalStudents: 5840, verified: 5120, placementReady: 4100, placed: 2450, placementRate: 86.4, avgMatchScore: 88.2 },
  { district: 'Jodhpur', totalStudents: 3420, verified: 2950, placementReady: 2280, placed: 1380, placementRate: 83.2, avgMatchScore: 84.6 },
  { district: 'Kota', totalStudents: 4150, verified: 3680, placementReady: 2850, placed: 1690, placementRate: 84.8, avgMatchScore: 86.1 },
  { district: 'Udaipur', totalStudents: 2890, verified: 2480, placementReady: 1840, placed: 1080, placementRate: 82.1, avgMatchScore: 83.5 },
  { district: 'Ajmer', totalStudents: 2450, verified: 2090, placementReady: 1520, placed: 890, placementRate: 80.5, avgMatchScore: 81.8 },
  { district: 'Bikaner', totalStudents: 1980, verified: 1650, placementReady: 1190, placed: 680, placementRate: 79.1, avgMatchScore: 80.4 },
  { district: 'Alwar', totalStudents: 2650, verified: 2280, placementReady: 1680, placed: 980, placementRate: 81.3, avgMatchScore: 82.9 },
  { district: 'Sikar', totalStudents: 2280, verified: 1940, placementReady: 1420, placed: 810, placementRate: 79.9, avgMatchScore: 81.2 }
];

export const DEFAULT_STUDENTS_LIST = [
  {
    id: 'stu-101',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    verification: 'VERIFIED',
    university: 'Rajasthan Technical University (RTU Kota)',
    degree: 'B.Tech in Computer Science',
    district: 'Kota',
    gpa: 8.8,
    skills: ['React.js', 'Node.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL'],
    readiness: 'Job Ready',
    matchScore: 92,
    placementStatus: 'Interview Ready',
    appliedCount: 6,
    shortlistedCount: 4,
    projects: [
      { title: 'Rajasthan Smart Health Telemedicine Portal', tech: 'React, Express, PostgreSQL' },
      { title: 'Solar Grid IoT Monitoring Dashboard', tech: 'Next.js, MQTT, WebSockets' }
    ],
    experience: '6 Months Intern at TechNova Solutions',
    skillGaps: ['Docker CI/CD', 'AWS Lambda'],
    topRoles: ['Frontend Developer', 'Full Stack Engineer', 'React Specialist']
  },
  {
    id: 'stu-102',
    name: 'Priyanka Rathore',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    verification: 'VERIFIED',
    university: 'Malaviya National Institute of Technology (MNIT Jaipur)',
    degree: 'B.Tech in Information Technology',
    district: 'Jaipur',
    gpa: 9.2,
    skills: ['Python', 'Machine Learning', 'SQL', 'FastAPI', 'PyTorch', 'Data Analytics'],
    readiness: 'Highly Ready',
    matchScore: 96,
    placementStatus: 'Placed',
    appliedCount: 8,
    shortlistedCount: 6,
    projects: [
      { title: 'Predictive Crop Yield Forecasting Engine', tech: 'Python, Scikit-Learn, Streamlit' },
      { title: 'Automated Resume ATS Screener', tech: 'FastAPI, spaCy NLP, PostgreSQL' }
    ],
    experience: 'Data Science Intern at InnovateX Udaipur',
    skillGaps: ['Kubernetes Orchestration'],
    topRoles: ['AI/ML Engineer', 'Data Scientist', 'Python Developer']
  },
  {
    id: 'stu-103',
    name: 'Amitabh Sen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    verification: 'VERIFIED',
    university: 'MBM University Jodhpur',
    degree: 'B.Tech in Electronics & Communication',
    district: 'Jodhpur',
    gpa: 8.1,
    skills: ['Java', 'Spring Boot', 'Microservices', 'SQL', 'Docker'],
    readiness: 'Placement Ready',
    matchScore: 88,
    placementStatus: 'Interviewing',
    appliedCount: 5,
    shortlistedCount: 3,
    projects: [
      { title: 'UPI Payment Gateway Simulation', tech: 'Java, Spring Boot, MySQL' },
      { title: 'Distributed Cache Broker with Redis', tech: 'Java 17, Redis, Docker' }
    ],
    experience: 'Backend Intern at Solvix Fintech Jodhpur',
    skillGaps: ['Kubernetes', 'AWS Cloud Architect'],
    topRoles: ['Java Backend Developer', 'Microservices Engineer']
  },
  {
    id: 'stu-104',
    name: 'Neha Chundawat',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    verification: 'VERIFIED',
    university: 'College of Technology & Engineering (CTAE Udaipur)',
    degree: 'B.Tech in Computer Science',
    district: 'Udaipur',
    gpa: 8.5,
    skills: ['React.js', 'UI/UX Design', 'Figma', 'JavaScript', 'CSS3'],
    readiness: 'Job Ready',
    matchScore: 89,
    placementStatus: 'Interview Ready',
    appliedCount: 7,
    shortlistedCount: 4,
    projects: [
      { title: 'Rajasthan Tourism Augmented Heritage UI', tech: 'React, Tailwind, Three.js' },
      { title: 'E-Gov Citizen Welfare Portal Redesign', tech: 'Figma, React, Material UI' }
    ],
    experience: 'UI/UX Freelance Lead for Udaipur Startups',
    skillGaps: ['Next.js App Router', 'GraphQL'],
    topRoles: ['UI/UX Engineer', 'Frontend Developer']
  },
  {
    id: 'stu-105',
    name: 'Vikram Singh Shekhawat',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    verification: 'PENDING',
    university: 'Government Engineering College Ajmer',
    degree: 'B.Tech in Computer Science',
    district: 'Ajmer',
    gpa: 7.4,
    skills: ['C++', 'Data Structures', 'Algorithms', 'SQL'],
    readiness: 'Needs Training',
    matchScore: 74,
    placementStatus: 'Skill Training Enrolled',
    appliedCount: 3,
    shortlistedCount: 1,
    projects: [
      { title: 'Graph Algorithm Pathfinding Visualizer', tech: 'C++, OpenGL' }
    ],
    experience: 'Academic coursework & competitive coding',
    skillGaps: ['React.js', 'Modern Web Frameworks', 'Git Team Workflows'],
    topRoles: ['Junior Software Engineer', 'C++ Programmer']
  },
  {
    id: 'stu-106',
    name: 'Pooja Agarwal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    verification: 'VERIFIED',
    university: 'Government Engineering College Bikaner',
    degree: 'B.Tech in Electrical Engineering',
    district: 'Bikaner',
    gpa: 8.3,
    skills: ['Embedded C', 'IoT Sensors', 'Python', 'Arduino', 'MQTT'],
    readiness: 'Job Ready',
    matchScore: 86,
    placementStatus: 'Placed',
    appliedCount: 6,
    shortlistedCount: 5,
    projects: [
      { title: 'Smart Agriculture Soil Sensor Node', tech: 'ESP32, Python, MQTT' },
      { title: 'Solar Microgrid Remote Telemetry Unit', tech: 'C++, Raspberry Pi' }
    ],
    experience: 'Apprentice at Marwar Infra Bikaner',
    skillGaps: ['AWS IoT Core'],
    topRoles: ['IoT Systems Engineer', 'Embedded Developer']
  }
];
