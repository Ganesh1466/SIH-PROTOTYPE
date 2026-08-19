import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Video, 
  BookOpen,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { interviewApi } from '../../api/interviewApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const StudentInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const DUMMY_INTERVIEWS = [
    {
      id: 'int-101',
      roundName: 'Technical Round 01 — Frontend System Design',
      jobTitle: 'Frontend Technical Specialist',
      companyName: 'TechNova Solutions (Jaipur Node)',
      status: 'CONFIRMED',
      date: 'Aug 24, 2026',
      time: '02:30 PM IST',
      duration: '45 mins',
      interviewerName: 'Dr. Amit Mehta (Lead Architect)',
      meetingLink: 'https://meet.google.com/sih-interview-01',
      googleMeetCode: 'sih-interview-01'
    },
    {
      id: 'int-102',
      roundName: 'Technical Round 02 — Practical Code Walkthrough',
      jobTitle: 'Full Stack MERN Developer',
      companyName: 'Rajasthan Digital Labs',
      status: 'CONFIRMED',
      date: 'Aug 27, 2026',
      time: '11:00 AM IST',
      duration: '60 mins',
      interviewerName: 'Priya Sharma (Senior Engineering Director)',
      meetingLink: 'https://meet.google.com/sih-interview-02',
      googleMeetCode: 'sih-interview-02'
    }
  ];

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await interviewApi.getAll({ studentId: 'stu-1' });
      if (res.data && res.data.length > 0) {
        setInterviews(res.data);
      } else {
        setInterviews(DUMMY_INTERVIEWS);
      }
    } catch (err) {
      setInterviews(DUMMY_INTERVIEWS);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={2} />;
  }

  const activeInterviews = interviews.length > 0 ? interviews : DUMMY_INTERVIEWS;

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0B1024] to-[#0F1630]"
      >
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-pink-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Official Placement Evaluation Console</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
            Interview Rounds & Technical Panels
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Confirmed recruiter interview schedules with direct Google Meet video conferencing links.
          </p>
        </div>

        <Badge variant="pink" size="md">
          {activeInterviews.length} Scheduled Rounds
        </Badge>
      </motion.div>

      {/* Scheduled Interviews Cards */}
      <div className="space-y-6">
        {activeInterviews.map((int, idx) => (
          <motion.div
            key={int.id || idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl space-y-6 bg-[#0F1630]"
          >
            {/* Top Row: Title & Direct Google Meet CTA */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    {int.roundName || "Technical Round 01"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Status: {int.status || 'CONFIRMED'}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white font-heading mt-1">
                  {int.jobTitle || 'Technical Specialist'}
                </h3>
                <p className="text-xs text-slate-400 font-semibold">{int.companyName || 'TechNova Solutions'}</p>
              </div>

              {/* Direct Google Meet Button */}
              <a
                href={int.meetingLink || 'https://meet.google.com/sih-interview-01'}
                target="_blank"
                rel="noreferrer"
                onClick={() => toast.success("Redirecting to Google Meet Room...")}
                className="btn-pink-gradient px-5 py-3 text-xs font-extrabold rounded-2xl shadow-lg flex items-center space-x-2.5 cursor-pointer shrink-0"
              >
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                  <Video className="w-4 h-4 text-white" />
                </div>
                <span>Join Google Meet</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Timing & Panel Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-950/80 p-4 rounded-2xl border border-white/10">
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Date</span>
                <strong className="text-white font-heading text-sm block">{int.date || 'Aug 24, 2026'}</strong>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Time & Duration</span>
                <strong className="text-pink-400 font-metrics text-sm block">{int.time || '02:30 PM IST'} ({int.duration || '45 mins'})</strong>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Panel Lead</span>
                <strong className="text-white font-heading text-sm block">{int.interviewerName || 'Dr. Amit Mehta'}</strong>
              </div>
            </div>

            {/* Preparation Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-pink-400" />
                <span>Interview Technical Checklist</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 flex items-center space-x-2 text-emerald-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Core React Hooks, Component State & Custom Hooks</span>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 flex items-center space-x-2 text-emerald-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>JavaScript Async / Await & Promise Chains</span>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 flex items-center space-x-2 text-emerald-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>REST API Data Fetching & Axios Error Handlers</span>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 flex items-center space-x-2 text-amber-200 font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>TypeScript Generics & Strict Type Annotations</span>
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
};
