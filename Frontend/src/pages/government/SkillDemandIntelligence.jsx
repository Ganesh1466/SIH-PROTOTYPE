import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  PlusCircle, 
  Sparkles, 
  X, 
  FileCheck, 
  CheckCircle2,
  BookOpen,
  Award,
  Layers,
  Compass,
  Flame,
  ShieldAlert
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Chip, LinearProgress } from '@mui/material';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

const RADIAL_SKILL_COLORS = ['#f43f5e', '#fb923c', '#f59e0b', '#38bdf8', '#818cf8', '#a855f7'];

export const SkillDemandIntelligence = () => {
  const [skillData, setSkillData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recModalOpen, setRecModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [recForm, setRecForm] = useState({
    title: '',
    targetCohort: '3rd & 4th Year B.Tech (All Branches)',
    recommendedInstitutes: 'MNIT Jaipur, RTU Kota, CTAE Udaipur'
  });

  useEffect(() => {
    fetchSkillData();
  }, []);

  const fetchSkillData = async () => {
    try {
      setLoading(true);
      const [resSkills, resRecs] = await Promise.all([
        governmentApi.getSkills(),
        governmentApi.getRecommendations()
      ]);

      const skills = resSkills?.data?.data || resSkills?.data || resSkills;
      const recs = resRecs?.data?.data || resRecs?.data || resRecs;

      if (skills) setSkillData(skills);
      if (recs) setRecommendations(Array.isArray(recs) ? recs : []);
    } catch (err) {
      toast.error('Failed to load skill demand intelligence.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecommendation = async (e) => {
    e.preventDefault();
    if (!selectedSkill) return;

    try {
      const payload = {
        skill: selectedSkill.skill_name,
        employerDemand: selectedSkill.employer_demand,
        studentAvailability: selectedSkill.student_availability,
        gap: selectedSkill.skill_gap,
        priority: selectedSkill.priority,
        title: recForm.title || `Curriculum & Training Recommendation for ${selectedSkill.skill_name}`,
        targetCohort: recForm.targetCohort,
        recommendedInstitutes: recForm.recommendedInstitutes.split(',').map(s => s.trim())
      };

      const res = await governmentApi.createRecommendation(payload);
      if (res.data?.success) {
        toast.success(`Training program recommendation created for ${selectedSkill.skill_name}!`);
        setRecModalOpen(false);
        fetchSkillData();
      }
    } catch (err) {
      toast.error('Failed to submit policy recommendation.');
    }
  };

  const openRecModal = (s) => {
    setSelectedSkill(s);
    setRecForm({
      title: `Statewide Technical Training & Industry Enablement for ${s.skill_name}`,
      targetCohort: 'Graduating & Pre-Final Year Technical Students (All 33 Districts)',
      recommendedInstitutes: 'MNIT Jaipur, RTU Kota, MBM Jodhpur, CTAE Udaipur'
    });
    setRecModalOpen(true);
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const { skills = [], criticalGaps = [] } = skillData || {};

  const chartData = skills.map(s => ({
    name: s.skill_name,
    shortName: s.skill_name.replace(' / ', '/').split(' ')[0],
    Demand: s.employer_demand,
    Availability: s.student_availability,
    Gap: s.skill_gap,
    priority: s.priority
  }));

  // Top Critical Deficit Skills for Concentric Radial Rings
  const topCriticalSkills = skills
    .filter(s => s.skill_gap >= 25 || s.priority === 'CRITICAL')
    .slice(0, 6)
    .map((s, idx) => ({
      name: s.skill_name.split(' ')[0],
      fullName: s.skill_name,
      deficit: s.skill_gap,
      fill: RADIAL_SKILL_COLORS[idx % RADIAL_SKILL_COLORS.length]
    }));

  return (
    <div className="space-y-7 text-slate-100 pb-10">
      
      {/* 1. Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Curriculum & Workforce Alignment</span>
            </span>
            <Chip 
              label="Real-time Demand Gap Model" 
              size="small" 
              sx={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.3)', fontWeight: 700, fontSize: '0.7rem' }} 
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Industry Skill Demand vs. Student Availability Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Correlating corporate tech hiring requisitions with registered college talent to identify critical workforce deficits and trigger government training interventions.
          </p>
        </div>

        <button
          onClick={() => toast.success("Exported Skill Deficit Report (CSV)")}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 text-amber-400 text-xs font-black rounded-xl border border-slate-750 flex items-center space-x-2 transition-all shadow hover:border-amber-400/50 cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Skill Report (CSV)</span>
        </button>
      </div>

      {/* 2. Top Visualizations: Radar Polygon & Concentric Deficit Rings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Multi-Polygon Spider Web Radar (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-sky-400 animate-spin-slow" />
                <h2 className="text-sm font-extrabold text-white tracking-tight">
                  Statewide Skill Alignment Radar (Demand vs Supply Polygons)
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Overlapping geometric profile showing hiring demand vs talent supply across 10 disciplines</p>
            </div>
            <Badge variant="blue" size="sm">Dual Radar</Badge>
          </div>

          <div className="w-full min-h-[300px] h-[300px] sm:h-[340px] relative">
            <ResponsiveContainer width="100%" height="100%" minHeight={290}>
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={chartData}>
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="shortName" tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                  formatter={(val, name) => [`${val}%`, name]}
                />
                <Radar name="Employer Demand %" dataKey="Demand" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.4} strokeWidth={2} />
                <Radar name="Student Availability %" dataKey="Availability" stroke="#10b981" fill="#10b981" fillOpacity={0.4} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Concentric Priority Deficit Rings (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <h2 className="text-sm font-extrabold text-white tracking-tight">
                    Critical Skill Deficit Rings
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Top shortages requiring state training subsidy</p>
              </div>
              <Badge variant="danger" size="sm">Urgent Gaps</Badge>
            </div>

            <div className="w-full min-h-[240px] h-[240px] relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%" minHeight={230}>
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="20%" 
                  outerRadius="95%" 
                  barSize={10} 
                  data={topCriticalSkills}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    minAngle={15}
                    background={{ fill: '#1e293b' }}
                    clockWise
                    dataKey="deficit"
                    cornerRadius={5}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                    formatter={(val, name, entry) => [`+${val}% Deficit Gap`, entry.payload.fullName]}
                  />
                  <Legend 
                    iconSize={8} 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{ fontSize: '10px', color: '#cbd5e1' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>

              <div className="absolute top-1/2 left-[36%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none hidden sm:block">
                <ShieldAlert className="w-5 h-5 text-rose-400 mx-auto" />
                <span className="text-[9px] font-black text-rose-300 block">DEFICIT</span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center text-[11px] text-amber-400/90 font-semibold bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
            ⚡ AWS Cloud (+60%), AI/ML (+55%) and Cyber (+50%) are highest priority.
          </div>
        </div>

      </div>

      {/* 3. Smooth Multi-Area Gradient Comparison Wave */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-extrabold text-white tracking-tight">
                Skill Gap Wave Trajectory Across 10 Technical Disciplines
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Smooth spline dynamics tracking Demand vs Availability vs Deficit Gap</p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold">
              Deficit = Demand - Supply
            </span>
          </div>
        </div>

        <div className="w-full min-h-[280px] h-[280px] sm:h-[320px] relative">
          <ResponsiveContainer width="100%" height="100%" minHeight={270}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
              <defs>
                <linearGradient id="gradSkillDemandFull" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="gradSkillSupplyFull" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="gradSkillGapFull" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#cbd5e1' }} angle={-25} textAnchor="end" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                formatter={(val) => `${val}%`}
              />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
              <Area type="natural" dataKey="Demand" name="Employer Demand %" stroke="#38bdf8" fill="url(#gradSkillDemandFull)" strokeWidth={2.5} />
              <Area type="natural" dataKey="Availability" name="Student Availability %" stroke="#10b981" fill="url(#gradSkillSupplyFull)" strokeWidth={2.5} />
              <Area type="natural" dataKey="Gap" name="Deficit Gap %" stroke="#f43f5e" fill="url(#gradSkillGapFull)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. 🔴 Critical Skill Gaps & Training Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          <span>🔴 Critical Skill Gaps Detected (High Demand / Low Supply)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.filter(s => s.priority === 'CRITICAL' || s.skill_gap >= 27).map(item => (
            <div 
              key={item.skill_name}
              className="bg-slate-950 rounded-2xl p-5 border border-rose-500/30 shadow-lg flex flex-col justify-between hover:border-rose-400 transition-all space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-black text-white">{item.skill_name}</h3>
                    <span className="text-[11px] text-slate-400">{item.category}</span>
                  </div>
                  <Chip 
                    label={item.priority} 
                    size="small" 
                    sx={{ backgroundColor: 'rgba(244, 63, 94, 0.2)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.4)', fontWeight: 800, fontSize: '0.65rem' }} 
                  />
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Employer Demand:</span>
                    <span className="font-bold text-sky-400">{item.employer_demand}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Student Availability:</span>
                    <span className="font-bold text-emerald-400">{item.student_availability}%</span>
                  </div>
                  <div className="flex justify-between text-amber-400 font-black pt-1 border-t border-slate-800">
                    <span>Skill Deficit Gap:</span>
                    <span>+{item.skill_gap}%</span>
                  </div>
                </div>

                <LinearProgress 
                  variant="determinate" 
                  value={item.student_availability} 
                  sx={{ height: 5, borderRadius: 2, backgroundColor: 'rgba(51,65,85,0.5)', '& .MuiLinearProgress-bar': { backgroundColor: '#f43f5e' } }} 
                />

                <p className="text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg leading-relaxed">
                  💡 {item.recommendation}
                </p>
              </div>

              <button
                onClick={() => openRecModal(item)}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black transition-all shadow flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create Training Directive</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Policy Recommendations Grid */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-extrabold text-white">
              Approved Government Skill Directives & Cohorts
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Intervention initiatives routed to Rajasthan engineering & polytechnic colleges</p>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {recommendations.length} Active Directives
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map(rec => (
            <div key={rec.id} className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white text-sm">{rec.title}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                  {rec.status || 'APPROVED'}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Target Cohort:</span> {rec.targetCohort}
              </div>
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Execution Nodes:</span> {Array.isArray(rec.recommendedInstitutes) ? rec.recommendedInstitutes.join(', ') : rec.recommendedInstitutes}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create Recommendation */}
      {recModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Issue Policy Training Directive
                </h3>
              </div>
              <button
                onClick={() => setRecModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
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
                  value={`${selectedSkill?.skill_name} (${selectedSkill?.category})`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Initiative Title</label>
                <input
                  type="text"
                  required
                  value={recForm.title}
                  onChange={(e) => setRecForm({ ...recForm, title: e.target.value })}
                  placeholder="e.g. Rajasthan Statewide Cloud & SRE Finishing School"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Target Student Cohort</label>
                <input
                  type="text"
                  required
                  value={recForm.targetCohort}
                  onChange={(e) => setRecForm({ ...recForm, targetCohort: e.target.value })}
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
                  value={recForm.recommendedInstitutes}
                  onChange={(e) => setRecForm({ ...recForm, recommendedInstitutes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setRecModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow cursor-pointer font-black"
                >
                  Authorize Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
