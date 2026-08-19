import React from 'react';
import { 
  ShieldCheck, 
  Save, 
  Clock, 
  Eye, 
  Edit3, 
  Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfileHeader = ({ 
  completion = 0, 
  updatedAt, 
  isEditMode, 
  setIsEditMode, 
  onSave, 
  isSaving 
}) => {
  const formattedDate = updatedAt 
    ? new Date(updatedAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : 'Not yet saved';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-5 bg-gradient-to-r from-[#0B1024] to-[#0F1630]"
    >
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-heading">
            Student Career Passport
          </h1>
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold shadow-md">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            <span>Technical Directorate Verified Profile</span>
          </span>
        </div>

        <p className="text-xs text-slate-300 max-w-xl leading-relaxed font-medium">
          Build your verified digital career identity. This structured passport directly drives our 7-factor explainable algorithm for institutional placements.
        </p>

        <div className="flex items-center space-x-3 text-xs text-slate-400 pt-1">
          <span className="flex items-center space-x-1 font-metrics">
            <Clock className="w-3.5 h-3.5 text-pink-400" />
            <span>Last synced: <strong className="text-white">{formattedDate}</strong></span>
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        {/* Profile Completion Gauge */}
        <div className="bg-slate-950/80 p-3 px-4 rounded-2xl border border-white/10 flex items-center space-x-3 shadow-inner">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                strokeDasharray={`${completion}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-white font-metrics">{completion}%</span>
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Passport Strength</span>
            <span className="text-xs font-bold text-white">
              {completion >= 80 ? 'Market Ready' : completion >= 50 ? 'Intermediate' : 'Needs Completion'}
            </span>
          </div>
        </div>

        {/* Mode Toggle & Save CTA */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className="btn-pink-outline flex-1 sm:flex-none justify-center px-4 py-2.5 text-xs flex items-center space-x-1.5 cursor-pointer text-center"
          >
            {isEditMode ? (
              <>
                <Eye className="w-4 h-4 text-pink-400" />
                <span>View Passport</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 text-pink-400" />
                <span>Edit Profile</span>
              </>
            )}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="btn-pink-gradient flex-1 sm:flex-none justify-center px-4 py-2.5 text-xs shadow-md flex items-center space-x-1.5 cursor-pointer text-center"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          )}
        </div>

      </div>

    </motion.div>
  );
};
