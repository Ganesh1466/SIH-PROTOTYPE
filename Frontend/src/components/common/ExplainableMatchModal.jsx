import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Briefcase, 
  MapPin, 
  Compass, 
  GraduationCap
} from 'lucide-react';
import { Badge } from './Badge';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-[95vw] sm:max-w-3xl bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col">
        
        {/* Clean Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/50 gap-2 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-700">
                Explainable Fit Analysis
              </span>
              <span className="text-slate-300 hidden xs:inline">·</span>
              <span className="text-xs text-slate-500 font-medium truncate max-w-[160px] sm:max-w-none">{job?.companyName}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">
              {job?.title || "Role Match Fit"}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
              {job?.location} · {job?.workMode} · {job?.salary || job?.stipend}
            </p>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div className="text-right">
              <div className="flex items-center justify-end space-x-1">
                <span className="text-xl sm:text-2xl font-bold text-indigo-600">{matchScore}%</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block -mt-1">{level}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2-Column Structured Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1">

          {/* Core Match Factors: Why this job matches you */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Why this opportunity matches your profile
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs font-medium text-slate-700 p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Comparison Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Technical Skill Alignment
            </h4>

            {/* Required Skills */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/70 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Mandatory Skills (45% Weight)</span>
                <span className="text-slate-500 font-medium">
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
              <div className="p-4 bg-slate-50/60 rounded-lg border border-slate-200/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Preferred Skills (10% Weight)</span>
                  <span className="text-slate-500 font-medium">
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
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Transparent Multi-Factor Scoring Weightage
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(breakdown).map(([key, item]) => {
                  const percentage = Math.round((item.score / item.max) * 100);
                  return (
                    <div key={key} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                      <div className="flex justify-between text-xs font-medium text-slate-700">
                        <span>{item.label}</span>
                        <span className="font-semibold text-slate-900">{item.score} / {item.max}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-indigo-500' : 'bg-amber-400'
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

          {/* Skill Gap Note if missing */}
          {missingSkills.length > 0 && (
            <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                You meet all mandatory academic requirements to apply. Closing your skill gap in <strong className="font-semibold">{missingSkills.join(', ')}</strong> will improve interview shortlisting odds.
              </p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 px-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 w-full sm:w-auto text-center sm:text-left">
            {eligible ? (
              <span className="text-emerald-700 font-medium inline-flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                <span>Prerequisites satisfied</span>
              </span>
            ) : (
              <span className="text-rose-700 font-medium">
                Academic criteria not fully met
              </span>
            )}
          </div>

          <div className="flex items-center justify-end space-x-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer text-center"
            >
              Close
            </button>
            {onApply && (
              <button
                disabled={applying || alreadyApplied}
                onClick={onApply}
                className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg text-white transition-all shadow-xs text-center ${
                  alreadyApplied 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer active:scale-98'
                }`}
              >
                {alreadyApplied ? '✓ Submitted' : applying ? 'Submitting...' : 'Apply with Fit Score'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
