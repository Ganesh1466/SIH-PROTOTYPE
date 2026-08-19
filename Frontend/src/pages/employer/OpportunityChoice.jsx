import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Users 
} from 'lucide-react';

export const OpportunityChoice = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 font-sans text-[#171A21]">
      
      {/* Header Banner */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full text-xs font-bold shadow-2xs">
          <MapPin className="w-3.5 h-3.5 text-indigo-600" />
          <span>Rajasthan State Technical Talent Gateway</span>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create New Opportunity
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Find skilled technical students and early-career talent across Rajasthan colleges and universities.
        </p>
      </div>

      {/* Two Clean Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* CARD 1: JOB */}
        <div className="bg-white p-8 rounded-2xl border border-[#E7E9EE] hover:border-indigo-300 hover:shadow-md transition-all space-y-6 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shadow-2xs">
              <Briefcase className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Full-Time & Lateral</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                Job Requisition
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Create a full-time, part-time, or contract opportunity for graduating seniors, alumni, and technical professionals across Rajasthan.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Annual CTC / Fixed Monthly Salary in INR</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>7-Factor Explainable Student Match Ranking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Target specific Rajasthan engineering colleges</span>
              </div>
            </div>
          </div>

          <Link
            to="/employer/post/job"
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Create Job Requisition</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* CARD 2: INTERNSHIP */}
        <div className="bg-white p-8 rounded-2xl border border-[#E7E9EE] hover:border-sky-300 hover:shadow-md transition-all space-y-6 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform shadow-2xs">
              <GraduationCap className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600">Student & Campus Programs</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                Internship Program
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Find 2nd, 3rd, and 4th-year engineering students for summer, winter, and semester internships with PPO pathways.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Monthly Stipend & 1–12 Month Durations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-Placement Offer (PPO) & Mentorship Flags</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified RTU & Rajasthan Student Talent Pool</span>
              </div>
            </div>
          </div>

          <Link
            to="/employer/post/internship"
            className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Create Internship Opening</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Info Callout */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center space-x-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All posted opportunities are instantly matched against verified Student Career Passports.</span>
        </span>
        <Link to="/employer/jobs" className="text-indigo-600 hover:underline font-bold">
          View Existing Openings →
        </Link>
      </div>

    </div>
  );
};
