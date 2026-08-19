export const skillAliases = {
  "react": "React",
  "reactjs": "React",
  "react.js": "React",
  "react js": "React",
  "node": "Node.js",
  "nodejs": "Node.js",
  "node.js": "Node.js",
  "node js": "Node.js",
  "js": "JavaScript",
  "javascript": "JavaScript",
  "ecmascript": "JavaScript",
  "ts": "TypeScript",
  "typescript": "TypeScript",
  "py": "Python",
  "python": "Python",
  "python3": "Python",
  "html": "HTML",
  "html5": "HTML",
  "css": "CSS",
  "css3": "CSS",
  "git": "Git",
  "github": "Git",
  "mongodb": "MongoDB",
  "mongo": "MongoDB",
  "sql": "SQL",
  "postgres": "PostgreSQL",
  "postgresql": "PostgreSQL",
  "docker": "Docker",
  "aws": "AWS",
  "cloud": "Cloud Computing",
  "testing": "Testing",
  "jest": "Jest",
  "redux": "Redux",
  "tailwind": "Tailwind CSS",
  "tailwindcss": "Tailwind CSS",
  "express": "Express.js",
  "expressjs": "Express.js",
  "java": "Java",
  "cpp": "C++",
  "c++": "C++"
};

export const standardSkills = [
  { id: "s1", name: "React", category: "Frontend", demandScore: 92 },
  { id: "s2", name: "JavaScript", category: "Core", demandScore: 98 },
  { id: "s3", name: "HTML", category: "Frontend", demandScore: 85 },
  { id: "s4", name: "CSS", category: "Frontend", demandScore: 85 },
  { id: "s5", name: "TypeScript", category: "Frontend/Backend", demandScore: 88 },
  { id: "s6", name: "Node.js", category: "Backend", demandScore: 90 },
  { id: "s7", name: "Git", category: "DevOps/Tools", demandScore: 94 },
  { id: "s8", name: "MongoDB", category: "Database", demandScore: 80 },
  { id: "s9", name: "PostgreSQL", category: "Database", demandScore: 86 },
  { id: "s10", name: "Python", category: "Core/Data", demandScore: 96 },
  { id: "s11", name: "Docker", category: "DevOps", demandScore: 84 },
  { id: "s12", name: "AWS", category: "Cloud", demandScore: 89 },
  { id: "s13", name: "Jest", category: "Testing", demandScore: 78 },
  { id: "s14", name: "Redux", category: "Frontend", demandScore: 80 },
  { id: "s15", name: "Tailwind CSS", category: "Frontend", demandScore: 87 },
  { id: "s16", name: "Express.js", category: "Backend", demandScore: 88 },
  { id: "s17", name: "Java", category: "Core/Enterprise", demandScore: 89 },
  { id: "s18", name: "C++", category: "Core", demandScore: 82 }
];

