import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Download,
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
  Cell
} from 'recharts';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const PlacementAnalytics = () => {
  const [funnel, setFunnel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    governmentApi.getPlacements()
      .then(res => setFunnel(res.data || []))
      .catch(err => toast.error("Failed to load placement funnel"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SkeletonLoader count={3} />;
  }

  const chartData = funnel.map((item, idx) => ({
    stage: item.stage,
    count: item.count,
    dropRate: item.dropRate,
    fill: idx === 0 ? '#38bdf8' : idx === 1 ? '#0ea5e9' : idx === 2 ? '#6366f1' : idx === 3 ? '#8b5cf6' : idx === 4 ? '#f59e0b' : '#10b981'
  }));

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Statewide Placement Conversion Funnel
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Stage-by-stage progression from initial candidate application to verified corporate joining.
          </p>
        </div>

        <button
          onClick={() => toast.success("Exported State Placement Funnel (CSV)")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-amber-400 text-xs font-semibold rounded-md border border-slate-800 flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Funnel</span>
        </button>
      </div>

      {/* Funnel Bar Chart */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white tracking-tight">
            State Application-to-Joined Volume Distribution
          </h3>
          <Badge variant="saffron" size="sm">48,600 Total Pipeline Candidates</Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stage Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {funnel.map((item, idx) => (
          <div key={item.stage} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="w-5 h-5 rounded bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                {idx + 1}
              </span>
              {item.dropRate !== "0%" && (
                <span className="text-[10px] text-rose-400 font-semibold">
                  {item.dropRate} Drop
                </span>
              )}
            </div>

            <h4 className="text-xs font-semibold text-slate-300 truncate">{item.stage}</h4>
            <span className="text-xl font-bold text-white block">
              {item.count?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
