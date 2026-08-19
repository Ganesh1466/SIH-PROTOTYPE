import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  PlusCircle, 
  MapPin, 
  Users, 
  Clock, 
  Search,
  Trash2,
  Play
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

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
    <div className="space-y-6 font-sans text-slate-100 pb-8">
      
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0B1730] via-[#0E1E40] to-[#0B1730]"
      >
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
              Opportunities & Campus Requisitions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold text-xs">
              Rajasthan Ecosystem
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Manage your company's live jobs, student internships, and candidate matching pipelines.
          </p>
        </div>

        <Link
          to="/employer/post"
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center space-x-1.5 transition-all shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Opportunity</span>
        </Link>
      </motion.div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        {/* Tab Filters */}
        <div className="flex items-center space-x-1 p-1.5 bg-slate-950/80 rounded-2xl border border-blue-900/40 overflow-x-auto text-xs font-bold">
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
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                tabFilter === tab.id
                  ? 'bg-blue-600 text-white font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1.5 opacity-70 text-[10px]">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0B1730] border border-blue-900/40 rounded-xl text-xs font-medium text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/60"
          />
        </div>
      </div>

      {/* Opportunity List */}
      {filtered.length === 0 ? (
        <div className="bg-[#0B1730] rounded-3xl p-12 border border-blue-900/40 text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 bg-blue-950/80 rounded-2xl border border-blue-800/40 flex items-center justify-center mx-auto text-blue-400">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-heading">No opportunities found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 font-medium">
              {opportunities.length === 0 
                ? "You have not published any opportunities yet. Create a Job or Internship to start matching with verified Rajasthan talent."
                : "No requisitions match the current tab filter."}
            </p>
          </div>
          <Link
            to="/employer/post"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create First Opportunity</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((opp, idx) => {
            const isJob = opp.opportunity_type === 'JOB';
            const isPublished = opp.status === 'PUBLISHED';
            const isDraft = opp.status === 'DRAFT';

            return (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#0B1730] rounded-2xl p-5 border border-blue-900/40 hover:border-blue-500/50 transition-all shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      isJob ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}>
                      {opp.opportunity_type}
                    </span>

                    <h3 className="text-base font-extrabold text-white font-heading">
                      {opp.title}
                    </h3>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isPublished ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      isDraft ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-slate-800 text-slate-400 border border-white/10'
                    }`}>
                      ● {opp.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 font-medium">
                    <span className="flex items-center space-x-1 text-white font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{opp.district || 'Jaipur'}, Rajasthan ({opp.work_mode})</span>
                    </span>

                    <span className="font-bold text-blue-300 font-metrics">
                      {isJob 
                        ? `₹${(opp.salary_min / 100000).toFixed(1)}–${(opp.salary_max / 100000).toFixed(1)} LPA` 
                        : `₹${(opp.stipend_min || 10000).toLocaleString()}/mo (${opp.duration_months})`}
                    </span>

                    <span className="flex items-center space-x-1 text-slate-400">
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
                          className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold ${
                            isReq ? 'bg-slate-950 text-slate-200 border border-blue-900/30' : 'bg-blue-950/60 text-slate-400'
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
                    <strong className="text-sm font-bold text-blue-400 font-metrics">
                      {opp.applications_count || 0} Applied
                    </strong>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isDraft ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handlePublish(opp.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3" />
                          <span>Publish</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(opp.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-xl border border-blue-900/40 cursor-pointer"
                          title="Delete Draft"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : isPublished ? (
                      <>
                        <Link
                          to="/employer/candidates"
                          className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-xs font-bold rounded-xl flex items-center space-x-1 transition-all"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>View Talent Pool</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleClose(opp.id)}
                          className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-900 text-slate-400 border border-blue-900/40 text-xs font-semibold rounded-xl cursor-pointer"
                        >
                          Close
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Requisition Closed</span>
                    )}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
};
