import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  PlusCircle, 
  MapPin, 
  Users, 
  Clock, 
  ChevronRight,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Trash2,
  Play,
  Filter
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

export const EmployerJobs = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tabFilter, setTabFilter] = useState('ALL');

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const res = await employerApi.getOpportunities();
      setOpportunities(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load posted opportunities");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id) => {
    try {
      await employerApi.publishOpportunity(id);
      toast.success("🎉 Opportunity published live across Rajasthan!");
      fetchOpportunities();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish opportunity");
    }
  };

  const handleClose = async (id) => {
    try {
      await employerApi.closeOpportunity(id);
      toast.success("Opportunity closed successfully");
      fetchOpportunities();
    } catch (err) {
      toast.error("Failed to close opportunity");
    }
  };

  const handleDelete = async (id) => {
    try {
      await employerApi.deleteOpportunity(id);
      toast.success("Draft opportunity removed");
      fetchOpportunities();
    } catch (err) {
      toast.error("Failed to delete draft");
    }
  };

  if (loading) {
    return <SkeletonLoader count={3} />;
  }

  const filtered = opportunities.filter(opp => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      (opp.district && opp.district.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (tabFilter === 'ALL') return true;
    if (tabFilter === 'JOB') return opp.opportunity_type === 'JOB';
    if (tabFilter === 'INTERNSHIP') return opp.opportunity_type === 'INTERNSHIP';
    if (tabFilter === 'DRAFT') return opp.status === 'DRAFT';
    if (tabFilter === 'PUBLISHED') return opp.status === 'PUBLISHED';
    if (tabFilter === 'CLOSED') return opp.status === 'CLOSED';
    return true;
  });

  return (
    <div className="space-y-6 font-sans text-[#171A21]">
      
      {/* Top Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Opportunities & Campus Requisitions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
              Rajasthan Ecosystem
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your company's live jobs, student internships, and candidate matching pipelines.
          </p>
        </div>

        <Link
          to="/employer/post"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Opportunity</span>
        </Link>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        {/* Tab Filters */}
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 overflow-x-auto text-xs font-bold">
          {[
            { id: 'ALL', label: 'All Opportunities', count: opportunities.length },
            { id: 'JOB', label: 'Jobs', count: opportunities.filter(o => o.opportunity_type === 'JOB').length },
            { id: 'INTERNSHIP', label: 'Internships', count: opportunities.filter(o => o.opportunity_type === 'INTERNSHIP').length },
            { id: 'PUBLISHED', label: 'Live Active', count: opportunities.filter(o => o.status === 'PUBLISHED').length },
            { id: 'DRAFT', label: 'Drafts', count: opportunities.filter(o => o.status === 'DRAFT').length },
            { id: 'CLOSED', label: 'Closed', count: opportunities.filter(o => o.status === 'CLOSED').length }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTabFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                tabFilter === tab.id
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1.5 opacity-60 text-[10px]">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Opportunity List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-4">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No opportunities found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              {opportunities.length === 0 
                ? "You have not published any opportunities yet. Create a Job or Internship to start matching with verified Rajasthan talent."
                : "No requisitions match the current tab filter."}
            </p>
          </div>
          <Link
            to="/employer/post"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create First Opportunity</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filtered.map((opp) => {
            const isJob = opp.opportunity_type === 'JOB';
            const isPublished = opp.status === 'PUBLISHED';
            const isDraft = opp.status === 'DRAFT';

            return (
              <div
                key={opp.id}
                className="bg-white rounded-xl p-5 border border-[#E7E9EE] hover:border-indigo-200 transition-all shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                      isJob ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}>
                      {opp.opportunity_type}
                    </span>

                    <h3 className="text-base font-bold text-slate-900">
                      {opp.title}
                    </h3>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isPublished ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      isDraft ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      ● {opp.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                    <span className="flex items-center space-x-1 text-slate-700 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.district || 'Jaipur'}, Rajasthan ({opp.work_mode})</span>
                    </span>

                    <span className="font-bold text-slate-900">
                      {isJob 
                        ? `₹${(opp.salary_min / 100000).toFixed(1)}–${(opp.salary_max / 100000).toFixed(1)} LPA` 
                        : `₹${(opp.stipend_min || 10000).toLocaleString()}/mo (${opp.duration_months})`}
                    </span>

                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Deadline: {opp.application_deadline}</span>
                    </span>
                  </div>

                  {/* Skills preview */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opp.skills?.slice(0, 5).map((s, idx) => {
                      const name = typeof s === 'string' ? s : s.skill_name;
                      const isReq = typeof s === 'object' ? s.requirement_type === 'REQUIRED' : true;
                      return (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                            isReq ? 'bg-slate-100 text-slate-800 border border-slate-200' : 'bg-slate-50 text-slate-600'
                          }`}
                        >
                          {name} {typeof s === 'object' && s.is_core ? '★' : ''}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side Stats & Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Candidates</span>
                    <strong className="text-sm font-bold text-indigo-700">
                      {opp.applications_count || 0} Applied
                    </strong>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isDraft ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handlePublish(opp.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-2xs cursor-pointer flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3" />
                          <span>Publish</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(opp.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md border border-slate-200 cursor-pointer"
                          title="Delete Draft"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : isPublished ? (
                      <>
                        <Link
                          to="/employer/candidates"
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-lg flex items-center space-x-1"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>View Talent Pool</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleClose(opp.id)}
                          className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold rounded-lg cursor-pointer"
                        >
                          Close
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Requisition Closed</span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
