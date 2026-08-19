import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { Badge } from './Badge';
import { motion, AnimatePresence } from 'framer-motion';

export const ExplainableMatchModal = ({ isOpen, onClose, matchData, job, onApply, applying = false, alreadyApplied = false }) => {
  if (!isOpen || !matchData) return null;

  const {
    matchScore = 0,
    level = "Strong Match",
    reasons = [],
    matchedSkills = [],
    missingSkills = [],
    matchedPreferredSkills = [],
    missingPreferredSkills = [],
    breakdown = {},
    eligible = true
  } = matchData;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[95vw] sm:max-w-3xl glass-card-elevated rounded-2xl shadow-2xl border border-white/15 overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
        >
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-start justify-between bg-slate-900/60 gap-2 shrink-0">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Explainable AI Fit Analysis
                </span>
                <span className="text-slate-600 hidden xs:inline">·</span>
                <span className="text-xs text-slate-400 font-medium truncate max-w-[160px] sm:max-w-none">{job?.companyName}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-heading tracking-tight truncate">
                {job?.title || "Role Match Fit"}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
                {job?.location} · {job?.workMode} · {job?.salary || job?.stipend}
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="text-right">
                <div className="flex items-center justify-end space-x-1">
                  <span className="text-xl sm:text-2xl font-black text-pink-400 font-metrics tracking-tight">{matchScore}%</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 block -mt-1">{level}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer ml-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1 text-slate-200">

            {/* Core Match Factors */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Why this opportunity matches your profile
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {reasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs font-medium text-slate-200 p-3 bg-slate-900/60 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skill Alignment */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Technical Skill Alignment
              </h4>

              {/* Required Skills */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">Mandatory Skills (45% Weight)</span>
                  <span className="text-slate-400 font-medium">
                    {matchedSkills.length} of {matchedSkills.length + missingSkills.length} Matched
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matchedSkills.map(skill => (
                    <Badge key={skill} variant="success" size="md">
                      ✓ {skill}
                    </Badge>
                  ))}
                  {missingSkills.map(skill => (
                    <Badge key={skill} variant="gap" size="md">
                      ⚠ {skill} (Missing)
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Preferred Skills */}
              {(matchedPreferredSkills.length > 0 || missingPreferredSkills.length > 0) && (
                <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Preferred Skills (10% Weight)</span>
                    <span className="text-slate-400 font-medium">
                      {matchedPreferredSkills.length} Matched
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {matchedPreferredSkills.map(skill => (
                      <Badge key={skill} variant="blue" size="md">
                        ✓ {skill}
                      </Badge>
                    ))}
                    {missingPreferredSkills.map(skill => (
                      <Badge key={skill} variant="default" size="md">
                        ○ {skill} (Not in Profile)
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 7-Factor Weighted Breakdown Bars */}
            {breakdown && Object.keys(breakdown).length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Transparent Multi-Factor Scoring Weightage
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries(breakdown).map(([key, item]) => {
                    const percentage = Math.round((item.score / item.max) * 100);
                    return (
                      <div key={key} className="p-3 bg-slate-900/60 rounded-xl border border-white/10 space-y-1.5">
                        <div className="flex justify-between text-xs font-medium text-slate-300">
                          <span>{item.label}</span>
                          <span className="font-bold text-white">{item.score} / {item.max}</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              percentage >= 80 ? 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]' : percentage >= 50 ? 'bg-indigo-500' : 'bg-amber-400'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Skill Gap Alert */}
            {missingSkills.length > 0 && (
              <div className="p-3.5 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-200 flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  You meet all mandatory academic requirements to apply. Closing your skill gap in <strong className="font-bold text-white">{missingSkills.join(', ')}</strong> will improve interview shortlisting odds.
                </p>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 px-4 sm:px-6 bg-slate-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-slate-400 w-full sm:w-auto text-center sm:text-left">
              {eligible ? (
                <span className="text-emerald-400 font-semibold inline-flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 inline shrink-0" />
                  <span>Prerequisites satisfied</span>
                </span>
              ) : (
                <span className="text-rose-400 font-semibold">
                  Academic criteria not fully met
                </span>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-colors cursor-pointer text-center"
              >
                Close
              </button>
              {onApply && (
                <button
                  disabled={applying || alreadyApplied}
                  onClick={onApply}
                  className={`flex-1 sm:flex-none px-5 py-2 text-xs font-bold rounded-xl transition-all text-center ${
                    alreadyApplied 
                      ? 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
                      : 'btn-pink-gradient cursor-pointer'
                  }`}
                >
                  {alreadyApplied ? '✓ Submitted' : applying ? 'Submitting...' : 'Apply with AI Fit Score'}
                </button>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