export const initialStudents = [
  {
    id: "stu-1",
    name: "Rahul Sharma",
    email: "student01@gmail.com",
    phone: "+91 98290 12345",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    college: "Rajasthan Technical University (RTU), Kota",
    district: "Jaipur",
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    semester: 6,
    cgpa: 8.4,
    careerReadiness: 84,
    preferredRoles: ["Frontend Developer", "Full Stack Developer", "React Developer"],
    preferredLocations: ["Jaipur", "Remote", "Gurugram"],
    bio: "Passionate 3rd-year CS student with a strong foundation in modern JavaScript, React ecosystems, and full-stack web architectures.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Git", "Node.js", "MongoDB"],
    skillLevels: {
      "React": "Advanced",
      "JavaScript": "Advanced",
      "HTML": "Expert",
      "CSS": "Expert",
      "Git": "Intermediate",
      "Node.js": "Intermediate",
      "MongoDB": "Beginner"
    },
    education: [
      {
        institution: "Rajasthan Technical University (RTU), Kota",
        degree: "B.Tech in Computer Science & Engineering",
        duration: "2023 - 2027 (Expected)",
        score: "8.4 CGPA",
        status: "Pursuing"
      },
      {
        institution: "Mahaveer Public School, Jaipur",
        degree: "Senior Secondary (CBSE - PCM)",
        duration: "2021 - 2023",
        score: "92.4%",
        status: "Completed"
      }
    ],
    projects: [
      {
        id: "p1",
        title: "Rajasthan Heritage Tourism Web Portal",
        description: "Built an interactive progressive web app using React, Tailwind CSS, and REST APIs to showcase historical monuments in Jaipur & Udaipur with offline support.",
        technologies: ["React", "JavaScript", "Tailwind CSS", "REST API"],
        link: "https://github.com/rahul-sharma/raj-heritage-portal"
      },
      {
        id: "p2",
        title: "Campus Grievance Redressal System",
        description: "Developed a full-stack ticketing workflow platform for RTU students using Node.js, Express, and MongoDB.",
        technologies: ["Node.js", "Express.js", "MongoDB", "JavaScript"],
        link: "https://github.com/rahul-sharma/campus-grievance"
      },
      {
        id: "p3",
        title: "Real-time Poll & Quiz Web App",
        description: "Created a responsive classroom feedback application with state persistence.",
        technologies: ["React", "HTML", "CSS", "Git"],
        link: "https://github.com/rahul-sharma/live-quiz"
      }
    ],
    certifications: [
      {
        name: "Meta Front-End Developer Professional Certificate",
        issuer: "Coursera / Meta",
        date: "Dec 2025",
        credentialId: "META-FE-98421"
      },
      {
        name: "Responsive Web Design Certification",
        issuer: "freeCodeCamp",
        date: "Aug 2025",
        credentialId: "FCC-RWD-77123"
      },
      {
        name: "Git & GitHub Essentials",
        issuer: "Rajasthan iStart Skill Academy",
        date: "Oct 2025",
        credentialId: "ISTART-GIT-3301"
      }
    ],
    internships: [
      {
        role: "Web Development Intern",
        company: "Jaipur Smart City Hub",
        duration: "May 2025 - July 2025 (2 Months)",
        description: "Assisted in redesigning municipal citizen dashboard UI components and improved mobile responsiveness by 35%."
      }
    ]
  },
  {
    id: "stu-2",
    name: "Priya Singh",
    email: "priya.singh@demo.careerrajasthan.demo",
    phone: "+91 94140 55678",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    college: "Malaviya National Institute of Technology (MNIT), Jaipur",
    district: "Jaipur",
    degree: "B.Tech",
    branch: "Information Technology",
    year: "4th Year",
    semester: 8,
    cgpa: 9.1,
    careerReadiness: 91,
    preferredRoles: ["Frontend Developer", "Software Engineer", "UI Engineer"],
    preferredLocations: ["Jaipur", "Bengaluru", "Remote"],
    bio: "Senior IT undergrad specializing in TypeScript, modern React, state management, and accessible UI engineering.",
    skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Git", "Redux", "Tailwind CSS"],
    skillLevels: {
      "React": "Expert",
      "JavaScript": "Expert",
      "TypeScript": "Advanced",
      "HTML": "Expert",
      "CSS": "Expert",
      "Git": "Advanced",
      "Redux": "Intermediate",
      "Tailwind CSS": "Expert"
    },
    education: [
      {
        institution: "MNIT Jaipur",
        degree: "B.Tech in Information Technology",
        duration: "2022 - 2026",
        score: "9.1 CGPA",
        status: "Final Year"
      }
    ],
    projects: [
      {
        id: "p201",
        title: "Enterprise Design System & Component Library",
        description: "Open-source Accessible UI component library built with React, TypeScript, and Tailwind CSS.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Jest"],
        link: "https://github.com/priya/design-system"
      }
    ],
    certifications: [
      {
        name: "TypeScript Advanced Certification",
        issuer: "Udemy",
        date: "Jan 2026",
        credentialId: "TS-ADV-441"
      }
    ],
    internships: [
      {
        role: "Frontend Engineering Intern",
        company: "InnovateX Labs",
        duration: "June 2025 - Dec 2025 (6 Months)",
        description: "Developed analytics dashboards and optimized bundle rendering time by 28%."
      }
    ]
  },
  {
    id: "stu-3",
    name: "Aman Verma",
    email: "aman.verma@demo.careerrajasthan.demo",
    phone: "+91 97850 44321",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    college: "Government Engineering College (GEC), Ajmer",
    district: "Ajmer",
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    semester: 6,
    cgpa: 7.9,
    careerReadiness: 76,
    preferredRoles: ["Backend Developer", "Node.js Developer", "API Engineer"],
    preferredLocations: ["Jaipur", "Ajmer", "Remote"],
    bio: "Backend-focused developer enthusiastic about microservices, Express APIs, PostgreSQL databases, and Docker containerization.",
    skills: ["Node.js", "Express.js", "JavaScript", "PostgreSQL", "MongoDB", "Git", "Docker"],
    skillLevels: {
      "Node.js": "Advanced",
      "Express.js": "Advanced",
      "JavaScript": "Advanced",
      "PostgreSQL": "Intermediate",
      "MongoDB": "Intermediate",
      "Git": "Intermediate",
      "Docker": "Beginner"
    },
    education: [
      {
        institution: "GEC Ajmer",
        degree: "B.Tech CSE",
        duration: "2023 - 2027",
        score: "7.9 CGPA",
        status: "Pursuing"
      }
    ],
    projects: [
      {
        id: "p301",
        title: "High Throughput Payment Webhook Processor",
        description: "Built using Node.js, Express, and PostgreSQL with idempotent queue handling.",
        technologies: ["Node.js", "Express.js", "PostgreSQL", "Docker"],
        link: "https://github.com/aman/payment-webhook"
      }
    ],
    certifications: [
      {
        name: "Node.js Backend Specialist",
        issuer: "Coursera",
        date: "Nov 2025",
        credentialId: "NODE-SPEC-91"
      }
    ],
    internships: []
  },
  {
    id: "stu-4",
    name: "Karan Joshi",
    email: "karan.joshi@demo.careerrajasthan.demo",
    phone: "+91 98280 66789",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    college: "MBM University, Jodhpur",
    district: "Jodhpur",
    degree: "B.Tech",
    branch: "Data Science & AI",
    year: "4th Year",
    semester: 7,
    cgpa: 8.7,
    careerReadiness: 88,
    preferredRoles: ["Data Analyst", "Python Developer", "ML Engineer"],
    preferredLocations: ["Jodhpur", "Jaipur", "Bengaluru"],
    bio: "Data enthusiast with strong statistical analysis skills, Python data pipelines, SQL queries, and predictive modeling.",
    skills: ["Python", "SQL", "PostgreSQL", "Git", "JavaScript", "AWS"],
    skillLevels: {
      "Python": "Expert",
      "SQL": "Advanced",
      "PostgreSQL": "Advanced",
      "Git": "Intermediate",
      "JavaScript": "Intermediate",
      "AWS": "Beginner"
    },
    education: [
      {
        institution: "MBM University, Jodhpur",
        degree: "B.Tech Data Science & AI",
        duration: "2022 - 2026",
        score: "8.7 CGPA",
        status: "Final Year"
      }
    ],
    projects: [
      {
        id: "p401",
        title: "Agricultural Crop Yield Prediction for Western Rajasthan",
        description: "Analyzed weather and soil datasets with Python & Pandas to forecast bajra and wheat crop yields across Barmer and Jodhpur districts.",
        technologies: ["Python", "SQL", "Git"],
        link: "https://github.com/karan/raj-agri-ml"
      }
    ],
    certifications: [
      {
        name: "Google Data Analytics Professional Certificate",
        issuer: "Coursera",
        date: "Aug 2025",
        credentialId: "GOOGLE-DA-1102"
      }
    ],
    internships: []
  },
  {
    id: "stu-5",
    name: "Neha Meena",
    email: "neha.meena@demo.careerrajasthan.demo",
    phone: "+91 94130 99887",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    college: "College of Technology and Engineering (CTAE), Udaipur",
    district: "Udaipur",
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    semester: 5,
    cgpa: 8.2,
    careerReadiness: 79,
    preferredRoles: ["Frontend Developer", "Web Developer", "Software Engineer"],
    preferredLocations: ["Udaipur", "Jaipur", "Remote"],
    bio: "Passionate developer exploring modern UI frameworks, responsive accessibility, and cloud integration.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Git", "Python"],
    skillLevels: {
      "HTML": "Expert",
      "CSS": "Expert",
      "JavaScript": "Advanced",
      "React": "Intermediate",
      "Git": "Intermediate",
      "Python": "Beginner"
    },
    education: [
      {
        institution: "CTAE Udaipur",
        degree: "B.Tech CSE",
        duration: "2023 - 2027",
        score: "8.2 CGPA",
        status: "Pursuing"
      }
    ],
    projects: [
      {
        id: "p501",
        title: "Tribal Artisan Marketplace UI",
        description: "Built e-commerce storefront for Udaipur handicraft weavers using React and Tailwind.",
        technologies: ["React", "JavaScript", "HTML", "CSS"],
        link: "https://github.com/neha/tribal-crafts"
      }
    ],
    certifications: [
      {
        name: "Frontend Specialist Certificate",
        issuer: "iStart Rajasthan",
        date: "Oct 2025",
        credentialId: "ISTART-FE-202"
      }
    ],
    internships: []
  }
];

