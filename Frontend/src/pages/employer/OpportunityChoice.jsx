import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

export const OpportunityChoice = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 font-sans text-slate-100 pb-8">
      
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2.5"
      >
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-xs font-bold shadow-md">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span>Rajasthan State Technical Talent Gateway</span>
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading">
          Create New Opportunity
        </h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto font-medium">
          Find skilled technical students and early-career talent across Rajasthan colleges and universities.
        </p>
      </motion.div>

      {/* Two Clean Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* CARD 1: JOB */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0B1730] p-8 rounded-3xl border border-blue-900/40 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all space-y-6 flex flex-col justify-between group shadow-2xl"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shadow-md">
              <Briefcase className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 font-heading">Full-Time & Lateral</span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-0.5 font-heading">
                Job Requisition
              </h2>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-medium">
                Create a full-time, part-time, or contract opportunity for graduating seniors, alumni, and technical professionals across Rajasthan.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-blue-900/40 text-xs text-slate-300 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Annual CTC / Fixed Monthly Salary in INR</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>7-Factor Explainable Student Match Ranking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Target specific Rajasthan engineering colleges</span>
              </div>
            </div>
          </div>

          <Link
            to="/employer/post/job"
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Create Job Requisition</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* CARD 2: INTERNSHIP */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0B1730] p-8 rounded-3xl border border-blue-900/40 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] transition-all space-y-6 flex flex-col justify-between group shadow-2xl"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform shadow-md">
              <GraduationCap className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-400 font-heading">Student & Campus Programs</span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-0.5 font-heading">
                Internship Program
              </h2>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-medium">
                Find 2nd, 3rd, and 4th-year engineering students for summer, winter, and semester internships with PPO pathways.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-blue-900/40 text-xs text-slate-300 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Monthly Stipend & 1–12 Month Durations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pre-Placement Offer (PPO) & Mentorship Flags</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified RTU & Rajasthan Student Talent Pool</span>
              </div>
            </div>
          </div>

          <Link
            to="/employer/post/internship"
            className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-2xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Create Internship Opening</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>

      {/* Info Callout */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-[#0B1730] rounded-2xl border border-blue-900/40 flex items-center justify-between text-xs text-slate-300 shadow-xl"
      >
        <span className="flex items-center space-x-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>All posted opportunities are instantly matched against verified Student Career Passports.</span>
        </span>
        <Link to="/employer/jobs" className="text-blue-400 hover:underline font-bold">
          View Existing Openings →
        </Link>
      </motion.div>

    </div>
  );
};
