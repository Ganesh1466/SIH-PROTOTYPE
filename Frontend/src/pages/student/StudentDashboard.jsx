import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  UserCheck, 
  Send, 
  Calendar, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  MapPin, 
  Building2, 
  Sparkles,
  ShieldCheck,
  Award,
  Target,
  Zap,
  BadgeCheck,
  Clock,
  ExternalLink,
  Edit3,
  FolderGit2
} from 'lucide-react';
import { studentApi } from '../../api/studentApi';
import { jobApi } from '../../api/jobApi';
import { applicationApi } from '../../api/applicationApi';
import { Badge } from '../../components/common/Badge';
import { ExplainableMatchModal } from '../../components/common/ExplainableMatchModal';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

export const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [profileRes, jobsRes, appsRes] = await Promise.all([
        studentApi.getProfile().catch(() => null),
        jobApi.getAll({ limit: 4 }).catch(() => ({ data: [] })),
        applicationApi.getByStudent('stu-1').catch(() => ({ data: [] }))
      ]);

      const prof = profileRes?.data?.data || profileRes?.data || profileRes || null;
      setProfile(prof);
      setJobs(jobsRes?.data || (Array.isArray(jobsRes) ? jobsRes : []));
      setApplications(appsRes?.data || (Array.isArray(appsRes) ? appsRes : []));
    } catch (err) {
      console.error("Dashboard load warning:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleQuickApply = async (jobId) => {
    try {
      await applicationApi.apply({ jobId, studentId: 'stu-1' });
      toast.success("Application successfully submitted!");
      fetchDashboardData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    }
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const personal = profile?.personal || {};
  const education = profile?.education || {};
  const skills = profile?.skills || [];
  const projects = profile?.projects || [];
  const completion = profile?.profile_completion || 0;
  const isProfileEmpty = !personal.full_name && skills.length === 0;

  return (
    <div className="space-y-8 font-sans text-[#171A21]">
      
      {/* If profile is incomplete / empty, prompt to build Career Passport */}
      {isProfileEmpty ? (
        <div className="bg-white rounded-2xl p-7 border border-indigo-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div className="space-y-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
              Action Required
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Complete your Student Career Passport
            </h2>
            <p className="text-xs text-slate-600 max-w-lg">
              Add your education, technical skills, projects, and career preferences to receive explainable job and internship recommendations.
            </p>
          </div>

          <Link
            to="/student/passport"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Build Career Passport →</span>
          </Link>
        </div>
      ) : (
        /* 1. Verified Real Student Greeting Header */
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E9EE] shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Good morning, {personal.full_name}
              </h1>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-2xs">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Student Node</span>
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-slate-500">
              <span className="flex items-center space-x-1 text-slate-700 font-semibold">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>{education.degree || 'B.Tech'} in {education.branch || 'Engineering'} · {education.college_name || 'Rajasthan Technical University'}</span>
              </span>
              <span className="flex items-center space-x-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{personal.city || 'Jaipur'}, {personal.state || 'Rajasthan'}</span>
              </span>
            </div>
          </div>

          <Link
            to="/student/passport"
            className="px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors flex items-center space-x-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Manage Career Passport</span>
          </Link>
        </div>
      )}

      {/* 2. Four Actionable Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E7E9EE] shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Passport Completion</span>
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{completion}%</div>
          <div className="text-xs text-indigo-700 font-bold flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{completion >= 80 ? 'Market Ready' : 'In Progress'}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7E9EE] shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Verified Skills</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{skills.length}</div>
          <div className="text-xs text-emerald-700 font-bold flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{skills.length >= 3 ? 'Meets Top Requisitions' : 'Add More Skills'}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7E9EE] shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Active Applications</span>
            <Send className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{applications.length}</div>
          <div className="text-xs text-sky-700 font-bold flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>Pipeline Active</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7E9EE] shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Portfolio Projects</span>
            <FolderGit2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600">{projects.length}</div>
          <div className="text-xs text-slate-500 font-medium">Verified Repositories</div>
        </div>
      </div>

      {/* 3. Main Split Section: Recommended Opportunities & Career Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recommended Jobs (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Recommended Opportunities (Explainable Fit)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Ranked by 7-factor match against your verified Career Passport skills.
              </p>
            </div>
            <Link to="/student/jobs" className="text-sm text-indigo-600 font-bold hover:underline">
              View All Openings →
            </Link>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => {
              const matchScore = job.matchScore || 85;
              const hasApplied = applications.some(a => a.jobId === job.id);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-xl p-5 border border-[#E7E9EE] hover:border-indigo-200 transition-all shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 hover:text-indigo-600">
                        {job.title}
                      </h3>
                      <span className="inline-flex items-center space-x-1 px-2 py-0.2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Corporate Partner</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                      <span className="font-semibold text-slate-700 flex items-center space-x-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.company}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </span>
                      <span className="font-bold text-slate-800">
                        {job.salary}
                      </span>
                    </div>

                    {/* Skill Alignment Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.requiredSkills?.map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Match Score */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-semibold block">Explainable Match</span>
                      <span className="text-xl font-extrabold text-indigo-700">{matchScore}%</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenModal(job)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                      >
                        Explain Fit
                      </button>

                      {hasApplied ? (
                        <span className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg inline-flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Applied</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleQuickApply(job.id)}
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-2xs cursor-pointer"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Career Readiness Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Readiness Diagnostics</span>
          </h2>

          <div className="bg-white rounded-xl p-5 border border-[#E7E9EE] shadow-2xs space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Passport Benchmark
                </span>
                <span className="text-sm font-extrabold text-indigo-600">{completion} / 100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${completion}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                {completion >= 80 
                  ? 'High alignment for verified software engineering requisitions.' 
                  : 'Complete pending passport sections to increase interview invites.'}
              </p>
            </div>

            {/* Verified Strengths from Real Skills */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Verified Technical Stack ({skills.length})
              </span>
              <div className="space-y-1.5 text-xs">
                {skills.length === 0 ? (
                  <p className="text-slate-400 italic">No skills added in Career Passport.</p>
                ) : (
                  skills.slice(0, 3).map((s) => {
                    const name = typeof s === 'string' ? s : s.skill_name;
                    return (
                      <div key={name} className="flex items-center space-x-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold">{name}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <Link
              to="/student/passport"
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors block shadow-2xs"
            >
              Update Career Passport →
            </Link>
          </div>
        </div>

      </div>

      {/* Explainable Fit Breakdown Modal */}
      <ExplainableMatchModal
        job={selectedJob}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onApply={(jobId) => {
          handleQuickApply(jobId);
          setModalOpen(false);
        }}
      />

    </div>
  );
};