export const initialCompanies = [
  {
    id: "comp-1",
    name: "TechNova Solutions",
    email: "employee01@gmail.com",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    industry: "Enterprise SaaS & Cloud",
    location: "Jaipur, Rajasthan",
    website: "https://technova.demo",
    description: "Leading Rajasthan-headquartered enterprise technology firm developing AI-driven customer intelligence and fintech software for international clients.",
    verified: true,
    hiringSince: 2021,
    activeJobsCount: 4,
    totalHires: 142
  },
  {
    id: "comp-2",
    name: "CodeCraft Labs",
    email: "hr@codecraftlabs.demo",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80",
    industry: "Full-Stack Software Services",
    location: "Jaipur, Rajasthan",
    website: "https://codecraft.demo",
    description: "High-growth software engineering studio crafting high-throughput web and mobile digital products.",
    verified: true,
    hiringSince: 2022,
    activeJobsCount: 3,
    totalHires: 88
  },
  {
    id: "comp-3",
    name: "InnovateX Technologies",
    email: "careers@innovatex.demo",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&auto=format&fit=crop&q=80",
    industry: "Product Engineering & Analytics",
    location: "Udaipur, Rajasthan",
    website: "https://innovatex.demo",
    description: "Innovative product development company empowering smart city infrastructure, clean-tech, and analytics.",
    verified: true,
    hiringSince: 2020,
    activeJobsCount: 2,
    totalHires: 64
  },
  {
    id: "comp-4",
    name: "Solvix Technologies",
    email: "jobs@solvix.demo",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
    industry: "Fintech & Data Systems",
    location: "Jodhpur, Rajasthan",
    website: "https://solvix.demo",
    description: "Secure data engineering and banking infrastructure solutions provider for regional banking networks.",
    verified: true,
    hiringSince: 2023,
    activeJobsCount: 2,
    totalHires: 39
  },
  {
    id: "comp-5",
    name: "PixelPlex Studio",
    email: "contact@pixelplex.demo",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80",
    industry: "UI/UX & Creative Tech",
    location: "Kota, Rajasthan",
    website: "https://pixelplex.demo",
    description: "Specialized design-engineering consultancy building interactive web applications for global startups.",
    verified: true,
    hiringSince: 2024,
    activeJobsCount: 1,
    totalHires: 21
  }
];

