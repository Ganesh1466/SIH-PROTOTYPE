import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Send, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  PlusCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const EmployerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employerApi.getDashboard('comp-1')
      .then(res => setDashboardData(res.data))
      .catch(err => toast.error("Failed to load recruiter workspace"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const {
    company = {},
    metrics = { activeJobs: 4, totalApplicants: 126, shortlisted: 18, interviewsScheduled: 8, offersExtended: 3 },
    topCandidates = []
  } = dashboardData || {};

  return (
    <div className="space-y-6">
      
      {/* 1. Header (Prompt Section 18: No giant hero banner) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Good morning, {company.name || 'TechNova Solutions'}.
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hiring overview for your active engineering and technical positions.
          </p>
        </div>

        <Link
          to="/employer/jobs/create"
          className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-colors shadow-xs"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Post New Requisition</span>
        </Link>
      </div>

      {/* 2. Compact Metrics (Prompt Section 18: Active Jobs 4, Applications 126, Shortlisted 18, Interviews 8, Offers 3) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[11px] font-medium text-slate-500 block">Active Jobs</span>
          <div className="text-2xl font-bold text-slate-900">{metrics.activeJobs || 4}</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[11px] font-medium text-slate-500 block">Applications</span>
          <div className="text-2xl font-bold text-slate-900">{metrics.totalApplicants || 126}</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[11px] font-medium text-slate-500 block">Shortlisted</span>
          <div className="text-2xl font-bold text-sky-600">{metrics.shortlisted || 18}</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[11px] font-medium text-slate-500 block">Interviews</span>
          <div className="text-2xl font-bold text-indigo-600">{metrics.interviewsScheduled || 8}</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-medium text-slate-500 block">Offers</span>
          <div className="text-2xl font-bold text-emerald-600">{metrics.offersExtended || 3}</div>
        </div>
      </div>

      {/* 3. Top Requisition Summary Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs">
            01
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase text-slate-400">Top Priority Requisition:</span>
              <span className="text-sm font-bold text-slate-900">React Developer</span>
              <Badge variant="blue" size="sm">126 Applicants</Badge>
            </div>
            <span className="text-xs text-slate-500">Jaipur HQ · ₹6.5–8.5 LPA · 4 Interview Panels Active</span>
          </div>
        </div>

        <Link
          to="/employer/candidates"
          className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center space-x-1"
        >
          <span>View Ranked Pipeline</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4. Candidate Ranking Table (Prompt Section 18) */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Top Ranked Candidates
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated by 7-factor matching algorithm against verified job requirements.
            </p>
          </div>

          <Link to="/employer/candidates" className="text-xs font-semibold text-sky-600 hover:underline">
            All Candidates →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-5">Rank</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Match Fit</th>
                <th className="py-3 px-4">Skills Matched</th>
                <th className="py-3 px-4">Academic CGPA</th>
                <th className="py-3 px-4">Portfolio</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topCandidates.slice(0, 4).map((cand, idx) => (
                <tr key={cand.id || idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-400">
                    #{idx + 1}
                  </td>
                  
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{cand.name}</div>
                    <span className="text-[11px] text-slate-400">{cand.college}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={cand.matchScore >= 90 ? 'excellent' : 'strong'} size="sm">
                      {cand.matchScore || 90}%
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {cand.matchedSkillsCount || 5} / {cand.totalRequiredSkills || 5}
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    {cand.cgpa || 8.4} / 10 (Eligible)
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    {cand.projectsCount || 2} relevant
                  </td>

                  <td className="py-3.5 px-5 text-right">
                    <Link
                      to="/employer/candidates"
                      className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-md border border-slate-200 transition-colors inline-block text-xs"
                    >
                      Review →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
