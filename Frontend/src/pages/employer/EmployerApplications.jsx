import React, { useState, useEffect } from 'react';
import { 
  Send
} from 'lucide-react';
import { applicationApi } from '../../api/applicationApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

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
    <div className="space-y-6 font-sans text-slate-100 pb-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0B1730] via-[#0E1E40] to-[#0B1730]"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
            Applicant Pipeline & Lifecycle Management
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Advance candidates through shortlisting, technical rounds, and final offers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-400 font-medium">Stage:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-950/80 border border-blue-900/40 rounded-xl text-xs font-semibold text-white cursor-pointer focus:outline-none focus:border-blue-500/60"
          >
            <option value="ALL">All Applicants ({applications.length})</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="SELECTED">Selected</option>
            <option value="JOINED">Joined</option>
          </select>
        </div>
      </motion.div>

      {/* Applications Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Send}
          title="No applications in this category"
          description="Applications received from students will appear in this pipeline."
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0B1730] rounded-3xl border border-blue-900/40 overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-blue-900/40 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Candidate</th>
                  <th className="py-3.5 px-4">Role Applied</th>
                  <th className="py-3.5 px-4">Match Fit</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4">Current Stage</th>
                  <th className="py-3.5 px-5 text-right">Advance Candidate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/20">
                {filtered.map(app => (
                  <tr key={app.id} className="hover:bg-blue-950/40 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-white text-sm font-heading">{app.studentName}</div>
                      <span className="text-[11px] text-slate-400">ID: {app.studentId}</span>
                    </td>

                    <td className="py-4 px-4 font-semibold text-slate-200">
                      {app.jobTitle}
                    </td>

                    <td className="py-4 px-4">
                      <Badge variant={app.matchScore >= 80 ? 'blue' : 'warning'} size="sm">
                        {app.matchScore}% Match
                      </Badge>
                    </td>

                    <td className="py-4 px-4 text-slate-400 font-metrics">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {app.status === 'APPLIED' && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'SHORTLISTED')}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer transition-all"
                          >
                            Shortlist
                          </button>
                        )}
                        {app.status === 'SHORTLISTED' && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'INTERVIEW_SCHEDULED')}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer transition-all"
                          >
                            Set Interview
                          </button>
                        )}
                        {app.status === 'INTERVIEW_SCHEDULED' && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'SELECTED')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer transition-all"
                          >
                            Select & Offer
                          </button>
                        )}
                        {app.status === 'SELECTED' && (
                          <span className="text-emerald-400 font-bold text-xs">
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
        </motion.div>
      )}

    </div>
  );
};
