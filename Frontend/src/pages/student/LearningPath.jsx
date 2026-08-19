import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Sparkles,
  TrendingUp,
  PlayCircle,
  Award,
  Target,
  FileCode2,
  Cpu,
  ShieldAlert
} from 'lucide-react';
import { studentApi } from '../../api/studentApi';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const LearningPath = () => {
  const [learningPlan, setLearningPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState('frontend');
  const [completedSteps, setCompletedSteps] = useState([1]);

  useEffect(() => {
    if (typeof studentApi?.getLearningPlan === 'function') {
      studentApi.getLearningPlan('stu-1', 'Frontend Developer')
        .then(res => {
          if (res?.data) setLearningPlan(res.data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const toggleComplete = (stepId) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
    toast.success("Progress saved! Candidate match score updated.", {
      icon: '🚀'
    });
  };

  const tracks = [
    { id: 'frontend', label: 'Frontend Engineer', score: '72% → 92%', tag: 'High Demand', icon: FileCode2 },
    { id: 'fullstack', label: 'Full Stack MERN', score: '68% → 89%', tag: 'Popular', icon: Target },
    { id: 'devops', label: 'Cloud & DevOps Node', score: '54% → 82%', tag: 'Niche', icon: Cpu },
    { id: 'ai', label: 'AI & Data Science', score: '60% → 88%', tag: 'Emerging', icon: Sparkles },
    { id: 'cyber', label: 'Cybersecurity Analyst', score: '52% → 84%', tag: 'High Salary', icon: ShieldAlert }
  ];

  const dummyRoadmaps = {
    frontend: {
      targetRole: "Frontend Web Architect",
      currentScore: 72,
      projectedScore: 92,
      duration: "4 Weeks",
      totalHours: "42 Hours",
      steps: [
        {
          id: 1,
          step: "01",
          title: "TypeScript 5.0 Fundamentals & Static Type Systems",
          skill: "TypeScript 5.0",
          whyItMatters: "Required by 74% of corporate tech recruiters in Jaipur & NCR for enterprise frontend roles.",
          estimatedEffort: "Week 1 (10-12 Hours)",
          level: "Intermediate",
          resourceCount: "4 Video Tutorials + 2 Quizzes",
          topics: ["Interfaces & Type Aliases", "Generics in React", "Strict Null Checks", "Type Narrowing"],
          completed: true
        },
        {
          id: 2,
          step: "02",
          title: "Advanced React 19 State & Performance Tuning",
          skill: "React 19 & Server Components",
          whyItMatters: "High demand for custom hooks, useMemo optimization, and Next.js App Router patterns.",
          estimatedEffort: "Week 2 (10 Hours)",
          level: "Advanced",
          resourceCount: "5 Guided Exercises + Code Sandbox",
          topics: ["useCallback & useMemo", "Context Optimization", "Custom Hooks", "Suspense Boundaries"],
          completed: false
        },
        {
          id: 3,
          step: "03",
          title: "Unit Testing & Automated Component Verification",
          skill: "Jest & Vitest",
          whyItMatters: "Recruiters filter out candidates who do not write unit tests for production code.",
          estimatedEffort: "Week 3 (8-10 Hours)",
          level: "Intermediate",
          resourceCount: "3 Lab Modules",
          topics: ["Jest Assertions", "Component Mocking", "User Event Simulation", "Coverage Reports"],
          completed: false
        },
        {
          id: 4,
          step: "04",
          title: "Full-Stack Portfolio Project & Cloud Deployment",
          skill: "Next.js & Vercel / Supabase",
          whyItMatters: "Concrete proof of applied capability for Rajasthan tech company evaluation.",
          estimatedEffort: "Week 4 (12 Hours)",
          level: "Production Capstone",
          resourceCount: "1 Live Capstone Assessment",
          topics: ["End-to-End CRUD App", "Supabase Auth", "Lighthouse 95+ Score", "CI/CD Pipeline"],
          completed: false
        }
      ]
    },
    fullstack: {
      targetRole: "Full Stack MERN Developer",
      currentScore: 68,
      projectedScore: 89,
      duration: "5 Weeks",
      totalHours: "55 Hours",
      steps: [
        {
          id: 101,
          step: "01",
          title: "RESTful API Architecture & Express Middleware",
          skill: "Node.js & Express",
          whyItMatters: "Backend API development is mandatory for full-stack engineering roles.",
          estimatedEffort: "Week 1 (12 Hours)",
          level: "Intermediate",
          resourceCount: "3 Video Tutorials",
          topics: ["Express Routing", "Custom Middleware", "JWT Authentication", "Error Handlers"],
          completed: true
        },
        {
          id: 102,
          step: "02",
          title: "Database Modeling with PostgreSQL & Supabase ORM",
          skill: "PostgreSQL & Prisma",
          whyItMatters: "Relational database skills increase candidate shortlist chances by 2.4x.",
          estimatedEffort: "Week 2 (12 Hours)",
          level: "Intermediate",
          resourceCount: "4 Guided Database Labs",
          topics: ["Schema Migrations", "Foreign Key Constraints", "Complex Joins", "Prisma Client"],
          completed: false
        },
        {
          id: 103,
          step: "03",
          title: "State Management with Redux Toolkit & React Query",
          skill: "Redux & TanStack Query",
          whyItMatters: "Essential for handling complex asynchronous data caching and optimistic UI updates.",
          estimatedEffort: "Week 3 (10 Hours)",
          level: "Advanced",
          resourceCount: "3 Guided Modules",
          topics: ["Global Store Slice", "RTK Query Hooks", "Cache Invalidation", "Infinite Scroll"],
          completed: false
        }
      ]
    },
    devops: {
      targetRole: "Cloud & DevOps Engineer",
      currentScore: 54,
      projectedScore: 82,
      duration: "4 Weeks",
      totalHours: "40 Hours",
      steps: [
        {
          id: 201,
          step: "01",
          title: "Docker Containerization & Multi-Stage Builds",
          skill: "Docker & Container Security",
          whyItMatters: "Containers are standard across all corporate deployment environments.",
          estimatedEffort: "Week 1 (10 Hours)",
          level: "Intermediate",
          resourceCount: "3 Hands-On Labs",
          topics: ["Dockerfiles", "Docker Compose", "Volume Mounting", "Container Security"],
          completed: false
        },
        {
          id: 202,
          step: "02",
          title: "CI/CD Pipelines with GitHub Actions & Vercel",
          skill: "GitHub Actions",
          whyItMatters: "Automates testing and build releases upon every pull request.",
          estimatedEffort: "Week 2 (10 Hours)",
          level: "Intermediate",
          resourceCount: "2 Guided Workflows",
          topics: ["Workflow Triggers", "Secret Injection", "Automated Linting", "Deployment Hooks"],
          completed: false
        }
      ]
    },
    ai: {
      targetRole: "AI & Machine Learning Specialist",
      currentScore: 60,
      projectedScore: 88,
      duration: "6 Weeks",
      totalHours: "60 Hours",
      steps: [
        {
          id: 301,
          step: "01",
          title: "Python Data Analysis with Pandas & NumPy",
          skill: "Python & Data Wrangling",
          whyItMatters: "Foundational data processing used by 90% of AI engineering teams.",
          estimatedEffort: "Week 1 (12 Hours)",
          level: "Beginner-Intermediate",
          resourceCount: "5 Guided Notebooks",
          topics: ["DataFrames", "Feature Scaling", "Null Value Imputation", "Matplotlib Visualization"],
          completed: false
        },
        {
          id: 302,
          step: "02",
          title: "Generative AI APIs & Vector Embeddings",
          skill: "OpenAI API & Pinecone",
          whyItMatters: "High demand for RAG (Retrieval-Augmented Generation) enterprise search solutions.",
          estimatedEffort: "Week 2 (14 Hours)",
          level: "Advanced",
          resourceCount: "3 Guided Projects",
          topics: ["Vector Databases", "Embedding Calculations", "Semantic Search", "Prompt Engineering"],
          completed: false
        }
      ]
    },
    cyber: {
      targetRole: "Cybersecurity & Defense Analyst",
      currentScore: 52,
      projectedScore: 84,
      duration: "4 Weeks",
      totalHours: "38 Hours",
      steps: [
        {
          id: 401,
          step: "01",
          title: "Web Application Security & OWASP Top 10",
          skill: "OWASP & Web Security",
          whyItMatters: "Protects enterprise portals against XSS, SQL Injection, and CSRF vulnerabilities.",
          estimatedEffort: "Week 1 (10 Hours)",
          level: "Intermediate",
          resourceCount: "4 Pen-Testing Modules",
          topics: ["XSS Prevention", "SQL Injection Filters", "CORS Policies", "Security Headers"],
          completed: false
        }
      ]
    }
  };

  if (loading) {
    return <SkeletonLoader count={3} />;
  }

  const currentRoadmap = dummyRoadmaps[selectedTrack] || dummyRoadmaps.frontend;
  const progressPercent = Math.round((completedSteps.length / currentRoadmap.steps.length) * 100);

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-8">
      
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-r from-[#0B1024] via-[#0F1630] to-[#121A38]"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>AI Personalized Progression Path</span>
              </span>
              <span className="text-xs text-slate-400 font-semibold">• {currentRoadmap.duration} ({currentRoadmap.totalHours})</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Curated Skill Elevation Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Targeted step-by-step learning modules designed by technical recruiters in Rajasthan to raise your candidate match fit score from <strong className="text-white font-bold">{currentRoadmap.currentScore}%</strong> to <strong className="text-pink-400 font-extrabold">{currentRoadmap.projectedScore}%</strong>.
            </p>
          </div>

          {/* Progress Ring & Score Card */}
          <div className="p-4 sm:p-5 bg-slate-950/80 rounded-2xl border border-white/10 shadow-2xl flex items-center space-x-5 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-white font-metrics">{progressPercent}%</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Roadmap Status</span>
              <strong className="text-sm font-bold text-white block font-heading">{completedSteps.length} of {currentRoadmap.steps.length} Modules Done</strong>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Score Boost: +{currentRoadmap.projectedScore - currentRoadmap.currentScore}%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Track Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
          {tracks.map(t => {
            const Icon = t.icon;
            const isSelected = selectedTrack === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500/25 to-fuchsia-500/25 text-white border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-pink-400' : 'text-slate-500'}`} />
                <span>{t.label}</span>
                <span className="text-[10px] font-metrics text-pink-300 px-1.5 py-0.5 rounded bg-pink-500/20">{t.score}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Structured Roadmap Steps Grid */}
      <div className="space-y-4">
        {currentRoadmap.steps.map((item, idx) => {
          const isDone = completedSteps.includes(item.id) || item.completed;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`glass-card p-6 rounded-3xl border transition-all shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
                isDone 
                  ? 'bg-slate-900/60 border-white/10 opacity-90' 
                  : 'bg-[#0F1630] border-white/15 hover:border-pink-500/30 shadow-[0_0_20px_rgba(0,0,0,0.4)]'
              }`}
            >
              <div className="flex items-start space-x-4 flex-1">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${
                  isDone 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-gradient-to-tr from-pink-600 via-rose-500 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                }`}>
                  {isDone ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : item.step}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                    <h3 className="text-base font-bold text-white font-heading">{item.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {item.skill}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-white/10">
                      {item.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    <strong className="text-pink-400 font-bold">Why it matters:</strong> {item.whyItMatters}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
                    <span className="flex items-center space-x-1 font-metrics">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      <span>{item.estimatedEffort}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.resourceCount}</span>
                    </span>
                    <span>•</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.topics?.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-white/10 text-[10px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="w-full md:w-auto shrink-0 flex items-center space-x-2 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                <button
                  type="button"
                  onClick={() => toggleComplete(item.id)}
                  className={`w-full md:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    isDone 
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:bg-slate-700' 
                      : 'btn-pink-gradient text-white shadow-md'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4" />
                      <span>Start Module</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Verified Capstone Certificate Milestone */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 border border-emerald-500/30 bg-emerald-950/20 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold text-xl shadow-lg shrink-0">
            <Award className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-heading">Rajasthan DTE Verified Capstone Certificate</h4>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">
              Complete all modules in your track to unlock your official state DTE digital skill credential.
            </p>
          </div>
        </div>

        <button
          onClick={() => toast.success("Complete remaining modules to unlock certificate download.")}
          className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0"
        >
          View Certificate Criteria
        </button>
      </motion.div>

    </div>
  );
};
