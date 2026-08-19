// ====================================================================================
// RAJASTHAN EMPLOYMENT OPPORTUNITIES INTELLIGENCE CONSTANTS & MOCK SEED DATA
// ====================================================================================

export const OPPORTUNITY_KPIS = {
  totalOpportunities: 3840,
  totalGrowth: '↑ 14.8% from last cycle',
  activeJobs: 2410,
  jobsShare: '62.8% Full-time requisitions',
  internships: 1430,
  internshipsShare: '37.2% Technical training tracks',
  employers: 620,
  employersDetail: 'Across 8 regional clusters',
  applications: 48920,
  applicationsRatio: '12.7 applicants per role',
  avgMatchRate: 81.7,
  matchPrecision: 'High-precision algorithmic match'
};

export const OPPORTUNITY_GROWTH_DATA = [
  { month: 'Mar 2026', jobs: 1650, internships: 980, total: 2630 },
  { month: 'Apr 2026', jobs: 1820, internships: 1090, total: 2910 },
  { month: 'May 2026', jobs: 2010, internships: 1180, total: 3190 },
  { month: 'Jun 2026', jobs: 2190, internships: 1290, total: 3480 },
  { month: 'Jul 2026', jobs: 2320, internships: 1370, total: 3690 },
  { month: 'Aug 2026', jobs: 2410, internships: 1430, total: 3840 }
];

export const JOBS_BY_SECTOR_DATA = [
  { sector: 'IT & Software', count: 1420, percentage: 37, color: '#38bdf8' },
  { sector: 'Manufacturing', count: 680, percentage: 18, color: '#818cf8' },
  { sector: 'Healthcare & Biotech', count: 420, percentage: 11, color: '#34d399' },
  { sector: 'Finance & Banking', count: 390, percentage: 10, color: '#fbbf24' },
  { sector: 'Education & EdTech', count: 310, percentage: 8, color: '#c084fc' },
  { sector: 'Agriculture & IoT', count: 240, percentage: 6, color: '#2dd4bf' },
  { sector: 'Tourism & Hospitality', count: 210, percentage: 5, color: '#fb923c' },
  { sector: 'Government Services', count: 170, percentage: 4, color: '#f43f5e' }
];

export const RAJASTHAN_DISTRICT_OPPORTUNITIES = [
  { district: 'Jaipur', totalOpps: 1420, activeJobs: 890, internships: 530, topSkill: 'React.js / Next.js', demandLevel: 'High Demand', demandColor: 'rose', hiringFirms: 345 },
  { district: 'Jodhpur', totalOpps: 680, activeJobs: 420, internships: 260, topSkill: 'Java & Microservices', demandLevel: 'High Demand', demandColor: 'rose', hiringFirms: 210 },
  { district: 'Kota', totalOpps: 540, activeJobs: 330, internships: 210, topSkill: 'Python & AI/ML', demandLevel: 'Medium Demand', demandColor: 'amber', hiringFirms: 235 },
  { district: 'Udaipur', totalOpps: 410, activeJobs: 260, internships: 150, topSkill: 'Data Analytics & SQL', demandLevel: 'Medium Demand', demandColor: 'amber', hiringFirms: 168 },
  { district: 'Ajmer', totalOpps: 290, activeJobs: 190, internships: 100, topSkill: 'Cloud & DevOps', demandLevel: 'Medium Demand', demandColor: 'amber', hiringFirms: 142 },
  { district: 'Alwar', totalOpps: 320, activeJobs: 210, internships: 110, topSkill: 'Industrial IoT & Robotics', demandLevel: 'Medium Demand', demandColor: 'amber', hiringFirms: 158 },
  { district: 'Bikaner', totalOpps: 180, activeJobs: 110, internships: 70, topSkill: 'Solar IoT & Embedded', demandLevel: 'Moderate Demand', demandColor: 'blue', hiringFirms: 115 },
  { district: 'Sikar', totalOpps: 200, activeJobs: 130, internships: 70, topSkill: 'Cyber Security & QA', demandLevel: 'Moderate Demand', demandColor: 'blue', hiringFirms: 130 }
];

