import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Filter, 
  Download, 
  Layers, 
  PlusCircle, 
  Sparkles, 
  X, 
  FileCheck, 
  Award, 
  ChevronRight, 
  Zap,
  PieChart as PieIcon,
  Activity,
  Target,
  Compass
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend, 
  AreaChart, 
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Chip, LinearProgress, Tooltip as MuiTooltip } from '@mui/material';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

// Curated Vibrant Colors for Donut / Pie & Radar charts
const SECTOR_COLORS = ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#fbbf24', '#f43f5e', '#a78bfa', '#2dd4bf'];
const RADAR_COLORS = {
  demand: '#38bdf8',
  availability: '#10b981'
};

export const GovernmentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFunnelMonth, setSelectedFunnelMonth] = useState('August 2026');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [recommendationModalOpen, setRecommendationModalOpen] = useState(false);
  const [selectedSkillForRec, setSelectedSkillForRec] = useState(null);
  const [activeSkillView, setActiveSkillView] = useState('radar'); // 'radar' | 'area'

  // New Recommendation Form State
  const [recFormData, setRecFormData] = useState({
    title: '',
    targetCohort: '3rd & 4th Year B.Tech Students',
    recommendedInstitutes: 'RTU Kota, MNIT Jaipur, MBM Jodhpur'
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await governmentApi.getDashboard();
      const dashData = res?.data?.data || res?.data || res;
      if (dashData) {
        setData(dashData);
      }
    } catch (err) {
      toast.error('Failed to load government analytics.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecommendation = async (e) => {
    e.preventDefault();
    if (!selectedSkillForRec) return;

    try {
      const payload = {
        skill: selectedSkillForRec.skill_name,
        employerDemand: selectedSkillForRec.employer_demand,
        studentAvailability: selectedSkillForRec.student_availability,
        gap: selectedSkillForRec.skill_gap,
        priority: selectedSkillForRec.priority,
        title: recFormData.title || `Statewide Skill Development Program for ${selectedSkillForRec.skill_name}`,
        targetCohort: recFormData.targetCohort,
        recommendedInstitutes: recFormData.recommendedInstitutes.split(',').map(s => s.trim())
      };

      const res = await governmentApi.createRecommendation(payload);
      if (res.data?.success) {
        toast.success(`Training program recommendation for ${selectedSkillForRec.skill_name} submitted!`);
        setRecommendationModalOpen(false);
        fetchDashboard();
      }
    } catch (err) {
      toast.error('Failed to create recommendation.');
    }
  };

  const openRecModal = (skillObj) => {
    setSelectedSkillForRec(skillObj);
    setRecFormData({
      title: `Statewide ${skillObj.category || skillObj.skill_name} Acceleration Initiative`,
      targetCohort: 'Final & Pre-Final Year Technical Students (All 33 Districts)',
      recommendedInstitutes: 'MNIT Jaipur, RTU Kota, CTAE Udaipur, GEC Ajmer'
    });
    setRecommendationModalOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader count={4} />
      </div>
    );
  }

  const { kpis, districts = [], skills = [], criticalSkillGaps = [], funnel = [], jobsVsInternships } = data || {};

  // Funnel stage selection
  const currentFunnelData = funnel.find(f => f.period === selectedFunnelMonth) || funnel[funnel.length - 1] || {
    applications: 5200,
    shortlisted: 2400,
    interviews: 1200,
    selected: 510,
    joined: 430
  };

  const funnelStages = [
    { label: 'Applications', count: currentFunnelData.applications, color: 'from-blue-600 to-sky-500', drop: '100% Volume' },
    { label: 'Shortlisted', count: currentFunnelData.shortlisted, color: 'from-sky-500 to-teal-500', drop: `${((currentFunnelData.shortlisted / currentFunnelData.applications) * 100).toFixed(1)}% Conversion` },
    { label: 'Interviews', count: currentFunnelData.interviews, color: 'from-teal-500 to-amber-500', drop: `${((currentFunnelData.interviews / currentFunnelData.shortlisted) * 100).toFixed(1)}% Qualified` },
    { label: 'Selected', count: currentFunnelData.selected, color: 'from-amber-500 to-emerald-500', drop: `${((currentFunnelData.selected / currentFunnelData.interviews) * 100).toFixed(1)}% Offered` },
    { label: 'Joined', count: currentFunnelData.joined, color: 'from-emerald-500 to-green-400', drop: `${((currentFunnelData.joined / currentFunnelData.applications) * 100).toFixed(2)}% Placed` }
  ];

  // District filter
  const filteredDistricts = districtFilter === 'ALL' 
    ? districts 
    : districts.filter(d => d.district.toLowerCase() === districtFilter.toLowerCase());

  // Skill demand data mapped for Radar / Area charts
  const skillChartData = skills.map(s => ({
    name: s.skill_name.replace(' / ', '/').split(' ')[0], // cleaner label for radar axes
    fullName: s.skill_name,
    demand: s.employer_demand,
    availability: s.student_availability,
    gap: s.skill_gap,
    priority: s.priority
  }));

  // District Opportunities Chart Data
  const districtChartData = filteredDistricts.map(d => ({
    name: d.district,
    Jobs: d.total_jobs,
    Internships: d.total_internships,
    Students: d.total_students,
    Placements: d.total_placements,
    PlacementRate: d.placement_rate
  }));

  // Jobs vs Internships Donut Pie Data
  const jobInternDonutData = [
    { name: 'Active Full-Time Jobs', value: kpis?.activeJobs || 420, color: '#38bdf8' },
    { name: 'Technical Internships', value: kpis?.activeInternships || 280, color: '#a855f7' }
  ];

  // District Share Donut Data
  const districtShareData = districts.slice(0, 6).map((d, i) => ({
    name: d.district,
    value: d.total_students,
    color: SECTOR_COLORS[i % SECTOR_COLORS.length]
  }));

  return (
    <div className="space-y-7 text-slate-100 pb-10">
      
      {/* 1. Header with Government Credentials & Prototype Demo Badge */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Rajasthan Employment Intelligence</span>
            </span>
            <Chip 
              label="Supabase Connected" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.15)', 
                color: '#34d399', 
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 700,
                fontSize: '0.7rem'
              }} 
            />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white">
            Rajasthan Employment & Skill Intelligence Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time governance dashboard monitoring students, verified employers, opportunity pipelines, and state workforce skill deficits.
          </p>
        </div>

        {/* Macro State Placement Gauge Box */}
        <div className="bg-slate-900 border border-slate-800 py-3 px-5 rounded-xl flex items-center space-x-4 shrink-0 shadow-inner">
          <div className="text-3xl font-black text-amber-400">
            {kpis?.placementRate}%
          </div>
          <div className="text-left border-l border-slate-800 pl-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">State Placement Rate</span>
            <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+5.4% vs Previous Cycle</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. 8 KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        
        {/* Total Students */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Students</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {kpis?.totalStudents?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Across 33 Districts</div>
        </div>

        {/* Verified Employers */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Verified Employers</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {kpis?.verifiedEmployers?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">MNCs, Startups & Tech Firms</div>
        </div>

        {/* Active Jobs */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Active Jobs</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {kpis?.activeJobs?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Full-Time Requisitions</div>
        </div>

        {/* Active Internships */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Active Internships</span>
            <GraduationCap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">
            {kpis?.activeInternships?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Technical & Industrial</div>
        </div>

        {/* Total Applications */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Applications</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {kpis?.totalApplications?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Cycle 2026 Total</div>
        </div>

        {/* Total Placements */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Placements</span>
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-400">
            {kpis?.totalPlacements?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Directly Employed</div>
        </div>

        {/* Placement Rate */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Avg. Placement Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {kpis?.placementRate}%
          </div>
          <div className="text-[11px] text-emerald-400 font-medium mt-0.5">Target &gt; 80% Achieved</div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Pending Approvals</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">
            {kpis?.pendingApprovals}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            <Link to="/government/opportunities" className="text-amber-400 hover:underline">Review queue →</Link>
          </div>
        </div>

      </div>

      {/* 3. Employment Funnel Section (Animated Visual Progression & Monthly Trend) */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Statewide Employment Conversion Funnel
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Applications → Shortlisted → Interviews → Selected → Joined (Complete conversion lifecycle)
            </p>
          </div>

          {/* Month Switcher Pills */}
          <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {funnel.map(f => (
              <button
                key={f.period}
                onClick={() => setSelectedFunnelMonth(f.period)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedFunnelMonth === f.period
                    ? 'bg-amber-500 text-slate-950 shadow font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {f.period}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Animated Funnel Flow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {funnelStages.map((stage, idx) => (
            <div 
              key={stage.label} 
              className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 hover:border-slate-700 relative flex flex-col justify-between overflow-hidden shadow group"
            >
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Step 0{idx + 1}</span>
                  {idx < 4 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />}
                </div>
                <span className="text-sm font-bold text-white block">{stage.label}</span>
              </div>

              <div className="my-3">
                <div className="text-2xl font-black text-white">
                  {stage.count.toLocaleString()}
                </div>
                <span className="text-[10px] text-amber-400/90 font-semibold">{stage.drop}</span>
              </div>

              {/* Material UI Smooth Progress */}
              <LinearProgress 
                variant="determinate" 
                value={Math.max(10, (stage.count / currentFunnelData.applications) * 100)} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3, 
                  backgroundColor: 'rgba(51, 65, 85, 0.5)',
                  '& .MuiLinearProgress-bar': {
                    backgroundImage: idx === 0 
                      ? 'linear-gradient(90deg, #2563eb, #38bdf8)' 
                      : idx === 1 
                      ? 'linear-gradient(90deg, #38bdf8, #14b8a6)' 
                      : idx === 2 
                      ? 'linear-gradient(90deg, #14b8a6, #f59e0b)' 
                      : idx === 3 
                      ? 'linear-gradient(90deg, #f59e0b, #10b981)' 
                      : 'linear-gradient(90deg, #10b981, #4ade80)'
                  }
                }} 
              />
            </div>
          ))}
        </div>

        {/* Monthly Funnel Trend Chart (Smooth Spline Area with Glow Gradients) */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-300">Cohort Comparison Trend (Smooth Multi-Stage Area Dynamics)</span>
            <span className="text-[11px] text-slate-500">Source: government_funnel_analytics</span>
          </div>
          <div className="w-full min-h-[250px] h-[250px] sm:h-[280px] relative">
            <ResponsiveContainer width="100%" height={250} minHeight={240}>
              <AreaChart data={funnel} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradShort" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradJoined" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.55}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="natural" dataKey="applications" name="Applications" stroke="#38bdf8" fill="url(#gradApps)" strokeWidth={2.5} />
                <Area type="natural" dataKey="shortlisted" name="Shortlisted" stroke="#10b981" fill="url(#gradShort)" strokeWidth={2.5} />
                <Area type="natural" dataKey="joined" name="Joined" stroke="#f59e0b" fill="url(#gradJoined)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. District Opportunities & Jobs vs Internships (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* District Placement & Opportunity Area Matrix (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">
                Rajasthan District Opportunities & Placement Stream
              </h2>
              <p className="text-xs text-slate-400">Smooth comparative area gradient across student volume, jobs & placements</p>
            </div>

            {/* District Filter Dropdown */}
            <div className="flex items-center space-x-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="ALL">All 8 Key Districts</option>
                {districts.map(d => (
                  <option key={d.district} value={d.district}>{d.district}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full min-h-[270px] h-[270px] sm:h-[300px] relative">
            <ResponsiveContainer width="100%" height={270} minHeight={260}>
              <AreaChart data={districtChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradDistJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradDistIntern" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradDistPlaced" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Area type="natural" dataKey="Jobs" name="Full-Time Jobs" stroke="#38bdf8" fill="url(#gradDistJobs)" strokeWidth={2.5} />
                <Area type="natural" dataKey="Internships" name="Internships" stroke="#a855f7" fill="url(#gradDistIntern)" strokeWidth={2.5} />
                <Area type="natural" dataKey="Placements" name="Placements" stroke="#10b981" fill="url(#gradDistPlaced)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-slate-400 border-t border-slate-900">
            <span>Jaipur, Kota & Jodhpur drive over 60% of total state requisitions.</span>
            <Link to="/government/districts" className="text-amber-400 font-bold hover:underline">
              Detailed District View →
            </Link>
          </div>
        </div>

        {/* Jobs vs Internships Donut & Conversion Cards (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-extrabold text-white tracking-tight">
                  Jobs vs. Internships Split & Health
                </h2>
                <p className="text-xs text-slate-400">Opportunity ratio & PPO conversion metrics</p>
              </div>
              <Badge variant="saffron" size="sm">Rajasthan Ratio</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Active Jobs</span>
                <div className="text-2xl font-black text-sky-400">{kpis?.activeJobs || 420}</div>
                <div className="space-y-1 mt-1">
                  <div className="flex justify-between text-[10px] text-emerald-400 font-bold">
                    <span>Placement Rate</span>
                    <span>83.4%</span>
                  </div>
                  <LinearProgress 
                    variant="determinate" 
                    value={83.4} 
                    sx={{ height: 4, borderRadius: 2, backgroundColor: 'rgba(51,65,85,0.5)', '& .MuiLinearProgress-bar': { backgroundColor: '#38bdf8' } }} 
                  />
                </div>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Internships</span>
                <div className="text-2xl font-black text-purple-400">{kpis?.activeInternships || 280}</div>
                <div className="space-y-1 mt-1">
                  <div className="flex justify-between text-[10px] text-purple-300 font-bold">
                    <span>PPO Conversion</span>
                    <span>64.2%</span>
                  </div>
                  <LinearProgress 
                    variant="determinate" 
                    value={64.2} 
                    sx={{ height: 4, borderRadius: 2, backgroundColor: 'rgba(51,65,85,0.5)', '& .MuiLinearProgress-bar': { backgroundColor: '#a855f7' } }} 
                  />
                </div>
              </div>
            </div>

            {/* Glowing Donut Pie Chart */}
            <div className="w-full min-h-[190px] h-[190px] sm:h-[220px] relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height={190} minHeight={180}>
                <PieChart>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val, name) => [`${val} Offerings`, name]}
                  />
                  <Pie
                    data={jobInternDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={6}
                    dataKey="value"
                  >
                    {jobInternDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#020617" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Legend 
                    verticalAlign="bottom" 
                    wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-12 sm:top-14 text-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 block">Total</span>
                <span className="text-xs sm:text-sm font-black text-white">{(kpis?.activeJobs || 420) + (kpis?.activeInternships || 280)}</span>
              </div>
            </div>
          </div>

          <Link
            to="/government/placements"
            className="w-full py-2.5 text-center text-xs font-bold text-amber-400 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 transition-colors block"
          >
            Open Comprehensive Placement Analytics →
          </Link>
        </div>

      </div>

      {/* 5. Industry Skill Demand vs Student Availability (Unique Radar / Spider Web Chart) */}
      <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-sky-400 animate-spin-slow" />
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Industry Skill Demand vs. Student Availability Radar
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-dimensional polygon radar showing corporate demand % (Sky Blue) vs student talent availability % (Emerald Green).
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveSkillView('radar')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  activeSkillView === 'radar' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Radar Web
              </button>
              <button
                onClick={() => setActiveSkillView('area')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  activeSkillView === 'area' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Smooth Wave
              </button>
            </div>
            <span className="px-2.5 py-1 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-xs hidden sm:inline-block">
              High Demand + Low Supply = Deficit
            </span>
          </div>
        </div>

        {/* Dynamic Chart Container: Radar vs Smooth Area Wave */}
        <div className="w-full min-h-[290px] h-[290px] sm:h-[340px] relative">
          <ResponsiveContainer width="100%" height={290} minHeight={280}>
            {activeSkillView === 'radar' ? (
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={skillChartData}>
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                  formatter={(val, name, item) => [`${val}%`, name === 'demand' ? 'Employer Demand %' : 'Student Supply %']}
                />
                <Radar name="Employer Demand %" dataKey="demand" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.4} strokeWidth={2} />
                <Radar name="Student Availability %" dataKey="availability" stroke="#10b981" fill="#10b981" fillOpacity={0.4} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              </RadarChart>
            ) : (
              <AreaChart data={skillChartData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <defs>
                  <linearGradient id="gradSkillDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradSkillSupply" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradSkillGap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="fullName" tick={{ fontSize: 9, fill: '#cbd5e1' }} angle={-25} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                  formatter={(val) => `${val}%`}
                />
                <Legend verticalAlign="top" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
                <Area type="monotone" dataKey="demand" name="Employer Demand %" stroke="#38bdf8" fill="url(#gradSkillDemand)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="availability" name="Student Availability %" stroke="#10b981" fill="url(#gradSkillSupply)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="gap" name="Skill Gap %" stroke="#f43f5e" fill="url(#gradSkillGap)" strokeWidth={2} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. 🔴 Critical Skill Gaps & Action Recommendations */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span>🔴 Critical Skill Gaps Detected (Employer Demand is HIGH & Student Availability is LOW)</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              These skill deficits directly hinder Rajasthan students from converting technical requisitions into high-package placements.
            </p>
          </div>

          <Link
            to="/government/skills"
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-lg transition-colors inline-flex items-center space-x-1.5 shadow"
          >
            <span>View Full Skill Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Critical Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {criticalSkillGaps.slice(0, 3).map((item) => (
            <div 
              key={item.skill_name}
              className="bg-slate-900 rounded-xl p-4 border border-rose-500/30 relative flex flex-col justify-between hover:border-rose-400 transition-all shadow-md"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-white text-sm">{item.skill_name}</h3>
                    <span className="text-[11px] text-slate-400">{item.category}</span>
                  </div>
                  <Chip 
                    label={item.priority} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(244, 63, 94, 0.2)', 
                      color: '#fb7185', 
                      border: '1px solid rgba(244, 63, 94, 0.4)',
                      fontWeight: 800,
                      fontSize: '0.65rem'
                    }} 
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 my-3 text-center bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Demand</span>
                    <span className="text-sm font-black text-sky-400">{item.employer_demand}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Supply</span>
                    <span className="text-sm font-black text-emerald-400">{item.student_availability}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Deficit</span>
                    <span className="text-sm font-black text-rose-400">+{item.skill_gap}%</span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="space-y-1 my-2">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Talent Saturation</span>
                    <span>{item.student_availability}% of Market Demand</span>
                  </div>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.student_availability} 
                    sx={{ 
                      height: 5, 
                      borderRadius: 2, 
                      backgroundColor: 'rgba(51,65,85,0.5)', 
                      '& .MuiLinearProgress-bar': { backgroundColor: '#f43f5e' } 
                    }} 
                  />
                </div>

                <p className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg mt-2 font-medium leading-relaxed">
                  💡 {item.recommendation}
                </p>
              </div>

              {/* Action Button: Launch Recommendation Program */}
              <button
                onClick={() => openRecModal(item)}
                className="w-full mt-3 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Launch State Upskilling Cohort</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Modal: Create Training Recommendation */}
      {recommendationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Launch Government Training Initiative
                </h3>
              </div>
              <button
                onClick={() => setRecommendationModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecommendation} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Target Skill & Domain</label>
                <input
                  type="text"
                  readOnly
                  value={`${selectedSkillForRec?.skill_name} (${selectedSkillForRec?.category})`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Initiative Title</label>
                <input
                  type="text"
                  required
                  value={recFormData.title}
                  onChange={(e) => setRecFormData({ ...recFormData, title: e.target.value })}
                  placeholder="e.g. Statewide AWS Cloud Solutions Finishing School"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Target Student Cohort</label>
                <input
                  type="text"
                  required
                  value={recFormData.targetCohort}
                  onChange={(e) => setRecFormData({ ...recFormData, targetCohort: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Designated Execution Institutes (Comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={recFormData.recommendedInstitutes}
                  onChange={(e) => setRecFormData({ ...recFormData, recommendedInstitutes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setRecommendationModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow cursor-pointer font-black"
                >
                  Approve & Issue Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
