import React from 'react';
import { 
  Download,
  Sparkles
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
import { motion } from 'framer-motion';

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
    <div className="space-y-6 font-sans text-slate-100 pb-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0B1730] via-[#0E1E40] to-[#0B1730]"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
            Recruiter Analytics & Hiring Funnel
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Recruitment conversion efficiency and candidate sourcing performance.
          </p>
        </div>

        <button
          onClick={() => toast.success("Exported recruitment summary spreadsheet (CSV)")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-bold rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center space-x-2 cursor-pointer shrink-0 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </motion.div>

      {/* Hiring Trend Curve */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-2xl space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-900/40">
          <div>
            <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Monthly Hiring Performance</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Candidate movement across the recruitment pipeline over the current cycle.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />Applications</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Interviews</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />Joined</span>
          </div>
        </div>

        <div className="w-full min-h-[300px] h-[300px] sm:h-[340px] relative">
          <ResponsiveContainer width="100%" height={300} minHeight={280}>
            <AreaChart data={MONTHLY_TREND} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="employerApplicationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="employerInterviewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="employerJoinedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={34} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1730', borderColor: 'rgba(59,130,246,0.3)', borderRadius: '12px', color: '#F8FAFC', fontSize: '11px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                labelStyle={{ color: '#60A5FA', fontWeight: 700, marginBottom: 4 }}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', paddingBottom: '12px' }} />
              <Area type="monotone" dataKey="applications" name="Applications" stroke="#3B82F6" fill="url(#employerApplicationsGradient)" strokeWidth={2.5} dot={{ r: 3, fill: '#3B82F6' }} activeDot={{ r: 6 }} />
              <Area type="monotone" dataKey="shortlisted" name="Shortlisted" stroke="#60A5FA" fill="none" strokeWidth={2} strokeDasharray="5 4" dot={false} />
              <Area type="monotone" dataKey="interviews" name="Interviews" stroke="#6366F1" fill="url(#employerInterviewsGradient)" strokeWidth={2.5} dot={{ r: 3, fill: '#6366F1' }} activeDot={{ r: 6 }} />
              <Area type="monotone" dataKey="joined" name="Joined" stroke="#10B981" fill="url(#employerJoinedGradient)" strokeWidth={2.5} dot={{ r: 3, fill: '#10B981' }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
};
