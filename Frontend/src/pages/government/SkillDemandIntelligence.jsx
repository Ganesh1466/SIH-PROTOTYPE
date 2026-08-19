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
  Layers
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

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
    Demand: s.employer_demand,
    Availability: s.student_availability,
    Gap: s.skill_gap,
    priority: s.priority
  }));

  return (
    <div className="space-y-7 text-slate-100 pb-10">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4" />
            <span>Curriculum & Workforce Alignment</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Industry Skill Demand vs. Student Availability Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 max-w-3xl">
            Correlating corporate tech hiring requisitions with registered college talent to identify critical workforce deficits and trigger government training interventions.
          </p>
        </div>

        <button
          onClick={() => toast.success("Exported Skill Deficit Report (CSV)")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-amber-400 text-xs font-bold rounded-lg border border-slate-800 flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Skill Report</span>
        </button>
      </div>

      {/* Demand vs Availability Recharts Graph */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-extrabold text-white tracking-tight">
              Statewide Skill Deficit Comparison (10 Core Competencies)
            </h2>
            <p className="text-xs text-slate-400">Employer Demand % vs Student Availability % vs Supply Gap %</p>
          </div>
          <Badge variant="saffron" size="sm">Rajasthan Benchmark</Badge>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#cbd5e1' }} angle={-25} textAnchor="end" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                formatter={(val) => `${val}%`}
              />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
              <Bar dataKey="Demand" name="Employer Demand %" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Availability" name="Student Availability %" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Gap" name="Skill Gap %" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔴 Critical Skill Gaps & Training Recommendations */}
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
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {item.priority}
                  </span>
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
                    <span>{item.skill_gap}%</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {item.recommendation}
                </p>
              </div>

              <button
                onClick={() => openRecModal(item)}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Recommendation</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Skill Ledger Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800">
          <h2 className="text-sm font-extrabold text-white">
            Rajasthan 10-Skill Demand, Availability & Policy Intervention Ledger
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Skill / Framework</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Employer Demand</th>
                <th className="py-3.5 px-4">Student Supply</th>
                <th className="py-3.5 px-4">Skill Gap</th>
                <th className="py-3.5 px-4">Intervention Priority</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {skills.map((s) => (
                <tr key={s.skill_name} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-5 font-bold text-white text-sm">
                    {s.skill_name}
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    {s.category || 'Core'}
                  </td>
                  <td className="py-4 px-4 font-bold text-sky-400">
                    {s.employer_demand}%
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-400">
                    {s.student_availability}%
                  </td>
                  <td className="py-4 px-4 font-black text-rose-400">
                    {s.skill_gap}%
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      s.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      s.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {s.priority}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => openRecModal(s)}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 rounded-md font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      + Recommend Training
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Government Skill Development Initiatives */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-extrabold text-white tracking-tight">
              Active Government Training & Policy Recommendations
            </h2>
            <p className="text-xs text-slate-400">Approved curriculum tracks submitted to state universities & polytechnics</p>
          </div>
          <Badge variant="saffron" size="sm">{recommendations.length} Active Tracks</Badge>
        </div>

        <div className="space-y-3">
          {recommendations.map(rec => (
            <div key={rec.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black">
                    {rec.skill}
                  </span>
                  <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Target: <strong className="text-slate-300">{rec.targetCohort}</strong> • Nodal Hubs: <span className="text-slate-300">{Array.isArray(rec.recommendedInstitutes) ? rec.recommendedInstitutes.join(', ') : rec.recommendedInstitutes}</span>
                </p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {rec.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Recommendation Modal */}
      {recModalOpen && selectedSkill && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Policy Decision Portal</span>
                <h3 className="text-lg font-bold text-white">
                  State Training Program Recommendation: {selectedSkill.skill_name}
                </h3>
              </div>
              <button 
                onClick={() => setRecModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Skill:</span>
                <strong className="text-white">{selectedSkill.skill_name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Employer Demand:</span>
                <strong className="text-sky-400">{selectedSkill.employer_demand}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student Availability:</span>
                <strong className="text-emerald-400">{selectedSkill.student_availability}%</strong>
              </div>
              <div className="flex justify-between text-rose-400 font-bold">
                <span>Supply Deficit Gap:</span>
                <span>{selectedSkill.skill_gap}%</span>
              </div>
            </div>

            <form onSubmit={handleCreateRecommendation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Training Program Name
                </label>
                <input
                  type="text"
                  required
                  value={recForm.title}
                  onChange={(e) => setRecForm({ ...recForm, title: e.target.value })}
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
                  value={recForm.targetCohort}
                  onChange={(e) => setRecForm({ ...recForm, targetCohort: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nodal University Hubs (comma-separated)
                </label>
                <input
                  type="text"
                  required
                  value={recForm.recommendedInstitutes}
                  onChange={(e) => setRecForm({ ...recForm, recommendedInstitutes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setRecModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md flex items-center space-x-1.5"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Submit Recommendation</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
