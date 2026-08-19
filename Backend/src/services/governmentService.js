import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { initialCompanies, initialJobs, initialStudents, initialApplications } from '../utils/seedData.js';
import { OpportunityService } from './opportunityService.js';
import { ApplicationService } from './applicationService.js';

// =========================================================================
// 1. OFFICIAL RAJASTHAN PROTOTYPE DEMO SEED DATA (from SQL specs)
// =========================================================================

export const demoDistrictAnalytics = [
  { id: 1, district: 'Jaipur', total_students: 5240, total_employers: 320, total_jobs: 1240, total_internships: 480, total_applications: 6430, total_placements: 720, placement_rate: 85.20 },
  { id: 2, district: 'Jodhpur', total_students: 3100, total_employers: 190, total_jobs: 720, total_internships: 310, total_applications: 4210, total_placements: 510, placement_rate: 82.40 },
  { id: 3, district: 'Kota', total_students: 3800, total_employers: 210, total_jobs: 850, total_internships: 390, total_applications: 5100, total_placements: 590, placement_rate: 83.60 },
  { id: 4, district: 'Udaipur', total_students: 2600, total_employers: 150, total_jobs: 580, total_internships: 250, total_applications: 3420, total_placements: 420, placement_rate: 81.30 },
  { id: 5, district: 'Ajmer', total_students: 2200, total_employers: 130, total_jobs: 470, total_internships: 210, total_applications: 2890, total_placements: 350, placement_rate: 79.80 },
  { id: 6, district: 'Bikaner', total_students: 1800, total_employers: 100, total_jobs: 360, total_internships: 160, total_applications: 2210, total_placements: 270, placement_rate: 78.50 },
  { id: 7, district: 'Alwar', total_students: 2400, total_employers: 140, total_jobs: 520, total_internships: 220, total_applications: 3050, total_placements: 380, placement_rate: 80.40 },
  { id: 8, district: 'Sikar', total_students: 2100, total_employers: 120, total_jobs: 440, total_internships: 190, total_applications: 2760, total_placements: 330, placement_rate: 79.20 }
];

export const demoSkillAnalytics = [
  { id: 1, skill_name: 'React.js', employer_demand: 72, student_availability: 38, skill_gap: 34, district: 'Rajasthan', priority: 'HIGH', category: 'Frontend Training', recommendation: 'Promote / Launch Advanced React & Next.js Frontend Training' },
  { id: 2, skill_name: 'JavaScript', employer_demand: 78, student_availability: 52, skill_gap: 26, district: 'Rajasthan', priority: 'MEDIUM', category: 'Core Programming', recommendation: 'Core JavaScript & Modern Web Standards Workshop' },
  { id: 3, skill_name: 'Node.js', employer_demand: 58, student_availability: 31, skill_gap: 27, district: 'Rajasthan', priority: 'HIGH', category: 'Backend Training', recommendation: 'Node.js & Express Cloud Microservices Program' },
  { id: 4, skill_name: 'Python', employer_demand: 65, student_availability: 52, skill_gap: 13, district: 'Rajasthan', priority: 'LOW', category: 'Data & Scripting', recommendation: 'Applied Python for Automation & Web' },
  { id: 5, skill_name: 'SQL', employer_demand: 70, student_availability: 55, skill_gap: 15, district: 'Rajasthan', priority: 'LOW', category: 'Database Systems', recommendation: 'Relational Database Architecture & Query Tuning' },
  { id: 6, skill_name: 'AWS', employer_demand: 42, student_availability: 12, skill_gap: 30, district: 'Rajasthan', priority: 'CRITICAL', category: 'Cloud Training', recommendation: 'Promote / Launch AWS Cloud Architect & Solution Practitioner Track' },
  { id: 7, skill_name: 'Docker', employer_demand: 35, student_availability: 8, skill_gap: 27, district: 'Rajasthan', priority: 'CRITICAL', category: 'DevOps Training', recommendation: 'Launch Docker & Kubernetes Containerization Enablement Lab' },
  { id: 8, skill_name: 'Data Analytics', employer_demand: 48, student_availability: 22, skill_gap: 26, district: 'Rajasthan', priority: 'HIGH', category: 'Analytics Training', recommendation: 'Launch State Business Intelligence & PowerBI/Tableau Training' },
  { id: 9, skill_name: 'Machine Learning', employer_demand: 40, student_availability: 18, skill_gap: 22, district: 'Rajasthan', priority: 'HIGH', category: 'AI & ML Training', recommendation: 'Statewide AI/ML & Applied Data Science Cohort' },
  { id: 10, skill_name: 'Cyber Security', employer_demand: 32, student_availability: 10, skill_gap: 22, district: 'Rajasthan', priority: 'CRITICAL', category: 'Security Training', recommendation: 'Rajasthan Cyber Defense & SOC Analyst Specialized Training' }
];

