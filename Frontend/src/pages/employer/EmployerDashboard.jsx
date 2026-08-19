import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
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
import toast from 'react-hot-toast';

const FALLBACK_CANDIDATES = [
  { id: 'c-2', name: 'Priya Singh', college: 'MNIT Jaipur', matchScore: 96, matchedSkillsCount: 5, totalRequiredSkills: 5, cgpa: 9.1, projectsCount: 1 },
  { id: 'c-1', name: 'Rahul Sharma', college: 'Rajasthan Technical University (RTU), Kota', matchScore: 83, matchedSkillsCount: 5, totalRequiredSkills: 5, cgpa: 8.4, projectsCount: 3 },
  { id: 'c-5', name: 'Neha Meena', college: 'CTAE Udaipur', matchScore: 81, matchedSkillsCount: 5, totalRequiredSkills: 5, cgpa: 8.2, projectsCount: 1 },
  { id: 'c-4', name: 'Karan Joshi', college: 'MBM University, Jodhpur', matchScore: 50, matchedSkillsCount: 2, totalRequiredSkills: 5, cgpa: 8.7, projectsCount: 1 }
];

const STAT_CONFIG = [
  { key: 'activeJobs', label: 'Active jobs', icon: BriefcaseBusiness, trend: '+2 this month', accent: 'text-blue-700', iconBg: 'bg-blue-50' },
  { key: 'totalApplicants', label: 'Applications', icon: FileText, trend: '+18.4% this week', accent: 'text-cyan-700', iconBg: 'bg-cyan-50' },
  { key: 'shortlisted', label: 'Shortlisted', icon: Users, trend: '+6 this week', accent: 'text-indigo-700', iconBg: 'bg-indigo-50' },
  { key: 'interviewsScheduled', label: 'Interviews', icon: Video, trend: '3 today', accent: 'text-violet-700', iconBg: 'bg-violet-50' },
  { key: 'offersExtended', label: 'Offers', icon: Send, trend: '92% accepted', accent: 'text-emerald-700', iconBg: 'bg-emerald-50' }
];

const getInitials = (name = '') => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

