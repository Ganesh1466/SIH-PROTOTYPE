// ====================================================================================
// RAJASTHAN GOVERNMENT PORTAL SETTINGS & ADMINISTRATION DATA
// ====================================================================================

export const INITIAL_GENERAL_SETTINGS = {
  portalName: 'Rajasthan Career Intelligence Portal',
  department: 'Department of Skill, Employment & Entrepreneurship',
  state: 'Rajasthan',
  defaultLanguage: 'English',
  timezone: 'Asia/Kolkata (IST +5:30)',
  contactEmail: 'governance@rajasthan.gov.in',
  complianceStandard: 'SIH-2026-GOV-1632'
};

export const INITIAL_DASHBOARD_PREFERENCES = {
  placementRate: true,
  studentRegistration: true,
  employmentOpportunities: true,
  skillGap: true,
  districtPerformance: true,
  opportunityTrends: true,
  recentApplications: true,
  aiInsightsFeed: true
};

export const INITIAL_GOVERNMENT_USERS = [
  {
    id: 'usr-01',
    name: 'Dr. Alok K. Sharma, IAS',
    email: 'alok.sharma@rajasthan.gov.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'Super Admin',
    department: 'Dept. of Skill & Employment',
    district: 'State Secretariat (Jaipur)',
    lastActive: 'Today, 06:12 PM',
    status: 'Active'
  },
  {
    id: 'usr-02',
    name: 'Mrs. Sunita Meena, RAS',
    email: 'sunita.meena@rajasthan.gov.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    role: 'Government Officer',
    department: 'Directorate of Technical Education',
    district: 'Jodhpur Division',
    lastActive: 'Today, 05:40 PM',
    status: 'Active'
  },
  {
    id: 'usr-03',
    name: 'Rajesh Choudhary',
    email: 'rajesh.choudhary@rajasthan.gov.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    role: 'District Officer',
    department: 'District Employment Center',
    district: 'Kota Cluster',
    lastActive: 'Yesterday, 04:30 PM',
    status: 'Active'
  },
  {
    id: 'usr-04',
    name: 'Pooja Bhatnagar',
    email: 'pooja.bhatnagar@rajasthan.gov.in',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    role: 'Department Officer',
    department: 'Higher Education Coordination',
    district: 'Udaipur Division',
    lastActive: '16 Aug 2026',
    status: 'Active'
  },
  {
    id: 'usr-05',
    name: 'Virendra Singh Rathore',
    email: 'virendra.rathore@rajasthan.gov.in',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    role: 'Viewer',
    department: 'State Planning Commission',
    district: 'All Districts',
    lastActive: '14 Aug 2026',
    status: 'Inactive'
  }
];

export const INITIAL_ROLE_PERMISSIONS = {
  'Super Admin': {
    viewStudents: true,
    viewOpportunities: true,
    generateReports: true,
    exportReports: true,
    manageUsers: true,
    manageOpportunities: true,
    viewAnalytics: true,
    manageSettings: true
  },
  'Government Officer': {
    viewStudents: true,
    viewOpportunities: true,
    generateReports: true,
    exportReports: true,
    manageUsers: false,
    manageOpportunities: true,
    viewAnalytics: true,
    manageSettings: false
  },
  'District Officer': {
    viewStudents: true,
    viewOpportunities: true,
    generateReports: true,
    exportReports: true,
    manageUsers: false,
    manageOpportunities: false,
    viewAnalytics: true,
    manageSettings: false
  },
  'Department Officer': {
    viewStudents: true,
    viewOpportunities: true,
    generateReports: true,
    exportReports: false,
    manageUsers: false,
    manageOpportunities: false,
    viewAnalytics: true,
    manageSettings: false
  },
  'Viewer': {
    viewStudents: true,
    viewOpportunities: true,
    generateReports: false,
    exportReports: false,
    manageUsers: false,
    manageOpportunities: false,
    viewAnalytics: true,
    manageSettings: false
  }
};

export const INITIAL_NOTIFICATION_SETTINGS = {
  newStudentRegistration: 'Both',
  newEmploymentOpportunity: 'Dashboard',
  placementMilestone: 'Both',
  lowPlacementRateAlert: 'Both',
  skillGapAlert: 'Both',
  newReportGenerated: 'Dashboard',
  systemUpdates: 'Email'
};

export const INITIAL_DATA_SETTINGS = {
  autoRefresh: 'Every 15 minutes',
  reportRetention: '1 Year',
  defaultReportFormat: 'PDF',
  defaultDateRange: 'Last 30 Days',
  autoGenerateMonthly: true
};

export const SYSTEM_HEALTH_INFO = {
  backend: 'Connected',
  supabase: 'Connected',
  restApi: 'Healthy (200 OK)',
  database: 'Healthy (4ms query latency)',
  lastSync: '18 Aug 2026, 06:42 PM',
  version: 'v2.4.0 (SIH-2026 Build 1632)'
};
