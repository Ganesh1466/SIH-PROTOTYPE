import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  FileText,
  Plus,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  Video
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { MatchGauge } from '../../components/common/MatchGauge';
import { Badge } from '../../components/common/Badge';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const FALLBACK_CANDIDATES = [
  { id: 'c-2', name: 'Priya Singh', college: 'MNIT Jaipur', matchScore: 96, matchedSkillsCount: 5, totalRequiredSkills: 5, cgpa: 9.1, projectsCount: 1 },
  { id: 'c-1', name: 'Rahul Sharma', college: 'Rajasthan Technical University (RTU), Kota', matchScore: 88, matchedSkillsCount: 5, totalRequiredSkills: 5, cgpa: 8.4, projectsCount: 3 },
  { id: 'c-5', name: 'Neha Meena', college: 'CTAE Udaipur', matchScore: 82, matchedSkillsCount: 4, totalRequiredSkills: 5, cgpa: 8.2, projectsCount: 1 },
  { id: 'c-4', name: 'Karan Joshi', college: 'MBM University, Jodhpur', matchScore: 74, matchedSkillsCount: 3, totalRequiredSkills: 5, cgpa: 8.7, projectsCount: 1 }
];

const STAT_CONFIG = [
  { key: 'activeJobs', label: 'Active Jobs', icon: BriefcaseBusiness, trend: '+2 this month', accent: 'text-blue-400', border: 'border-blue-500/30' },
  { key: 'totalApplicants', label: 'Applications', icon: FileText, trend: '+18.4% this week', accent: 'text-cyan-400', border: 'border-cyan-500/30' },
  { key: 'shortlisted', label: 'Shortlisted', icon: Users, trend: '+6 this week', accent: 'text-indigo-400', border: 'border-indigo-500/30' },
  { key: 'interviewsScheduled', label: 'Interviews', icon: Video, trend: '3 today', accent: 'text-blue-300', border: 'border-blue-400/30' },
  { key: 'offersExtended', label: 'Offers', icon: Send, trend: '92% accepted', accent: 'text-emerald-400', border: 'border-emerald-500/30' }
];

