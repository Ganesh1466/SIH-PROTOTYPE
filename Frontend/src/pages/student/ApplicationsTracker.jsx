import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { applicationApi } from '../../api/applicationApi';
import { Badge } from '../../components/common/Badge';
import { ApplicationStatusModal } from '../../components/common/ApplicationStatusModal';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const ApplicationsTracker = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await applicationApi.getAll({ studentId: 'stu-1' });
      setApplications(res.data || []);
    } catch (err) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const filtered = applications.filter(app => {
    if (statusFilter === 'ALL') return true;
    return app.status === statusFilter;
  });

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'APPLIED': return 'default';
      case 'UNDER_REVIEW': return 'blue';
      case 'SHORTLISTED': return 'pink';
      case 'INTERVIEW_SCHEDULED': return 'purple';
      case 'SELECTED': return 'success';
      case 'JOINED': return 'excellent';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0B1024] to-[#0F1630]"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
            Application Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status progression from initial submission to shortlist and final joining.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-400 font-medium">Stage:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-[#0F1630] border border-white/10 text-slate-300 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Stages ({applications.length})</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="SELECTED">Selected</option>
          </select>
        </div>
      </motion.div>

      {/* Applications Data Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No applications in this category"
          description="Explore verified opportunities and apply with your Career Passport."
          actionLabel="Explore Jobs"
          onAction={() => window.location.href = '/student/jobs'}
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-white/10 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-5">Role & Company</th>
                  <th className="py-4 px-4">Applied On</th>
                  <th className="py-4 px-4">Match Fit</th>
                  <th className="py-4 px-4">Current Stage</th>
                  <th className="py-4 px-5 text-right">Shortlist Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(app => (
                  <tr 
                    key={app.id} 
                    onClick={() => {
                      setSelectedApp(app);
                      setModalOpen(true);
                    }}
                    className="hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-5">
                      <div className="font-bold text-white text-sm hover:text-pink-300 font-heading transition-colors">
                        {app.jobTitle}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{app.companyName}</span>
                    </td>
                    
                    <td className="py-4 px-4 text-slate-400 font-medium">
                      {new Date(app.appliedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>

                    <td className="py-4 px-4">
                      <Badge variant={app.matchScore >= 80 ? 'pink' : 'warning'} size="sm">
                        {app.matchScore}% Fit
                      </Badge>
                    </td>

                    <td className="py-4 px-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                          setModalOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <Badge variant={getStatusBadgeVariant(app.status)} size="sm">
                          {app.status.replace('_', ' ')}
                        </Badge>
                      </button>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                          setModalOpen(true);
                        }}
                        className="btn-pink-outline px-3.5 py-1.5 inline-flex items-center space-x-1 text-xs cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-pink-400" />
                        <span>View Shortlist →</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Application Status & Shortlist Pipeline Modal */}
      <ApplicationStatusModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        application={selectedApp}
      />

    </div>
  );
};
