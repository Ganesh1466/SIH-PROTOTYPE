import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  Briefcase, 
  TrendingUp, 
  GraduationCap, 
  Send, 
  Calendar, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  ChevronRight, 
  ShieldCheck
} from 'lucide-react';
import { notificationApi } from '../api/notificationApi';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    notificationApi.getForUser('stu-1')
      .then(res => {
        if (res.data) {
          const unread = res.data.filter(n => !n.read).length;
          setUnreadCount(unread);
        }
      })
      .catch(() => {});
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navGroups = [
    {
      group: "CAREER WORKSPACE",
      items: [
        { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/student/passport', label: 'Career Passport', icon: UserCheck },
        { to: '/student/jobs', label: 'Jobs & Internships', icon: Briefcase },
        { to: '/student/skill-gap', label: 'Skill Gap Analysis', icon: TrendingUp },
        { to: '/student/learning-path', label: 'Learning Path', icon: GraduationCap }
      ]
    },
    {
      group: "APPLICATIONS & ROUNDS",
      items: [
        { to: '/student/applications', label: 'Applications', icon: Send },
        { to: '/student/interviews', label: 'Interviews', icon: Calendar },
        { to: '/student/notifications', label: 'Notifications', icon: Bell, badge: unreadCount }
      ]
    }
  ];

  const getCurrentPageName = () => {
    const path = location.pathname;
    if (path.includes('passport')) return 'Career Passport';
    if (path.includes('jobs')) return 'Jobs & Internships';
    if (path.includes('skill-gap')) return 'Skill Gap Analysis';
    if (path.includes('learning-path')) return 'Learning Path';
    if (path.includes('applications')) return 'Applications';
    if (path.includes('interviews')) return 'Interviews';
    if (path.includes('notifications')) return 'Notifications';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[#050816] flex font-sans text-[#F8FAFC] selection:bg-pink-500 selection:text-white">
      
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity"
        />
      )}

      {/* Full-Height Left Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50
        w-64 lg:w-64 shrink-0
        bg-[#070B1A] border-r border-white/10 p-5
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col justify-between overflow-y-auto no-scrollbar
      `}>
        <div className="space-y-6">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-fuchsia-600 flex items-center justify-center text-white font-black text-lg shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                HW
              </div>
              <div>
                <span className="text-base font-extrabold text-white block leading-tight font-heading">Hiring Wallah</span>
                <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">Student Portal</span>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-6">
            {navGroups.map((grp) => (
              <div key={grp.group} className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-3 mb-1.5">
                  {grp.group}
                </span>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 text-white font-extrabold border border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.2)]'
                            : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.div 
                              layoutId="activeStudentTab"
                              className="absolute left-0 w-1 h-6 bg-pink-500 rounded-r-full shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                            />
                          )}
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-4 h-4 stroke-[2.2] ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && item.badge > 0 ? (
                            <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-pink-500 text-white shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                              {item.badge}
                            </span>
                          ) : null}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Verification Seal */}
        <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-1">
          <span className="font-bold text-white flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Student Node</span>
          </span>
          <p className="text-[11px] text-slate-400 leading-tight">
            Rajasthan Technical Education Directorate
          </p>
        </div>
      </aside>

      {/* Main Content Area (Offset for full-height sidebar) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        
        {/* Top Header Navigation */}
        <header className="sticky top-0 z-30 bg-[#050816]/90 backdrop-blur-xl border-b border-white/10 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3 min-w-0">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-400 min-w-0">
              <span className="text-white font-extrabold text-sm sm:text-base truncate font-heading">{getCurrentPageName()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-48 lg:w-60 pl-10 pr-4 py-1.5 bg-[#0F1630] border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:w-64 focus:border-pink-500/50 focus:outline-none transition-all shadow-inner"
              />
            </div>

            <Link
              to="/student/notifications"
              className="relative p-2 text-slate-400 hover:text-pink-400 hover:bg-white/5 rounded-xl transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
              )}
            </Link>

            <div className="h-5 w-px bg-white/10" />

            <div className="flex items-center space-x-2 text-sm">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-fuchsia-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                RS
              </div>
              <span className="hidden sm:inline font-bold text-white max-w-[120px] truncate">{user?.name || 'Rahul Sharma'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <div className="max-w-[1550px] mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
};