export const initialJobs = [
  {
    id: "job-1",
    companyId: "comp-1",
    companyName: "TechNova Solutions",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    title: "React Developer",
    type: "Job",
    employmentType: "Full Time",
    workMode: "Hybrid",
    location: "Jaipur, Rajasthan",
    salary: "₹6.5 - ₹8.5 LPA",
    experienceLevel: "0 - 1 Years (Freshers Welcome)",
    minCgpa: 7.0,
    allowedBranches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication"],
    allowedDegrees: ["B.Tech", "B.E.", "MCA"],
    description: "We are seeking a talented React Developer to join our core product engineering team in Jaipur. You will build high-performance client web applications, integrate REST/GraphQL APIs, and deliver polished user interfaces.",
    responsibilities: [
      "Develop reusable and responsive React components using modern functional patterns and hooks.",
      "Collaborate with UI/UX designers and backend engineers to integrate REST APIs.",
      "Optimize web applications for maximum speed, scalability, and cross-browser responsiveness.",
      "Participate in code reviews, automated unit testing, and agile sprint deliveries."
    ],
    requiredSkills: ["React", "JavaScript", "HTML", "CSS", "Git"],
    preferredSkills: ["TypeScript", "Redux", "Tailwind CSS"],
    hardRequirements: ["React", "JavaScript"], // Strict disqualifier if missing
    postedDate: "2026-08-10",
    deadline: "2026-09-15",
    openPositions: 4,
    status: "Active",
    applicantsCount: 126
  },
  {
    id: "job-2",
    companyId: "comp-1",
    companyName: "TechNova Solutions",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    title: "Frontend Developer Intern",
    type: "Internship",
    employmentType: "Internship (6 Months)",
    workMode: "Hybrid",
    location: "Jaipur, Rajasthan",
    stipend: "₹18,000 / month",
    salary: "₹18,000 / month Stipend (PPO Available up to ₹7 LPA)",
    experienceLevel: "Students (3rd / 4th Year)",
    minCgpa: 6.5,
    allowedBranches: ["Computer Science & Engineering", "Information Technology", "All Technical Branches"],
    allowedDegrees: ["B.Tech", "B.E.", "BCA", "MCA", "Diploma"],
    description: "Exciting 6-month internship for enthusiastic technical students. Work directly alongside senior architects to build enterprise web portals and gain real-world agile experience.",
    responsibilities: [
      "Build modular interactive components using React and Tailwind CSS.",
      "Translate Figma wireframes into pixel-perfect responsive HTML/CSS.",
      "Fix bugs, write documentation, and participate in daily standups."
    ],
    requiredSkills: ["React", "JavaScript", "HTML", "CSS", "Git"],
    preferredSkills: ["TypeScript", "Tailwind CSS"],
    hardRequirements: ["JavaScript", "HTML"],
    postedDate: "2026-08-12",
    deadline: "2026-09-20",
    openPositions: 8,
    status: "Active",
    applicantsCount: 94
  },
  {
    id: "job-3",
    companyId: "comp-2",
    companyName: "CodeCraft Labs",
    companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80",
    title: "Node.js Backend Developer",
    type: "Job",
    employmentType: "Full Time",
    workMode: "On-site",
    location: "Jaipur, Rajasthan",
    salary: "₹7.0 - ₹9.5 LPA",
    experienceLevel: "0 - 2 Years",
    minCgpa: 7.0,
    allowedBranches: ["Computer Science & Engineering", "Information Technology", "MCA"],
    allowedDegrees: ["B.Tech", "MCA"],
    description: "Looking for an analytical Node.js Backend Developer to build scalable RESTful microservices, manage PostgreSQL and MongoDB databases, and implement secure token authentication.",
    responsibilities: [
      "Design and maintain scalable backend services using Node.js and Express.",
      "Write optimized database queries in PostgreSQL and MongoDB.",
      "Implement role-based authorization, rate limiting, and API caching."
    ],
    requiredSkills: ["Node.js", "Express.js", "JavaScript", "PostgreSQL", "Git"],
    preferredSkills: ["Docker", "MongoDB", "AWS"],
    hardRequirements: ["Node.js", "Express.js"],
    postedDate: "2026-08-08",
    deadline: "2026-09-10",
    openPositions: 3,
    status: "Active",
    applicantsCount: 78
  },
  {
    id: "job-4",
    companyId: "comp-2",
    companyName: "CodeCraft Labs",
    companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80",
    title: "Full Stack Developer (MERN)",
    type: "Job",
    employmentType: "Full Time",
    workMode: "Hybrid",
    location: "Jaipur, Rajasthan",
    salary: "₹8.0 - ₹11.0 LPA",
    experienceLevel: "1 - 2 Years / Strong Portfolio",
    minCgpa: 7.5,
    allowedBranches: ["Computer Science & Engineering", "Information Technology"],
    allowedDegrees: ["B.Tech", "MCA"],
    description: "Join our fast-moving product team building end-to-end full-stack applications with React, Node.js, Express, MongoDB, and Tailwind CSS.",
    responsibilities: [
      "Architect both frontend interfaces and backend API controllers.",
      "Design database schemas and deploy microservices."
    ],
    requiredSkills: ["React", "Node.js", "JavaScript", "MongoDB", "Express.js", "Git"],
    preferredSkills: ["TypeScript", "Docker", "AWS"],
    hardRequirements: ["React", "Node.js"],
    postedDate: "2026-08-05",
    deadline: "2026-09-05",
    openPositions: 2,
    status: "Active",
    applicantsCount: 112
  },
  {
    id: "job-5",
    companyId: "comp-3",
    companyName: "InnovateX Technologies",
    companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&auto=format&fit=crop&q=80",
    title: "Data Analyst / Python Engineer",
    type: "Job",
    employmentType: "Full Time",
    workMode: "On-site",
    location: "Udaipur, Rajasthan",
    salary: "₹6.0 - ₹8.0 LPA",
    experienceLevel: "0 - 1 Years",
    minCgpa: 7.5,
    allowedBranches: ["Computer Science & Engineering", "Data Science & AI", "Information Technology"],
    allowedDegrees: ["B.Tech", "M.Tech", "MCA"],
    description: "Analyze complex state and enterprise datasets, build automated Python ETL pipelines, and create executive business intelligence dashboards.",
    responsibilities: [
      "Extract and transform structured and unstructured data using Python and SQL.",
      "Build insightful dashboards and charts using business intelligence tools.",
      "Collaborate with product teams to measure key operational KPIs."
    ],
    requiredSkills: ["Python", "SQL", "PostgreSQL", "Git"],
    preferredSkills: ["AWS", "Docker", "JavaScript"],
    hardRequirements: ["Python", "SQL"],
    postedDate: "2026-08-11",
    deadline: "2026-09-18",
    openPositions: 3,
    status: "Active",
    applicantsCount: 65
  },
  {
    id: "job-6",
    companyId: "comp-4",
    companyName: "Solvix Technologies",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
    title: "Cloud & DevOps Associate",
    type: "Job",
    employmentType: "Full Time",
    workMode: "Remote",
    location: "Jodhpur, Rajasthan (Remote)",
    salary: "₹7.5 - ₹10.0 LPA",
    experienceLevel: "0 - 2 Years",
    minCgpa: 7.0,
    allowedBranches: ["Computer Science & Engineering", "Information Technology", "ECE"],
    allowedDegrees: ["B.Tech"],
    description: "Manage AWS cloud infrastructure, build automated CI/CD pipelines, configure Docker containers, and ensure 99.9% application uptime.",
    responsibilities: [
      "Manage cloud deployments on AWS and maintain Dockerized microservices.",
      "Automate testing and deployment pipelines using GitHub Actions."
    ],
    requiredSkills: ["AWS", "Docker", "Git", "Python", "Cloud Computing"],
    preferredSkills: ["Node.js", "PostgreSQL"],
    hardRequirements: ["AWS", "Docker"],
    postedDate: "2026-08-07",
    deadline: "2026-09-12",
    openPositions: 2,
    status: "Active",
    applicantsCount: 42
  },
  {
    id: "job-7",
    companyId: "comp-5",
    companyName: "PixelPlex Studio",
    companyLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80",
    title: "UI/UX & Frontend Developer",
    type: "Job",
    employmentType: "Full Time",
    workMode: "Hybrid",
    location: "Kota, Rajasthan",
    salary: "₹5.5 - ₹7.5 LPA",
    experienceLevel: "0 - 1 Years",
    minCgpa: 6.5,
    allowedBranches: ["All Engineering & Technical Branches"],
    allowedDegrees: ["B.Tech", "B.Des", "BCA", "MCA"],
    description: "Build clean, visually stunning web experiences, micro-interactions, and animations using React, Tailwind CSS, and Figma.",
    responsibilities: [
      "Develop responsive user interfaces with Tailwind CSS and React.",
      "Work closely with product designers to implement interactive prototypes."
    ],
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    preferredSkills: ["TypeScript", "Git"],
    hardRequirements: ["HTML", "CSS", "JavaScript"],
    postedDate: "2026-08-14",
    deadline: "2026-09-25",
    openPositions: 2,
    status: "Active",
    applicantsCount: 53
  }
];