export const demoFunnelAnalytics = [
  { id: 1, period: 'June 2026', applications: 3200, shortlisted: 1400, interviews: 700, selected: 310, joined: 250, conversion_rate: '7.81%' },
  { id: 2, period: 'July 2026', applications: 4100, shortlisted: 1800, interviews: 900, selected: 420, joined: 350, conversion_rate: '8.54%' },
  { id: 3, period: 'August 2026', applications: 5200, shortlisted: 2400, interviews: 1200, selected: 510, joined: 430, conversion_rate: '8.27%' }
];

// In-Memory state stores for dynamic mutations during runtime
let districtStore = [...demoDistrictAnalytics];
let skillStore = [...demoSkillAnalytics];
let funnelStore = [...demoFunnelAnalytics];

let employerStore = [
  {
    id: 'emp-1',
    companyName: 'TechNova Solutions Pvt Ltd',
    email: 'employee01@gmail.com',
    industry: 'Enterprise SaaS & Cloud',
    district: 'Jaipur',
    location: 'Sitapura Industrial Area, Jaipur',
    contactPerson: 'Mr. Arvind Saxena',
    designation: 'VP & Head of Human Resources',
    phone: '+91 98290 88123',
    registrationNumber: 'RJ-JPR-CORP-2021-8842',
    registrationDate: '2021-04-15',
    cin: 'U72200RJ2021PTC074521',
    gstin: '08AAACT8842R1Z5',
    companySize: '250 - 500 Employees',
    verificationStatus: 'VERIFIED',
    activeJobsCount: 4,
    activeInternshipsCount: 2,
    totalHires: 142,
    website: 'https://technova.demo',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
    contactPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-2',
    companyName: 'CodeCraft Labs LLP',
    email: 'hr@codecraftlabs.demo',
    industry: 'Full-Stack Software Services',
    district: 'Jaipur',
    location: 'Malviya Nagar, Jaipur',
    contactPerson: 'Ms. Ritu Choudhary',
    designation: 'Director of Talent Acquisition',
    phone: '+91 94140 11982',
    registrationNumber: 'RJ-JPR-CORP-2022-3104',
    registrationDate: '2022-06-20',
    cin: 'U72900RJ2022LLP031040',
    gstin: '08AABCC3104P1ZA',
    companySize: '100 - 250 Employees',
    verificationStatus: 'VERIFIED',
    activeJobsCount: 3,
    activeInternshipsCount: 1,
    totalHires: 88,
    website: 'https://codecraft.demo',
    logo: 'https://images.unsplash.com/photo-1629752187687-3d3c7ea4a21d?w=160&auto=format&fit=crop&q=80',
    contactPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-3',
    companyName: 'InnovateX Technologies',
    email: 'careers@innovatex.demo',
    industry: 'Product Engineering & Analytics',
    district: 'Udaipur',
    location: 'MIA Madri, Udaipur',
    contactPerson: 'Vikramaditya Solanki',
    designation: 'Managing Director & Founder',
    phone: '+91 97850 44221',
    registrationNumber: 'RJ-UDP-CORP-2020-0091',
    registrationDate: '2020-01-10',
    cin: 'U72200RJ2020PTC009188',
    gstin: '08AAACI0091L1Z2',
    companySize: '50 - 100 Employees',
    verificationStatus: 'VERIFIED',
    activeJobsCount: 2,
    activeInternshipsCount: 2,
    totalHires: 64,
    website: 'https://innovatex.demo',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=160&auto=format&fit=crop&q=80',
    contactPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-4',
    companyName: 'Solvix Fintech Technologies',
    email: 'jobs@solvix.demo',
    industry: 'FinTech & Core Banking Systems',
    district: 'Jodhpur',
    location: 'Residency Road, Jodhpur',
    contactPerson: 'Sunil Mathur',
    designation: 'VP Operations & Campus Partnerships',
    phone: '+91 98280 33410',
    registrationNumber: 'RJ-JDH-CORP-2023-5512',
    registrationDate: '2023-09-12',
    cin: 'U65999RJ2023PTC055120',
    gstin: '08AAACS5512M1Z8',
    companySize: '150 - 300 Employees',
    verificationStatus: 'VERIFIED',
    activeJobsCount: 2,
    activeInternshipsCount: 1,
    totalHires: 39,
    website: 'https://solvix.demo',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=160&auto=format&fit=crop&q=80',
    contactPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-5',
    companyName: 'PixelPlex Creative Studio',
    email: 'contact@pixelplex.demo',
    industry: 'UI/UX & Creative Tech Design',
    district: 'Kota',
    location: 'Vigyan Nagar, Kota',
    contactPerson: 'Megha Singhal',
    designation: 'Founder & Design Chief',
    phone: '+91 94130 77123',
    registrationNumber: 'RJ-KTA-CORP-2024-1109',
    registrationDate: '2024-02-18',
    cin: 'U74999RJ2024PTC011092',
    gstin: '08AAACP1109S1Z4',
    companySize: '20 - 50 Employees',
    verificationStatus: 'PENDING',
    activeJobsCount: 1,
    activeInternshipsCount: 1,
    totalHires: 21,
    website: 'https://pixelplex.demo',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=160&auto=format&fit=crop&q=80',
    contactPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-6',
    companyName: 'Marwar Cloud & Infra Works',
    email: 'hiring@marwarcloud.demo',
    industry: 'Cloud Infrastructure & SRE',
    district: 'Bikaner',
    location: 'Industrial Area, Bikaner',
    contactPerson: 'Mahesh Bishnoi',
    designation: 'Principal Cloud Architect',
    phone: '+91 98299 44321',
    registrationNumber: 'RJ-BKN-CORP-2025-9921',
    registrationDate: '2026-08-01',
    cin: 'U72300RJ2025PTC099210',
    gstin: '08AAACM9921B1Z3',
    companySize: '50 - 100 Employees',
    verificationStatus: 'PENDING',
    activeJobsCount: 0,
    activeInternshipsCount: 0,
    totalHires: 0,
    website: 'https://marwarcloud.demo',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=160&auto=format&fit=crop&q=80',
    contactPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-7',
    companyName: 'Aravalli AI Cognitive Solutions',
    email: 'admin@aravalliai.demo',
    industry: 'Artificial Intelligence & NLP',
    district: 'Ajmer',
    location: 'Civil Lines, Ajmer',
    contactPerson: 'Dr. Alok Srivastava',
    designation: 'Chief Technology Officer (AI)',
    phone: '+91 94144 88712',
    registrationNumber: 'RJ-AJM-CORP-2024-4412',
    registrationDate: '2024-11-15',
    cin: 'U72900RJ2024PTC044129',
    gstin: '08AAACA4412S1Z7',
    companySize: '30 - 60 Employees',
    verificationStatus: 'PENDING',
    activeJobsCount: 0,
    activeInternshipsCount: 0,
    totalHires: 0,
    website: 'https://aravalliai.demo',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=160&auto=format&fit=crop&q=80',
    contactPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-8',
    companyName: 'Shekhawati Cyber Defense Systems',
    email: 'contact@shekhawatisec.demo',
    industry: 'Cyber Security & Threat Defense',
    district: 'Sikar',
    location: 'Fatehpur Road, Sikar',
    contactPerson: 'Col. Ranjit Rathore',
    designation: 'Director & Cyber Advisor',
    phone: '+91 97855 22100',
    registrationNumber: 'RJ-SKR-CORP-2023-7711',
    registrationDate: '2023-08-20',
    cin: 'U74900RJ2023PTC077110',
    gstin: '08AAACS7711R1Z9',
    companySize: '40 - 80 Employees',
    verificationStatus: 'SUSPENDED',
    activeJobsCount: 0,
    activeInternshipsCount: 0,
    totalHires: 5,
    website: 'https://shekhawatisec.demo',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=160&auto=format&fit=crop&q=80',
    contactPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-9',
    companyName: 'Jaipur Robotics & Industrial Automation',
    email: 'careers@jpr-robotics.demo',
    industry: 'Industrial IoT & Robotics',
    district: 'Alwar',
    location: 'Matsya Industrial Area, Alwar',
    contactPerson: 'Ananya Pareek',
    designation: 'VP of Engineering & HR',
    phone: '+91 98291 99882',
    registrationNumber: 'RJ-ALW-CORP-2022-9012',
    registrationDate: '2022-10-05',
    cin: 'U29200RJ2022PTC090123',
    gstin: '08AAACJ9012P1ZX',
    companySize: '120 - 200 Employees',
    verificationStatus: 'VERIFIED',
    activeJobsCount: 3,
    activeInternshipsCount: 2,
    totalHires: 52,
    website: 'https://jpr-robotics.demo',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=160&auto=format&fit=crop&q=80',
    contactPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  }
];

