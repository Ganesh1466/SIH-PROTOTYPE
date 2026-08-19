import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  ChevronRight, 
  UserCheck, 
  Award,
  Filter
} from 'lucide-react';
import { applicationApi } from '../../api/applicationApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

export const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await applicationApi.getAll();
      setApplications(res.data || []);
    } catch (err) {
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await applicationApi.updateStatus(appId, newStatus, `Candidate moved to ${newStatus}`);
      toast.success(`Updated status to ${newStatus}`);
      fetchApplications();
    } catch {
      toast.error("Status update failed");
    }
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const filtered = applications.filter(app => {
    if (statusFilter === 'ALL') return true;
    return app.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Applicant Pipeline & Lifecycle Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Advance candidates through shortlisting, technical rounds, and final offers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-500 font-medium">Stage:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-800 cursor-pointer focus:outline-hidden"
          >
            <option value="ALL">All Applicants ({applications.length})</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="SELECTED">Selected</option>
            <option value="JOINED">Joined</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Send}
          title="No applications in this category"
          description="Applications received from students will appear in this pipeline."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-5">Candidate</th>
                  <th className="py-3 px-4">Role Applied</th>
                  <th className="py-3 px-4">Match Fit</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-5 text-right">Advance Candidate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 text-sm">{app.studentName}</div>
                      <span className="text-[11px] text-slate-400">ID: {app.studentId}</span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {app.jobTitle}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant={app.matchScore >= 80 ? 'strong' : 'warning'} size="sm">
                        {app.matchScore}% Match
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="blue" size="sm">
                        {app.status.replace('_', ' ')}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {app.status === 'APPLIED' && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'SHORTLISTED')}
                            className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold rounded-md border border-sky-200 text-xs cursor-pointer"
                          >
                            Shortlist
                          </button>
                        )}
                        {app.status === 'SHORTLISTED' && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'INTERVIEW_SCHEDULED')}
                            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-md border border-indigo-200 text-xs cursor-pointer"
                          >
                            Set Interview
                          </button>
                        )}
                        {app.status === 'INTERVIEW_SCHEDULED' && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'SELECTED')}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-md border border-emerald-200 text-xs cursor-pointer"
                          >
                            Select & Offer
                          </button>
                        )}
                        {app.status === 'SELECTED' && (
                          <span className="text-emerald-600 font-semibold text-xs">
                            ✓ Offered
                          </span>
                        )}
                      </div>
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
