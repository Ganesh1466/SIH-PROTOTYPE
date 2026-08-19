import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { studentApi } from '../../api/studentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const LearningPath = () => {
  const [learningPlan, setLearningPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentApi.getLearningPlan('stu-1', 'Frontend Developer')
      .then(res => setLearningPlan(res.data))
      .catch(err => toast.error("Failed to load learning roadmap"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SkeletonLoader count={3} />;
  }

  const {
    targetRole = "Frontend Developer",
    currentScore = 72,
    projectedScore = 88,
    steps = [
      {
        step: "01",
        title: "TypeScript Fundamentals & Static Typing",
        skill: "TypeScript",
        whyItMatters: "Required by 74% of modern frontend roles for scalable component architectures.",
        estimatedEffort: "1 Week (10-12 Hours)",
        topics: ["Interfaces & Type Aliases", "Generics in React", "Strict Null Checks"],
        completed: false
      },
      {
        step: "02",
        title: "Advanced React Patterns & Performance",
        skill: "React",
        whyItMatters: "High demand for custom hooks, memoization, and complex state management.",
        estimatedEffort: "1 Week (8 Hours)",
        topics: ["useCallback & useMemo", "Context Optimization", "Custom Hooks"],
        completed: false
      },
      {
        step: "03",
        title: "Unit Testing & Component Test Automation",
        skill: "Testing (Jest / React Testing Library)",
        whyItMatters: "Enterprise recruiters filter for candidate testing discipline.",
        estimatedEffort: "1 Week (8-10 Hours)",
        topics: ["Jest Assertions", "Component Mocking", "User Interaction Testing"],
        completed: false
      },
      {
        step: "04",
        title: "Production Portfolio Project & Deployment",
        skill: "Full Project",
        whyItMatters: "Concrete proof of applied capability for Rajasthan recruiter evaluation.",
        estimatedEffort: "1 Week (12 Hours)",
        topics: ["End-to-end CRUD App", "Cloud Deployment", "Lighthouse 95+ Audit"],
        completed: false
      }
    ]
  } = learningPlan || {};

  return (
    <div className="space-y-6">
      
      {/* Header (Prompt Section 16) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-600 mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Target Role: {targetRole}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Curated 4-Week Progression Roadmap
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Step-by-step milestones to raise your fit score from {currentScore}% to an estimated {projectedScore}%.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center space-x-4">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Current Score</span>
            <span className="text-base font-bold text-slate-900">{currentScore}%</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div>
            <span className="text-[10px] text-indigo-600 font-semibold uppercase block">Projected Fit</span>
            <span className="text-base font-bold text-emerald-600">~{projectedScore}%</span>
          </div>
        </div>
      </div>

      {/* Structured Roadmap Steps (Prompt Section 16) */}
      <div className="space-y-4">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                {item.step}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <Badge variant="blue" size="sm">
                    {item.skill}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-700 font-semibold">Why it matters:</strong> {item.whyItMatters}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.estimatedEffort}</span>
                  </span>
                  <span>·</span>
                  <div className="flex flex-wrap gap-1">
                    {item.topics?.map(t => (
                      <span key={t} className="px-1.5 py-0.2 rounded bg-slate-50 text-slate-600 border border-slate-200 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => toast.success(`Enrolled in ${item.skill} module`)}
                className="w-full md:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer shadow-xs"
              >
                Start Learning
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
