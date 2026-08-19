import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Calendar, 
  Send, 
  Info, 
  CheckCheck
} from 'lucide-react';
import { notificationApi } from '../../api/notificationApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationApi.getForUser('stu-1');
      setNotifications(res.data || []);
    } catch (err) {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead('stu-1');
      toast.success("All notifications marked as read");
      fetchNotifications();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleMarkOne = async (id) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch {}
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Notifications & Updates
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time alerts for application status changes, shortlists, and interviews.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-md border border-slate-200 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You are completely caught up."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.read && handleMarkOne(notif.id)}
              className={`p-4 flex items-start space-x-3 transition-colors cursor-pointer ${
                notif.read ? 'bg-white hover:bg-slate-50/50' : 'bg-indigo-50/20 hover:bg-indigo-50/30'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                notif.type === 'STATUS_UPDATE' ? 'bg-emerald-50 text-emerald-600' :
                notif.type === 'INTERVIEW' ? 'bg-indigo-50 text-indigo-600' :
                'bg-slate-100 text-slate-600'
              }`}>
                {notif.type === 'STATUS_UPDATE' ? <CheckCircle2 className="w-4 h-4" /> :
                 notif.type === 'INTERVIEW' ? <Calendar className="w-4 h-4" /> :
                 <Info className="w-4 h-4" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                  <span className="text-[11px] text-slate-400">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
              </div>

              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
