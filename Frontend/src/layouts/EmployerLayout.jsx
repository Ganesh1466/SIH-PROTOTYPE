import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  Users, 
  Send, 
  Calendar, 
  BarChart3, 
  Menu, 
  X, 
  LogOut, 
  Search, 
  ChevronRight, 
  ShieldCheck,
  BadgeCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const EmployerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navGroups = [
    {
      group: "HIRING PIPELINE",
      items: [
        { to: '/employer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/employer/jobs', label: 'Opportunities', icon: Briefcase },
        { to: '/employer/post', label: 'Create Opportunity', icon: PlusCircle },
        { to: '/employer/candidates', label: 'Candidate Ranking', icon: Users },
        { to: '/employer/applications', label: 'Applications Pipeline', icon: Send }
      ]
    },
    {
      group: "RECRUITMENT ROUNDS",
      items: [
        { to: '/employer/interviews', label: 'Interviews & Rounds', icon: Calendar }
      ]
    },
    {
      group: "ANALYTICS & REPORTS",
      items: [
        { to: '/employer/reports', label: 'Hiring Analytics', icon: BarChart3 }
      ]
    }
  ];

  const getCurrentPageName = () => {
    const path = location.pathname;
    if (path.includes('create')) return 'Post New Job';
    if (path.includes('jobs')) return 'Job Openings';
    if (path.includes('candidates')) return 'Candidate Ranking';
    if (path.includes('applications')) return 'Applications Pipeline';
    if (path.includes('interviews')) return 'Interviews & Rounds';
    if (path.includes('reports')) return 'Hiring Analytics';
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
              <span className="text-sky-600 font-black tracking-tight">Hiring Wallah</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="text-slate-900 font-extrabold text-base">{getCurrentPageName()}</span>
            </div>
          </div>

          {/* Right: Search, Employer Profile & Logout */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates or jobs..."
                className="w-56 pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:w-64 transition-all focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="h-5 w-px bg-slate-200" />

            <div className="flex items-center space-x-2.5 text-sm">
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
                TN
              </div>
              <div className="hidden sm:block text-left">
                <span className="font-bold text-slate-900 block leading-tight">{user?.name || 'TechNova Solutions'}</span>
                <span className="text-xs text-slate-500 font-medium leading-none">{user?.email || 'employee01@gmail.com'}</span>
              </div>
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
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black text-base">
                HW
              </div>
              <div>
                <span className="text-base font-black text-slate-900 block leading-tight">Hiring Wallah</span>
                <span className="text-xs text-sky-600 uppercase font-bold">Employer Portal</span>
              </div>
            </div>

            {/* Nav Groups */}
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
                          `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            isActive
                              ? 'bg-sky-50 text-sky-700 font-bold'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 stroke-[2]" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Verified Node Seal */}
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Industry Partner</span>
              </span>
              <p className="text-xs text-slate-400 leading-tight">
                Department of Technical Education, Rajasthan
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
