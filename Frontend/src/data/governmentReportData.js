// ====================================================================================
// RAJASTHAN EMPLOYMENT INTELLIGENCE REPORTS CONSTANTS & SEED DATA
// ====================================================================================

export const REPORT_KPIS = {
  totalStudents: 24850,
  totalStudentsGrowth: '↑ 12.4% vs Q2',
  totalOpportunities: 3840,
  opportunitiesGrowth: '↑ 14.8% vs Q2',
  studentsPlaced: 8940,
  placedGrowth: '↑ 18.2% annual growth',
  placementRate: 36.0,
  placementRateLabel: 'Statewide average',
  skillGaps: 18,
  skillGapsLabel: 'High-priority deficits'
};

export const REPORT_CATEGORIES = [
  {
    id: 'student',
    title: 'Student Employment Report',
    description: 'Analyze student registration, verification, employability and placement status.',
    badge: 'Demographics & Readiness',
    records: '24,850 Records',
    icon: 'Users'
  },
  {
    id: 'district',
    title: 'District Performance Report',
    description: 'Compare employment and placement performance across Rajasthan districts.',
    badge: 'Territorial Performance',
    records: '8 Regional Clusters',
    icon: 'MapPin'
  },
  {
    id: 'skill',
    title: 'Skill Gap Report',
    description: 'Identify skills where employer demand exceeds available student talent.',
    badge: 'Talent Deficit Matrix',
    records: '42 Technical Skills',
    icon: 'Zap'
  },
  {
    id: 'opportunity',
    title: 'Opportunity Demand Report',
    description: 'Analyze job and internship demand by sector, district and skill.',
    badge: 'Requisition Intelligence',
    records: '3,840 Active Posts',
    icon: 'Briefcase'
  },
  {
    id: 'placement',
    title: 'Placement Performance Report',
    description: 'Monitor placement rates and employment outcomes.',
    badge: 'Conversion Outcomes',
    records: '8,940 Confirmed Hires',
    icon: 'BarChart3'
  },
  {
    id: 'university',
    title: 'University Performance Report',
    description: 'Compare student employability and placement outcomes across universities.',
    badge: 'Institutional Audit',
    records: '124 Accredited Colleges',
    icon: 'Building2'
  }
];

export const REPORT_PLACEMENT_TRENDS = [
  { month: 'Mar 2026', registered: 18200, placementReady: 11400, placed: 5200 },
  { month: 'Apr 2026', registered: 19800, placementReady: 12600, placed: 6100 },
  { month: 'May 2026', registered: 21400, placementReady: 13900, placed: 6950 },
  { month: 'Jun 2026', registered: 22800, placementReady: 14800, placed: 7800 },
  { month: 'Jul 2026', registered: 23900, placementReady: 15600, placed: 8400 },
  { month: 'Aug 2026', registered: 24850, placementReady: 16280, placed: 8940 }
];

export const DISTRICT_PLACEMENT_RATES = [
  { district: 'Jaipur', rate: 41.6, students: 5840, placed: 2450 },
  { district: 'Jodhpur', rate: 45.5, students: 3420, placed: 1380 },
  { district: 'Kota', rate: 39.3, students: 4150, placed: 1690 },
  { district: 'Udaipur', rate: 37.4, students: 2890, placed: 1080 },
  { district: 'Ajmer', rate: 36.3, students: 2450, placed: 890 },
  { district: 'Alwar', rate: 37.0, students: 2650, placed: 980 },
  { district: 'Sikar', rate: 35.5, students: 2280, placed: 810 },
  { district: 'Bikaner', rate: 34.3, students: 1980, placed: 680 }
];

export const REPORT_SKILL_GAPS = [
  { skill: 'React.js', openPositions: 420, matchingStudents: 280, talentGap: 140, demand: 'High', status: 'WARNING' },
  { skill: 'Cloud Computing (AWS)', openPositions: 280, matchingStudents: 160, talentGap: 120, demand: 'High', status: 'WARNING' },
  { skill: 'Java & Microservices', openPositions: 390, matchingStudents: 310, talentGap: 80, demand: 'High', status: 'WARNING' },
  { skill: 'SQL & Database', openPositions: 520, matchingStudents: 470, talentGap: 50, demand: 'Medium', status: 'BALANCED' },
  { skill: 'Python & AI', openPositions: 350, matchingStudents: 410, talentGap: -60, demand: 'Surplus', status: 'SURPLUS' }
];