export const SKILL_DEMAND_TALENT_GAP = [
  { skill: 'React.js', openPositions: 420, availableStudents: 280, talentGap: 140, gapStatus: 'CRITICAL' },
  { skill: 'Java', openPositions: 380, availableStudents: 310, talentGap: 70, gapStatus: 'HIGH' },
  { skill: 'Python', openPositions: 350, availableStudents: 290, talentGap: 60, gapStatus: 'HIGH' },
  { skill: 'SQL & Database', openPositions: 290, availableStudents: 250, talentGap: 40, gapStatus: 'MEDIUM' },
  { skill: 'JavaScript / TS', openPositions: 340, availableStudents: 260, talentGap: 80, gapStatus: 'HIGH' },
  { skill: 'Data Analytics', openPositions: 260, availableStudents: 180, talentGap: 80, gapStatus: 'CRITICAL' },
  { skill: 'Cloud Computing (AWS)', openPositions: 310, availableStudents: 130, talentGap: 180, gapStatus: 'CRITICAL' },
  { skill: 'Digital Marketing', openPositions: 180, availableStudents: 190, talentGap: -10, gapStatus: 'SURPLUS' }
];

export const AI_GOVERNMENT_INSIGHTS = [
  {
    id: 1,
    icon: 'Zap',
    badge: 'Demand Surge',
    badgeColor: 'sky',
    title: 'React.js Demand Acceleration',
    description: 'React.js developer requisitions surged by +18% this quarter, driven by new enterprise SaaS expansions in Jaipur and Sitapura tech clusters.'
  },
  {
    id: 2,
    icon: 'MapPin',
    badge: 'Regional Hub',
    badgeColor: 'amber',
    title: 'Jaipur Technology Concentration',
    description: 'Jaipur currently commands 42% of total state IT postings. Jodhpur & Kota follow as the fastest growing second-tier technical hiring centers.'
  },
  {
    id: 3,
    icon: 'AlertTriangle',
    badge: 'Critical Talent Gap',
    badgeColor: 'rose',
    title: '140+ React & 180+ AWS Developer Deficit',
    description: '140 more React developers and 180 AWS cloud engineers are urgently required statewide to satisfy active corporate hiring mandates.'
  },
  {
    id: 4,
    icon: 'Target',
    badge: 'High Precision Match',
    badgeColor: 'emerald',
    title: 'Full Stack Synergy Matching',
    description: 'Students certified in both React.js and Node.js have an average 89% algorithmic opportunity match rate and 2.4x higher interview conversion.'
  }
];