const getInitials = (name = '') => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export const EmployerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employerApi.getDashboard('comp-1')
      .then((res) => setDashboardData(res.data))
      .catch(() => toast.error('Failed to load recruiter workspace'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SkeletonLoader count={4} />;

  const company = dashboardData?.company || { name: 'TechNova Solutions' };
  const metrics = dashboardData?.metrics || {
    activeJobs: 4,
    totalApplicants: 126,
    shortlisted: 18,
    interviewsScheduled: 8,
    offersExtended: 3
  };
  const candidates = dashboardData?.topCandidates?.length ? dashboardData.topCandidates : FALLBACK_CANDIDATES;

  const hiringPipelineStages = [
    { label: 'Applications', count: metrics.totalApplicants, pct: '100%', color: 'from-blue-600 to-blue-400' },
    { label: 'Screening', count: 74, pct: '58%', color: 'from-blue-500 to-indigo-500' },
    { label: 'Shortlisted', count: metrics.shortlisted, pct: '14%', color: 'from-indigo-500 to-violet-500' },
    { label: 'Interview', count: metrics.interviewsScheduled, pct: '6%', color: 'from-violet-500 to-sky-500' },
    { label: 'Offer', count: metrics.offersExtended, pct: '2.4%', color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="space-y-6 text-slate-100 pb-8 font-sans">
      
      {/* 1. Header Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-7 border border-blue-900/40 shadow-2xl bg-gradient-to-r from-[#0B1730] via-[#0E1E40] to-[#0B1730]"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                <CircleDot className="h-3 w-3 text-emerald-400" /> Recruitment Active
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Last synced real-time</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
              Good morning, {company.name || 'TechNova Solutions'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
              Recruitment Intelligence Dashboard. Four active requisitions moving through AI screening.
            </p>
          </div>
          <Link 
            to="/employer/post" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 text-xs sm:text-sm font-bold rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Post New Requisition
          </Link>
        </div>
      </motion.section>

      {/* 2. Compact Statistics Cards */}
      <section className="grid grid-cols-2 gap-3.5 lg:grid-cols-5">
        {STAT_CONFIG.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className={`bg-[#0B1730] rounded-2xl p-4.5 border ${stat.border} space-y-2 hover:translate-y-[-3px] hover:border-blue-500/50 transition-all shadow-xl`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</span>
                <span className="p-2 rounded-xl bg-blue-950/60 border border-blue-800/30"><Icon className={`h-4 w-4 ${stat.accent}`} /></span>
              </div>
              <div className="text-3xl font-extrabold tabular-nums text-white font-metrics tracking-tight">{metrics[stat.key] ?? 0}</div>
              <div className={`flex items-center gap-1 text-[11px] font-bold ${stat.accent}`}>
                <TrendingUp className="h-3 w-3" />
                <span>{stat.trend}</span>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 3. Hiring Pipeline Stages Visualization */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-2xl space-y-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span>Hiring Pipeline Stage Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400">Visual candidate progression across current open requisitions</p>
          </div>
          <Link to="/employer/applications" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <span>View Full Pipeline</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {hiringPipelineStages.map((stage, idx) => (
            <div key={stage.label} className="bg-slate-950/80 p-4 rounded-2xl border border-blue-900/30 text-center space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Stage 0{idx + 1}</span>
              <span className="text-xs font-bold text-white font-heading block">{stage.label}</span>
              <span className="text-2xl font-extrabold text-white font-metrics block">{stage.count}</span>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2 border border-blue-900/20">
                <div className={`h-full rounded-full bg-gradient-to-r ${stage.color}`} style={{ width: stage.pct }} />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4. Priority Requisition & Candidate Ranking Table */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#0B1730] rounded-3xl border border-blue-900/40 overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col justify-between gap-3 border-b border-blue-900/40 p-5 sm:flex-row sm:items-center sm:px-6 bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-heading">Top Ranked Candidates</h3>
              <Badge variant="blue" size="sm">AI Fit Engine</Badge>
            </div>
            <p className="mt-1 text-xs text-slate-400">Explainable matching across verified skills, academics, portfolio, and location.</p>
          </div>
          <Link to="/employer/candidates" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <span>View All Candidates</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-blue-900/40 bg-slate-950/80 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Rank</th>
                <th className="px-4 py-3.5">Candidate</th>
                <th className="px-4 py-3.5">AI Match Score</th>
                <th className="px-4 py-3.5">Skills Matched</th>
                <th className="px-4 py-3.5">Academic</th>
                <th className="px-4 py-3.5">Portfolio</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/20">
              {candidates.slice(0, 4).map((candidate, index) => {
                return (
                  <tr key={candidate.id || index} className="group transition-colors hover:bg-blue-950/40">
                    <td className="px-5 py-4 font-mono font-bold text-blue-400 font-metrics">
                      #{String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-black text-white shadow-md">
                          {getInitials(candidate.name)}
                        </div>
                        <div>
                          <p className="font-bold text-white font-heading">{candidate.name}</p>
                          <p className="mt-0.5 max-w-[230px] truncate text-[11px] text-slate-400">{candidate.college}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <MatchGauge score={candidate.matchScore || 90} size="sm" />
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-slate-300 font-bold font-metrics">
                        {candidate.matchedSkillsCount} / {candidate.totalRequiredSkills}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full border border-blue-900/40 bg-slate-950 px-3 py-1 font-bold text-slate-200 font-metrics">
                        {candidate.cgpa} / 10
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-400 font-medium">
                      {candidate.projectsCount} verified repos
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link 
                        to="/employer/candidates" 
                        className="px-3 py-1.5 bg-blue-950/80 hover:bg-blue-600 border border-blue-500/40 text-blue-300 hover:text-white rounded-xl text-xs font-bold transition-all inline-block"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};
