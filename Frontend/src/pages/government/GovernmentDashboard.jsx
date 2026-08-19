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
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend, 
  AreaChart, 
  Area,
  ComposedChart,
  Line,
  Cell
} from 'recharts';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const GovernmentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFunnelMonth, setSelectedFunnelMonth] = useState('August 2026');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [recommendationModalOpen, setRecommendationModalOpen] = useState(false);
  const [selectedSkillForRec, setSelectedSkillForRec] = useState(null);

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

  // Skill demand data mapped for recharts
  const skillChartData = skills.map(s => ({
    name: s.skill_name,
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

  // Jobs vs Internships Comparison Data
  const jobInternData = [
    { name: 'Opportunities', Jobs: kpis?.activeJobs || 420, Internships: kpis?.activeInternships || 280 },
    { name: 'Placement Rate (%)', Jobs: 83.4, Internships: 64.2 }
  ];

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
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold animate-pulse">
              <span>●</span>
              <span>Prototype Demo Data</span>
            </span>
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
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Stipend-backed 3-6 Mos</div>
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
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Processed Candidates</div>
        </div>

        {/* Total Placements */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Placements</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {kpis?.totalPlacements?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Joined Recruiter Roster</div>
        </div>

        {/* Placement Rate */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Placement Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {kpis?.placementRate}%
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Joined ÷ Submissions</div>
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

              {/* Progress bar representing funnel drop */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stage.color} rounded-full transition-all duration-700`}
                  style={{ width: `${Math.max(12, (stage.count / currentFunnelData.applications) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Funnel Trend Chart (Recharts Area/Bar) */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-300">Cohort Comparison Trend (June - August 2026)</span>
            <span className="text-[11px] text-slate-500">Source: government_funnel_analytics</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={funnel} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradShort" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradJoined" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#38bdf8" fill="url(#gradApps)" strokeWidth={2} />
                <Area type="monotone" dataKey="shortlisted" name="Shortlisted" stroke="#10b981" fill="url(#gradShort)" strokeWidth={2} />
                <Area type="monotone" dataKey="joined" name="Joined" stroke="#f59e0b" fill="url(#gradJoined)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. District Opportunities & Jobs vs Internships (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* District Opportunities Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">
                Rajasthan District Opportunities & Placement Matrix
              </h2>
              <p className="text-xs text-slate-400">Comparing student volume, job posts, and placements across districts</p>
            </div>

            {/* District Filter Dropdown */}
            <div className="flex items-center space-x-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All 8 Districts</option>
                {districts.map(d => (
                  <option key={d.district} value={d.district}>{d.district}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-68 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="Jobs" name="Full-Time Jobs" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Internships" name="Internships" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Placements" name="Placements" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
            <span>Jaipur & Kota lead total job postings.</span>
            <Link to="/government/districts" className="text-amber-400 font-bold hover:underline">
              Detailed District View →
            </Link>
          </div>
        </div>

        {/* Jobs vs Internships Comparison (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-extrabold text-white tracking-tight">
                  Jobs vs. Internships Performance
                </h2>
                <p className="text-xs text-slate-400">Market distribution & conversion efficiency</p>
              </div>
              <Badge variant="saffron" size="sm">Rajasthan Ratio</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Active Jobs</span>
                <div className="text-2xl font-black text-sky-400">{kpis?.activeJobs || 420}</div>
                <span className="text-[10px] text-emerald-400 font-bold">83.4% Placement Rate</span>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Internships</span>
                <div className="text-2xl font-black text-purple-400">{kpis?.activeInternships || 280}</div>
                <span className="text-[10px] text-purple-300 font-bold">64.2% PPO Conversion</span>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobInternData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="Jobs" fill="#38bdf8" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="Internships" fill="#a855f7" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
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

      {/* 5. Industry Skill Demand vs Student Availability (Recharts Multi-Bar Graph) */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Industry Skill Demand vs. Student Skill Availability
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Correlating corporate technical hiring demand % with registered university student supply % across 10 key skills.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold">
              High Demand + Low Supply = Critical Gap
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillChartData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#cbd5e1' }} angle={-25} textAnchor="end" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                formatter={(val) => `${val}%`}
              />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
              <Bar dataKey="demand" name="Employer Demand %" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="availability" name="Student Availability %" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="gap" name="Skill Gap %" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
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
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-black text-white">{item.skill_name}</h3>
                    <span className="text-[11px] text-slate-400">{item.category || 'Core Technology'}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded text-[10px] font-black uppercase">
                    Priority: {item.priority}
                  </span>
                </div>

                <div className="space-y-1.5 my-3 text-xs bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Employer Demand:</span>
                    <span className="font-bold text-sky-400">{item.employer_demand}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Student Availability:</span>
                    <span className="font-bold text-emerald-400">{item.student_availability}%</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800 text-amber-400 font-extrabold">
                    <span>Deficit Gap:</span>
                    <span>{item.skill_gap}%</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {item.recommendation}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-800">
                <button
                  onClick={() => openRecModal(item)}
                  className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Create Training Recommendation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 7. Modal: Create Policy & Training Recommendation */}
      {recommendationModalOpen && selectedSkillForRec && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Policy Decision Portal</span>
                <h3 className="text-lg font-bold text-white">
                  Launch Government Training Initiative for {selectedSkillForRec.skill_name}
                </h3>
              </div>
              <button 
                onClick={() => setRecommendationModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Skill:</span>
                <strong className="text-white">{selectedSkillForRec.skill_name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Industry Demand:</span>
                <strong className="text-sky-400">{selectedSkillForRec.employer_demand}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student Availability:</span>
                <strong className="text-emerald-400">{selectedSkillForRec.student_availability}%</strong>
              </div>
              <div className="flex justify-between text-rose-400 font-bold">
                <span>Supply Deficit Gap:</span>
                <span>{selectedSkillForRec.skill_gap}%</span>
              </div>
            </div>

            <form onSubmit={handleCreateRecommendation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Training Program Title
                </label>
                <input
                  type="text"
                  required
                  value={recFormData.title}
                  onChange={(e) => setRecFormData({ ...recFormData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Target Student Cohort
                </label>
                <input
                  type="text"
                  required
                  value={recFormData.targetCohort}
                  onChange={(e) => setRecFormData({ ...recFormData, targetCohort: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Recommended Regional Engineering Hubs (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={recFormData.recommendedInstitutes}
                  onChange={(e) => setRecFormData({ ...recFormData, recommendedInstitutes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setRecommendationModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md flex items-center space-x-1.5"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Submit Training Recommendation</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
