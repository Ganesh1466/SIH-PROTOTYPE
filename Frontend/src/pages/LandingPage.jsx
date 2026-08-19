import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  Landmark, 
  Cpu, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Briefcase,
  ChevronRight,
  Layers
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#171A21] font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Minimal Top Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-[#E7E9EE] h-14">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
              CS
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 block leading-tight truncate">
                CareerSphere Rajasthan
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 block truncate">
                Technical Education Dept
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <a href="#portals" className="hover:text-indigo-600 transition-colors">Portals</a>
            <a href="#workflow" className="hover:text-indigo-600 transition-colors">Ecosystem Workflow</a>
            <a href="#engine" className="hover:text-indigo-600 transition-colors">Matching Engine</a>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Link
              to="/student/login"
              className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
            >
              Sign In
            </Link>
            <a
              href="#portals"
              className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-xs flex items-center space-x-1"
            >
              <span>Portals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </nav>

      {/* Clean Hero Section */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 bg-white border-b border-[#E7E9EE]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-5 max-w-full truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">Govt of Rajasthan · Technical Education Dept</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.2] mb-4 sm:mb-5">
            Bridging Student Skills, Corporate Hiring, and State Employment Intelligence.
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
            An explainable career readiness and recruitment platform connecting Rajasthan's technical students, enterprise recruiters, and the Department of Technical Education.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-12">
            <a
              href="#portals"
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-xs transition-colors text-center"
            >
              Select Your Portal
            </a>
            <a
              href="#workflow"
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-md border border-slate-200 transition-colors text-center"
            >
              Platform Overview
            </a>
          </div>

          {/* Clean Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-6 border-t border-slate-100 text-left">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block">Registered Students</span>
              <span className="text-lg sm:text-xl font-bold text-slate-900">42,850+</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block">Active Employers</span>
              <span className="text-lg sm:text-xl font-bold text-slate-900">1,284+</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block">Verified Requisitions</span>
              <span className="text-lg sm:text-xl font-bold text-slate-900">8,640+</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block">Placement Outcome</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-600">78%</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Distinct Role Portals (Prompt Section 1 & 35) */}
      <section id="portals" className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase text-indigo-600">Role-Based Access</span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Three Dedicated Portals
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Log in with your official account credentials to access your designated workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Student Portal Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-indigo-300 transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Student Portal</h3>
                  <span className="text-xs text-indigo-600 font-medium">Technical Students</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Career passport, 7-factor explainable match scoring, skill gap diagnostics, and curated 4-week roadmaps.
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Career Passport & Skill Matrix</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Explainable Fit Score Breakdown</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Actionable Learning Roadmap</span>
                  </div>
                </div>
              </div>

              <Link
                to="/student/login"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md text-center transition-colors block shadow-xs"
              >
                Log In as Student →
              </Link>
            </div>

            {/* Employer Portal Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-sky-300 transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Employer Portal</h3>
                  <span className="text-xs text-sky-600 font-medium">Industry Recruiters</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Post requirements with hard constraints, evaluate candidates ranked by actual skill alignment, and manage interview rounds.
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Candidate Ranking Engine</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Multi-Round Interview Scheduler</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Hiring Conversion Analytics</span>
                  </div>
                </div>
              </div>

              <Link
                to="/employer/login"
                className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-md text-center transition-colors block shadow-xs"
              >
                Log In as Employer →
              </Link>
            </div>

            {/* Government Portal Card */}
            <div className="bg-slate-950 text-white rounded-xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Government Intelligence</h3>
                  <span className="text-xs text-amber-400 font-medium">Technical Education Directorate</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Monitor 33-district placement ratios, evaluate institutional performance, and pinpoint critical demand vs supply deficits.
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>33-District Placement Metrics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>High Demand / Low Talent Gap Ledger</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>College Placement Performance</span>
                  </div>
                </div>
              </div>

              <Link
                to="/government/login"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-md text-center transition-colors block shadow-xs"
              >
                Log In to Directorate Console →
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 10-Stage Ecosystem Workflow Table (Prompt Section 1) */}
      <section id="workflow" className="py-16 bg-white border-t border-[#E7E9EE]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase text-indigo-600">End-to-End Lifecycle</span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              The 10-Stage Career-to-Employment Flow
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { num: "01", title: "Student Profile", desc: "Skills, education, and projects verification" },
              { num: "02", title: "Readiness Score", desc: "Benchmark against active market requirements" },
              { num: "03", title: "Explainable Match", desc: "Transparent 7-factor fit calculation" },
              { num: "04", title: "Skill Gap", desc: "Automated identification of missing tech" },
              { num: "05", title: "Learning Path", desc: "Structured 4-week progression roadmap" },
              { num: "06", title: "Application", desc: "Direct profile transfer with verified fit" },
              { num: "07", title: "Shortlisting", desc: "Objective algorithmic candidate ranking" },
              { num: "08", title: "Interviewing", desc: "Schedule technical rounds & video links" },
              { num: "09", title: "Selection & Offer", desc: "Lifecycle progression with alerts" },
              { num: "10", title: "Govt Intelligence", desc: "Statewide placement & skill demand insight" }
            ].map(item => (
              <div key={item.num} className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                <span className="font-mono text-xs font-bold text-indigo-600">{item.num}</span>
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-[#E7E9EE] text-xs text-slate-500">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-bold text-slate-900">CareerSphere Rajasthan</span> · Department of Technical Education, Government of Rajasthan
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/student/login" className="hover:text-indigo-600">Student</Link>
            <Link to="/employer/login" className="hover:text-sky-600">Employer</Link>
            <Link to="/government/login" className="hover:text-amber-600">Government</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};