export const initialApplications = [
  {
    id: "app-101",
    studentId: "stu-1",
    jobId: "job-1",
    studentName: "Rahul Sharma",
    jobTitle: "React Developer",
    companyName: "TechNova Solutions",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    status: "APPLIED",
    appliedDate: "2026-08-15T10:30:00Z",
    matchScore: 92,
    matchLevel: "Strong Match",
    history: [
      {
        status: "APPLIED",
        changedBy: "Rahul Sharma (Student)",
        timestamp: "2026-08-15T10:30:00Z",
        note: "Application submitted via Rajasthan CareerSphere Portal"
      }
    ]
  },
  {
    id: "app-102",
    studentId: "stu-2",
    jobId: "job-1",
    studentName: "Priya Singh",
    jobTitle: "React Developer",
    companyName: "TechNova Solutions",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    status: "SHORTLISTED",
    appliedDate: "2026-08-12T14:15:00Z",
    matchScore: 96,
    matchLevel: "Excellent Match",
    history: [
      {
        status: "APPLIED",
        changedBy: "Priya Singh",
        timestamp: "2026-08-12T14:15:00Z",
        note: "Direct application"
      },
      {
        status: "UNDER_REVIEW",
        changedBy: "TechNova Talent Team",
        timestamp: "2026-08-13T09:00:00Z",
        note: "Profile verified with 9.1 CGPA and TypeScript experience"
      },
      {
        status: "SHORTLISTED",
        changedBy: "TechNova Hiring Lead",
        timestamp: "2026-08-14T11:20:00Z",
        note: "Shortlisted for Round 1 Technical Interview"
      }
    ]
  },
  {
    id: "app-103",
    studentId: "stu-3",
    jobId: "job-3",
    studentName: "Aman Verma",
    jobTitle: "Node.js Backend Developer",
    companyName: "CodeCraft Labs",
    companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80",
    status: "INTERVIEW_SCHEDULED",
    appliedDate: "2026-08-11T09:00:00Z",
    matchScore: 90,
    matchLevel: "Strong Match",
    history: [
      {
        status: "APPLIED",
        changedBy: "Aman Verma",
        timestamp: "2026-08-11T09:00:00Z",
        note: "Applied"
      },
      {
        status: "SHORTLISTED",
        changedBy: "CodeCraft HR",
        timestamp: "2026-08-13T16:00:00Z",
        note: "Qualified based on backend project showcase"
      },
      {
        status: "INTERVIEW_SCHEDULED",
        changedBy: "CodeCraft Technical Panel",
        timestamp: "2026-08-16T10:00:00Z",
        note: "Round 1 scheduled on Google Meet"
      }
    ]
  }
];

