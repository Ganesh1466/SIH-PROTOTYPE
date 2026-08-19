import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ExternalLink, 
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { applicationApi } from '../../api/applicationApi';
import { Badge } from '../../components/common/Badge';
import { ApplicationStatusModal } from '../../components/common/ApplicationStatusModal';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

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
      case 'SHORTLISTED': return 'strong';
      case 'INTERVIEW_SCHEDULED': return 'purple';
      case 'SELECTED': return 'success';
      case 'JOINED': return 'excellent';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Application Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status progression from initial submission to shortlist and final joining.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-500 font-medium">Stage:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-800 cursor-pointer focus:outline-hidden"
          >
            <option value="ALL">All Stages ({applications.length})</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="SELECTED">Selected</option>
          </select>
        </div>
      </div>

      {/* Applications Data Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No applications in this category"
          description="Explore verified opportunities and apply with your Career Passport."
          actionLabel="Explore Jobs"
          onAction={() => window.location.href = '/student/jobs'}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-5">Role & Company</th>
                  <th className="py-3 px-4">Applied On</th>
                  <th className="py-3 px-4">Match Fit</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-5 text-right">Shortlist Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(app => (
                  <tr 
                    key={app.id} 
                    onClick={() => {
                      setSelectedApp(app);
                      setModalOpen(true);
                    }}
                    className="hover:bg-indigo-50/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors">
                        {app.jobTitle}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{app.companyName}</span>
                    </td>
                    
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(app.appliedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant={app.matchScore >= 80 ? 'strong' : 'warning'} size="sm">
                        {app.matchScore}% Fit
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4">
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

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                          setModalOpen(true);
                        }}
                        className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-md border border-indigo-200 transition-colors inline-flex items-center space-x-1 text-xs cursor-pointer shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>View Shortlist →</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

