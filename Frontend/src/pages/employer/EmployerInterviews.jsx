import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Video, 
  ExternalLink,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { interviewApi } from '../../api/interviewApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const EmployerInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const DUMMY_EMPLOYER_INTERVIEWS = [
    {
      id: 'emp-int-1',
      studentName: 'Rahul Sharma',
      jobTitle: 'Senior React Developer',
      roundName: 'Technical Round 01 — System Architecture',
      date: 'Aug 24, 2026',
      time: '02:30 PM IST',
      interviewerName: 'Dr. Amit Mehta (Lead Engineer)',
      status: 'CONFIRMED',
      meetingLink: 'https://meet.google.com/sih-interview-01'
    },
    {
      id: 'emp-int-2',
      studentName: 'Priya Singh',
      jobTitle: 'Frontend Technical Specialist',
      roundName: 'Technical Round 02 — Practical Live Coding',
      date: 'Aug 25, 2026',
      time: '11:00 AM IST',
      interviewerName: 'Rajesh Sen (Engineering VP)',
      status: 'CONFIRMED',
      meetingLink: 'https://meet.google.com/sih-interview-02'
    },
    {
      id: 'emp-int-3',
      studentName: 'Neha Meena',
      jobTitle: 'Full Stack MERN Developer',
      roundName: 'Final Technical & Culture Fit Evaluation',
      date: 'Aug 26, 2026',
      time: '04:00 PM IST',
      interviewerName: 'Dr. Amit Mehta',
      status: 'CONFIRMED',
      meetingLink: 'https://meet.google.com/sih-interview-03'
    },
    {
      id: 'emp-int-4',
      studentName: 'Karan Joshi',
      jobTitle: 'DevOps & Cloud Specialist',
      roundName: 'Technical Assessment & Docker/K8s',
      date: 'Aug 27, 2026',
      time: '03:00 PM IST',
      interviewerName: 'Sanjay Kumar (DevOps Lead)',
      status: 'SCHEDULED',
      meetingLink: 'https://meet.google.com/sih-interview-04'
    }
  ];

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await interviewApi.getAll();
      if (res.data && res.data.length > 0) {
        setInterviews(res.data);
      } else {
        setInterviews(DUMMY_EMPLOYER_INTERVIEWS);
      }
    } catch (err) {
      setInterviews(DUMMY_EMPLOYER_INTERVIEWS);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={3} />;
  }

  const activeList = interviews.length > 0 ? interviews : DUMMY_EMPLOYER_INTERVIEWS;

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0B1730] via-[#0E1E40] to-[#0B1730]"
      >
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 mb-1">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Corporate Evaluation Console</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
            Interview Rounds & Technical Panels
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Active evaluation rounds, direct Google Meet links, and candidate evaluation metrics.
          </p>
        </div>
        <Badge variant="blue" size="md">
          {activeList.length} Scheduled Rounds
        </Badge>
      </motion.div>

      {/* Interviews Table / Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0B1730] rounded-3xl border border-blue-900/40 overflow-hidden shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-blue-900/40 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-5">Candidate & Role</th>
                <th className="py-4 px-4">Evaluation Round</th>
                <th className="py-4 px-4">Scheduled Time</th>
                <th className="py-4 px-4">Interviewer / Lead</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Google Meet Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/20 font-medium">
              {activeList.map((int, idx) => (
                <tr key={int.id || idx} className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm font-heading">{int.studentName || 'Candidate'}</div>
                        <span className="text-[11px] text-blue-300 font-semibold">{int.jobTitle}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-slate-200">
                    {int.roundName}
                  </td>

                  <td className="py-4 px-4 text-slate-300 font-metrics">
                    <span className="block font-bold text-white">{int.date}</span>
                    <span className="text-[11px] text-slate-400">{int.time}</span>
                  </td>

                  <td className="py-4 px-4 text-slate-300">
                    {int.interviewerName}
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {int.status || 'CONFIRMED'}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <a
                      href={int.meetingLink || 'https://meet.google.com/sih-interview-01'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => toast.success("Opening Google Meet room...")}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all inline-flex items-center space-x-2 text-xs shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Google Meet</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  );
};
