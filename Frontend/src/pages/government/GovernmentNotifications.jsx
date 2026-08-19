import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Send, 
  Users, 
  MapPin, 
  Zap, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const GovernmentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetAudience: 'All Students',
    targetDistrict: 'All Districts',
    targetSkill: 'All Skills',
    targetDegree: 'All Degrees',
    author: 'Technical Education Directorate, Rajasthan'
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await governmentApi.getNotifications();
      if (res.data?.success) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load government announcements.');
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      toast.error('Please enter announcement title and message.');
      return;
    }

    try {
      const res = await governmentApi.createNotification(formData);
      if (res.data?.success) {
        toast.success('Announcement broadcasted to targeted Rajasthan students!');
        setFormData({
          title: '',
          message: '',
          targetAudience: 'All Students',
          targetDistrict: 'All Districts',
          targetSkill: 'All Skills',
          targetDegree: 'All Degrees',
          author: 'Technical Education Directorate, Rajasthan'
        });
        fetchNotifications();
      }
    } catch (err) {
      toast.error('Failed to broadcast announcement.');
    }
  };

  return (
    <div className="space-y-6 text-slate-100 pb-10">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Statewide Student Broadcaster</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Government Announcements & Policy Notifications
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Broadcast official notifications regarding new internships, scholarship schemes, skill development bootcamps, and hiring drives.
          </p>
        </div>

        <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-300">
          Target Reach: <span className="text-amber-400">25,430+ Registered Students</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Create Broadcast Announcement Form (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Create State Broadcast Notice</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Define target audience filters and announcement text</p>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Announcement Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. New Internship Opportunities Available in Rajasthan"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Target Audience Cohort
              </label>
              <select
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="All Students">All Students across Rajasthan</option>
                <option value="Students by District">Students by Specific District</option>
                <option value="Students by Skill">Students by Skill Gap / Category</option>
                <option value="Students by Degree">Students by Degree / Year</option>
              </select>
            </div>

            {/* Target Filter Selectors */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">District</label>
                <select
                  value={formData.targetDistrict}
                  onChange={(e) => setFormData({ ...formData, targetDistrict: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="All Districts">All 33</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Jodhpur">Jodhpur</option>
                  <option value="Kota">Kota</option>
                  <option value="Udaipur">Udaipur</option>
                  <option value="Ajmer">Ajmer</option>
                  <option value="Bikaner">Bikaner</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Skill</label>
                <select
                  value={formData.targetSkill}
                  onChange={(e) => setFormData({ ...formData, targetSkill: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="All Skills">All Skills</option>
                  <option value="AWS">AWS</option>
                  <option value="Docker">Docker</option>
                  <option value="React.js">React.js</option>
                  <option value="Python">Python</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Cyber Security">Cyber Security</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Degree</label>
                <select
                  value={formData.targetDegree}
                  onChange={(e) => setFormData({ ...formData, targetDegree: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="All Degrees">All Degrees</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="Polytechnic">Polytechnic</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Announcement Message / Instructions *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Write official notice text detailing new skill-development programs or state internship opportunities..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Announcement Live</span>
            </button>

          </form>
        </div>

        {/* Live Broadcast Feed (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">
                Active Broadcast Bulletins
              </h2>
              <p className="text-xs text-slate-400">Currently active on student dashboards across Rajasthan</p>
            </div>
            <Badge variant="saffron" size="sm">{notifications.length} Active</Badge>
          </div>

          {loading ? (
            <SkeletonLoader count={3} />
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  className="p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-2.5 shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white">{notif.title}</h3>
                      <span className="text-[11px] text-amber-400 font-medium">{notif.author}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {notif.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        Target: {notif.targetAudience}
                      </span>
                      {notif.targetDistrict !== 'All Districts' && (
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300 font-medium">
                          {notif.targetDistrict}
                        </span>
                      )}
                      {notif.targetSkill !== 'All Skills' && (
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-sky-300 font-medium">
                          {notif.targetSkill}
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-500">
                      {new Date(notif.sentDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
