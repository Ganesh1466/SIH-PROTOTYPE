import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Video, 
  User, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { interviewApi } from '../../api/interviewApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

export const StudentInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await interviewApi.getAll({ studentId: 'stu-1' });
      setInterviews(res.data || []);
    } catch (err) {
      toast.error("Failed to load scheduled interviews");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={2} />;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Interview Rounds & Technical Panels
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Confirmed recruitment rounds and technical evaluation schedules.
          </p>
        </div>

        <Badge variant="purple" size="md">
          {interviews.length} Scheduled
        </Badge>
      </div>

      {interviews.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No interview rounds currently scheduled"
          description="When recruiters shortlist your profile, your technical rounds will be organized here."
        />
      ) : (
        <div className="space-y-6">
          {interviews.map((int) => (
            <div
              key={int.id}
              className="bg-white rounded-xl p-6 border border-slate-200 space-y-5"
            >
              {/* Interview Header (Prompt Section 14) */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="blue" size="sm">
                      {int.roundName || "Technical Round"}
                    </Badge>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                      Status: {int.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {int.jobTitle}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">{int.companyName}</span>
                </div>

                <a
                  href={int.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => toast.success("Opening employer meeting room...")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Meeting Room</span>
                </a>
              </div>

              {/* Timing & Panel Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200/70">
                <div className="space-y-0.5">
                  <span className="text-slate-400 text-[11px] block">Date:</span>
                  <strong className="text-slate-800">{int.date}</strong>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 text-[11px] block">Time & Duration:</span>
                  <strong className="text-slate-800">{int.time} (45 mins)</strong>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 text-[11px] block">Interviewer / Panel:</span>
                  <strong className="text-slate-800">{int.interviewerName}</strong>
                </div>
              </div>

              {/* Interview Preparation Checklist (Prompt Section 14) */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Interview Preparation Checklist</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-emerald-50/60 rounded-md border border-emerald-200/60 flex items-center space-x-2 text-emerald-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Core React Hooks, Component State & Lifecycle</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50/60 rounded-md border border-emerald-200/60 flex items-center space-x-2 text-emerald-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>JavaScript Async / Await & Promises</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50/60 rounded-md border border-emerald-200/60 flex items-center space-x-2 text-emerald-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>REST API Data Fetching & Error Handling</span>
                  </div>
                  <div className="p-2.5 bg-amber-50/60 rounded-md border border-amber-200/60 flex items-center space-x-2 text-amber-900">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>TypeScript Generics & Strict Typing</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
