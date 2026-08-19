import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
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

const navGroups = [
  {
    label: 'Hiring pipeline',
    items: [
      { to: '/employer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/employer/jobs', label: 'Opportunities', icon: BriefcaseBusiness },
      { to: '/employer/post', label: 'Create opportunity', icon: Plus },
      { to: '/employer/candidates', label: 'Candidate ranking', icon: Users },
      { to: '/employer/applications', label: 'Applications pipeline', icon: Send }
    ]
  },
  {
    label: 'Recruitment rounds',
    items: [{ to: '/employer/interviews', label: 'Interviews & rounds', icon: CalendarDays }]
  },
  {
    label: 'Analytics',
    items: [{ to: '/employer/reports', label: 'Hiring analytics', icon: BarChart3 }]
  }
];

const getPageName = (pathname) => {
  if (pathname.includes('create')) return 'Create opportunity';
  if (pathname.includes('jobs')) return 'Opportunities';
  if (pathname.includes('candidates')) return 'Candidate ranking';
  if (pathname.includes('applications')) return 'Applications pipeline';
  if (pathname.includes('interviews')) return 'Interviews & rounds';
  if (pathname.includes('reports')) return 'Hiring analytics';
  return 'Dashboard';
};

export const EmployerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f5f9ff] text-[#10233f] font-sans selection:bg-blue-100">
      <header className="sticky top-0 z-40 h-[68px] border-b border-blue-100 bg-white/95 backdrop-blur-xl">
        <div className="h-full flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors" aria-label="Open employer navigation">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="hidden sm:block min-w-0">
              <h1 className="truncate text-lg font-extrabold tracking-tight text-[#0b2b55]">Hiring Wallah</h1>
              <p className="truncate text-xs font-medium text-slate-500">{getPageName(location.pathname)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <label className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300" />
              <input type="search" placeholder="Search candidates or jobs" className="w-48 rounded-lg border border-blue-100 bg-blue-50/50 py-2 pl-9 pr-3 text-xs text-[#10233f] outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white lg:w-64" />
            </label>
            <button className="relative rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Notifications">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
            </button>
            <div className="hidden h-6 w-px bg-blue-100 sm:block" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm shadow-blue-200">TN</div>
              <div className="hidden max-w-[150px] lg:block">
                <span className="block truncate text-xs font-semibold text-[#10233f]">{user?.name || 'TechNova Solutions'}</span>
                <span className="block truncate text-[11px] text-slate-500">{user?.email || 'employee01@gmail.com'}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors" title="Logout">
              <LogOut className="h-[17px] w-[17px]" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-68px)]">
        {mobileMenuOpen && <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" />}

        <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-blue-900/40 bg-[#12345d] pt-[68px] transition-all duration-300 lg:static lg:z-auto lg:pt-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${sidebarCollapsed ? 'w-[76px]' : 'w-[248px]'}`}>
          <div className="flex h-full flex-col px-3 py-5">
            <div className={`mb-7 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between px-2'}`}>
              <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                {!sidebarCollapsed && <div><span className="block text-xl font-extrabold tracking-tight text-white">Hiring Wallah</span><span className="mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">Employer portal</span></div>}
              </div>
              <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden rounded-md p-1.5 text-blue-200/60 hover:bg-white/10 hover:text-white lg:block" title="Collapse sidebar">
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto">
              {navGroups.map((group) => (
                <div key={group.label}>
                  {!sidebarCollapsed && <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-200/75">{group.label}</p>}
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink key={item.to} to={item.to} onClick={() => setMobileMenuOpen(false)} title={sidebarCollapsed ? item.label : undefined} className={({ isActive }) => `group relative flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-all duration-200 ${sidebarCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-blue-400/20 text-white' : 'text-blue-100/80 hover:bg-white/10 hover:text-white'}`}>
                          {({ isActive }) => <><span className={`absolute left-0 h-6 w-0.5 rounded-r-full bg-blue-300 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} /><Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-200' : 'text-blue-100/65 group-hover:text-white'}`} /><span className={sidebarCollapsed ? 'sr-only' : ''}>{item.label}</span></>}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className={`mt-5 border-t border-blue-100/15 pt-4 ${sidebarCollapsed ? 'text-center' : ''}`}>
              <div className={`flex items-center gap-2 text-[11px] font-semibold text-blue-100/75 ${sidebarCollapsed ? 'justify-center' : ''}`} title="Verified Industry Partner">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                {!sidebarCollapsed && <span>Verified Industry Partner</span>}
              </div>
              {!sidebarCollapsed && <p className="mt-1 pl-6 text-[10px] leading-4 text-blue-100/45">Department of Technical Education, Rajasthan</p>}
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 bg-[radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.08),transparent_28rem)] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-[1500px]"><Outlet /></div>
        </main>
      </div>
    </div>
  );
};
