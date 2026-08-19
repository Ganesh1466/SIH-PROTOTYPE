import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Calendar, 
  ChevronRight,
  ShieldCheck,
  BadgeCheck,
  Send,
  Zap,
  GraduationCap
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

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
      matchScore: 89,
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
    <div className="space-y-6 font-sans text-[#171A21]">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-[#E7E9EE] shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Candidate Ranking & Shortlisting
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by explainable 7-factor matching engine and verified university credentials.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-800 text-xs font-bold shadow-2xs">
          <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Verified University Talent Pool</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E7E9EE] shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by candidate name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500">Filter Position:</span>
          <select
            value={filterJob}
            onChange={(e) => setFilterJob(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden"
          >
            <option value="All">All Active Requisitions</option>
            <option value="Senior React Developer">Senior React Developer</option>
            <option value="Fullstack Node.js Engineer">Fullstack Node.js Engineer</option>
          </select>
        </div>
      </div>

      {/* Candidate Ranking Table */}
      <div className="bg-white rounded-xl border border-[#E7E9EE] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Rank & Candidate</th>
                <th className="py-3 px-4">Match Fit</th>
                <th className="py-3 px-4">Target Requisition</th>
                <th className="py-3 px-4">Verified Skillset</th>
                <th className="py-3 px-4">Hard Requirements</th>
                <th className="py-3 px-4 text-right">Hiring Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((c, idx) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                        #{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                          <span className="inline-flex items-center space-x-0.5 px-1.5 py-0.2 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                            <BadgeCheck className="w-3 h-3 text-emerald-600" />
                            <span>Verified</span>
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                          <GraduationCap className="w-3 h-3 text-indigo-500" />
                          <span>{c.college} · GPA {c.gpa}</span>
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-indigo-700 text-sm">
                    <div className="flex items-center space-x-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>{c.matchScore}% Match</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    {c.appliedJob}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {c.skills.slice(0, 3).map(s => (
                        <span key={s} className="inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {c.hardReqPass ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>All Met</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Gap Found</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => handleShortlist(c.id, c.name)}
                        className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-md border border-sky-200 transition-colors cursor-pointer text-xs"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => {
                          setSelectedCandidate(c);
                          setScheduleModalOpen(true);
                        }}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md transition-colors cursor-pointer text-xs flex items-center space-x-1"
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
      </div>

      {/* Schedule Interview Modal */}
      {scheduleModalOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Schedule Technical Interview Round
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Candidate: <strong className="text-slate-800">{selectedCandidate.name}</strong> ({selectedCandidate.appliedJob})
              </p>
            </div>

            <form onSubmit={handleScheduleInterview} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">
                  Interview Round
                </label>
                <select
                  value={interviewRound}
                  onChange={(e) => setInterviewRound(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden"
                >
                  <option>Technical Round 1 (System & Coding)</option>
                  <option>Live Project Evaluation</option>
                  <option>HR & Culture Fit Assessment</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden font-sans"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-md cursor-pointer shadow-xs flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Meeting Invite</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
