import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Building2, 
  Landmark, 
  ArrowRight, 
  Lock, 
  Mail, 
  ShieldCheck, 
  BadgeCheck 
} from 'lucide-react';
import { useAuth, VALID_CREDENTIALS } from '../../context/AuthContext';

export const UnifiedLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Determine initial role from URL query or state, default to 'student'
  const initialRole = location.pathname.includes('employer') ? 'employer' :
                      location.pathname.includes('government') ? 'government' : 'student';

  const [activeRole, setActiveRole] = useState(initialRole);
  const [email, setEmail] = useState(VALID_CREDENTIALS[initialRole]?.email || 'student01@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setEmail(VALID_CREDENTIALS[role]?.email || '');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const success = login(email, password, activeRole);
    setLoading(false);
    if (success) {
      if (activeRole === 'student') navigate('/student/dashboard');
      else if (activeRole === 'employer') navigate('/employer/dashboard');
      else if (activeRole === 'government') navigate('/government/dashboard');
    }
  };

  const roles = [
    {
      id: 'student',
      label: 'Student',
      icon: GraduationCap,
      color: 'indigo',
      email: 'student01@gmail.com',
      badge: 'Rahul Sharma',
      desc: 'Technical Students & Graduates'
    },
    {
      id: 'employer',
      label: 'Employer',
      icon: Building2,
      color: 'sky',
      email: 'employee01@gmail.com',
      badge: 'TechNova Solutions',
      desc: 'Corporate Recruiters & Industry'
    },
    {
      id: 'government',
      label: 'Government',
      icon: Landmark,
      color: 'amber',
      email: 'rajgoverment@gmail.com',
      badge: 'State Directorate',
      desc: 'Technical Education Department'
    }
  ];

  const currentRoleConfig = roles.find(r => r.id === activeRole) || roles[0];

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8 font-sans text-[#171A21]">
      <div className="max-w-xl w-full space-y-8">
        
        {/* Official Header with icon-removebg Image */}
        <div className="text-center flex flex-col items-center space-y-3">
          
          <div className="flex items-center space-x-4 bg-white p-4 px-6 rounded-2xl border border-slate-200 shadow-2xs">
            <img 
              src="/icon-removebg.png" 
              alt="Department Official Logo" 
              className="h-16 w-auto max-w-[70px] object-contain shrink-0 drop-shadow-xs" 
            />
            <div className="text-left border-l border-slate-200 pl-4 space-y-0.5">
              <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-900 block leading-tight">
                Government of Rajasthan
              </span>
              <span className="text-xs font-semibold text-slate-600 block leading-tight">
                Department of Technical Education
              </span>
              <span className="text-[11px] font-bold text-emerald-700 block tracking-wide">
                Career & Employment Intelligence Platform
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Single Sign-On Gateway for Students, Corporate Recruiters & Directorate
          </p>
        </div>

        {/* Main Unified Login Card */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E7E9EE] shadow-md space-y-6">
          
          {/* Role Selector Tabs (Student | Employer | Government) */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Select Workspace Portal
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200/80">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = activeRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r.id)}
                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${
                      isSelected 
                        ? (r.id === 'student' ? 'text-indigo-600' : r.id === 'employer' ? 'text-sky-600' : 'text-amber-600') 
                        : 'text-slate-400'
                    }`} />
                    <span className="text-sm">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Role Indicator */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-sm">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase block">
                Target Role
              </span>
              <strong className="text-slate-900 text-sm font-bold">
                {currentRoleConfig.label} ({currentRoleConfig.badge})
              </strong>
            </div>
            <span className="text-xs text-slate-600 font-medium">
              {currentRoleConfig.desc}
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                {activeRole === 'student' ? 'Student Email' : activeRole === 'employer' ? 'Recruiter Business Email' : 'Department Administrative Email'}
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-hidden"
                  required
                />
              </div>
              <span className="text-xs text-slate-500 mt-1.5 block">
                Preset account: <strong className="font-bold text-indigo-700">{currentRoleConfig.email}</strong>
              </span>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Password / Secure Token
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-5 text-white text-base font-bold rounded-lg transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer mt-6 ${
                activeRole === 'student' 
                  ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800' :
                activeRole === 'employer'
                  ? 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800' :
                  'bg-slate-900 hover:bg-slate-950 active:bg-black'
              }`}
            >
              <span>Sign In as {currentRoleConfig.label} ({currentRoleConfig.badge})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official State Gateway</span>
            </span>
            <span>Directorate of Technical Education</span>
          </div>

        </div>

      </div>
    </div>
  );
};