let opportunityApprovalStore = [
  {
    id: 'opp-gov-101',
    title: 'Senior React Developer',
    opportunity_type: 'JOB',
    company_name: 'TechNova Solutions',
    district: 'Jaipur',
    employment_type: 'Full Time',
    salary_range: '₹6.5 - ₹8.5 LPA',
    salary_min: 650000,
    salary_max: 850000,
    requiredSkills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Git'],
    approvalStatus: 'PUBLISHED',
    createdDate: '2026-08-10',
    description: 'Core product engineering role building scalable SaaS web dashboards in Jaipur.',
    vacancies: 4
  },
  {
    id: 'opp-gov-102',
    title: 'Frontend Developer Intern',
    opportunity_type: 'INTERNSHIP',
    company_name: 'TechNova Solutions',
    district: 'Jaipur',
    employment_type: 'Internship (6 Months)',
    salary_range: '₹18,000 / month (PPO up to ₹7 LPA)',
    stipend_min: 18000,
    stipend_max: 18000,
    requiredSkills: ['React.js', 'JavaScript', 'HTML', 'CSS'],
    approvalStatus: 'PUBLISHED',
    createdDate: '2026-08-12',
    description: '6-month intensive frontend internship with live deployment mentoring.',
    vacancies: 8
  },
  {
    id: 'opp-gov-103',
    title: 'Node.js Backend Developer',
    opportunity_type: 'JOB',
    company_name: 'CodeCraft Labs',
    district: 'Jaipur',
    employment_type: 'Full Time',
    salary_range: '₹7.0 - ₹9.5 LPA',
    salary_min: 700000,
    salary_max: 950000,
    requiredSkills: ['Node.js', 'Express.js', 'PostgreSQL', 'Git'],
    approvalStatus: 'PUBLISHED',
    createdDate: '2026-08-08',
    description: 'High-throughput microservices and API architect role.',
    vacancies: 3
  },
  {
    id: 'opp-gov-104',
    title: 'AWS Cloud & DevOps Associate',
    opportunity_type: 'JOB',
    company_name: 'Solvix Technologies',
    district: 'Jodhpur',
    employment_type: 'Full Time',
    salary_range: '₹7.5 - ₹10.0 LPA',
    salary_min: 750000,
    salary_max: 1000000,
    requiredSkills: ['AWS', 'Docker', 'Python', 'Git'],
    approvalStatus: 'PUBLISHED',
    createdDate: '2026-08-07',
    description: 'Manage AWS cloud infrastructure, CI/CD pipelines, and microservice containers.',
    vacancies: 2
  },
  {
    id: 'opp-gov-105',
    title: 'Data Science & Python Research Intern',
    opportunity_type: 'INTERNSHIP',
    company_name: 'InnovateX Technologies',
    district: 'Udaipur',
    employment_type: 'Internship (6 Months)',
    salary_range: '₹22,000 / month',
    stipend_min: 22000,
    stipend_max: 22000,
    requiredSkills: ['Python', 'SQL', 'Data Analytics', 'Machine Learning'],
    approvalStatus: 'PENDING_APPROVAL',
    createdDate: '2026-08-18',
    description: 'Work on smart city analytics and predictive water management algorithms in Udaipur.',
    vacancies: 4
  },
  {
    id: 'opp-gov-106',
    title: 'Junior Cyber Security Analyst',
    opportunity_type: 'JOB',
    company_name: 'PixelPlex Studio',
    district: 'Kota',
    employment_type: 'Full Time',
    salary_range: '₹5.5 - ₹7.0 LPA',
    salary_min: 550000,
    salary_max: 700000,
    requiredSkills: ['Cyber Security', 'Docker', 'Linux', 'Networking'],
    approvalStatus: 'PENDING_APPROVAL',
    createdDate: '2026-08-17',
    description: 'SOC monitoring, web application vulnerability testing, and security compliance.',
    vacancies: 2
  },
  {
    id: 'opp-gov-107',
    title: 'UI/UX Design Engineering Intern',
    opportunity_type: 'INTERNSHIP',
    company_name: 'PixelPlex Studio',
    district: 'Kota',
    employment_type: 'Internship (3 Months)',
    salary_range: '₹15,000 / month',
    stipend_min: 15000,
    stipend_max: 15000,
    requiredSkills: ['React.js', 'HTML', 'CSS', 'Figma'],
    approvalStatus: 'PENDING_APPROVAL',
    createdDate: '2026-08-19',
    description: 'Craft high fidelity design systems and interactive React prototypes.',
    vacancies: 3
  }
];