export const initialInterviews = [
  {
    id: "int-1",
    applicationId: "app-103",
    studentId: "stu-3",
    studentName: "Aman Verma",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    companyId: "comp-2",
    companyName: "CodeCraft Labs",
    jobTitle: "Node.js Backend Developer",
    roundName: "Technical Round 1 — System Design & Node APIs",
    interviewType: "Video Call (Google Meet)",
    date: "2026-08-25",
    time: "11:00 AM - 11:45 AM IST",
    meetingLink: "https://meet.google.com/raj-sih-demo",
    interviewerName: "Dr. Vikram Sethi (Lead Architect)",
    status: "SCHEDULED",
    notes: "Please be ready to demonstrate your Webhook processing project and discuss PostgreSQL query optimization."
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    userId: "stu-1",
    title: "Welcome to CareerSphere Rajasthan",
    message: "Your student profile is active! Complete your Career Passport to unlock explainable job match scores.",
    type: "INFO",
    read: false,
    timestamp: "2026-08-15T08:00:00Z",
    actionUrl: "/student/passport"
  },
  {
    id: "notif-2",
    userId: "stu-1",
    title: "High Match Job Recommendation Available",
    message: "TechNova Solutions is hiring a React Developer in Jaipur. Your skills match 92% of the job profile!",
    type: "MATCH",
    read: false,
    timestamp: "2026-08-15T09:15:00Z",
    actionUrl: "/student/jobs/job-1"
  },
  {
    id: "notif-3",
    userId: "stu-2",
    title: "🎉 You have been Shortlisted!",
    message: "TechNova Solutions has shortlisted your application for the React Developer position.",
    type: "SHORTLIST",
    read: true,
    timestamp: "2026-08-14T11:20:00Z",
    actionUrl: "/student/applications"
  }
];

