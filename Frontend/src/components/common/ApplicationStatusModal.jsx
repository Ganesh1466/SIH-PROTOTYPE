import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const ApplicationStatusModal = ({ isOpen, onClose, application, job }) => {
  if (!isOpen || (!application && !job)) return null;

  const currentStatus = application?.status || 'SHORTLISTED';
  const matchScore = application?.matchScore || job?.matchScore || 88;
  const companyName = application?.companyName || job?.companyName || 'TechNova Solutions';
  const jobTitle = application?.jobTitle || job?.title || 'Full Stack Developer';
  const appliedDate = application?.appliedDate ? new Date(application.appliedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently Applied';

  const stages = [
    {
      id: 'APPLIED',
      title: 'Application Submitted',
      description: 'Your Career Passport and verified credentials were sent to the employer.',
      date: appliedDate,
      isCompleted: true,
      isActive: currentStatus === 'APPLIED'
    },
    {
      id: 'SHORTLISTED',
      title: 'Profile Shortlisted',
      description: 'Recruiter shortlisted your profile based on ≥86% skill match fit.',
      date: 'Shortlist Verified',
      isCompleted: ['SHORTLISTED', 'INTERVIEW_SCHEDULED', 'SELECTED', 'JOINED'].includes(currentStatus),
      isActive: currentStatus === 'SHORTLISTED'
    },
    {
      id: 'INTERVIEW_SCHEDULED',
      title: 'Technical Evaluation Round',
      description: 'Live coding assessment & technical conversation with hiring team.',
      date: 'Next Milestone',
      isCompleted: ['INTERVIEW_SCHEDULED', 'SELECTED', 'JOINED'].includes(currentStatus),
      isActive: currentStatus === 'INTERVIEW_SCHEDULED'
    },
    {
      id: 'SELECTED',
      title: 'Offer & Selection',
      description: 'Official employment or internship offer letter issued.',
      date: 'Final Stage',
      isCompleted: ['SELECTED', 'JOINED'].includes(currentStatus),
      isActive: currentStatus === 'SELECTED'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[95vw] sm:max-w-2xl glass-card-elevated rounded-2xl shadow-2xl border border-white/15 overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
        >
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-start justify-between bg-slate-900/60 gap-2 shrink-0">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] sm:text-[11px] font-bold inline-flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Active Application</span>
                </span>
                <span className="text-slate-600 hidden xs:inline">·</span>
                <span className="text-xs text-slate-400 font-semibold truncate max-w-[140px] sm:max-w-none">{companyName}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading tracking-tight truncate">
                {jobTitle}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>Applied on {appliedDate}</span>
                <span>·</span>
                <span className="text-pink-400 font-bold">{matchScore}% Match Fit</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1 text-slate-200">

            {/* Shortlist Highlight Card */}
            <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-start space-x-3.5 shadow-[0_0_20px_rgba(236,72,153,0.15)]">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-pink-300 uppercase tracking-wide">
                    Shortlist Option & Evaluation
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/30">
                    Recruiter Review
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Your profile qualified for the <strong className="text-pink-300 font-bold">Priority Shortlist</strong> queue because your technical match score is <strong className="text-white">{matchScore}%</strong> (exceeds the 86% Directorate threshold).
                </p>
              </div>
            </div>

            {/* Pipeline Stepper */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Application Pipeline Progress
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {stages.map((stage, idx) => (
                  <div key={stage.id} className="relative group">
                    <div 
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                        stage.isCompleted 
                          ? 'bg-pink-500 border-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]' 
                          : stage.isActive 
                            ? 'bg-pink-500 border-pink-500 text-white ring-4 ring-pink-500/20' 
                            : 'bg-slate-900 border-slate-700 text-slate-500'
                      }`}
                    >
                      {stage.isCompleted ? '✓' : idx + 1}
                    </div>

                    <div className="bg-slate-900/60 p-3.5 rounded-xl border border-white/10 hover:border-pink-500/40 transition-all">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className={`text-xs font-bold ${stage.isCompleted ? 'text-pink-300' : stage.isActive ? 'text-pink-400 font-bold' : 'text-slate-300'}`}>
                          {stage.title}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {stage.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/student/applications"
              onClick={onClose}
              className="text-xs font-bold text-pink-400 hover:text-pink-300 inline-flex items-center space-x-1"
            >
              <span>Go to Full Applications Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Link
                to="/student/interviews"
                onClick={onClose}
                className="w-full sm:w-auto btn-pink-gradient px-4 py-2 text-xs font-bold text-center cursor-pointer shadow-md"
              >
                View Interview Status
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
