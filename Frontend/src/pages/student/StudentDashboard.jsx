import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  FolderGit2,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { studentApi } from '../../api/studentApi';
import { jobApi } from '../../api/jobApi';
import { applicationApi } from '../../api/applicationApi';
import { Badge } from '../../components/common/Badge';
import { MatchGauge } from '../../components/common/MatchGauge';
import { ExplainableMatchModal } from '../../components/common/ExplainableMatchModal';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const StudentDashboard = () => {
  const navigate = useNavigate();
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
  const completion = profile?.profile_completion || 86;
  const isProfileEmpty = !personal.full_name && skills.length === 0;

  // Sample skill gaps for diagnostic visualization
  const skillGaps = [
    { name: 'React & Next.js', score: 92, target: '95%' },
    { name: 'JavaScript / ES6+', score: 88, target: '90%' },
    { name: 'TypeScript', score: 65, target: '80%' },
    { name: 'Automated Testing', score: 45, target: '70%' },
  ];

  const applicationTimeline = [
    { label: 'Applied', count: applications.length || 3, status: 'completed' },
    { label: 'Shortlisted', count: 2, status: 'active' },
    { label: 'Assessment', count: 1, status: 'pending' },
    { label: 'Interview', count: 1, status: 'pending' },
    { label: 'Offer', count: 0, status: 'pending' },
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100 pb-8">
      
      {/* 1. HERO SECTION (AI-Powered Career Command Center) */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl bg-gradient-to-r from-[#0B1024] via-[#0F1630] to-[#121A38]"
      >
        {/* Ambient Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold shadow-[0_0_12px_rgba(236,72,153,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>AI Career Intelligence Active</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Student Node</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
              Build your next career move.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Discover opportunities matched intelligently to your verified skills, education, and Rajasthan Tech Directorate goals.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/student/jobs')}
                className="btn-pink-gradient px-6 py-3 text-xs sm:text-sm font-bold shadow-lg flex items-center space-x-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Explore Opportunities</span>
              </button>
              <button
                onClick={() => navigate('/student/passport')}
                className="btn-pink-outline px-5 py-3 text-xs sm:text-sm font-bold flex items-center space-x-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Complete Profile ({completion}%)</span>
              </button>
            </div>
          </div>

          {/* Student Profile Strength Box */}
          <div className="w-full lg:w-72 glass-card-elevated p-5 rounded-2xl border border-white/15 space-y-3.5 shadow-xl shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-heading">Profile Strength</span>
              <span className="text-sm font-extrabold text-pink-400 font-metrics">{completion}%</span>
            </div>

            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            <p className="text-xs text-slate-300 font-medium">
              {completion >= 80 ? '"Your profile is highly competitive in Rajasthan hiring drives."' : '"Complete 2 remaining sections to maximize shortlist odds."'}
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
              <span>Verified Node:</span>
              <span className="text-emerald-400 font-bold">RTU-JAIPUR #841</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. STATISTICAL METRICS COUNTER GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Profile Readiness', value: `${completion}%`, sub: 'Market Competitive', icon: Target, color: 'text-pink-400', border: 'border-pink-500/30' },
          { label: 'Verified Skills', value: skills.length || 5, sub: 'Top Stack Matched', icon: Award, color: 'text-cyan-400', border: 'border-cyan-500/30' },
          { label: 'Active Pipeline', value: applications.length || 3, sub: 'Shortlist Pending', icon: Send, color: 'text-emerald-400', border: 'border-emerald-500/30' },
          { label: 'Verified Repos', value: projects.length || 2, sub: 'GitHub Connected', icon: FolderGit2, color: 'text-amber-400', border: 'border-amber-500/30' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`glass-card p-5 rounded-2xl border ${stat.border} space-y-2 hover:translate-y-[-3px] transition-transform`}
            >
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-white font-metrics tracking-tight">{stat.value}</div>
              <div className="text-[11px] text-slate-400 font-medium flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{stat.sub}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. APPLICATION TRACKER RECRUITMENT TIMELINE */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 rounded-3xl border border-white/10 space-y-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
              <Clock className="w-5 h-5 text-pink-400" />
              <span>Application Pipeline Timeline</span>
            </h3>
            <p className="text-xs text-slate-400">Track your recruitment milestones in real time</p>
          </div>
          <Link to="/student/applications" className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center space-x-1">
            <span>View Tracker</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {applicationTimeline.map((stage, idx) => (
            <div key={stage.label} className="relative">
              <div className={`p-3.5 rounded-2xl border transition-all text-center space-y-1 ${
                stage.status === 'completed'
                  ? 'bg-pink-500/10 border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.15)]'
                  : stage.status === 'active'
                    ? 'bg-fuchsia-500/15 border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.25)]'
                    : 'bg-slate-900/50 border-white/5 opacity-60'
              }`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Stage 0{idx + 1}</span>
                <span className="text-xs font-bold text-white font-heading block">{stage.label}</span>
                <span className="text-xs font-extrabold text-pink-400 font-metrics block">{stage.count} Active</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. MAIN SPLIT: RECOMMENDED JOBS & SKILL GAP DIAGNOSTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RECOMMENDED JOBS (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white font-heading tracking-tight flex items-center space-x-2">
                <Zap className="w-5 h-5 text-pink-400" />
                <span>Recommended Opportunities (AI Match)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Ranked by 7-factor AI matching against your verified Career Passport skills.
              </p>
            </div>
            <Link to="/student/jobs" className="text-xs text-pink-400 font-bold hover:text-pink-300 flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {jobs.map((job, idx) => {
              const matchScore = job.matchScore || (92 - idx * 4);
              const hasApplied = applications.some(a => a.jobId === job.id);

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-pink-500/40 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                >
                  <div className="space-y-2.5 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 font-bold text-xs flex items-center justify-center font-heading shrink-0">
                        {job.company?.[0] || 'C'}
                      </div>
                      <h3 className="text-base font-bold text-white font-heading group-hover:text-pink-300 transition-colors">
                        {job.title}
                      </h3>
                      <Badge variant="pink" size="sm">
                        Verified Corporate
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
                      <span className="font-semibold text-slate-200 flex items-center space-x-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.company}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.location}</span>
                      </span>
                      <span className="font-bold text-emerald-400 font-metrics">
                        {job.salary}
                      </span>
                    </div>

                    {/* Skill Alignment Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.requiredSkills?.slice(0, 4).map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-pink-300 border border-white/10 text-xs font-semibold"
                        >
                          <CheckCircle2 className="w-3 h-3 text-pink-400" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Match Score */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <MatchGauge score={matchScore} size="sm" />

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenModal(job)}
                        className="btn-pink-outline px-3.5 py-1.5 text-xs cursor-pointer"
                      >
                        Explain Fit
                      </button>

                      {hasApplied ? (
                        <span className="px-3.5 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 rounded-xl inline-flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Applied</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleQuickApply(job.id)}
                          className="btn-pink-gradient px-4 py-1.5 text-xs shadow-md cursor-pointer"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SKILL GAP & LEARNING DIAGNOSTICS (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-white font-heading tracking-tight flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            <span>Skill Gap Analysis</span>
          </h2>

          <div className="glass-card rounded-3xl p-5 border border-white/10 space-y-5">
            <p className="text-xs text-slate-300 leading-relaxed">
              Target requirements derived from top Jaipur & NCR IT job postings:
            </p>

            <div className="space-y-4">
              {skillGaps.map((sg) => (
                <div key={sg.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>{sg.name}</span>
                    <span className="text-pink-400 font-metrics">{sg.score}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div
                      className={`h-full rounded-full ${
                        sg.score >= 85 ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_0_8px_rgba(236,72,153,0.4)]' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${sg.score}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-pink-500/10 rounded-2xl border border-pink-500/20 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-pink-300 block">💡 Learning Recommendation:</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Improve your <strong>TypeScript & Testing</strong> skills to unlock 12 more high-paying opportunities.
              </p>
              <Link
                to="/student/learning-path"
                className="btn-pink-gradient w-full py-2 text-center text-xs font-bold block shadow-md mt-2"
              >
                View Recommended Learning Path
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Explainable Fit Modal */}
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