let studentDirectoryStore = [
  {
    id: 'stu-1',
    name: 'Rahul Sharma',
    email: 'student01@gmail.com',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    college: 'Rajasthan Technical University (RTU), Kota',
    district: 'Jaipur',
    graduationYear: 2026,
    cgpa: 8.4,
    skills: ['React.js', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'Git', 'SQL'],
    applicationsCount: 4,
    shortlistedCount: 2,
    interviewsCount: 1,
    selectedCount: 1,
    placementStatus: 'PLACED',
    placedCompany: 'TechNova Solutions',
    packageOffered: '₹7.5 LPA'
  },
  {
    id: 'stu-2',
    name: 'Priya Singh',
    email: 'priya.singh@demo.careerrajasthan.demo',
    degree: 'B.Tech',
    branch: 'Information Technology',
    college: 'Malaviya National Institute of Technology (MNIT), Jaipur',
    district: 'Jaipur',
    graduationYear: 2026,
    cgpa: 9.1,
    skills: ['React.js', 'JavaScript', 'TypeScript', 'Redux', 'Git', 'Tailwind CSS'],
    applicationsCount: 3,
    shortlistedCount: 3,
    interviewsCount: 2,
    selectedCount: 1,
    placementStatus: 'PLACED',
    placedCompany: 'TechNova Solutions',
    packageOffered: '₹8.5 LPA'
  },
  {
    id: 'stu-3',
    name: 'Aman Verma',
    email: 'aman.verma@demo.careerrajasthan.demo',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    college: 'Government Engineering College (GEC), Ajmer',
    district: 'Ajmer',
    graduationYear: 2027,
    cgpa: 7.9,
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Docker', 'Git'],
    applicationsCount: 5,
    shortlistedCount: 2,
    interviewsCount: 1,
    selectedCount: 0,
    placementStatus: 'INTERVIEWING',
    placedCompany: null,
    packageOffered: null
  },
  {
    id: 'stu-4',
    name: 'Karan Joshi',
    email: 'karan.joshi@demo.careerrajasthan.demo',
    degree: 'B.Tech',
    branch: 'Data Science & AI',
    college: 'MBM University, Jodhpur',
    district: 'Jodhpur',
    graduationYear: 2026,
    cgpa: 8.7,
    skills: ['Python', 'SQL', 'Data Analytics', 'Machine Learning', 'AWS', 'Git'],
    applicationsCount: 2,
    shortlistedCount: 2,
    interviewsCount: 1,
    selectedCount: 1,
    placementStatus: 'PLACED',
    placedCompany: 'InnovateX Technologies',
    packageOffered: '₹8.0 LPA'
  },
  {
    id: 'stu-5',
    name: 'Neha Meena',
    email: 'neha.meena@demo.careerrajasthan.demo',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    college: 'College of Technology and Engineering (CTAE), Udaipur',
    district: 'Udaipur',
    graduationYear: 2027,
    cgpa: 8.2,
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Python', 'Git'],
    applicationsCount: 3,
    shortlistedCount: 1,
    interviewsCount: 0,
    selectedCount: 0,
    placementStatus: 'IN_PROCESS',
    placedCompany: null,
    packageOffered: null
  },
  {
    id: 'stu-6',
    name: 'Vikram Bhati',
    email: 'vikram.bhati@demo.careerrajasthan.demo',
    degree: 'B.Tech',
    branch: 'Electronics & Communication',
    college: 'Government Polytechnic College, Bikaner',
    district: 'Bikaner',
    graduationYear: 2026,
    cgpa: 7.6,
    skills: ['C++', 'Python', 'SQL', 'Linux'],
    applicationsCount: 4,
    shortlistedCount: 1,
    interviewsCount: 0,
    selectedCount: 0,
    placementStatus: 'SEARCHING',
    placedCompany: null,
    packageOffered: null
  },
  {
    id: 'stu-7',
    name: 'Pooja Kumawat',
    email: 'pooja.k@demo.careerrajasthan.demo',
    degree: 'MCA',
    branch: 'Computer Applications',
    college: 'University of Rajasthan, Jaipur',
    district: 'Jaipur',
    graduationYear: 2026,
    cgpa: 8.5,
    skills: ['React.js', 'Node.js', 'SQL', 'JavaScript', 'Docker'],
    applicationsCount: 6,
    shortlistedCount: 3,
    interviewsCount: 2,
    selectedCount: 1,
    placementStatus: 'PLACED',
    placedCompany: 'CodeCraft Labs',
    packageOffered: '₹7.2 LPA'
  },
  {
    id: 'stu-8',
    name: 'Deepak Soni',
    email: 'deepak.soni@demo.careerrajasthan.demo',
    degree: 'B.Tech',
    branch: 'Information Technology',
    college: 'Government Engineering College, Bikaner',
    district: 'Bikaner',
    graduationYear: 2027,
    cgpa: 7.8,
    skills: ['Java', 'SQL', 'HTML', 'CSS', 'JavaScript'],
    applicationsCount: 2,
    shortlistedCount: 0,
    interviewsCount: 0,
    selectedCount: 0,
    placementStatus: 'SEARCHING',
    placedCompany: null,
    packageOffered: null
  }
];

