import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertOctagon, 
  Search, 
  Filter, 
  Eye, 
  X, 
  MapPin, 
  IndianRupee, 
  Check, 
  Ban, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const GovernmentOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [actionNotes, setActionNotes] = useState('');
  const [actionModal, setActionModal] = useState({ open: false, type: '', opp: null });

  useEffect(() => {
    fetchOpportunities();
  }, [statusFilter, typeFilter, districtFilter]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const res = await governmentApi.getOpportunities({
        status: statusFilter,
        type: typeFilter,
        district: districtFilter,
        search: searchTerm
      });
      if (res.data?.success) {
        setOpportunities(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load opportunities.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (oppId, newStatus) => {
    try {
      let res;
      if (newStatus === 'PUBLISHED') {
        res = await governmentApi.approveOpportunity(oppId, actionNotes);
      } else if (newStatus === 'REJECTED') {
        res = await governmentApi.rejectOpportunity(oppId, actionNotes);
      } else if (newStatus === 'SUSPENDED') {
        res = await governmentApi.suspendOpportunity(oppId, actionNotes);
      }

      if (res?.data?.success) {
        toast.success(res.data.message);
        setActionModal({ open: false, type: '', opp: null });
        setActionNotes('');
        fetchOpportunities();
      }
    } catch (err) {
      toast.error('Failed to update opportunity approval state.');
    }
  };

  const openActionModal = (opp, type) => {
    setActionModal({ open: true, type, opp });
    setActionNotes('');
  };

  const filteredOpportunities = opportunities.filter(o => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return o.title.toLowerCase().includes(q) || 
           o.company_name.toLowerCase().includes(q) ||
           o.district.toLowerCase().includes(q) ||
           (o.requiredSkills && o.requiredSkills.some(s => s.toLowerCase().includes(q)));
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PUBLISHED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>✓ Published Live</span>
          </span>
        );
      case 'PENDING_APPROVAL':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>⏳ Pending Review</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <XCircle className="w-3 h-3 text-rose-400" />
            <span>✕ Rejected</span>
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-orange-500/20 text-orange-300 border border-orange-500/40">
            <AlertOctagon className="w-3 h-3 text-orange-400" />
            <span>⚠ Suspended</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 text-slate-100 pb-10">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Government Opportunity Governance & Clearance</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Job & Internship Post Approval Portal
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review employer job requisitions, verify compensation compliance, and publish live postings for Rajasthan students.
          </p>
        </div>

        {/* Workflow steps banner */}
        <div className="flex items-center space-x-2 text-[11px] bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-slate-300">
          <span className="text-slate-400 font-bold">Flow:</span>
          <span>Employer Post</span>
          <ArrowRight className="w-3 h-3 text-slate-500" />
          <span className="text-amber-400 font-bold">Govt Review</span>
          <ArrowRight className="w-3 h-3 text-slate-500" />
          <span className="text-emerald-400 font-bold">Published</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, company, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Status, Type and District Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Approval States</option>
            <option value="PENDING_APPROVAL">⏳ Pending Approval</option>
            <option value="PUBLISHED">✓ Published Live</option>
            <option value="SUSPENDED">⚠ Suspended</option>
            <option value="REJECTED">✕ Rejected</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Opportunity Types</option>
            <option value="JOB">Full-Time Jobs</option>
            <option value="INTERNSHIP">Internships</option>
          </select>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Districts</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Jodhpur">Jodhpur</option>
            <option value="Kota">Kota</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Ajmer">Ajmer</option>
            <option value="Bikaner">Bikaner</option>
          </select>
        </div>

      </div>

      {/* Opportunities Table */}
      {loading ? (
        <SkeletonLoader count={3} />
      ) : (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Opportunity Title</th>
                  <th className="py-3.5 px-4">Company Name</th>
                  <th className="py-3.5 px-4">District / Mode</th>
                  <th className="py-3.5 px-4">Required Skills</th>
                  <th className="py-3.5 px-4">Compensation</th>
                  <th className="py-3.5 px-4">Approval Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredOpportunities.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-500 text-xs">
                      No opportunity requisitions found.
                    </td>
                  </tr>
                ) : (
                  filteredOpportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            opp.opportunity_type === 'INTERNSHIP' 
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          }`}>
                            {opp.opportunity_type}
                          </span>
                          <div>
                            <span className="font-bold text-white block text-sm">{opp.title}</span>
                            <span className="text-[10px] text-slate-500">Posted on: {opp.createdDate}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-semibold text-slate-300">
                        {opp.company_name}
                      </td>

                      <td className="py-4 px-4">
                        <span className="flex items-center space-x-1 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                          <span>{opp.district}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {opp.requiredSkills?.map(s => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-bold text-emerald-400">
                        {opp.salary_range}
                      </td>

                      <td className="py-4 px-4">
                        {getStatusBadge(opp.approvalStatus)}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* View details */}
                          <button
                            onClick={() => setSelectedOpp(opp)}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-md border border-slate-700 transition-colors"
                            title="View Requisition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Approve */}
                          {opp.approvalStatus !== 'PUBLISHED' && (
                            <button
                              onClick={() => openActionModal(opp, 'PUBLISHED')}
                              className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 rounded-md font-bold text-[11px] transition-colors"
                            >
                              Approve
                            </button>
                          )}

                          {/* Reject */}
                          {opp.approvalStatus === 'PENDING_APPROVAL' && (
                            <button
                              onClick={() => openActionModal(opp, 'REJECTED')}
                              className="px-2.5 py-1 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-md font-bold text-[11px] transition-colors"
                            >
                              Reject
                            </button>
                          )}

                          {/* Suspend */}
                          {opp.approvalStatus === 'PUBLISHED' && (
                            <button
                              onClick={() => openActionModal(opp, 'SUSPENDED')}
                              className="px-2.5 py-1 bg-orange-500/15 hover:bg-orange-500/25 text-orange-300 border border-orange-500/30 rounded-md font-bold text-[11px] transition-colors"
                            >
                              Suspend
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Opportunity Details Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{selectedOpp.opportunity_type} Requisition</span>
                <h3 className="text-base font-bold text-white">{selectedOpp.title}</h3>
                <span className="text-xs text-slate-400 font-medium">{selectedOpp.company_name} • {selectedOpp.district}</span>
              </div>
              <button 
                onClick={() => setSelectedOpp(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Approval State:</span>
                <div>{getStatusBadge(selectedOpp.approvalStatus)}</div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Compensation:</span>
                <span className="text-emerald-400 font-bold">{selectedOpp.salary_range}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Open Vacancies:</span>
                <span className="text-white font-bold">{selectedOpp.vacancies} Seats</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">Required Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedOpp.requiredSkills?.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">Description:</span>
                <p className="text-slate-300 leading-relaxed">{selectedOpp.description}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedOpp(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Approval / Reject Modal */}
      {actionModal.open && actionModal.opp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {actionModal.type === 'PUBLISHED' && 'Approve & Publish Opportunity Live'}
                {actionModal.type === 'REJECTED' && 'Reject Opportunity Requisition'}
                {actionModal.type === 'SUSPENDED' && 'Suspend Opportunity Post'}
              </h3>
              <button 
                onClick={() => setActionModal({ open: false, type: '', opp: null })}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              You are about to change the status of <strong className="text-white">{actionModal.opp.title}</strong> to <strong className="text-amber-400">{actionModal.type}</strong>.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">
                Administrative Notes (Optional)
              </label>
              <textarea
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="Compliance remarks or verification reference..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setActionModal({ open: false, type: '', opp: null })}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange(actionModal.opp.id, actionModal.type)}
                className={`px-4 py-1.5 rounded-lg text-xs font-black text-slate-950 shadow-md ${
                  actionModal.type === 'PUBLISHED' ? 'bg-emerald-400 hover:bg-emerald-300' :
                  actionModal.type === 'REJECTED' ? 'bg-rose-400 hover:bg-rose-300' :
                  'bg-orange-400 hover:bg-orange-300'
                }`}
              >
                Confirm {actionModal.type}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
