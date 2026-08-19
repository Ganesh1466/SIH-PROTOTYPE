import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  ExternalLink, 
  User, 
  CheckCircle2, 
  PlusCircle,
  Building2
} from 'lucide-react';
import { interviewApi } from '../../api/interviewApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

export const EmployerInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await interviewApi.getAll();
      setInterviews(res.data || []);
    } catch (err) {
      toast.error("Failed to load interviews");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={3} />;
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
            Active evaluation rounds, meeting room coordinates, and candidate feedback notes.
          </p>
        </div>
        <Badge variant="blue" size="md">
          {interviews.length} Scheduled
        </Badge>
      </div>

      {interviews.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No interview rounds currently scheduled"
          description="Visit Candidate Ranking to schedule technical panels with shortlisted applicants."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-5">Candidate & Role</th>
                  <th className="py-3 px-4">Round Name</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Panel / Lead</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Meeting Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {interviews.map(int => (
                  <tr key={int.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 text-sm">{int.studentName}</div>
                      <span className="text-[11px] text-slate-400">{int.jobTitle}</span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {int.roundName}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {int.date} · {int.time}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {int.interviewerName}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="success" size="sm">
                        {int.status}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <a
                        href={int.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md transition-colors inline-flex items-center space-x-1 text-xs shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Call</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