const getMatchTone = (score) => {
  if (score >= 90) return { text: 'text-emerald-700', bar: 'bg-emerald-500', track: 'bg-emerald-100' };
  if (score >= 70) return { text: 'text-blue-700', bar: 'bg-blue-500', track: 'bg-blue-100' };
  return { text: 'text-amber-700', bar: 'bg-amber-500', track: 'bg-amber-100' };
};

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
  const pipelineProgress = Math.min(100, Math.round((metrics.shortlisted / metrics.totalApplicants) * 100));

  return (
    <div className="space-y-5 text-[#10233f]">
      <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white px-5 py-5 shadow-[0_16px_40px_rgba(37,99,235,0.08)] sm:px-7 sm:py-6">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                <CircleDot className="h-3 w-3" /> Recruitment active
              </span>
              <span className="text-[11px] text-slate-400">Last synced just now</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#10233f] sm:text-2xl">Good morning, {company.name || 'TechNova Solutions'}</h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">Your hiring pipeline at a glance. Four requisitions are currently moving through review.</p>
          </div>
          <Link to="/employer/post" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Post new requisition
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {STAT_CONFIG.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.key} className="group rounded-xl border border-blue-100 bg-white p-4 shadow-[0_8px_24px_rgba(37,99,235,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_12px_28px_rgba(37,99,235,0.1)]">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{stat.label}</span>
                <span className={`rounded-lg p-2 ${stat.iconBg}`}><Icon className={`h-4 w-4 ${stat.accent}`} /></span>
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums text-[#10233f]">{metrics[stat.key] ?? 0}</div>
              <div className={`mt-1 flex items-center gap-1 text-[11px] font-semibold ${stat.accent}`}><TrendingUp className="h-3 w-3" />{stat.trend}</div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_8px_24px_rgba(37,99,235,0.05)] sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300"><Sparkles className="h-3.5 w-3.5" /> Priority requisition</div>
              <h3 className="mt-2 text-lg font-bold text-[#10233f]">React Developer</h3>
              <p className="mt-1 text-xs text-slate-500">Jaipur HQ · ₹6.5–8.5 LPA · Full-time · 4 openings</p>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700"><Clock3 className="h-3 w-3" /> In review</span>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <div className="mb-2 flex items-center justify-between text-xs"><span className="font-semibold text-slate-700">126 applicants in pipeline</span><span className="text-slate-500">{pipelineProgress}% shortlisted</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-blue-50"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700" style={{ width: `${Math.max(pipelineProgress, 8)}%` }} /></div>
              <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-slate-500"><span><b className="text-[#10233f]">74</b> in review</span><span><b className="text-[#10233f]">18</b> shortlisted</span><span><b className="text-[#10233f]">8</b> interviews</span></div>
            </div>
            <Link to="/employer/candidates" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-bold text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-50">View ranked pipeline <ChevronRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_8px_24px_rgba(37,99,235,0.05)] sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">This cycle</p><h3 className="mt-1 text-base font-bold text-[#10233f]">Hiring health</h3></div><div className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><CheckCircle2 className="h-4 w-4" /></div></div>
          <div className="mt-5 flex items-end justify-between"><span className="text-4xl font-bold tabular-nums text-[#10233f]">78%</span><span className="mb-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-600"><ArrowUpRight className="h-3.5 w-3.5" /> 12.6%</span></div>
          <p className="mt-1 text-xs text-slate-500">Pipeline efficiency vs. previous cycle</p>
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-blue-100 pt-4 text-center"><div><p className="text-sm font-bold text-[#10233f]">4.2d</p><p className="mt-1 text-[10px] text-slate-500">Time to review</p></div><div><p className="text-sm font-bold text-[#10233f]">64%</p><p className="mt-1 text-[10px] text-slate-500">Interview show</p></div><div><p className="text-sm font-bold text-[#10233f]">92%</p><p className="mt-1 text-[10px] text-slate-500">Offer accept</p></div></div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_8px_24px_rgba(37,99,235,0.05)]">
        <div className="flex flex-col justify-between gap-3 border-b border-blue-100 p-5 sm:flex-row sm:items-center sm:px-6">
          <div><div className="flex items-center gap-2"><h3 className="text-base font-bold text-[#10233f]">Top ranked candidates</h3><span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">AI-assisted fit</span></div><p className="mt-1 text-xs text-slate-500">Explainable matching across verified skills, academics, portfolio, and location.</p></div>
          <Link to="/employer/candidates" className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900">View all candidates <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-blue-100 bg-blue-50/50 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500"><tr><th className="px-5 py-3">Rank</th><th className="px-4 py-3">Candidate</th><th className="px-4 py-3">Match fit</th><th className="px-4 py-3">Skills matched</th><th className="px-4 py-3">Academic</th><th className="px-4 py-3">Portfolio</th><th className="px-5 py-3 text-right">Action</th></tr></thead>
            <tbody className="divide-y divide-blue-50">
              {candidates.slice(0, 4).map((candidate, index) => {
                const tone = getMatchTone(candidate.matchScore || 0);
                const skillRatio = candidate.totalRequiredSkills ? Math.round((candidate.matchedSkillsCount / candidate.totalRequiredSkills) * 100) : 0;
                return <tr key={candidate.id || index} className="group transition-colors hover:bg-blue-50/40"><td className="px-5 py-4 font-mono text-slate-400">#{String(index + 1).padStart(2, '0')}</td><td className="px-4 py-4"><div className="flex items-center gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[10px] font-bold text-blue-700">{getInitials(candidate.name)}</div><div><p className="font-bold text-[#10233f]">{candidate.name}</p><p className="mt-0.5 max-w-[230px] truncate text-[11px] text-slate-500">{candidate.college}</p></div></div></td><td className="px-4 py-4"><div className="flex items-center gap-2"><span className={`font-bold ${tone.text}`}>{candidate.matchScore}%</span><div className={`h-1.5 w-16 overflow-hidden rounded-full ${tone.track}`}><div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${candidate.matchScore}%` }} /></div></div></td><td className="px-4 py-4"><div className="flex items-center gap-2"><span className="text-slate-700">{candidate.matchedSkillsCount} / {candidate.totalRequiredSkills}</span><div className="h-1 w-12 overflow-hidden rounded-full bg-blue-50"><div className="h-full rounded-full bg-blue-500" style={{ width: `${skillRatio}%` }} /></div></div></td><td className="px-4 py-4"><span className="rounded-md border border-blue-100 bg-blue-50/50 px-2 py-1 font-semibold text-slate-700">{candidate.cgpa} / 10</span></td><td className="px-4 py-4 text-slate-500">{candidate.projectsCount} relevant</td><td className="px-5 py-4 text-right"><Link to="/employer/candidates" className="rounded-md border border-blue-200 px-3 py-1.5 text-[11px] font-bold text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-900">Review</Link></td></tr>;
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-blue-100 px-5 py-3 text-[11px] text-slate-500 sm:px-6"><span>Showing {Math.min(candidates.length, 4)} of {candidates.length} ranked candidates</span><span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Data updated live</span></div>
      </section>
    </div>
  );
};
