import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Building2, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ShieldCheck, 
  BadgeCheck, 
  Send, 
  Zap,
  Lock,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { jobApi } from '../../api/jobApi';
import { applicationApi } from '../../api/applicationApi';
import { Badge } from '../../components/common/Badge';
import { ExplainableMatchModal } from '../../components/common/ExplainableMatchModal';
import { ApplicationStatusModal } from '../../components/common/ApplicationStatusModal';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

export const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [eligibleOnly, setEligibleOnly] = useState(false);

  // Modals
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);


  useEffect(() => {
    fetchJobs();
  }, [eligibleOnly]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const [jobsRes, appsRes] = await Promise.all([
        jobApi.getAll({ studentId: 'stu-1', eligibleOnly: eligibleOnly ? 'true' : undefined }),
        applicationApi.getAll({ studentId: 'stu-1' })
      ]);
      setJobs(jobsRes.data || []);
      setApplications(appsRes.data || []);
    } catch (err) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applicationApi.apply('stu-1', jobId);
      toast.success("Application submitted successfully!");
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Application submission failed");
    }
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const filteredJobs = jobs.filter(job => {
    const compName = job.companyName || job.company || '';
    const matchSearch = (job.title || '').toLowerCase().includes(search.toLowerCase()) ||
                        compName.toLowerCase().includes(search.toLowerCase()) ||
                        (job.requiredSkills || []).some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchType = selectedType === 'All' || job.type?.toLowerCase() === selectedType.toLowerCase();
    const matchLocation = selectedLocation === 'All' || (job.location || '').includes(selectedLocation);

    return matchSearch && matchType && matchLocation;
  });

  return (
    <div className="space-y-6 font-sans text-[#171A21]">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-[#E7E9EE] shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Active Jobs & Internships
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Live AI Matching Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time skill & eligibility scoring. <span className="font-semibold text-slate-700">Minimum 86% Match</span> required to unlock direct recruitment application.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-800 text-xs font-bold shadow-2xs">
          <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Verified Directorate Gateway</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E7E9EE] shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by role, company, or skill (e.g. React, Node.js)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Eligibility Toggle */}
          <button
            onClick={() => setEligibleOnly(!eligibleOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 border cursor-pointer ${
              eligibleOnly
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${eligibleOnly ? 'text-amber-300' : 'text-indigo-600'}`} />
            <span>Eligible Only (≥86% Match)</span>
          </button>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden"
          >
            <option value="All">All Requisitions</option>
            <option value="Job">Full-time Jobs</option>
            <option value="Internship">Internships</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden"
          >
            <option value="All">All Locations</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Remote">Remote / Hybrid</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>
      </div>

      {/* Opportunities List */}
      {filteredJobs.length === 0 ? (
        <EmptyState 
          title="No matching opportunities found" 
          message={eligibleOnly ? "No opportunities currently meet the 86% match threshold. Uncheck the filter or bridge skills." : "Try broadening your search query or filters."} 
        />
      ) : (
        <div className="space-y-3">
          {filteredJobs.map((job) => {
            const matchScore = job.matchScore ?? 0;
            const minThreshold = job.minApplyThreshold || 86;
            const isEligible = job.isEligibleToApply ?? (matchScore >= minThreshold);
            const hasApplied = applications.some(a => a.jobId === job.id);

            return (
              <div
                key={job.id}
                className={`bg-white rounded-xl p-5 border transition-all shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                  isEligible ? 'border-[#E7E9EE] hover:border-indigo-300' : 'border-slate-200/80 bg-slate-50/40'
                }`}
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/student/jobs/${job.id}`}
                      className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                    >
                      {job.title}
                    </Link>
                    <span className="inline-flex items-center space-x-1 px-2 py-0.2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Recruiter</span>
                    </span>
                    <Badge variant={job.type === 'Full-time' || job.type === 'Job' ? 'indigo' : 'sky'} size="sm">
                      {job.type}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                    <span className="font-semibold text-slate-700 flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.companyName || job.company || 'TechNova Solutions'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                    <span className="font-bold text-slate-800">
                      {job.salary}
                    </span>
                  </div>

                  {/* Skills Alignment */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.matchedSkills?.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{skill}</span>
                      </span>
                    ))}
                    {job.missingSkills?.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold"
                      >
                        <AlertCircle className="w-3 h-3 text-rose-500" />
                        <span>Need: {skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Match Score & Dynamic Threshold CTA */}
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-semibold block">Explainable Fit</span>
                    <div className="flex items-center space-x-1 text-indigo-700 font-extrabold text-xl">
                      <Zap className={`w-4 h-4 ${matchScore >= minThreshold ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                      <span className={matchScore >= minThreshold ? 'text-indigo-700' : 'text-slate-600'}>
                        {matchScore}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setModalOpen(true);
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    >
                      Explain Fit
                    </button>

                    {hasApplied ? (
                      <button
                        onClick={() => {
                          const app = applications.find(a => a.jobId === job.id);
                          setSelectedApp(app || { jobId: job.id, status: 'SHORTLISTED', matchScore });
                          setSelectedJob(job);
                          setStatusModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg inline-flex items-center space-x-1.5 transition-all shadow-2xs cursor-pointer group"
                        title="Click to view shortlist status & timeline"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                        <span>Applied • View Shortlist</span>
                      </button>
                    ) : isEligible ? (
                      <button
                        onClick={() => handleApply(job.id)}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-2xs flex items-center space-x-1.5 cursor-pointer active:scale-98"
                      >
                        <Send className="w-3 h-3" />
                        <span>Apply Now</span>
                      </button>
                    ) : (
                      <div className="flex flex-col items-end gap-1">
                        <button
                          disabled
                          title={`Minimum ${minThreshold}% match score required to apply directly`}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-lg cursor-not-allowed flex items-center space-x-1"
                        >
                          <Lock className="w-3 h-3 text-slate-400" />
                          <span>Min {minThreshold}% Req</span>
                        </button>
                        <Link 
                          to="/student/skill-gap" 
                          className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center"
                        >
                          Bridge Gap ({minThreshold - matchScore}% needed) →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Explainable Fit Modal */}
      <ExplainableMatchModal
        job={selectedJob}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onApply={(jobId) => {
          handleApply(jobId);
          setModalOpen(false);
        }}
      />

      {/* Shortlist & Application Status Modal */}
      <ApplicationStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        application={selectedApp}
        job={selectedJob}
      />

    </div>
  );
};


