import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Calendar, 
  Info, 
  CheckCheck,
  Sparkles,
  Briefcase,
  Award
} from 'lucide-react';
import { notificationApi } from '../../api/notificationApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const DUMMY_NOTIFICATIONS = [
    {
      id: 'notif-1',
      title: '🎯 Application Shortlisted by TechNova Solutions',
      message: 'Your application for Frontend Technical Specialist has been shortlisted! The corporate hiring team reviewed your 92% AI Match Fit score.',
      type: 'STATUS_UPDATE',
      createdAt: new Date().toISOString(),
      read: false
    },
    {
      id: 'notif-2',
      title: '📅 Technical Interview Scheduled — Round 01',
      message: 'Interview confirmed for Aug 24, 2026 at 02:30 PM IST with Dr. Amit Mehta via Google Meet.',
      type: 'INTERVIEW',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      read: false
    },
    {
      id: 'notif-3',
      title: '🛡️ Career Passport Verification Complete',
      message: 'Department of Technical Education, Rajasthan verified your B.Tech transcript and CGPA score (8.64/10).',
      type: 'INFO',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      read: true
    },
    {
      id: 'notif-4',
      title: '⚡ New High-Match Opportunity (94% Fit)',
      message: 'Rajasthan Digital Labs posted "Full Stack MERN Developer" in Jaipur. Your technical stack matches 5/5 required skills.',
      type: 'STATUS_UPDATE',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      read: true
    },
    {
      id: 'notif-5',
      title: '🎓 Learning Path Milestone Completed',
      message: 'You completed TypeScript 5.0 Fundamentals module! Your overall profile readiness increased by +12%.',
      type: 'INFO',
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      read: true
    }
  ];

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationApi.getForUser('stu-1');
      if (res.data && res.data.length > 0) {
        setNotifications(res.data);
      } else {
        setNotifications(DUMMY_NOTIFICATIONS);
      }
    } catch (err) {
      setNotifications(DUMMY_NOTIFICATIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Action failed");
    }
  };

  const handleMarkOne = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

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
            <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
              Notifications & Alerts
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Real-time alerts for application status changes, shortlists, and interview schedules.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="btn-pink-outline px-4 py-2 text-xs font-bold flex items-center space-x-1.5 cursor-pointer shrink-0"
          >
            <CheckCheck className="w-4 h-4 text-pink-400" />
            <span>Mark all as read</span>
          </button>
        )}
      </motion.div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You are completely caught up."
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl border border-white/10 divide-y divide-white/5 overflow-hidden shadow-2xl bg-[#0F1630]"
        >
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.read && handleMarkOne(notif.id)}
              className={`p-5 sm:p-6 flex items-start space-x-4 transition-colors cursor-pointer ${
                notif.read ? 'bg-slate-900/40 hover:bg-white/5' : 'bg-pink-500/10 hover:bg-pink-500/15 border-l-4 border-l-pink-500'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-md ${
                notif.type === 'STATUS_UPDATE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                notif.type === 'INTERVIEW' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                'bg-slate-800 text-slate-300 border border-white/10'
              }`}>
                {notif.type === 'STATUS_UPDATE' ? <Briefcase className="w-5 h-5" /> :
                 notif.type === 'INTERVIEW' ? <Calendar className="w-5 h-5" /> :
                 <Info className="w-5 h-5" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white font-heading">{notif.title}</h4>
                  <span className="text-[11px] font-semibold text-slate-400 font-metrics">
                    {new Date(notif.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{notif.message}</p>
              </div>

              {!notif.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shrink-0 mt-2.5 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
              )}
            </div>
          ))}
        </motion.div>
      )}

    </div>
  );
};
