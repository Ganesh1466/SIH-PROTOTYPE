import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Landmark, 
  LayoutDashboard, 
  MapPin, 
  Zap, 
  GraduationCap, 
  BarChart3, 
  Menu, 
  X, 
  LogOut, 
  ChevronRight, 
  ShieldCheck,
  BadgeCheck 
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

  const navGroups = [
    {
      group: "STATEWIDE INTELLIGENCE",
      items: [
        { to: '/government/dashboard', label: 'State Overview', icon: LayoutDashboard },
        { to: '/government/districts', label: 'District Intelligence', icon: MapPin },
        { to: '/government/skills', label: 'Skill Demand & Gap Matrix', icon: Zap }
      ]
    },
    {
      group: "COLLEGES & PIPELINE",
      items: [
        { to: '/government/colleges', label: 'College Analytics', icon: GraduationCap },
        { to: '/government/placements', label: 'Placement Funnel', icon: BarChart3 }
      ]
    }
  ];

  const getCurrentPageName = () => {
    const path = location.pathname;
    if (path.includes('districts')) return 'District Intelligence';
    if (path.includes('skills')) return 'Skill Demand & Gap Matrix';
    if (path.includes('colleges')) return 'College Analytics';
    if (path.includes('placements')) return 'Placement Funnel';
    return 'State Overview';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Spacious Top Bar */}
      <header className="sticky top-0 z-40 bg-slate-950 border-b border-slate-800 h-16 shadow-md">
        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Left: Breadcrumb */}
          <div className="flex items-center space-x-3.5">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-2.5 text-sm font-semibold text-slate-400">
              <span className="text-amber-400 font-black text-base">Hiring Wallah</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-white font-extrabold text-base">{getCurrentPageName()}</span>
            </div>
          </div>

          {/* Right: Dept Admin & Logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm">
                RJ
              </div>
              <div className="hidden sm:block text-left">
                <span className="font-bold text-white block leading-tight">{user?.name || 'Department Administrator'}</span>
                <span className="text-xs text-amber-400/90 font-medium leading-none">{user?.email || 'rajgoverment@gmail.com'}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
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
          <div className="sticky top-24 space-y-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-md">
            
            {/* Sidebar Branding */}
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-base">
                HW
              </div>
              <div>
                <span className="text-base font-black text-white block leading-tight">Hiring Wallah</span>
                <span className="text-xs text-amber-400 uppercase font-bold">Govt Intelligence</span>
              </div>
            </div>

            {/* Nav Groups */}
            <div className="space-y-5">
              {navGroups.map((grp) => (
                <div key={grp.group} className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block px-2.5 mb-1">
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
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'text-slate-400 hover:text-white hover:bg-slate-900'
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

            {/* Official Footer Seal */}
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="font-bold text-amber-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>State Directorate Console</span>
              </span>
              <p className="text-xs text-slate-500 leading-tight">
                Technical Education Department, Rajasthan
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
