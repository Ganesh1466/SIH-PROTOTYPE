import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Download
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend
} from 'recharts';
import toast from 'react-hot-toast';

const MONTHLY_TREND = [
  { month: 'Jan', applications: 42, shortlisted: 9, interviews: 4, joined: 1 },
  { month: 'Feb', applications: 58, shortlisted: 13, interviews: 6, joined: 2 },
  { month: 'Mar', applications: 65, shortlisted: 16, interviews: 7, joined: 2 },
  { month: 'Apr', applications: 74, shortlisted: 19, interviews: 9, joined: 3 },
  { month: 'May', applications: 82, shortlisted: 14, interviews: 8, joined: 2 },
  { month: 'Jun', applications: 56, shortlisted: 10, interviews: 5, joined: 2 },
  { month: 'Jul', applications: 61, shortlisted: 8, interviews: 4, joined: 1 },
  { month: 'Aug', applications: 48, shortlisted: 5, interviews: 3, joined: 1 }
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

      {/* Hiring Trend Curve */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Monthly Hiring Performance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Candidate movement across the recruitment pipeline over the current cycle.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500" />Applications</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" />Interviews</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Joined</span>
          </div>
        </div>

        <div className="w-full min-h-[280px] h-[280px] sm:h-[320px] relative">
          <ResponsiveContainer width="100%" height={280} minHeight={260}>
            <AreaChart data={MONTHLY_TREND} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="employerApplicationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.24} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="employerInterviewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="employerJoinedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={34} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                labelStyle={{ color: '#cbd5e1', fontWeight: 700, marginBottom: 4 }}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', paddingBottom: '12px' }} />
              <Area type="monotone" dataKey="applications" name="Applications" stroke="#0284c7" fill="url(#employerApplicationsGradient)" strokeWidth={2.5} dot={{ r: 2.5, fill: '#0284c7' }} activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="shortlisted" name="Shortlisted" stroke="#0ea5e9" fill="none" strokeWidth={2} strokeDasharray="5 4" dot={false} />
              <Area type="monotone" dataKey="interviews" name="Interviews" stroke="#6366f1" fill="url(#employerInterviewsGradient)" strokeWidth={2.5} dot={{ r: 2.5, fill: '#6366f1' }} activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="joined" name="Joined" stroke="#10b981" fill="url(#employerJoinedGradient)" strokeWidth={2.5} dot={{ r: 2.5, fill: '#10b981' }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
