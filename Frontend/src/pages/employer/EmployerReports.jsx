import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  PieChart as PieIcon,
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
import { Badge } from '../../components/common/Badge';
import toast from 'react-hot-toast';

const FUNNEL_DATA = [
  { stage: 'Applications', count: 486, fill: '#0284c7' },
  { stage: 'Review', count: 210, fill: '#0ea5e9' },
  { stage: 'Shortlist', count: 74, fill: '#38bdf8' },
  { stage: 'Interview', count: 28, fill: '#6366f1' },
  { stage: 'Selected', count: 16, fill: '#10b981' },
  { stage: 'Joined', count: 12, fill: '#059669' }
];

export const EmployerReports = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Recruiter Analytics & Hiring Funnel
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Recruitment conversion efficiency and candidate sourcing performance.
          </p>
        </div>

        <button
          onClick={() => toast.success("Exported recruitment summary spreadsheet (CSV)")}
          className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-md border border-slate-200 flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Funnel Chart Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Application-to-Joined Conversion Progression
          </h3>
          <Badge variant="blue" size="sm">486 Total Applicants</Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={FUNNEL_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {FUNNEL_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