let governmentNotificationsStore = [
  {
    id: 'gov-notif-1',
    title: 'New Internship Opportunities Available in Rajasthan',
    message: 'New skill-development programs and government-subsidized technical internships are available for Rajasthan students.',
    targetAudience: 'All Students',
    targetDistrict: 'All Districts',
    targetSkill: 'All Skills',
    targetDegree: 'All Degrees',
    status: 'ACTIVE',
    sentDate: '2026-08-15T09:00:00Z',
    author: 'Directorate of Technical Education, Rajasthan'
  },
  {
    id: 'gov-notif-2',
    title: 'Statewide AWS Cloud Skill Accelerator Cohort Announced',
    message: 'Rajasthan Govt launches free AWS Certification bootcamp to bridge critical cloud workforce gap for final-year engineering students.',
    targetAudience: 'Students by Skill',
    targetDistrict: 'Rajasthan',
    targetSkill: 'AWS',
    targetDegree: 'B.Tech / MCA',
    status: 'ACTIVE',
    sentDate: '2026-08-17T11:30:00Z',
    author: 'Rajasthan Skill & Livelihoods Development Corporation (RSLDC)'
  }
];

let trainingRecommendationsStore = [
  {
    id: 'rec-1',
    skill: 'AWS',
    employerDemand: 42,
    studentAvailability: 12,
    gap: 30,
    priority: 'CRITICAL',
    title: 'Statewide Cloud Computing & AWS Solution Architect Track',
    targetCohort: '3rd & 4th Year B.Tech (CS/IT/ECE)',
    recommendedInstitutes: ['MNIT Jaipur', 'RTU Kota', 'MBM Jodhpur'],
    status: 'APPROVED_FOR_BUDGET',
    createdDate: '2026-08-16'
  },
  {
    id: 'rec-2',
    skill: 'Docker',
    employerDemand: 35,
    studentAvailability: 8,
    gap: 27,
    priority: 'CRITICAL',
    title: 'DevOps, CI/CD & Containerization Enablement Labs',
    targetCohort: 'Engineering & Polytechnic Final Years',
    recommendedInstitutes: ['CTAE Udaipur', 'GEC Ajmer', 'Polytechnic Bikaner'],
    status: 'UNDER_REVIEW',
    createdDate: '2026-08-17'
  },
  {
    id: 'rec-3',
    skill: 'React.js',
    employerDemand: 72,
    studentAvailability: 38,
    gap: 34,
    priority: 'HIGH',
    title: 'Modern Frontend (React + Next.js + TypeScript) Finishing School',
    targetCohort: 'All Technical Degree Students',
    recommendedInstitutes: ['All 33 District Nodes'],
    status: 'ACTIVE_ENROLLMENT',
    createdDate: '2026-08-18'
  }
];