export const rajasthanDistricts = [
  { name: "Jaipur", placementRate: 82, registeredStudents: 14250, placedStudents: 11685, collegesCount: 42, avgSalaryLPA: 7.2 },
  { name: "Jodhpur", placementRate: 76, registeredStudents: 8120, placedStudents: 6171, collegesCount: 26, avgSalaryLPA: 6.4 },
  { name: "Kota", placementRate: 74, registeredStudents: 6840, placedStudents: 5061, collegesCount: 21, avgSalaryLPA: 6.1 },
  { name: "Udaipur", placementRate: 71, registeredStudents: 5320, placedStudents: 3777, collegesCount: 18, avgSalaryLPA: 5.9 },
  { name: "Ajmer", placementRate: 69, registeredStudents: 4410, placedStudents: 3042, collegesCount: 15, avgSalaryLPA: 5.5 },
  { name: "Bikaner", placementRate: 65, registeredStudents: 3910, placedStudents: 2541, collegesCount: 12, avgSalaryLPA: 5.2 }
];

export const rajasthanColleges = [
  { id: "col-1", name: "Malaviya National Institute of Technology (MNIT), Jaipur", type: "National / State Premier", district: "Jaipur", totalStudents: 3200, placedStudents: 2912, placementRate: 91, topSkills: ["React", "Python", "Cloud", "Java"], activeEmployers: 120 },
  { id: "col-2", name: "Rajasthan Technical University (RTU), Kota", type: "State Technical University", district: "Kota", totalStudents: 5400, placedStudents: 4320, placementRate: 80, topSkills: ["React", "JavaScript", "Node.js", "SQL"], activeEmployers: 95 },
  { id: "col-3", name: "MBM University, Jodhpur", type: "State University", district: "Jodhpur", totalStudents: 2800, placedStudents: 2184, placementRate: 78, topSkills: ["Data Science", "Python", "C++", "Docker"], activeEmployers: 64 },
  { id: "col-4", name: "College of Technology and Engineering (CTAE), Udaipur", type: "Government Engineering College", district: "Udaipur", totalStudents: 2100, placedStudents: 1575, placementRate: 75, topSkills: ["HTML", "CSS", "React", "Python"], activeEmployers: 48 },
  { id: "col-5", name: "Government Engineering College (GEC), Ajmer", type: "Government Engineering College", district: "Ajmer", totalStudents: 1950, placedStudents: 1404, placementRate: 72, topSkills: ["Node.js", "Express.js", "PostgreSQL", "Git"], activeEmployers: 42 },
  { id: "col-6", name: "Government Polytechnic College, Bikaner", type: "Polytechnic / Diploma", district: "Bikaner", totalStudents: 1400, placedStudents: 924, placementRate: 66, topSkills: ["Web Basics", "AutoCAD", "Python", "Networking"], activeEmployers: 28 }
];

