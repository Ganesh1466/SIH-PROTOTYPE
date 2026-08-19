import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  MapPin, 
  Building2, 
  Briefcase, 
  Users, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowRight, 
  Sparkles, 
  FileSpreadsheet, 
  Check, 
  X, 
  TrendingUp, 
  Layers, 
  Calendar,
  Eye,
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
import { Chip, LinearProgress, Tooltip as MuiTooltip } from '@mui/material';
import { Badge } from '../../components/common/Badge';
import toast from 'react-hot-toast';
import { 
  REPORT_KPIS, 
  REPORT_CATEGORIES, 
  REPORT_PLACEMENT_TRENDS, 
  DISTRICT_PLACEMENT_RATES, 
  REPORT_SKILL_GAPS, 
  REPORT_DISTRICT_INTELLIGENCE, 
  RECENT_REPORTS_LIST, 
  REPORT_POLICY_INSIGHTS 
} from '../../data/governmentReportData';

export const GovernmentReports = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [lastGenerated, setLastGenerated] = useState('18 Aug 2026, 06:42 PM');
  
  // Header Selectors
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // District Intelligence Table Search
  const [districtSearch, setDistrictSearch] = useState('');

  // Modal State for "Generate Report"
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generatedReportResult, setGeneratedReportResult] = useState(null);

  // Form selections inside Modal
  const [modalDistrict, setModalDistrict] = useState('All Rajasthan');
  const [modalDateRange, setModalDateRange] = useState('Last 30 Days');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeStudentData, setIncludeStudentData] = useState(true);
  const [includeOpportunityData, setIncludeOpportunityData] = useState(true);
  const [includeSkillGap, setIncludeSkillGap] = useState(true);

  // Recent Reports State
  const [recentReports, setRecentReports] = useState(RECENT_REPORTS_LIST);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastGenerated(`${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
      setRefreshing(false);
      toast.success('Employment Intelligence Report metrics refreshed!');
    }, 600);
  };

  const handleExportCSV = (reportName = 'Rajasthan_Employment_Intelligence_Consolidated') => {
    const headers = ['District,Total Students,Active Opportunities,Students Placed,Placement Rate,Avg Match Score,Skill Gap Level'];
    const rows = REPORT_DISTRICT_INTELLIGENCE.map(d => 
      `"${d.district}",${d.students},${d.opportunities},${d.placed},${d.placementRate}%,${d.avgMatchScore}%,"${d.skillGap}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${reportName.replace(/\s+/g, '_')}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV Report exported successfully!');
  };

  const handleExportPDF = (reportName = 'Rajasthan_State_Employment_Dossier') => {
    toast.success(`Preparing PDF dossier for ${reportName}...`);
    setTimeout(() => {
      // Create a downloadable mock PDF blob
      const element = document.createElement('a');
      const file = new Blob([`RAJASTHAN GOVERNMENT EMPLOYMENT INTELLIGENCE REPORT\nTitle: ${reportName}\nGenerated: ${new Date().toLocaleString()}\nScope: Statewide Rajasthan Clusters\nAccuracy: Certified Official Report\n\nTotal Students: 24,850\nTotal Opportunities: 3,840\nPlaced: 8,940\nPlacement Rate: 36.0%`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${reportName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success('PDF Report downloaded successfully!');
    }, 800);
  };

  const openGenerateModal = (category) => {
    setSelectedCategory(category);
    setGeneratedReportResult(null);
    setGenerating(false);
    setModalOpen(true);
  };

  const handleExecuteGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const newRep = {
        id: `rep-${Date.now()}`,
        name: `${selectedCategory?.title || 'Statewide Employment Report'} (${modalDistrict})`,
        type: selectedCategory?.badge || 'Custom Analysis',
        generatedBy: 'Government Officer (Admin)',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        records: `${Math.floor(4000 + Math.random() * 15000).toLocaleString()} Records`,
        status: 'Ready',
        fileSize: '3.6 MB'
      };

      setRecentReports([newRep, ...recentReports]);
      setGeneratedReportResult(newRep);
      setGenerating(false);
      toast.success('Report successfully compiled and ready for download!');
    }, 1200);
  };

  const filteredDistricts = REPORT_DISTRICT_INTELLIGENCE.filter(d => {
    if (districtFilter !== 'ALL' && d.district.toLowerCase() !== districtFilter.toLowerCase()) return false;
    if (!districtSearch) return true;
    return d.district.toLowerCase().includes(districtSearch.toLowerCase());
  });

  return (
    <div className="space-y-7 text-slate-100 pb-12 font-sans bg-slate-950">
      
      {/* 1. Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Rajasthan Report Center</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Last generated: <span className="text-slate-300 font-bold">{lastGenerated}</span>
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white">
              Employment Intelligence Reports
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Generate data-driven reports on student talent, employment opportunities, placement performance and regional skill gaps across Rajasthan.
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleRefresh}
              className="p-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition-all shadow cursor-pointer"
              title="Refresh Report Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            <button
              onClick={() => handleExportPDF('Rajasthan_Consolidated_Intelligence_Report')}
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-850 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-rose-400" />
              <span>Export PDF</span>
            </button>

            <button
              onClick={() => handleExportCSV('Rajasthan_Consolidated_Intelligence_Report')}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel / CSV</span>
            </button>
          </div>
        </div>

        {/* Global Filter Bar */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-semibold">Date Range:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="Last 30 Days">Last 30 Days (Current Cycle)</option>
              <option value="Quarter 3 (2026)">Quarter 3 (Jul - Sep 2026)</option>
              <option value="Financial Year 2025-26">FY 2025-26 (Annual)</option>
              <option value="All Time">All Time Historical</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-semibold">Territory:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="ALL">All Rajasthan (8 Key Clusters)</option>
              <option value="Jaipur">Jaipur Cluster</option>
              <option value="Jodhpur">Jodhpur Cluster</option>
              <option value="Kota">Kota Cluster</option>
              <option value="Udaipur">Udaipur Cluster</option>
              <option value="Ajmer">Ajmer Cluster</option>
              <option value="Alwar">Alwar Cluster</option>
              <option value="Bikaner">Bikaner Cluster</option>
              <option value="Sikar">Sikar Cluster</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Top 5 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Students</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">{REPORT_KPIS.totalStudents.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">{REPORT_KPIS.totalStudentsGrowth}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Opportunities</span>
            <Briefcase className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">{REPORT_KPIS.totalOpportunities.toLocaleString()}</div>
          <div className="text-[11px] text-purple-300 font-medium mt-1">{REPORT_KPIS.opportunitiesGrowth}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Students Placed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{REPORT_KPIS.studentsPlaced.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">{REPORT_KPIS.placedGrowth}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Overall Placement Rate</span>
            <BarChart3 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-400">{REPORT_KPIS.placementRate}%</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">{REPORT_KPIS.placementRateLabel}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Identified Skill Gaps</span>
            <Zap className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">{REPORT_KPIS.skillGaps}</div>
          <div className="text-[11px] text-rose-300 font-medium mt-1">{REPORT_KPIS.skillGapsLabel}</div>
        </div>

      </div>

      {/* 3. Report Categories (6 Cards) */}
      <div className="space-y-3.5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">
              Report Generation Modules
            </h2>
            <p className="text-xs text-slate-400">Select an official reporting module to compile custom dossiers and policy analytics</p>
          </div>
          <Badge variant="saffron" size="sm">6 Dossier Types</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORT_CATEGORIES.map((cat) => {
            return (
              <div 
                key={cat.id}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {cat.badge}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{cat.records}</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Ready to compile</span>
                  <button
                    onClick={() => openGenerateModal(cat)}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition-all shadow flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Generate Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Policy Intelligence Section */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Policy Intelligence & Government Directives
              </h2>
              <p className="text-xs text-slate-400">Automated administrative takeaways synthesized from statewide reports</p>
            </div>
          </div>
          <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Actionable Intelligence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REPORT_POLICY_INSIGHTS.map((insight) => (
            <div 
              key={insight.id}
              className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2.5 transition-all shadow"
            >
              <div className="flex justify-between items-start">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                  insight.badgeColor === 'sky' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                  insight.badgeColor === 'rose' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  insight.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
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

      {/* 5. Main Analytics Section: Rajasthan Employment Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Placement Trend Line/Area (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                <h2 className="text-sm font-extrabold text-white tracking-tight">
                  Rajasthan Placement Trend (Last 6 Months)
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Tracking candidate funnel volume from registration to confirmed placement</p>
            </div>
            <Badge variant="blue" size="sm">6-Month Curve</Badge>
          </div>

          <div className="w-full min-h-[270px] h-[270px] sm:h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%" minHeight={260}>
              <AreaChart data={REPORT_PLACEMENT_TRENDS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRepReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradRepReady" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradRepPlaced" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Area type="natural" dataKey="registered" name="Registered Students" stroke="#38bdf8" fill="url(#gradRepReg)" strokeWidth={2.5} />
                <Area type="natural" dataKey="placementReady" name="Placement Ready" stroke="#818cf8" fill="url(#gradRepReady)" strokeWidth={2.5} />
                <Area type="natural" dataKey="placed" name="Students Placed" stroke="#10b981" fill="url(#gradRepPlaced)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: District Placement Rate (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-extrabold text-white tracking-tight">
                    District Placement Conversion Rate
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Percentage of graduates hired across Rajasthan clusters</p>
              </div>
              <Badge variant="saffron" size="sm">Cluster Audit</Badge>
            </div>

            <div className="w-full min-h-[270px] h-[270px] sm:h-[300px] relative">
              <ResponsiveContainer width="100%" height="100%" minHeight={260}>
                <BarChart 
                  layout="vertical" 
                  data={DISTRICT_PLACEMENT_RATES} 
                  margin={{ top: 5, right: 15, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} unit="%" />
                  <YAxis type="category" dataKey="district" tick={{ fontSize: 11, fill: '#cbd5e1' }} width={65} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                    formatter={(val) => [`${val}% Placement Rate`, 'Conversion']}
                  />
                  <Bar dataKey="rate" name="Placement Rate %" fill="#10b981" radius={[0, 4, 4, 0]}>
                    {DISTRICT_PLACEMENT_RATES.map((entry, index) => (
                      <Cell 
                        key={`rate-cell-${index}`} 
                        fill={entry.rate >= 40 ? '#10b981' : entry.rate >= 36 ? '#38bdf8' : '#f59e0b'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* 6. Skill Gap Intelligence ("Skill Demand vs Available Talent") */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-rose-400" />
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Skill Demand vs. Available Talent Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies skills where employer requisitions exceed available student talent in Rajasthan
            </p>
          </div>

          <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 rounded-full text-xs font-bold">
            React.js has the highest technology talent gap (+140 developers)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Technical Skill</th>
                <th className="py-3.5 px-4">Open Positions</th>
                <th className="py-3.5 px-4">Matching Students</th>
                <th className="py-3.5 px-4">Talent Gap</th>
                <th className="py-3.5 px-4">Market Demand</th>
                <th className="py-3.5 px-5 text-right">Policy Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {REPORT_SKILL_GAPS.map((sk) => (
                <tr key={sk.skill} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white text-sm">
                    {sk.skill}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                    {sk.openPositions}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    {sk.matchingStudents}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black">
                    <span className={sk.talentGap > 0 ? "text-rose-400" : "text-emerald-400"}>
                      {sk.talentGap > 0 ? `+${sk.talentGap} Deficit` : `${sk.talentGap} Surplus`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-300 font-semibold">{sk.demand}</span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    {sk.status === 'WARNING' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                        <span>High Gap</span>
                      </span>
                    )}
                    {sk.status === 'BALANCED' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-sky-500/20 text-sky-300 border border-sky-500/40">
                        <Check className="w-3 h-3 text-sky-400" />
                        <span>Balanced</span>
                      </span>
                    )}
                    {sk.status === 'SURPLUS' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <span>Surplus</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. District Intelligence Report Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl space-y-4 p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-extrabold text-white">
                District Intelligence Audit Dossier
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Comprehensive regional employment breakdown with verified placement conversion rates</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search district..."
              value={districtSearch}
              onChange={(e) => setDistrictSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-5">District</th>
                <th className="py-3.5 px-4">Students</th>
                <th className="py-3.5 px-4">Opportunities</th>
                <th className="py-3.5 px-4">Placed</th>
                <th className="py-3.5 px-4" style={{ minWidth: 150 }}>Placement Rate</th>
                <th className="py-3.5 px-4 text-center">Avg Match Score</th>
                <th className="py-3.5 px-5 text-right">Skill Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredDistricts.map((d) => (
                <tr key={d.district} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white text-sm flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{d.district}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-semibold">{d.students.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-sky-400 font-semibold">{d.opportunities.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">{d.placed.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-white">{d.placementRate}%</span>
                      </div>
                      <LinearProgress 
                        variant="determinate" 
                        value={d.placementRate} 
                        sx={{ 
                          height: 4, 
                          borderRadius: 2, 
                          backgroundColor: 'rgba(51,65,85,0.5)', 
                          '& .MuiLinearProgress-bar': { backgroundColor: d.placementRate >= 40 ? '#10b981' : '#38bdf8' } 
                        }} 
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-black text-amber-400">
                    {d.avgMatchScore}%
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      d.skillGap === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {d.skillGap} Gap
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. Recently Generated Reports Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-extrabold text-white">
              Recently Generated Reports
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Historical log of compiled administrative intelligence reports</p>
          </div>
          <Badge variant="neutral" size="sm">{recentReports.length} Archives</Badge>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Report Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Generated By</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Records</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {recentReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-bold text-white">{rep.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">{rep.type}</td>
                  <td className="py-3.5 px-4 text-slate-400">{rep.generatedBy}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{rep.date}</td>
                  <td className="py-3.5 px-4 font-semibold text-sky-400">{rep.records}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      <Check className="w-2.5 h-2.5" />
                      <span>Ready</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleExportPDF(rep.name)}
                        className="p-1.5 bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-700 rounded-md transition-colors cursor-pointer"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleExportCSV(rep.name)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 rounded-md font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        CSV
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 9. Modal: Generate Report Flow */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Compile Intelligence Report
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {generating ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                <h4 className="font-bold text-white text-sm">Synthesizing Rajasthan Dataset...</h4>
                <p className="text-slate-400 text-xs">Extracting cross-district talent metrics and corporate demand streams.</p>
              </div>
            ) : generatedReportResult ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-1 text-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto mb-1" />
                  <h4 className="font-extrabold text-white text-sm">✓ Report Generated Successfully</h4>
                  <p className="text-xs text-slate-300">{generatedReportResult.name}</p>
                  <span className="text-[11px] text-slate-400 block font-mono">{generatedReportResult.records} • {generatedReportResult.date}</span>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                  <button
                    onClick={() => handleExportPDF(generatedReportResult.name)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 rounded-xl font-bold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={() => handleExportCSV(generatedReportResult.name)}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-black flex items-center space-x-1.5 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Selected Module</label>
                  <div className="p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-semibold">
                    {selectedCategory?.title || 'Statewide Employment Report'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Territory Scope</label>
                    <select
                      value={modalDistrict}
                      onChange={(e) => setModalDistrict(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="All Rajasthan">All Rajasthan (8 Key Clusters)</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Jodhpur">Jodhpur</option>
                      <option value="Kota">Kota</option>
                      <option value="Udaipur">Udaipur</option>
                      <option value="Ajmer">Ajmer</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Date Period</label>
                    <select
                      value={modalDateRange}
                      onChange={(e) => setModalDateRange(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option value="Quarter 3 (2026)">Current Quarter</option>
                      <option value="Financial Year 2025-26">FY 2025-26</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="font-bold text-slate-300 block">Report Inclusions:</span>
                  
                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeCharts}
                      onChange={(e) => setIncludeCharts(e.target.checked)}
                      className="accent-amber-400"
                    />
                    <span>Include Analytical Visualizations & Charts</span>
                  </label>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeStudentData}
                      onChange={(e) => setIncludeStudentData(e.target.checked)}
                      className="accent-amber-400"
                    />
                    <span>Include Student Roster & Verification Audit</span>
                  </label>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeOpportunityData}
                      onChange={(e) => setIncludeOpportunityData(e.target.checked)}
                      className="accent-amber-400"
                    />
                    <span>Include Corporate Opportunity Requisitions</span>
                  </label>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSkillGap}
                      onChange={(e) => setIncludeSkillGap(e.target.checked)}
                      className="accent-amber-400"
                    />
                    <span>Include Skill Demand Deficit Analysis</span>
                  </label>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2.5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteGenerate}
                    className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-black shadow cursor-pointer"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
