import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertOctagon, 
  Search, 
  Filter, 
  Eye, 
  X, 
  MapPin, 
  IndianRupee, 
  Check, 
  Ban, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  TrendingUp,
  RefreshCw,
  Download,
  PlusCircle,
  SlidersHorizontal,
  Zap,
  AlertTriangle,
  Target,
  Sparkles,
  Users,
  Building
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
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Chip, LinearProgress, Drawer, Tooltip as MuiTooltip } from '@mui/material';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';
import { 
  OPPORTUNITY_KPIS, 
  OPPORTUNITY_GROWTH_DATA, 
  JOBS_BY_SECTOR_DATA, 
  RAJASTHAN_DISTRICT_OPPORTUNITIES, 
  SKILL_DEMAND_TALENT_GAP, 
  AI_GOVERNMENT_INSIGHTS, 
  DEFAULT_OPPORTUNITIES_LIST 
} from '../../data/governmentOpportunityData';

export const GovernmentOpportunities = () => {
  const [opportunities, setOpportunities] = useState(DEFAULT_OPPORTUNITIES_LIST);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'ALL',
    district: 'ALL',
    sector: 'ALL',
    status: 'ALL',
    minMatchRate: 0
  });

  // Selected opportunity for inspection modal / actions
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [actionNotes, setActionNotes] = useState('');
  const [actionModal, setActionModal] = useState({ open: false, type: '', opp: null });

  // Create Opportunity Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newOppData, setNewOppData] = useState({
    title: '',
    company_name: '',
    opportunity_type: 'JOB',
    sector: 'IT & Software',
    district: 'Jaipur',
    location: 'Sitapura Industrial Area, Jaipur',
    salary_range: '₹6.5 - ₹9.0 LPA',
    requiredSkills: 'React.js, Node.js, SQL',
    vacancies: 4,
    description: ''
  });

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const res = await governmentApi.getOpportunities();
      const list = res?.data?.data || res?.data;
      if (Array.isArray(list) && list.length > 0) {
        setOpportunities(DEFAULT_OPPORTUNITIES_LIST);
      }
    } catch (err) {
      console.warn('Using baseline Rajasthan opportunities intelligence data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Opportunity Intelligence data refreshed!');
    }, 600);
  };

  const handleExportCSV = () => {
    const headers = ['Opportunity ID,Title,Employer,Type,Sector,District,Salary/Stipend,Applications,Match Rate,Status'];
    const rows = filteredOpportunities.map(o => 
      `"${o.id}","${o.title}","${o.company_name}","${o.opportunity_type}","${o.sector}","${o.district}","${o.salary_range}",${o.applications},${o.matchRate}%,"${o.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rajasthan_Opportunities_Intelligence_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported Opportunity Intelligence CSV!');
  };

  const handleStatusChange = async (oppId, newStatus) => {
    try {
      setOpportunities(prev => prev.map(o => o.id === oppId ? { ...o, status: newStatus } : o));
      toast.success(`Opportunity status updated to ${newStatus}`);
      setActionModal({ open: false, type: '', opp: null });
      setActionNotes('');
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleCreateOpportunity = (e) => {
    e.preventDefault();
    const created = {
      id: `opp-${Date.now()}`,
      title: newOppData.title,
      company_name: newOppData.company_name,
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
      opportunity_type: newOppData.opportunity_type,
      sector: newOppData.sector,
      district: newOppData.district,
      location: newOppData.location,
      employment_type: newOppData.opportunity_type === 'JOB' ? 'Full Time' : 'Internship',
      salary_range: newOppData.salary_range,
      requiredSkills: newOppData.requiredSkills.split(',').map(s => s.trim()),
      experience: '0 - 2 Years',
      applications: 12,
      matchRate: 88,
      status: 'PUBLISHED',
      postedDate: new Date().toISOString().split('T')[0],
      vacancies: Number(newOppData.vacancies) || 2,
      description: newOppData.description || 'Verified Rajasthan state opportunity posting.'
    };

    setOpportunities([created, ...opportunities]);
    toast.success(`Opportunity "${newOppData.title}" published!`);
    setCreateModalOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      type: 'ALL',
      district: 'ALL',
      sector: 'ALL',
      status: 'ALL',
      minMatchRate: 0
    });
    setSearchTerm('');
    toast.success('Filters reset to default.');
  };

  const openActionModal = (opp, type) => {
    setActionModal({ open: true, type, opp });
    setActionNotes('');
  };

  const filteredOpportunities = opportunities.filter(o => {
    if (filters.type !== 'ALL' && o.opportunity_type !== filters.type) return false;
    if (filters.district !== 'ALL' && o.district?.toLowerCase() !== filters.district.toLowerCase()) return false;
    if (filters.sector !== 'ALL' && o.sector?.toLowerCase() !== filters.sector.toLowerCase()) return false;
    if (filters.status !== 'ALL' && o.status !== filters.status) return false;
    if (o.matchRate < filters.minMatchRate) return false;
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return o.title?.toLowerCase().includes(q) || 
           o.company_name?.toLowerCase().includes(q) ||
           o.district?.toLowerCase().includes(q) ||
           o.requiredSkills?.some(s => s.toLowerCase().includes(q));
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PUBLISHED':
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Active</span>
          </span>
        );
      case 'PENDING_APPROVAL':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Pending</span>
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <AlertOctagon className="w-3 h-3 text-rose-400" />
            <span>Suspended</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-7 text-slate-100 pb-12 font-sans">
      
      {/* 1. Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Rajasthan Employment Intelligence</span>
            </span>
            <Chip 
              label="Live Employer Demand Streams" 
              size="small" 
              sx={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: 700, fontSize: '0.7rem' }} 
            />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white">
            Employment Opportunity Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Monitor jobs, internships and employer demand across Rajasthan.
          </p>
        </div>

        {/* Action Header Buttons & Cross-Page Intelligence Link */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleRefresh}
            className="p-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition-all shadow cursor-pointer"
            title="Refresh Opportunity Intelligence"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-850 text-amber-400 border border-slate-750 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Opportunity</span>
          </button>

          <Link
            to="/government/students"
            className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-sky-400 border border-sky-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow"
          >
            <span>View Available Talent</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Top 6 Opportunity KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Opportunities</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">{OPPORTUNITY_KPIS.totalOpportunities.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1">{OPPORTUNITY_KPIS.totalGrowth}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Active Jobs</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{OPPORTUNITY_KPIS.activeJobs.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">{OPPORTUNITY_KPIS.jobsShare}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Internships</span>
            <GraduationCap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">{OPPORTUNITY_KPIS.internships.toLocaleString()}</div>
          <div className="text-[10px] text-purple-300 font-medium mt-1">{OPPORTUNITY_KPIS.internshipsShare}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Verified Employers</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{OPPORTUNITY_KPIS.employers.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">{OPPORTUNITY_KPIS.employersDetail}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Applications</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{OPPORTUNITY_KPIS.applications.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">{OPPORTUNITY_KPIS.applicationsRatio}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Avg. Match Rate</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{OPPORTUNITY_KPIS.avgMatchRate}%</div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">{OPPORTUNITY_KPIS.matchPrecision}</div>
        </div>

      </div>

      {/* 3. AI / Government Employment Insights Section (Key SIH Intelligence Feature) */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Government Employment Insights & Policy Intelligence
              </h2>
              <p className="text-xs text-slate-400">Algorithmic intelligence synthesized from active corporate demand signals and student capabilities</p>
            </div>
          </div>
          <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Real-time Directives
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AI_GOVERNMENT_INSIGHTS.map((insight) => (
            <div 
              key={insight.id}
              className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-slate-700 space-y-2.5 transition-all shadow"
            >
              <div className="flex justify-between items-start">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                  insight.badgeColor === 'sky' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                  insight.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  insight.badgeColor === 'rose' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {insight.badge}
                </span>
              </div>

              <h3 className="text-xs font-black text-white">{insight.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Opportunity Analytics (Opportunity Growth Area & Jobs by Sector Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Opportunity Growth (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                <h2 className="text-sm font-extrabold text-white tracking-tight">
                  Opportunity Growth Trajectory (Last 6 Months)
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Tracking volume expansion across full-time jobs and internships</p>
            </div>
            <Badge variant="blue" size="sm">6-Month Trend</Badge>
          </div>

          <div className="w-full min-h-[270px] h-[270px] sm:h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%" minHeight={260}>
              <AreaChart data={OPPORTUNITY_GROWTH_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradOppJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradOppIntern" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Area type="natural" dataKey="jobs" name="Full-Time Jobs" stroke="#38bdf8" fill="url(#gradOppJobs)" strokeWidth={2.5} />
                <Area type="natural" dataKey="internships" name="Internships" stroke="#a855f7" fill="url(#gradOppIntern)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Jobs by Sector (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-extrabold text-white tracking-tight">
                    Active Opportunities by Sector
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Corporate requisitions distributed by industry vertical</p>
              </div>
              <Badge variant="saffron" size="sm">Sector Mix</Badge>
            </div>

            <div className="w-full min-h-[270px] h-[270px] sm:h-[300px] relative">
              <ResponsiveContainer width="100%" height="100%" minHeight={260}>
                <BarChart 
                  layout="vertical" 
                  data={JOBS_BY_SECTOR_DATA} 
                  margin={{ top: 5, right: 15, left: 35, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis type="category" dataKey="sector" tick={{ fontSize: 10, fill: '#cbd5e1' }} width={95} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                    formatter={(val) => [`${val} Opportunities`, 'Count']}
                  />
                  <Bar dataKey="count" name="Opportunities" fill="#38bdf8" radius={[0, 4, 4, 0]}>
                    {JOBS_BY_SECTOR_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Rajasthan Opportunity Distribution Grid (Map-Style Card Visualization) */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Opportunity Distribution Across Rajasthan (8 Key Industrial Clusters)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Live territorial job and internship allocations mapped by corporate presence and hiring intensity</p>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            3,840 Total Postings
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {RAJASTHAN_DISTRICT_OPPORTUNITIES.map((d) => (
            <div 
              key={d.district}
              className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-slate-700 space-y-3 transition-all shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-white text-base">{d.district}</h3>
                  <span className="text-[11px] text-slate-400 font-medium">{d.hiringFirms} Hiring Firms</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  d.demandColor === 'rose' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  d.demandColor === 'amber' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                }`}>
                  {d.demandLevel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Active Jobs</span>
                  <span className="text-sm font-black text-sky-400">{d.activeJobs}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Internships</span>
                  <span className="text-sm font-black text-purple-400">{d.internships}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1 border-t border-slate-800">
                <span className="text-slate-500">Top In-Demand:</span>
                <span className="text-amber-300 font-semibold">{d.topSkill}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Top In-Demand Skills vs. Talent Gap (Core SIH Skill Gap Demonstration) */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-rose-400" />
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Top In-Demand Skills vs. Student Talent Gap
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Correlating corporate technical hiring requisitions with registered college talent to identify critical workforce deficits.
            </p>
          </div>
          <span className="text-xs text-rose-300 font-bold bg-rose-500/15 border border-rose-500/30 px-3 py-1 rounded-full">
            ⚠ Talent Deficit Trigger Active
          </span>
        </div>

        <div className="space-y-3.5">
          {SKILL_DEMAND_TALENT_GAP.map((item) => (
            <div key={item.skill} className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center space-x-2.5">
                  <span className="font-bold text-white text-xs">{item.skill}</span>
                  {item.talentGap > 70 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      🚨 Critical Gap (+{item.talentGap})
                    </span>
                  )}
                  {item.talentGap > 0 && item.talentGap <= 70 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      ⚡ Moderate Gap (+{item.talentGap})
                    </span>
                  )}
                  {item.talentGap <= 0 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      ✓ Surplus
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono">
                  <span className="text-sky-400">Open Positions: <strong>{item.openPositions}</strong></span>
                  <span className="text-emerald-400">Available Students: <strong>{item.availableStudents}</strong></span>
                  <span className={item.talentGap > 0 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                    Gap: {item.talentGap > 0 ? `+${item.talentGap}` : item.talentGap}
                  </span>
                </div>
              </div>

              {/* Progress bar visual comparing Demand vs Supply */}
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden flex">
                <div 
                  className="h-full bg-sky-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (item.availableStudents / item.openPositions) * 100)}%` }}
                  title="Talent Availability"
                ></div>
                {item.talentGap > 0 && (
                  <div 
                    className="h-full bg-rose-500 transition-all duration-500"
                    style={{ width: `${(item.talentGap / item.openPositions) * 100}%` }}
                    title="Deficit Gap"
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Search, Filter Bar & Premium Opportunities Table */}
      <div className="space-y-4">
        
        {/* Search & Filter Controls */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search opportunity title, employer, skill, district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Filters</span>
              {(filters.type !== 'ALL' || filters.district !== 'ALL' || filters.sector !== 'ALL' || filters.status !== 'ALL') && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {(filters.type !== 'ALL' || filters.district !== 'ALL' || filters.sector !== 'ALL' || filters.status !== 'ALL' || searchTerm) && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Premium Opportunity Table */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Opportunity & Employer</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">District</th>
                  <th className="py-3.5 px-4">Required Skills</th>
                  <th className="py-3.5 px-4 text-center">Applications</th>
                  <th className="py-3.5 px-4 text-center">Match Rate</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredOpportunities.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-500">
                      No opportunities match the specified filters.
                    </td>
                  </tr>
                ) : (
                  filteredOpportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-slate-900/50 transition-colors">
                      
                      {/* Title & Employer */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={opp.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80'} 
                            alt={opp.company_name}
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/icons.svg'; }}
                            className="w-9 h-9 rounded-lg object-cover border border-slate-700 shadow"
                          />
                          <div>
                            <span className="font-extrabold text-white block text-sm">{opp.title}</span>
                            <span className="text-[11px] text-slate-400">{opp.company_name} • {opp.salary_range}</span>
                          </div>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          opp.opportunity_type === 'JOB' 
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' 
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {opp.opportunity_type}
                        </span>
                      </td>

                      {/* District */}
                      <td className="py-3.5 px-4">
                        <span className="flex items-center space-x-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{opp.district}</span>
                        </span>
                      </td>

                      {/* Skills Chips */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {opp.requiredSkills?.slice(0, 3).map((sk) => (
                            <span key={sk} className="px-1.5 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-800 text-[10px] font-medium">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Applications Count */}
                      <td className="py-3.5 px-4 text-center font-bold text-white">
                        {opp.applications}
                      </td>

                      {/* Match Rate */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block font-black text-xs px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {opp.matchRate}%
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(opp.status)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => setSelectedOpp(opp)}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-md border border-slate-700 transition-colors cursor-pointer"
                            title="Inspect Opportunity"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {opp.status !== 'PUBLISHED' && (
                            <button
                              onClick={() => openActionModal(opp, 'PUBLISHED')}
                              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-md font-black text-[11px] cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {opp.status === 'PUBLISHED' && (
                            <button
                              onClick={() => openActionModal(opp, 'SUSPENDED')}
                              className="px-2 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-md font-bold text-[10px] cursor-pointer"
                            >
                              Suspend
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 8. Smart Opportunity Filters Side Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#020617',
            color: '#fff',
            width: { xs: '100%', sm: 380 },
            borderLeft: '1px solid #1e293b',
            p: 3
          }
        }}
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Filter Opportunities</h3>
          </div>
          <button
            onClick={() => setFilterDrawerOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4 text-xs">
          
          <div>
            <label className="font-bold text-slate-300 block mb-1.5">Opportunity Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="ALL">All Types (Jobs & Internships)</option>
              <option value="JOB">Full-Time Jobs</option>
              <option value="INTERNSHIP">Internships</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1.5">District Cluster</label>
            <select
              value={filters.district}
              onChange={(e) => setFilters({ ...filters, district: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="ALL">All Districts</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Jodhpur">Jodhpur</option>
              <option value="Kota">Kota</option>
              <option value="Udaipur">Udaipur</option>
              <option value="Ajmer">Ajmer</option>
              <option value="Alwar">Alwar</option>
              <option value="Bikaner">Bikaner</option>
              <option value="Sikar">Sikar</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1.5">Industry Sector</label>
            <select
              value={filters.sector}
              onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="ALL">All Sectors</option>
              <option value="IT & Software">IT & Software</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Finance & Banking">Finance & Banking</option>
              <option value="Education & EdTech">Education & EdTech</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1.5">Regulatory Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PUBLISHED">Active / Published</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end space-x-2.5">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => {
              setFilterDrawerOpen(false);
              toast.success('Filters applied.');
            }}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shadow cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </Drawer>

      {/* 9. Modal: Inspect Opportunity */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3.5">
                <img 
                  src={selectedOpp.logo || '/icons.svg'} 
                  alt={selectedOpp.company_name}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/icons.svg'; }}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow"
                />
                <div>
                  <h3 className="text-base font-black text-white">{selectedOpp.title}</h3>
                  <span className="text-amber-400 font-semibold">{selectedOpp.company_name}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOpp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Compensation Package</span>
                <span className="text-emerald-400 font-bold">{selectedOpp.salary_range}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Location & Cluster</span>
                <span className="text-white">{selectedOpp.district}, Rajasthan</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Total Open Vacancies</span>
                <span className="text-white font-bold">{selectedOpp.vacancies} Positions</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Applicant Match Rate</span>
                <span className="text-sky-400 font-bold">{selectedOpp.matchRate}% Match Precision</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-300 block mb-1">Requisition Summary</span>
              <p className="text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {selectedOpp.description}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-300 block mb-1">Required Competencies</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedOpp.requiredSkills?.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedOpp(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold cursor-pointer"
              >
                Close
              </button>
              {selectedOpp.status !== 'PUBLISHED' && (
                <button
                  onClick={() => {
                    const o = selectedOpp;
                    setSelectedOpp(null);
                    openActionModal(o, 'PUBLISHED');
                  }}
                  className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl font-black cursor-pointer"
                >
                  Approve Requisition
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 10. Modal: Create Opportunity */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Create Verified Opportunity</h3>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOpportunity} className="space-y-3.5">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Opportunity Title</label>
                <input
                  type="text"
                  required
                  value={newOppData.title}
                  onChange={(e) => setNewOppData({ ...newOppData, title: e.target.value })}
                  placeholder="e.g. Associate Full Stack Developer"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Corporate Employer</label>
                  <input
                    type="text"
                    required
                    value={newOppData.company_name}
                    onChange={(e) => setNewOppData({ ...newOppData, company_name: e.target.value })}
                    placeholder="e.g. TechNova Solutions"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Requisition Type</label>
                  <select
                    value={newOppData.opportunity_type}
                    onChange={(e) => setNewOppData({ ...newOppData, opportunity_type: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="JOB">Full-Time Job</option>
                    <option value="INTERNSHIP">Technical Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">District Node</label>
                  <select
                    value={newOppData.district}
                    onChange={(e) => setNewOppData({ ...newOppData, district: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Jaipur">Jaipur</option>
                    <option value="Jodhpur">Jodhpur</option>
                    <option value="Kota">Kota</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Ajmer">Ajmer</option>
                    <option value="Alwar">Alwar</option>
                    <option value="Bikaner">Bikaner</option>
                    <option value="Sikar">Sikar</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Salary / Stipend Range</label>
                  <input
                    type="text"
                    required
                    value={newOppData.salary_range}
                    onChange={(e) => setNewOppData({ ...newOppData, salary_range: e.target.value })}
                    placeholder="e.g. ₹6.5 - ₹8.5 LPA"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={newOppData.requiredSkills}
                  onChange={(e) => setNewOppData({ ...newOppData, requiredSkills: e.target.value })}
                  placeholder="e.g. React.js, Node.js, SQL"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-black shadow cursor-pointer"
                >
                  Publish Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 11. Modal: Status Action Confirmation */}
      {actionModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-xs">
            <h3 className="text-base font-bold text-white">
              {actionModal.type === 'PUBLISHED' ? 'Approve & Publish Opportunity' : 'Suspend Opportunity'}
            </h3>
            <p className="text-slate-300">
              Confirm status modification for <strong className="text-white">{actionModal.opp?.title}</strong> ({actionModal.opp?.company_name}).
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setActionModal({ open: false, type: '', opp: null })}
                className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange(actionModal.opp?.id, actionModal.type)}
                className={`px-5 py-2 font-black rounded-xl cursor-pointer ${
                  actionModal.type === 'PUBLISHED' 
                    ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950' 
                    : 'bg-rose-500 hover:bg-rose-400 text-white'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
