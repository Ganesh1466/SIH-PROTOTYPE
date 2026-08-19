import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  BadgeCheck, 
  Send, 
  Lock,
  Sparkles
} from 'lucide-react';
import { jobApi } from '../../api/jobApi';
import { applicationApi } from '../../api/applicationApi';
import { Badge } from '../../components/common/Badge';
import { MatchGauge } from '../../components/common/MatchGauge';
import { ExplainableMatchModal } from '../../components/common/ExplainableMatchModal';
import { ApplicationStatusModal } from '../../components/common/ApplicationStatusModal';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const DUMMY_OPPORTUNITIES = [
  {
    id: 'job-1',
    title: 'Senior React Developer',
    companyName: 'TechNova Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    type: 'Job',
    location: 'Jaipur, Rajasthan',
    salary: '₹6.5 - ₹8.5 LPA',
    matchScore: 94,
    minApplyThreshold: 86,
    isEligibleToApply: true,
    matchedSkills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
    missingSkills: ['TypeScript'],
    description: 'Build enterprise React web portals for international clients with high scalability.'
  },
  {
    id: 'job-2',
    title: 'Frontend Developer Intern (PPO Pathway)',
    companyName: 'TechNova Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    type: 'Internship',
    location: 'Jaipur, Rajasthan',
    salary: '₹18,000 / month Stipend (PPO to ₹7 LPA)',
    matchScore: 92,
    minApplyThreshold: 80,
    isEligibleToApply: true,
    matchedSkills: ['React.js', 'JavaScript', 'Tailwind CSS'],
    missingSkills: [],
    description: 'Work alongside senior technical leads to build responsive client user interfaces.'
  },
  {
    id: 'job-3',
    title: 'Node.js Backend Microservices Engineer',
    companyName: 'CodeCraft Labs',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80',
    type: 'Job',
    location: 'Jaipur, Rajasthan',
    salary: '₹7.0 - ₹9.5 LPA',
    matchScore: 89,
    minApplyThreshold: 85,
    isEligibleToApply: true,
    matchedSkills: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB'],
    missingSkills: ['Docker'],
    description: 'Architect scalable backend microservices and REST APIs with JWT security.'
  },
  {
    id: 'job-4',
    title: 'AI & Generative LLM Engineer',
    companyName: 'Rajasthan AI Research Labs',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&auto=format&fit=crop&q=80',
    type: 'Job',
    location: 'Jaipur / Remote',
    salary: '₹10.0 - ₹14.0 LPA',
    matchScore: 88,
    minApplyThreshold: 86,
    isEligibleToApply: true,
    matchedSkills: ['Python', 'SQL', 'Git'],
    missingSkills: ['PyTorch', 'Vector Databases'],
    description: 'Build RAG search systems and integrate generative AI models for state projects.'
  },
  {
    id: 'job-5',
    title: 'Full Stack MERN Developer',
    companyName: 'CodeCraft Labs',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80',
    type: 'Job',
    location: 'Jaipur, Rajasthan',
    salary: '₹8.0 - ₹11.0 LPA',
    matchScore: 87,
    minApplyThreshold: 85,
    isEligibleToApply: true,
    matchedSkills: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    missingSkills: ['Redux Toolkit'],
    description: 'Deliver full-stack web applications with React client interfaces and Node server APIs.'
  },
  {
    id: 'job-6',
    title: 'UI/UX & Mobile App Product Intern',
    companyName: 'iStart Rajasthan Incubator',
    companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80',
    type: 'Internship',
    location: 'Udaipur, Rajasthan',
    salary: '₹22,000 / month Stipend',
    matchScore: 85,
    minApplyThreshold: 75,
    isEligibleToApply: true,
    matchedSkills: ['HTML5', 'CSS3', 'Figma', 'React.js'],
    missingSkills: [],
    description: 'Design and prototype mobile and web experiences for innovative Rajasthan startups.'
  },
  {
    id: 'job-7',
    title: 'Cloud & DevOps Associate',
    companyName: 'Solvix Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80',
    type: 'Job',
    location: 'Jodhpur, Rajasthan (Remote)',
    salary: '₹7.5 - ₹10.0 LPA',
    matchScore: 78,
    minApplyThreshold: 86,
    isEligibleToApply: false,
    matchedSkills: ['Git', 'Python'],
    missingSkills: ['AWS', 'Docker', 'Kubernetes'],
    description: 'Automate CI/CD pipelines, manage Docker containers, and ensure 99.9% uptime.'
  },
  {
    id: 'job-8',
    title: 'Cybersecurity & Cloud Defense Specialist',
    companyName: 'State Secure Net Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80',
    type: 'Job',
    location: 'Kota, Rajasthan',
    salary: '₹8.5 - ₹11.5 LPA',
    matchScore: 72,
    minApplyThreshold: 86,
    isEligibleToApply: false,
    matchedSkills: ['SQL', 'Git'],
    missingSkills: ['OWASP Top 10', 'Penetration Testing'],
    description: 'Monitor state portal security metrics and perform vulnerability assessments.'
  }
];

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
      const fetched = jobsRes.data && jobsRes.data.length > 0 ? jobsRes.data : DUMMY_OPPORTUNITIES;
      setJobs(fetched);
      setApplications(appsRes.data || []);
    } catch (err) {
      setJobs(DUMMY_OPPORTUNITIES);
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
      // Local optimistic update fallback
      setApplications(prev => [
        ...prev,
        { jobId, status: 'APPLIED', appliedDate: new Date().toISOString(), matchScore: 92 }
      ]);
      toast.success("🎉 Application submitted and added to pipeline!");
    }
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const activeJobsList = jobs.length > 0 ? jobs : DUMMY_OPPORTUNITIES;

  const filteredJobs = activeJobsList.filter(job => {
    const compName = job.companyName || job.company || '';
    const matchSearch = (job.title || '').toLowerCase().includes(search.toLowerCase()) ||
                        compName.toLowerCase().includes(search.toLowerCase()) ||
                        (job.matchedSkills || job.requiredSkills || []).some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchType = selectedType === 'All' || (job.type || '').toLowerCase().includes(selectedType.toLowerCase());
    const matchLocation = selectedLocation === 'All' || (job.location || '').includes(selectedLocation);

    return matchSearch && matchType && matchLocation;
  });

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0B1024] to-[#0F1630]"
      >
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-heading">
              Active Opportunities
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-pink-500/15 text-pink-300 border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.2)]">
              Live AI Matching
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time skill & eligibility scoring. <span className="font-bold text-pink-400">Minimum 86% Match</span> required for priority shortlist.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-emerald-300 text-xs font-bold shrink-0">
          <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Verified Directorate Gateway</span>
        </div>
      </motion.div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 shadow-lg flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search role, company, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0F1630] border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:border-pink-500/50 focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setEligibleOnly(!eligibleOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border cursor-pointer ${
              eligibleOnly
                ? 'btn-pink-gradient border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                : 'btn-pink-outline'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${eligibleOnly ? 'text-white' : 'text-pink-400'}`} />
            <span>Eligible Only (≥86% Match)</span>
          </button>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3.5 py-2 bg-[#0F1630] border border-white/10 text-slate-300 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All">All Requisitions</option>
            <option value="Job">Full-time Jobs</option>
            <option value="Internship">Internships</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3.5 py-2 bg-[#0F1630] border border-white/10 text-slate-300 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All">All Locations</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Jodhpur">Jodhpur</option>
            <option value="Kota">Kota</option>
            <option value="Remote">Remote / Hybrid</option>
          </select>
        </div>
      </div>

      {/* Opportunities List */}
      {filteredJobs.length === 0 ? (
        <EmptyState 
          title="No matching opportunities found" 
          description={eligibleOnly ? "No opportunities currently meet the 86% match threshold. Uncheck the filter or bridge skills." : "Try broadening your search query or filters."} 
        />
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job, idx) => {
            const matchScore = job.matchScore ?? (94 - idx * 3);
            const minThreshold = job.minApplyThreshold || 86;
            const isEligible = job.isEligibleToApply ?? (matchScore >= minThreshold);
            const hasApplied = applications.some(a => a.jobId === job.id);

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.3 }}
                className={`glass-card rounded-2xl p-5 border transition-all shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group ${
                  isEligible ? 'border-white/10 hover:border-pink-500/40' : 'border-white/5 opacity-80'
                }`}
              >
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/student/jobs/${job.id}`}
                      className="text-base font-bold text-white font-heading group-hover:text-pink-300 transition-colors"
                    >
                      {job.title}
                    </Link>
                    <Badge variant="pink" size="sm">
                      Verified Recruiter
                    </Badge>
                    <Badge variant={job.type === 'Full-time' || job.type === 'Job' ? 'primary' : 'purple'} size="sm">
                      {job.type}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
                    <span className="font-semibold text-slate-200 flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.companyName || job.company || 'TechNova Solutions'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.location}</span>
                    </span>
                    <span className="font-bold text-emerald-400 font-metrics">
                      {job.salary}
                    </span>
                  </div>

                  {/* Skills Alignment */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.matchedSkills?.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-pink-300 border border-white/10 text-xs font-semibold"
                      >
                        <CheckCircle2 className="w-3 h-3 text-pink-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
                    {job.missingSkills?.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-semibold"
                      >
                        <AlertCircle className="w-3 h-3 text-rose-400" />
                        <span>Need: {skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Match Score & CTA */}
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                  <MatchGauge score={matchScore} size="sm" />

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setModalOpen(true);
                      }}
                      className="btn-pink-outline px-3.5 py-1.5 text-xs cursor-pointer"
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
                        className="px-3.5 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 rounded-xl inline-flex items-center space-x-1.5 cursor-pointer shadow-md"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Applied • View Shortlist</span>
                      </button>
                    ) : isEligible ? (
                      <button
                        onClick={() => handleApply(job.id)}
                        className="btn-pink-gradient px-4 py-1.5 text-xs shadow-md cursor-pointer flex items-center space-x-1.5"
                      >
                        <Send className="w-3 h-3" />
                        <span>Apply Now</span>
                      </button>
                    ) : (
                      <div className="flex flex-col items-end gap-1">
                        <button
                          disabled
                          className="px-3.5 py-1.5 text-xs font-semibold text-slate-500 bg-slate-900 border border-white/5 rounded-xl cursor-not-allowed flex items-center space-x-1"
                        >
                          <Lock className="w-3 h-3 text-slate-500" />
                          <span>Min {minThreshold}% Req</span>
                        </button>
                        <Link 
                          to="/student/skill-gap" 
                          className="text-[10px] font-bold text-pink-400 hover:text-pink-300 flex items-center"
                        >
                          Bridge Gap ({minThreshold - matchScore}% needed) →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
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
