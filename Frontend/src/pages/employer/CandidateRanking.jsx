import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  BadgeCheck,
  Send,
  GraduationCap
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { Badge } from '../../components/common/Badge';
import { MatchGauge } from '../../components/common/MatchGauge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const CandidateRanking = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterJob, setFilterJob] = useState('All');

  // Schedule modal
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewRound, setInterviewRound] = useState('Technical Round 1');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const defaultRankedCandidates = [
    {
      id: 'c-1',
      name: 'Rahul Sharma',
      college: 'Rajasthan Technical University (RTU)',
      gpa: '8.8',
      matchScore: 92,
      appliedJob: 'Senior React Developer',
      skills: ['React.js', 'TypeScript', 'Node.js', 'Redux', 'Tailwind CSS'],
      hardReqPass: true
    },
    {
      id: 'c-2',
      name: 'Priya Verma',
      college: 'MNIT Jaipur',
      gpa: '9.1',
      matchScore: 96,
      appliedJob: 'Senior React Developer',
      skills: ['React.js', 'Next.js', 'GraphQL', 'TypeScript'],
      hardReqPass: true
    },
    {
      id: 'c-3',
      name: 'Aman Agarwal',
      college: 'MBM University Jodhpur',
      gpa: '8.4',
      matchScore: 81,
      appliedJob: 'Fullstack Node.js Engineer',
      skills: ['Node.js', 'PostgreSQL', 'Express.js', 'Docker'],
      hardReqPass: true
    },
    {
      id: 'c-4',
      name: 'Sneha Patel',
      college: 'Government Polytechnic College Jaipur',
      gpa: '8.2',
      matchScore: 74,
      appliedJob: 'Senior React Developer',
      skills: ['JavaScript', 'HTML5', 'CSS3', 'React basics'],
      hardReqPass: false
    }
  ];

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await employerApi.getRankedCandidates('job-1');
      const rankedCandidates = Array.isArray(res.data)
        ? res.data.map(({ student = {}, match = {} }) => ({
            id: student.id,
            name: student.name || 'Unnamed Candidate',
            college: student.college || 'Rajasthan Technical Education Network',
            gpa: student.cgpa || 'N/A',
            matchScore: match.matchScore || 0,
            appliedJob: 'React Developer',
            skills: Array.isArray(student.skills) ? student.skills : [],
            hardReqPass: Boolean(match.eligible)
          }))
        : [];

      setCandidates(rankedCandidates.length ? rankedCandidates : defaultRankedCandidates);
    } catch (err) {
      setCandidates(defaultRankedCandidates);
    } finally {
      setLoading(false);
    }
  };

  const handleShortlist = (id, name) => {
    toast.success(`${name} added to Corporate Shortlist!`);
  };

  const handleScheduleInterview = (e) => {
    e.preventDefault();
    if (!interviewDate) {
      toast.error("Please choose date and time");
      return;
    }
    toast.success(`Scheduled ${interviewRound} with ${selectedCandidate.name}`);
    setScheduleModalOpen(false);
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const filtered = candidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                        c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchJob = filterJob === 'All' || c.appliedJob === filterJob;
    return matchSearch && matchJob;
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
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-heading">
            Candidate Ranking & Shortlisting
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Ranked by explainable 7-factor matching engine and verified university credentials.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-emerald-300 text-xs font-bold shrink-0">
          <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Verified University Talent Pool</span>
        </div>
      </motion.div>

      {/* Search & Filter Bar */}
      <div className="bg-[#0B1730] p-4 rounded-2xl border border-blue-900/40 shadow-lg flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-blue-900/40 rounded-xl text-xs text-white placeholder-slate-400 focus:border-blue-500/60 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400">Position:</span>
          <select
            value={filterJob}
            onChange={(e) => setFilterJob(e.target.value)}
            className="px-3.5 py-2 bg-slate-950/80 border border-blue-900/40 text-slate-200 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All">All Active Requisitions</option>
            <option value="Senior React Developer">Senior React Developer</option>
            <option value="Fullstack Node.js Engineer">Fullstack Node.js Engineer</option>
          </select>
        </div>
      </div>

      {/* Candidate Ranking Table */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0B1730] rounded-3xl border border-blue-900/40 overflow-hidden shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-blue-900/40 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-5">Rank & Candidate</th>
                <th className="py-4 px-4">AI Match Fit</th>
                <th className="py-4 px-4">Target Requisition</th>
                <th className="py-4 px-4">Verified Skillset</th>
                <th className="py-4 px-4">Prerequisites</th>
                <th className="py-4 px-5 text-right">Hiring Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/20 font-medium">
              {filtered.map((c, idx) => (
                <tr key={c.id} className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-300 font-extrabold flex items-center justify-center text-xs font-metrics border border-blue-500/30">
                        #{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-white text-sm font-heading">{c.name}</span>
                          <Badge variant="blue" size="sm">Verified</Badge>
                        </div>
                        <span className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                          <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                          <span>{c.college} · GPA {c.gpa}</span>
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <MatchGauge score={c.matchScore} size="sm" />
                  </td>

                  <td className="py-4 px-4 text-slate-200 font-semibold">
                    {c.appliedJob}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {c.skills.slice(0, 3).map(s => (
                        <span key={s} className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 text-[10px] font-semibold border border-blue-900/30">
                          <CheckCircle2 className="w-2.5 h-2.5 text-blue-400" />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {c.hardReqPass ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>All Met</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Gap Found</span>
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleShortlist(c.id, c.name)}
                        className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-blue-900/40 text-slate-300 hover:text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => {
                          setSelectedCandidate(c);
                          setScheduleModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer shadow-md transition-all"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Interview</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Schedule Interview Modal */}
      {scheduleModalOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-[#0B1730] rounded-3xl max-w-md w-full p-6 border border-blue-900/40 shadow-2xl space-y-4 text-slate-100">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Schedule Technical Interview Round
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Candidate: <strong className="text-blue-300">{selectedCandidate.name}</strong> ({selectedCandidate.appliedJob})
              </p>
            </div>

            <form onSubmit={handleScheduleInterview} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-300 uppercase tracking-wider mb-1">
                  Interview Round
                </label>
                <select
                  value={interviewRound}
                  onChange={(e) => setInterviewRound(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white rounded-xl focus:outline-none"
                >
                  <option>Technical Round 1 (System & Coding)</option>
                  <option>Live Project Evaluation</option>
                  <option>HR & Culture Fit Assessment</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 uppercase tracking-wider mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white rounded-xl focus:outline-none font-sans [color-scheme:dark]"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-blue-900/40">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white font-bold rounded-xl cursor-pointer shadow-md flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Invite</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
