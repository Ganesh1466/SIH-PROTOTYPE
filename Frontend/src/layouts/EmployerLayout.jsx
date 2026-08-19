import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Users,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const navGroups = [
  {
    label: 'Hiring Pipeline',
    items: [
      { to: '/employer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/employer/jobs', label: 'Opportunities', icon: BriefcaseBusiness },
      { to: '/employer/post', label: 'Create Opportunity', icon: Plus },
      { to: '/employer/candidates', label: 'Candidate Ranking', icon: Users },
      { to: '/employer/applications', label: 'Applications Pipeline', icon: Send }
    ]
  },
  {
    label: 'Recruitment Rounds',
    items: [{ to: '/employer/interviews', label: 'Interviews & Rounds', icon: CalendarDays }]
  },
  {
    label: 'Analytics',
    items: [{ to: '/employer/reports', label: 'Hiring Analytics', icon: BarChart3 }]
  }
];

const getPageName = (pathname) => {
  if (pathname.includes('create') || pathname.includes('post')) return 'Create Opportunity';
  if (pathname.includes('jobs')) return 'Opportunities';
  if (pathname.includes('candidates')) return 'Candidate Ranking';
  if (pathname.includes('applications')) return 'Applications Pipeline';
  if (pathname.includes('interviews')) return 'Interviews & Rounds';
  if (pathname.includes('reports')) return 'Hiring Analytics';
  return 'Dashboard';
};

export const EmployerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050B18] flex font-sans text-[#F8FAFC] selection:bg-blue-600 selection:text-white">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden" />
      )}

      {/* Full-Height Left Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50
        w-64 lg:w-64 shrink-0
        bg-[#070E20] border-r border-blue-900/30 p-5
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col justify-between overflow-y-auto no-scrollbar
      `}>
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-blue-900/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                TN
              </div>
              <div>
                <span className="text-base font-extrabold text-white block leading-tight font-heading">Hiring Wallah</span>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Enterprise Employer</span>
              </div>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-6">
            {navGroups.map((group) => (
              <div key={group.label} className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-3 mb-1.5">{group.label}</span>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink 
                      key={item.to} 
                      to={item.to} 
                      onClick={() => setMobileMenuOpen(false)} 
                      className={({ isActive }) => `group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white font-extrabold border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
                          : 'text-slate-400 hover:bg-blue-950/40 hover:text-white border border-transparent'
                      }`}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.span 
                              layoutId="activeEmployerTab"
                              className="absolute left-0 h-6 w-1 rounded-r-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9)]" 
                            />
                          )}
                          <div className="flex items-center space-x-3">
                            <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                            <span>{item.label}</span>
                          </div>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-blue-900/30 text-xs text-slate-400 space-y-1">
          <div className="flex items-center space-x-1.5 font-bold text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Verified Corporate Enterprise</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Department of Technical Education, Rajasthan
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        <header className="sticky top-0 z-30 bg-[#050B18]/90 backdrop-blur-xl border-b border-blue-900/30 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 min-w-0">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-white font-extrabold text-sm sm:text-base truncate font-heading">{getPageName(location.pathname)}</span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <label className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input 
                type="search" 
                placeholder="Search candidates or jobs..." 
                className="w-48 lg:w-60 pl-10 pr-4 py-1.5 bg-[#0B1730] border border-blue-900/40 rounded-xl text-xs text-white outline-none placeholder:text-slate-400 focus:border-blue-500/60 focus:w-64 transition-all" 
              />
            </label>
            <button className="relative rounded-xl p-2 text-slate-400 hover:bg-blue-950/40 hover:text-blue-400 transition-colors cursor-pointer" title="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
            </button>
            <div className="hidden h-5 w-px bg-blue-900/30 sm:block" />
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                TN
              </div>
              <div className="hidden max-w-[150px] lg:block">
                <span className="block truncate text-xs font-bold text-white">{user?.name || 'TechNova Solutions'}</span>
                <span className="block truncate text-[11px] text-slate-400">{user?.email || 'employee01@gmail.com'}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="rounded-xl p-2 text-slate-400 hover:bg-blue-950/40 hover:text-rose-400 transition-colors cursor-pointer" title="Logout">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <div className="max-w-[1550px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
