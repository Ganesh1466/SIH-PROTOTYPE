import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  MapPin, 
  Zap, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid
} from 'recharts';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const GovernmentDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await governmentApi.getOverview();
      setOverview(res.data);
    } catch (err) {
      toast.error("Failed to load state intelligence");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const { metrics, districts, skillDemand, monthlyPlacementTrend } = overview || {};

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Official Header */}
      <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Statewide Employment & Technical Education Intelligence</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Rajasthan Technical Education Directorate Console
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregated metrics across 142 polytechnic & engineering colleges and 1,280+ recruiters.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 py-2 px-4 rounded-lg flex items-center space-x-3">
          <div className="text-2xl font-bold text-amber-400">78%</div>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">State Placement Rate</span>
            <span className="text-xs text-emerald-400 font-semibold">+6.2% vs Previous Cohort</span>
          </div>
        </div>
      </div>

      {/* Four Macro KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Registered Students</span>
          <div className="text-2xl font-bold text-white">{metrics?.totalStudents?.toLocaleString() || '42,850'}</div>
          <span className="text-[10px] text-slate-500 block">Across 33 Districts</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Active Employers</span>
          <div className="text-2xl font-bold text-amber-400">{metrics?.activeEmployers?.toLocaleString() || '1,284'}</div>
          <span className="text-[10px] text-slate-500 block">MNCs, Startups & SaaS</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Jobs & Internships</span>
          <div className="text-2xl font-bold text-sky-400">{metrics?.totalOpportunities?.toLocaleString() || '8,640'}</div>
          <span className="text-[10px] text-slate-500 block">Verified Requisitions</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Average Annual Package</span>
          <div className="text-2xl font-bold text-emerald-400">{metrics?.averagePackageLPA || '₹6.4 LPA'}</div>
          <span className="text-[10px] text-slate-500 block">Top: ₹18 LPA in Jaipur</span>
        </div>
      </div>

      {/* Placement Trend (Recharts) + District Quick Ranks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Placement Trend (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Monthly State Placement Progression
              </h3>
              <p className="text-xs text-slate-400">Academic Year 2025-2026 Student Placements</p>
            </div>
            <Badge variant="saffron" size="sm">Monthly Cohorts</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPlacementTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPlacedGovClean" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="placed" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorPlacedGovClean)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Leaderboard (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white tracking-tight">
                District Leaderboard
              </h3>
              <Link to="/government/districts" className="text-xs text-amber-400 font-semibold hover:underline">
                View 33 →
              </Link>
            </div>

            <div className="space-y-2 mt-3">
              {districts?.slice(0, 5).map((d, idx) => (
                <div key={d.name} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-slate-500 font-bold">#{idx + 1}</span>
                    <span className="font-semibold text-white">{d.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-slate-400">{d.placedStudents?.toLocaleString()} Placed</span>
                    <span className="font-bold text-amber-400">{d.placementRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/government/districts"
            className="w-full py-2 text-center text-xs font-semibold text-amber-400 bg-slate-900 hover:bg-slate-850 rounded-md border border-slate-800 transition-colors block"
          >
            Open District Intelligence Matrix →
          </Link>
        </div>

      </div>

      {/* Priority Skill Deficit Matrix */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Statewide Curriculum Intervention Matrix (High Demand + Low Supply)
            </h3>
            <p className="text-xs text-slate-400">Identifies critical skill gaps across technical college graduates</p>
          </div>
          <Link to="/government/skills" className="text-xs text-amber-400 font-semibold hover:underline">
            Full Matrix →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {skillDemand?.slice(0, 3).map((item) => (
            <div key={item.skill} className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <strong className="text-white text-sm">{item.skill}</strong>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {item.priority}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px] pt-1">
                <span>Employer Demand: <strong className="text-white">{item.demandCount?.toLocaleString()}</strong></span>
                <span>Talent: <strong className="text-white">{item.availableTalent?.toLocaleString()}</strong></span>
              </div>
              <div className="text-[11px] text-amber-400 font-semibold">
                Deficit: {item.gap} seats unmet in state universities
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
