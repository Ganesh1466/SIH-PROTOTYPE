import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Building2, 
  BarChart3,
  Filter,
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
  Cell
} from 'recharts';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const DistrictIntelligence = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    governmentApi.getDistricts()
      .then(res => setDistricts(res.data || []))
      .catch(err => toast.error("Failed to load district metrics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SkeletonLoader count={3} />;
  }

  const chartData = districts.map(d => ({
    name: d.name,
    rate: d.placementRate,
    placed: d.placedStudents,
    registered: d.registeredStudents
  }));

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Rajasthan District Employment Intelligence
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Regional placement ratios, technical student density, and compensation tiers across 33 districts.
          </p>
        </div>

        <button
          onClick={() => toast.success("Exported district intelligence breakdown (CSV)")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-amber-400 text-xs font-semibold rounded-md border border-slate-800 flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Data</span>
        </button>
      </div>

      {/* District Placement Chart */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white tracking-tight">
            District Placement Comparison (% Placed)
          </h3>
          <span className="text-xs text-slate-400">Target Benchmark: 75%</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
              />
              <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.rate >= 80 ? '#10b981' : entry.rate >= 70 ? '#f59e0b' : '#f43f5e'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* District Intelligence Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">
            Regional Technical Education Directory
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-5">District Name</th>
                <th className="py-3 px-4">Placement Rate</th>
                <th className="py-3 px-4">Registered Students</th>
                <th className="py-3 px-4">Placed Candidates</th>
                <th className="py-3 px-4">Institutes & Nodes</th>
                <th className="py-3 px-5 text-right">Avg Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {districts.map((d, idx) => (
                <tr key={d.name} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white">
                    {d.name}
                  </td>
                  
                  <td className="py-3.5 px-4 font-bold text-amber-400">
                    {d.placementRate}%
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    {d.registeredStudents?.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">
                    {d.placedStudents?.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    {d.collegesCount} Campus Nodes
                  </td>

                  <td className="py-3.5 px-5 text-right text-amber-300 font-semibold">
                    ₹{d.avgSalaryLPA} LPA
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
