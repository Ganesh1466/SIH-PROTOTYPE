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
  ChevronRight, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800/90 h-16 shadow-lg">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-2">
          
          {/* Left: Breadcrumb & Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3.5 min-w-0">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Toggle government menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm min-w-0">
              <span className="flex items-center space-x-1.5 text-amber-400 font-bold tracking-tight shrink-0">
                <Landmark className="w-4 h-4" />
                <span className="hidden xs:inline">Govt of Rajasthan</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline shrink-0" />
              <span className="text-slate-200 font-semibold text-xs sm:text-sm truncate">
                {getCurrentPageName()}
              </span>
            </div>
          </div>

          {/* Right: Badges, Admin Profile & Logout */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            
            {/* Prototype Demo Data Pill */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Prototype Demo Data</span>
            </div>

            {/* Department Badge */}
            <div className="flex items-center space-x-2 sm:space-x-3 text-sm pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-sm shrink-0">
                RJ
              </div>
              <div className="hidden lg:block text-left">
                <span className="font-bold text-white text-xs block leading-tight truncate">State Nodal Officer</span>
                <span className="text-[10px] text-amber-400 font-medium leading-none truncate block">rajgoverment@gmail.com</span>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Sign out of Government Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col lg:flex-row gap-6 min-w-0 overflow-x-hidden">
        
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          />
        )}

        {/* Responsive Government Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-72 lg:w-[270px] shrink-0 bg-slate-950 p-4 lg:p-0 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-y-auto lg:overflow-visible`}>
          <div className="lg:sticky lg:top-22 space-y-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-xl">
            
            {/* Mobile Close Button & Header */}
            <div className="flex items-center justify-between lg:hidden pb-2 border-b border-slate-800">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Navigation Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Portal Banner */}
            <div className="p-3 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl border border-amber-500/20 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                🏛
              </div>
              <div>
                <span className="text-sm font-extrabold text-white block leading-tight">Government Portal</span>
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Employment Intelligence</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold shadow-amber-500/20 translate-x-0.5'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
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

            {/* System Status Seal */}
            <div className="pt-4 border-t border-slate-800/90 text-xs text-slate-400 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold">Governance Mode</span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
                  ACTIVE
                </span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-[10px] text-slate-400 leading-relaxed">
                <strong className="text-amber-400 block font-bold mb-0.5">Role Objective:</strong>
                Verify + Approve + Monitor + Analyze Skill Gaps + Policy Decisions.
              </div>
            </div>

          </div>
        </aside>

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
