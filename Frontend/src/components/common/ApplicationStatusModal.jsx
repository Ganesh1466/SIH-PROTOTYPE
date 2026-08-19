import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sparkles, 
  Building2, 
  MapPin, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-[95vw] sm:max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between bg-gradient-to-r from-indigo-50/70 to-slate-50 gap-2 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-bold inline-flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Active Application</span>
              </span>
              <span className="text-slate-300 hidden xs:inline">·</span>
              <span className="text-xs text-slate-500 font-semibold truncate max-w-[140px] sm:max-w-none">{companyName}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
              {jobTitle}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span>Applied on {appliedDate}</span>
              <span>·</span>
              <span className="text-indigo-600 font-semibold">{matchScore}% Match Fit</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">

          {/* Shortlist Highlight Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200 shadow-2xs flex items-start space-x-3.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                  Shortlist Option & Evaluation
                </h4>
                <span className="px-2 py-0.2 rounded-md bg-amber-200 text-amber-900 text-[10px] font-extrabold">
                  Recruiter Review
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                Your profile qualified for the <strong className="text-amber-950 font-bold">Priority Shortlist</strong> queue because your technical match score is <strong className="text-amber-950">{matchScore}%</strong> (exceeds the 86% Directorate threshold).
              </p>
            </div>
          </div>

          {/* Real-time Pipeline Stepper */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Application Pipeline Progress
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {stages.map((stage, idx) => (
                <div key={stage.id} className="relative group">
                  {/* Circle Indicator */}
                  <div 
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                      stage.isCompleted 
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs' 
                        : stage.isActive 
                          ? 'bg-indigo-600 border-indigo-600 text-white ring-4 ring-indigo-100' 
                          : 'bg-white border-slate-300 text-slate-400'
                    }`}
                  >
                    {stage.isCompleted ? '✓' : idx + 1}
                  </div>

                  {/* Stage Content */}
                  <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-200/80 hover:border-indigo-200 transition-all">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className={`text-xs font-bold ${stage.isCompleted ? 'text-emerald-800' : stage.isActive ? 'text-indigo-800 font-extrabold' : 'text-slate-700'}`}>
                        {stage.title}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {stage.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to="/student/applications"
            onClick={onClose}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center space-x-1"
          >
            <span>Go to Full Applications Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Link
              to="/student/interviews"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-2xs text-center cursor-pointer"
            >
              View Interview Status
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