export const REPORT_DISTRICT_INTELLIGENCE = [
  { district: 'Jaipur', students: 5240, opportunities: 842, placed: 2180, placementRate: 41.6, avgMatchScore: 89, skillGap: 'High' },
  { district: 'Jodhpur', students: 3120, opportunities: 426, placed: 1420, placementRate: 45.5, avgMatchScore: 86, skillGap: 'Medium' },
  { district: 'Kota', students: 2850, opportunities: 318, placed: 1120, placementRate: 39.3, avgMatchScore: 82, skillGap: 'High' },
  { district: 'Udaipur', students: 2420, opportunities: 280, placed: 905, placementRate: 37.4, avgMatchScore: 84, skillGap: 'Medium' },
  { district: 'Ajmer', students: 2150, opportunities: 210, placed: 780, placementRate: 36.3, avgMatchScore: 81, skillGap: 'Medium' },
  { district: 'Alwar', students: 2310, opportunities: 240, placed: 855, placementRate: 37.0, avgMatchScore: 83, skillGap: 'Medium' },
  { district: 'Sikar', students: 1980, opportunities: 190, placed: 703, placementRate: 35.5, avgMatchScore: 80, skillGap: 'Moderate' },
  { district: 'Bikaner', students: 1780, opportunities: 160, placed: 610, placementRate: 34.3, avgMatchScore: 79, skillGap: 'Moderate' }
];

export const RECENT_REPORTS_LIST = [
  {
    id: 'rep-001',
    name: 'Rajasthan Skill Gap & Talent Deficit Report Q3-2026',
    type: 'Skill Analysis',
    generatedBy: 'Government Officer (Admin)',
    date: '18 Aug 2026, 06:42 PM',
    records: '18,420 Records',
    status: 'Ready',
    fileSize: '4.8 MB'
  },
  {
    id: 'rep-002',
    name: 'Jaipur & Sitapura Industrial Recruitment Audit',
    type: 'District Performance',
    generatedBy: 'Regional Director (Jaipur)',
    date: '18 Aug 2026, 02:15 PM',
    records: '5,840 Records',
    status: 'Ready',
    fileSize: '2.4 MB'
  },
  {
    id: 'rep-003',
    name: 'Statewide Institutional Accreditation & Placement Audit',
    type: 'University Performance',
    generatedBy: 'Higher Education Board',
    date: '17 Aug 2026, 11:30 AM',
    records: '124 Colleges',
    status: 'Ready',
    fileSize: '6.1 MB'
  },
  {
    id: 'rep-004',
    name: 'Rajasthan Tech Employers KYC Verification Dossier',
    type: 'Employer Compliance',
    generatedBy: 'Statutory Registrar',
    date: '16 Aug 2026, 04:50 PM',
    records: '620 Employers',
    status: 'Ready',
    fileSize: '3.2 MB'
  }
];

export const REPORT_POLICY_INSIGHTS = [
  {
    id: 1,
    badge: 'Tech Hub',
    badgeColor: 'sky',
    title: 'Jaipur Technology Concentration',
    description: 'Jaipur has the highest technology opportunity concentration, accounting for 42% of all statewide software requisitions.'
  },
  {
    id: 2,
    badge: 'Critical Gap',
    badgeColor: 'rose',
    title: 'React.js Workforce Shortage',
    description: 'React.js demand exceeds available talent by 140 candidates. Immediate technical bootcamp intervention is advised.'
  },
  {
    id: 3,
    badge: 'High Conversion',
    badgeColor: 'emerald',
    title: 'Full Stack Synergy Premium',
    description: 'Students with React.js + Node.js competencies have an average 89% opportunity match and 2.4x higher hiring conversion.'
  },
  {
    id: 4,
    badge: 'Growth Leader',
    badgeColor: 'amber',
    title: 'Kota Placement Acceleration',
    description: 'Kota has improved its placement rate by +8.4% this quarter following the launch of localized AI and cloud training tracks.'
  }
];
