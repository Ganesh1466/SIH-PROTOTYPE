import React from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Database, 
  Server, 
  Key, 
  Sliders, 
  CheckCircle2, 
  Info,
  Layers,
  Lock
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const GovernmentSettings = () => {
  return (
    <div className="space-y-6 text-slate-100 pb-10">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Governance Architecture Configuration</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            System Settings & Administrative Thresholds
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure state matching engines, verification gates, and database synchronization pipelines.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Core System Active (SIH 1632)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Verification & Compliance Rules */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h2 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>State Governance Thresholds</span>
            </h2>
            <p className="text-xs text-slate-400">Rules applied during opportunity approval and candidate matching</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">Employer Verification Requirement</span>
                <span className="text-slate-400 text-[11px]">Only VERIFIED recruiters can publish job posts</span>
              </div>
              <span className="px-2 py-0.5 rounded font-black text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ENFORCED
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">Minimum Match Score for Direct Apply</span>
                <span className="text-slate-400 text-[11px]">Submissions blocked below threshold</span>
              </div>
              <span className="font-mono font-bold text-amber-400 text-sm">86.0%</span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">Skill Gap Alert Sensitivity</span>
                <span className="text-slate-400 text-[11px]">Flag as CRITICAL when Gap ≥ 27%</span>
              </div>
              <span className="font-mono font-bold text-rose-400 text-sm">27% Deficit</span>
            </div>
          </div>
        </div>

        {/* Database & Infrastructure Info */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h2 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <Database className="w-4 h-4 text-sky-400" />
              <span>Database & Cloud Architecture</span>
            </h2>
            <p className="text-xs text-slate-400">PostgreSQL persistence and sync connectivity</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">PostgreSQL Engine:</span>
              <div className="font-mono text-emerald-400 font-bold">Supabase PostgreSQL 15 (Active)</div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Analytics Data Stores:</span>
              <div className="font-mono text-slate-300">
                government_district_analytics • government_skill_analytics • government_funnel_analytics
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Data Synchronization Mode:</span>
              <div className="font-mono text-amber-300 font-semibold">Dual Read (Supabase Cloud + Real-Time Sync Fallback)</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
