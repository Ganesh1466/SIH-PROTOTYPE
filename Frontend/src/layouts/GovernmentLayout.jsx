import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Landmark, 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  Users, 
  FileText, 
  BarChart3, 
  Zap, 
  MapPin, 
  Bell, 
  Download, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const GovernmentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/government/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { to: '/government/employers', label: 'Employers', icon: Building2, badge: 'Verify' },
    { to: '/government/opportunities', label: 'Opportunities', icon: Briefcase, badge: 'Approve' },
    { to: '/government/students', label: 'Students', icon: Users, badge: null },
    { to: '/government/applications', label: 'Applications', icon: FileText, badge: null },
    { to: '/government/placements', label: 'Placements', icon: BarChart3, badge: null },
    { to: '/government/skills', label: 'Skill Gap Analytics', icon: Zap, badge: 'Critical' },
    { to: '/government/districts', label: 'District Analytics', icon: MapPin, badge: null },
    { to: '/government/notifications', label: 'Notifications', icon: Bell, badge: null },
    { to: '/government/reports', label: 'Reports', icon: Download, badge: 'CSV' },
    { to: '/government/settings', label: 'Settings', icon: Settings, badge: null },
  ];

  const getCurrentPageName = () => {
    const path = location.pathname;
    if (path.includes('employers')) return 'Employer Verification Console';
    if (path.includes('opportunities')) return 'Opportunity Approval Workflow';
    if (path.includes('students')) return 'Student Directory & Placement Status';
    if (path.includes('applications')) return 'Statewide Applications Monitor';
    if (path.includes('placements')) return 'Placement Analytics & Trends';
    if (path.includes('skills')) return 'Industry Skill Demand vs Student Availability';
    if (path.includes('districts')) return 'Rajasthan District Employment Analytics';
    if (path.includes('notifications')) return 'Government Announcements';
    if (path.includes('reports')) return 'Intelligence Reports & Exports';
    if (path.includes('settings')) return 'Governance Settings';
    return 'Rajasthan Employment Intelligence Dashboard';
  };

  return (
    <div className="min-h-screen bg-[#050816] flex font-sans text-[#F8FAFC] selection:bg-amber-500 selection:text-black">
      
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
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <img 
                src="/icon2-removebg-preview.png" 
                alt="State Emblem icon2" 
                className="w-10 h-10 object-contain shrink-0 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" 
              />
              <div>
                <span className="text-sm font-extrabold text-white block leading-tight font-heading">Government Portal</span>
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Employment Intelligence</span>
              </div>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold shadow-amber-500/20 translate-x-0.5'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black ${
                      item.badge === 'Critical' 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : item.badge === 'Verify' || item.badge === 'Approve'
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-semibold">Governance Mode</span>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
              ACTIVE
            </span>
          </div>
          <div className="p-2.5 bg-slate-900/90 rounded-xl border border-white/10 text-[10px] text-slate-400 leading-relaxed">
            <strong className="text-amber-400 block font-bold mb-0.5">Role Objective:</strong>
            Verify + Approve + Monitor + Analyze Skill Gaps + Policy Decisions.
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        <header className="sticky top-0 z-30 bg-[#050816]/90 backdrop-blur-xl border-b border-white/10 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 min-w-0">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs sm:text-sm min-w-0">
              <span className="flex items-center space-x-1.5 text-amber-400 font-bold tracking-tight shrink-0 font-heading">
                <Landmark className="w-4 h-4" />
                <span className="hidden xs:inline">Govt of Rajasthan</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline shrink-0" />
              <span className="text-white font-bold text-xs sm:text-sm truncate font-heading">
                {getCurrentPageName()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Prototype Demo Data</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 text-sm pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-md shrink-0">
                RJ
              </div>
              <div className="hidden lg:block text-left">
                <span className="font-bold text-white text-xs block leading-tight truncate">State Nodal Officer</span>
                <span className="text-[10px] text-amber-400 font-medium leading-none truncate block">rajgoverment@gmail.com</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              title="Sign out of Government Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
};