export const skillDemandData = [
  { skill: "React", demandCount: 2400, availableTalent: 1720, gap: 680, priority: "High Gap", percentageDemand: 28 },
  { skill: "Cloud / AWS", demandCount: 1800, availableTalent: 920, gap: 880, priority: "Critical Gap", percentageDemand: 21 },
  { skill: "Data Science & Python", demandCount: 1500, availableTalent: 740, gap: 760, priority: "High Gap", percentageDemand: 18 },
  { skill: "Node.js & Backend", demandCount: 1650, availableTalent: 1180, gap: 470, priority: "Moderate Gap", percentageDemand: 19 },
  { skill: "Cybersecurity & DevOps", demandCount: 1200, availableTalent: 610, gap: 590, priority: "Critical Gap", percentageDemand: 14 }
];

export const placementFunnel = [
  { stage: "Applications Submitted", count: 48600, dropRate: "0%" },
  { stage: "Profile Shortlisted", count: 18240, dropRate: "62.4%" },
  { stage: "Interview Scheduled", count: 9650, dropRate: "47.1%" },
  { stage: "Interview Completed", count: 8120, dropRate: "15.8%" },
  { stage: "Offer Extended", count: 5430, dropRate: "33.1%" },
  { stage: "Joined / Placed", count: 4980, dropRate: "8.3%" }
];