// =========================================================================
// 2. GOVERNMENT SERVICE IMPLEMENTATION
// =========================================================================

export class GovernmentService {
  /**
   * 1. Get Government Dashboard Overview
   */
  static async getDashboardOverview() {
    const totalStudents = 25430; // Official prompt metric
    const verifiedEmployers = 1240;
    const pendingEmployers = employerStore.filter(e => e.verificationStatus === 'PENDING').length;
    const pendingOpportunityApprovals = opportunityApprovalStore.filter(o => o.approvalStatus === 'PENDING_APPROVAL').length;

    return {
      isPrototypeDemoData: true,
      badge: 'Prototype Demo Data',
      kpis: {
        totalStudents: 25430,
        verifiedEmployers: 1240,
        pendingEmployerApprovals: pendingEmployers,
        activeJobs: 420,
        activeInternships: 280,
        totalApplications: 32450,
        totalPlacements: 3890,
        placementRate: 81.5,
        pendingApprovals: pendingOpportunityApprovals + pendingEmployers
      },
      districts: districtStore,
      skills: skillStore,
      criticalSkillGaps: skillStore.filter(s => s.priority === 'CRITICAL' || s.skill_gap >= 27),
      funnel: funnelStore,
      recentApprovals: opportunityApprovalStore.slice(0, 5),
      recommendations: trainingRecommendationsStore,
      jobsVsInternships: {
        jobsCount: 420,
        internshipsCount: 280,
        jobsPlacementRate: 83.4,
        internshipsConversionRate: 64.2
      }
    };
  }

