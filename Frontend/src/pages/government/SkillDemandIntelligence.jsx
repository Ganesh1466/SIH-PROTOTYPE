import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  BarChart3, 
  ShieldCheck, 
  Download
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    governmentApi.getSkills()
      .then(res => setSkillData(res.data))
      .catch(err => toast.error("Failed to load skill intelligence"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const { skills = [], analysisSummary } = skillData || {};

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Skill Demand vs. Talent Supply Intelligence
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            Correlating corporate tech hiring requisitions with registered college talent to identify critical workforce deficits.
          </p>
        </div>

        <button
          onClick={() => toast.success("Exported Skill Gap Intelligence Report (PDF)")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-amber-400 text-xs font-semibold rounded-md border border-slate-800 flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Demand vs Supply Chart */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white tracking-tight">
            Industry Job Requisitions vs Verified College Talent Pool
          </h3>
          <Badge variant="saffron" size="sm">5 Core Tech Domains</Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skills} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="skill" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="demandCount" name="Industry Demand" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="availableTalent" name="Available Students" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Structured Deficit Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">
            Comprehensive Skill Demand & Deficit Ledger
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-5">Domain / Skill</th>
                <th className="py-3 px-4">Market Demand</th>
                <th className="py-3 px-4">Available Talent</th>
                <th className="py-3 px-4">Supply Gap</th>
                <th className="py-3 px-4">Share of Total Demand</th>
                <th className="py-3 px-5 text-right">Intervention Urgency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {skills.map((item) => (
                <tr key={item.skill} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white">
                    {item.skill}
                  </td>
                  <td className="py-3.5 px-4 text-sky-400 font-semibold">
                    {item.demandCount?.toLocaleString()} Positions
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">
                    {item.availableTalent?.toLocaleString()} Students
                  </td>
                  <td className="py-3.5 px-4 font-bold text-rose-400">
                    -{item.gap?.toLocaleString()} Deficit
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {item.percentageDemand}%
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.priority.includes('Critical') ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      item.priority.includes('High') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {item.priority}
                    </span>
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
