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
  ShieldCheck,
  BadgeCheck 
} from 'lucide-react';
import { notificationApi } from '../api/notificationApi';
import { useAuth } from '../context/AuthContext';

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
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans text-[#171A21]">
      
      {/* Spacious Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E7E9EE] h-16 shadow-2xs">
        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Left: Mobile Toggle & Breadcrumb */}
          <div className="flex items-center space-x-3.5">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-2.5 text-sm font-semibold text-slate-500">
              <span className="text-indigo-600 font-black tracking-tight">Hiring Wallah</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="text-slate-900 font-extrabold text-base">{getCurrentPageName()}</span>
            </div>
          </div>

          {/* Right: Search, Notifications & Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-56 pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:w-64 transition-all focus:bg-white focus:outline-hidden"
              />
            </div>

            <Link
              to="/student/notifications"
              className="relative p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </Link>

            <div className="h-5 w-px bg-slate-200" />

            <div className="flex items-center space-x-2.5 text-sm">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                RS
              </div>
              <span className="hidden sm:inline font-bold text-slate-900">{user?.name || 'Rahul Sharma'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-[1550px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Enterprise Sidebar (260px width) */}
        <aside className={`lg:w-[260px] shrink-0 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 space-y-6 bg-white p-5 rounded-2xl border border-[#E7E9EE] shadow-2xs">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-base">
                HW
              </div>
              <div>
                <span className="text-base font-black text-slate-900 block leading-tight">Hiring Wallah</span>
                <span className="text-xs text-indigo-600 uppercase font-bold">Student Portal</span>
              </div>
            </div>

            {/* Navigation Groups */}
            <div className="space-y-5">
              {navGroups.map((grp) => (
                <div key={grp.group} className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-2.5 mb-1">
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
                          `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4 stroke-[2]" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && item.badge > 0 ? (
                          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                            {item.badge}
                          </span>
                        ) : null}
                      </NavLink>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Bottom Verification Seal */}
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Student Node</span>
              </span>
              <p className="text-xs text-slate-400 leading-tight">
                Rajasthan Technical Education Directorate
              </p>
            </div>

          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
