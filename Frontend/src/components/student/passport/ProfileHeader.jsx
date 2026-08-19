import React from 'react';
import { 
  ShieldCheck, 
  Save, 
  Clock, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const ProfileHeader = ({ 
  completion = 0, 
  updatedAt, 
  isEditMode, 
  setIsEditMode, 
  onSave, 
  isSaving,
  isDirty 
}) => {
  const formattedDate = updatedAt 
    ? new Date(updatedAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Not yet saved';

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E9EE] shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
      
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Student Career Passport
          </h1>
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Technical Directorate Verified Profile</span>
          </span>
        </div>

        <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
          Build your verified digital career identity. This structured passport directly drives our 7-factor explainable algorithm for institutional placements and corporate requisitions.
        </p>

        <div className="flex items-center space-x-3 text-xs text-slate-400 pt-1">
          <span className="flex items-center space-x-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Last saved: <strong className="text-slate-600">{formattedDate}</strong></span>
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        {/* Profile Completion Gauge */}
        <div className="bg-slate-50 p-3 px-4 rounded-xl border border-slate-200 flex items-center space-x-3">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={completion >= 80 ? "text-emerald-600" : completion >= 50 ? "text-indigo-600" : "text-amber-500"}
                strokeDasharray={`${completion}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-slate-900">{completion}%</span>
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Passport Strength</span>
            <span className="text-xs font-bold text-slate-800">
              {completion >= 80 ? 'Market Ready' : completion >= 50 ? 'Intermediate' : 'Needs Completion'}
            </span>
          </div>
        </div>

        {/* Mode Toggle & Save CTA */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className="flex-1 sm:flex-none justify-center px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors flex items-center space-x-1.5 cursor-pointer text-center"
          >
            {isEditMode ? (
              <>
                <Eye className="w-4 h-4 text-slate-500" />
                <span>View Passport</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 text-slate-500" />
                <span>Edit Profile</span>
              </>
            )}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="flex-1 sm:flex-none justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer text-center"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