export const DEFAULT_OPPORTUNITIES_LIST = [
  {
    id: 'opp-201',
    title: 'Senior React & Next.js Developer',
    company_name: 'TechNova Solutions Pvt Ltd',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
    opportunity_type: 'JOB',
    sector: 'IT & Software',
    district: 'Jaipur',
    location: 'Sitapura Industrial Area, Jaipur',
    employment_type: 'Full Time',
    salary_range: '₹7.5 - ₹10.5 LPA',
    requiredSkills: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'REST APIs'],
    experience: '0 - 2 Years (Freshers & Juniors)',
    applications: 146,
    matchRate: 94,
    status: 'PUBLISHED',
    postedDate: '2026-08-14',
    vacancies: 5,
    description: 'Lead frontend architectures building enterprise cloud SaaS dashboards for global clients.'
  },
  {
    id: 'opp-202',
    title: 'Cloud DevOps & AWS Solution Intern',
    company_name: 'CodeCraft Labs LLP',
    logo: 'https://images.unsplash.com/photo-1629752187687-3d3c7ea4a21d?w=160&auto=format&fit=crop&q=80',
    opportunity_type: 'INTERNSHIP',
    sector: 'IT & Software',
    district: 'Jaipur',
    location: 'Malviya Nagar, Jaipur',
    employment_type: '6 Months Internship',
    salary_range: '₹22,000 / Month Stipend',
    requiredSkills: ['AWS', 'Docker', 'CI/CD', 'Linux', 'Python'],
    experience: 'Pre-Final & Final Year Students',
    applications: 98,
    matchRate: 88,
    status: 'PUBLISHED',
    postedDate: '2026-08-15',
    vacancies: 4,
    description: 'Hands-on production cloud infrastructure management, containerization with Docker and automated GitHub Actions pipelines.'
  },
  {
    id: 'opp-203',
    title: 'Applied AI & NLP Research Engineer',
    company_name: 'InnovateX Technologies',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=160&auto=format&fit=crop&q=80',
    opportunity_type: 'JOB',
    sector: 'IT & Software',
    district: 'Udaipur',
    location: 'MIA Madri, Udaipur',
    employment_type: 'Full Time',
    salary_range: '₹9.0 - ₹13.0 LPA',
    requiredSkills: ['Python', 'PyTorch', 'FastAPI', 'Machine Learning', 'NLP'],
    experience: '0 - 1 Year Experience',
    applications: 112,
    matchRate: 91,
    status: 'PUBLISHED',
    postedDate: '2026-08-12',
    vacancies: 3,
    description: 'Developing applied Large Language Model agents, semantic search systems, and automated enterprise document processing.'
  },
  {
    id: 'opp-204',
    title: 'Java Microservices Backend Developer',
    company_name: 'Solvix Fintech Technologies',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=160&auto=format&fit=crop&q=80',
    opportunity_type: 'JOB',
    sector: 'Finance & Banking',
    district: 'Jodhpur',
    location: 'Residency Road, Jodhpur',
    employment_type: 'Full Time',
    salary_range: '₹8.0 - ₹11.0 LPA',
    requiredSkills: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis'],
    experience: 'Graduating Batch 2026',
    applications: 86,
    matchRate: 85,
    status: 'PUBLISHED',
    postedDate: '2026-08-10',
    vacancies: 4,
    description: 'High-throughput core transaction ledger systems, UPI integrations, and low-latency microservices architectures.'
  },
  {
    id: 'opp-205',
    title: 'UI/UX Product Design Apprentice',
    company_name: 'PixelPlex Creative Studio',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=160&auto=format&fit=crop&q=80',
    opportunity_type: 'INTERNSHIP',
    sector: 'Education & EdTech',
    district: 'Kota',
    location: 'Vigyan Nagar, Kota',
    employment_type: '3 Months Internship with PPO',
    salary_range: '₹18,000 / Month Stipend',
    requiredSkills: ['Figma', 'UI/UX Design', 'Wireframing', 'User Research'],
    experience: 'Open to All Design & CS Students',
    applications: 64,
    matchRate: 82,
    status: 'PUBLISHED',
    postedDate: '2026-08-16',
    vacancies: 2,
    description: 'Collaborate with frontend engineers to design responsive mobile and web user interfaces and component libraries.'
  },
  {
    id: 'opp-206',
    title: 'Robotics & PLC Automation Engineer',
    company_name: 'Jaipur Robotics & Automation',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=160&auto=format&fit=crop&q=80',
    opportunity_type: 'JOB',
    sector: 'Manufacturing',
    district: 'Alwar',
    location: 'Matsya Industrial Area, Alwar',
    employment_type: 'Full Time',
    salary_range: '₹6.5 - ₹8.5 LPA',
    requiredSkills: ['C++', 'PLC Automation', 'Embedded Systems', 'IoT'],
    experience: 'B.Tech Mechanical / Electrical / CS',
    applications: 52,
    matchRate: 79,
    status: 'PENDING_APPROVAL',
    postedDate: '2026-08-18',
    vacancies: 6,
    description: 'Smart factory industrial automation, robotic arm programming, and sensor telemetry networks.'
  }
];