  /**
   * 2. District-wise Analytics
   */
  static async getDistrictAnalytics(districtFilter = null) {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('government_district_analytics').select('*').order('id', { ascending: true });
        if (districtFilter && districtFilter !== 'ALL') {
          query = query.ilike('district', `%${districtFilter}%`);
        }
        const { data, error } = await query;
        if (data && data.length > 0 && !error) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase district fetch notice:', err.message);
      }
    }

    if (districtFilter && districtFilter !== 'ALL') {
      return districtStore.filter(d => d.district.toLowerCase() === districtFilter.toLowerCase());
    }
    return districtStore;
  }

  /**
   * 3. Skill Gap Analytics
   */
  static async getSkillAnalytics() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('government_skill_analytics')
          .select('*')
          .order('skill_gap', { ascending: false });
        if (data && data.length > 0 && !error) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase skill fetch notice:', err.message);
      }
    }

    return {
      skills: skillStore,
      criticalGaps: skillStore.filter(s => s.priority === 'CRITICAL' || s.skill_gap >= 27),
      summary: 'Critical shortages detected in AWS Cloud (30% gap), Docker DevOps (27% gap), and React.js (34% gap).'
    };
  }

  /**
   * 4. Employment Funnel Analytics
   */
  static async getFunnelAnalytics() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('government_funnel_analytics')
          .select('*')
          .order('id', { ascending: true });
        if (data && data.length > 0 && !error) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase funnel fetch notice:', err.message);
      }
    }

    return {
      funnelTrends: funnelStore,
      summary: {
        latestPeriod: 'August 2026',
        totalApplications: 5200,
        shortlisted: 2400,
        interviews: 1200,
        selected: 510,
        joined: 430,
        shortlistRate: '46.15%',
        interviewToSelectionRate: '42.50%',
        finalConversionRate: '8.27%'
      }
    };
  }

  /**
   * 5. Employers List & Verification
   */
  static async getEmployers(filter = {}) {
    let list = [...employerStore];
    if (filter.status && filter.status !== 'ALL') {
      list = list.filter(e => e.verificationStatus === filter.status);
    }
    if (filter.district && filter.district !== 'ALL') {
      list = list.filter(e => e.district.toLowerCase() === filter.district.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(e => 
        e.companyName.toLowerCase().includes(q) || 
        e.industry.toLowerCase().includes(q) ||
        e.district.toLowerCase().includes(q)
      );
    }
    return list;
  }

  static async updateEmployerStatus(id, status, notes = '') {
    const employer = employerStore.find(e => e.id === id);
    if (!employer) {
      throw new Error(`Employer with ID ${id} not found.`);
    }
    employer.verificationStatus = status;
    employer.statusUpdatedAt = new Date().toISOString();
    employer.adminNotes = notes;
    return employer;
  }

  /**
   * 6. Opportunity Approval Workflow
   */
  static async getOpportunities(filter = {}) {
    let list = [...opportunityApprovalStore];
    if (filter.status && filter.status !== 'ALL') {
      list = list.filter(o => o.approvalStatus === filter.status);
    }
    if (filter.type && filter.type !== 'ALL') {
      list = list.filter(o => o.opportunity_type === filter.type);
    }
    if (filter.district && filter.district !== 'ALL') {
      list = list.filter(o => o.district.toLowerCase() === filter.district.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(o => 
        o.title.toLowerCase().includes(q) || 
        o.company_name.toLowerCase().includes(q) ||
        o.district.toLowerCase().includes(q)
      );
    }
    return list;
  }

  static async updateOpportunityStatus(id, status, notes = '') {
    const opp = opportunityApprovalStore.find(o => o.id === id);
    if (!opp) {
      throw new Error(`Opportunity with ID ${id} not found.`);
    }
    opp.approvalStatus = status;
    opp.statusUpdatedAt = new Date().toISOString();
    opp.adminNotes = notes;
    return opp;
  }

  /**
   * 7. Students Overview & Filters
   */
  static async getStudents(filter = {}) {
    let list = [...studentDirectoryStore];
    if (filter.district && filter.district !== 'ALL') {
      list = list.filter(s => s.district.toLowerCase() === filter.district.toLowerCase());
    }
    if (filter.degree && filter.degree !== 'ALL') {
      list = list.filter(s => s.degree.toLowerCase() === filter.degree.toLowerCase());
    }
    if (filter.branch && filter.branch !== 'ALL') {
      list = list.filter(s => s.branch.toLowerCase().includes(filter.branch.toLowerCase()));
    }
    if (filter.year && filter.year !== 'ALL') {
      list = list.filter(s => String(s.graduationYear) === String(filter.year));
    }
    if (filter.placementStatus && filter.placementStatus !== 'ALL') {
      list = list.filter(s => s.placementStatus === filter.placementStatus);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.college.toLowerCase().includes(q) ||
        s.skills.some(sk => sk.toLowerCase().includes(q))
      );
    }
    return list;
  }

  /**
   * 8. Statewide Placement Analytics
   */
  static async getPlacementAnalytics() {
    const totalApps = 32450;
    const totalJoined = 3890;
    const placementRate = ((totalJoined / totalApps) * 100).toFixed(2);

    return {
      overallPlacementRate: 81.5,
      calculatedRate: `${placementRate}%`,
      formula: "Placement Rate = Joined / Total Applications × 100",
      districtWisePerformance: districtStore.map(d => ({
        district: d.district,
        placementRate: d.placement_rate,
        totalPlacements: d.total_placements,
        totalApplications: d.total_applications,
        conversionRate: ((d.total_placements / d.total_applications) * 100).toFixed(1)
      })),
      monthlyPlacementTrend: [
        { month: 'Jan 2026', placed: 280, target: 250, jobs: 180, internships: 100 },
        { month: 'Feb 2026', placed: 340, target: 300, jobs: 220, internships: 120 },
        { month: 'Mar 2026', placed: 410, target: 380, jobs: 270, internships: 140 },
        { month: 'Apr 2026', placed: 490, target: 450, jobs: 310, internships: 180 },
        { month: 'May 2026', placed: 580, target: 520, jobs: 370, internships: 210 },
        { month: 'Jun 2026', placed: 680, target: 600, jobs: 430, internships: 250 },
        { month: 'Jul 2026', placed: 780, target: 720, jobs: 490, internships: 290 },
        { month: 'Aug 2026', placed: 890, target: 820, jobs: 560, internships: 330 }
      ],
      performanceComparison: {
        jobs: {
          totalOfferings: 420,
          applications: 19800,
          placed: 2450,
          placementRate: 83.4,
          avgSalaryLPA: '₹6.8 LPA'
        },
        internships: {
          totalOfferings: 280,
          applications: 12650,
          placed: 1440,
          conversionToPPO: '64.2%',
          avgStipend: '₹18,500 / mo'
        }
      }
    };
  }

  /**
   * 9. Recommendations Engine & Creation
   */
  static async getRecommendations() {
    return trainingRecommendationsStore;
  }

  static async createRecommendation(payload) {
    const newRec = {
      id: `rec-${Date.now()}`,
      skill: payload.skill || 'AWS',
      employerDemand: payload.employerDemand || 42,
      studentAvailability: payload.studentAvailability || 12,
      gap: payload.gap || 30,
      priority: payload.priority || 'HIGH',
      title: payload.title || `Skill Development Initiative for ${payload.skill}`,
      targetCohort: payload.targetCohort || 'Final & Pre-Final Technical Students',
      recommendedInstitutes: payload.recommendedInstitutes || ['State Engineering Colleges'],
      status: 'APPROVED_FOR_BUDGET',
      createdDate: new Date().toISOString().split('T')[0]
    };
    trainingRecommendationsStore.unshift(newRec);
    return newRec;
  }

  /**
   * 10. Notifications Management
   */
  static async getNotifications() {
    return governmentNotificationsStore;
  }

  static async createNotification(payload) {
    const newNotif = {
      id: `gov-notif-${Date.now()}`,
      title: payload.title,
      message: payload.message,
      targetAudience: payload.targetAudience || 'All Students',
      targetDistrict: payload.targetDistrict || 'All Districts',
      targetSkill: payload.targetSkill || 'All Skills',
      targetDegree: payload.targetDegree || 'All Degrees',
      status: 'ACTIVE',
      sentDate: new Date().toISOString(),
      author: payload.author || 'Rajasthan Technical Education Directorate'
    };
    governmentNotificationsStore.unshift(newNotif);
    return newNotif;
  }

  /**
   * 11. Reports & CSV Export Data
   */
  static async getReportData(reportType) {
    switch (reportType) {
      case 'district':
        return {
          title: 'Rajasthan District Employment Intelligence Report',
          columns: ['District', 'Students', 'Employers', 'Jobs', 'Internships', 'Applications', 'Placements', 'Placement Rate (%)'],
          rows: districtStore.map(d => [
            d.district, d.total_students, d.total_employers, d.total_jobs, d.total_internships, d.total_applications, d.total_placements, `${d.placement_rate}%`
          ])
        };
      case 'employer':
        return {
          title: 'Registered Recruiter & Employer Verification Report',
          columns: ['Company Name', 'Industry', 'District', 'Registration No.', 'Status', 'Active Jobs', 'Total Hires'],
          rows: employerStore.map(e => [
            e.companyName, e.industry, e.district, e.registrationNumber, e.verificationStatus, e.activeJobsCount, e.totalHires
          ])
        };
      case 'opportunity':
        return {
          title: 'Statewide Employment & Internship Requisition Report',
          columns: ['Title', 'Type', 'Company', 'District', 'Salary / Stipend', 'Status', 'Vacancies', 'Created Date'],
          rows: opportunityApprovalStore.map(o => [
            o.title, o.opportunity_type, o.company_name, o.district, o.salary_range, o.approvalStatus, o.vacancies, o.createdDate
          ])
        };
      case 'student':
        return {
          title: 'Statewide Student Talent & Placement Roster',
          columns: ['Name', 'Degree', 'Branch', 'College', 'District', 'Grad Year', 'CGPA', 'Placement Status', 'Offered Company'],
          rows: studentDirectoryStore.map(s => [
            s.name, s.degree, s.branch, s.college, s.district, s.graduationYear, s.cgpa, s.placementStatus, s.placedCompany || 'N/A'
          ])
        };
      case 'skill':
        return {
          title: 'Rajasthan Industry Demand vs Student Availability Matrix',
          columns: ['Skill Name', 'Employer Demand (%)', 'Student Availability (%)', 'Skill Gap (%)', 'Priority Level', 'Actionable Recommendation'],
          rows: skillStore.map(s => [
            s.skill_name, `${s.employer_demand}%`, `${s.student_availability}%`, `${s.skill_gap}%`, s.priority, s.recommendation
          ])
        };
      case 'funnel':
        return {
          title: 'Statewide Employment Conversion Funnel Report',
          columns: ['Period', 'Applications', 'Shortlisted', 'Interviews', 'Selected', 'Joined', 'Conversion Rate'],
          rows: funnelStore.map(f => [
            f.period, f.applications, f.shortlisted, f.interviews, f.selected, f.joined, f.conversion_rate
          ])
        };
      default:
        return {
          availableReports: ['district', 'employer', 'opportunity', 'student', 'skill', 'funnel']
        };
    }
  }
}
