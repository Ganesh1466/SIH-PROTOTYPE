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
  Sparkles
} from 'lucide-react';
import { useAuth, VALID_CREDENTIALS } from '../../context/AuthContext';
import { motion } from 'framer-motion';

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
      color: 'pink',
      email: 'student01@gmail.com',
      badge: 'Rahul Sharma',
      desc: 'Technical Students & Graduates',
      accentText: 'text-pink-400',
      activeTabStyle: 'bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 text-white border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.3)]',
      btnStyle: 'btn-pink-gradient rounded-full'
    },
    {
      id: 'employer',
      label: 'Employer',
      icon: Building2,
      color: 'blue',
      email: 'employee01@gmail.com',
      badge: 'TechNova Solutions',
      desc: 'Corporate Recruiters & Industry',
      accentText: 'text-blue-400',
      activeTabStyle: 'bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.35)]',
      btnStyle: 'bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]'
    },
    {
      id: 'government',
      label: 'Government',
      icon: Landmark,
      color: 'amber',
      email: 'rajgoverment@gmail.com',
      badge: 'State Directorate',
      desc: 'Technical Education Department',
      accentText: 'text-amber-400',
      activeTabStyle: 'bg-gradient-to-r from-amber-500/25 to-yellow-500/25 text-white border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.35)]',
      btnStyle: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)]'
    }
  ];

  const currentRoleConfig = roles.find(r => r.id === activeRole) || roles[0];

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col justify-center items-center py-8 sm:py-16 px-3 sm:px-6 lg:px-8 font-sans text-slate-100 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-colors duration-500 ${
        activeRole === 'employer' ? 'bg-blue-500/15' : activeRole === 'government' ? 'bg-amber-500/15' : 'bg-pink-500/15'
      }`} />

      <div className="max-w-xl w-full space-y-6 sm:space-y-8 relative z-10">
        
        {/* Official Header */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex flex-col items-center space-y-3"
        >
          <div className="flex flex-col xs:flex-row items-center justify-between space-y-3 xs:space-y-0 xs:space-x-4 glass-card p-4 px-6 rounded-2xl border border-white/10 shadow-2xl max-w-full text-center xs:text-left bg-gradient-to-r from-[#0B1024] via-[#0F1630] to-[#0B1024]">
            <img 
              src="/icon2-removebg-preview.png" 
              alt="State Emblem icon2" 
              className="h-14 sm:h-16 w-auto max-w-[60px] sm:max-w-[70px] object-contain shrink-0 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" 
            />
            <div className="border-t xs:border-t-0 xs:border-l xs:border-r border-white/10 pt-2 xs:pt-0 xs:px-4 space-y-0.5 min-w-0 flex-1">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-white block leading-tight truncate font-heading">
                Government of Rajasthan
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 block leading-tight">
                Department of Technical Education
              </span>
              <span className={`text-[10px] sm:text-[11px] font-bold block tracking-wide font-metrics transition-colors ${currentRoleConfig.accentText}`}>
                AI Career & Employment Platform
              </span>
            </div>
            <img 
              src="/icon-removebg.png" 
              alt="Department Emblem" 
              className="h-12 sm:h-14 w-auto max-w-[50px] sm:max-w-[60px] object-contain shrink-0 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] hidden xs:block" 
            />
          </div>

          <p className="text-xs text-slate-400 font-medium px-2">
            Single Sign-On Gateway for Students, Corporate Recruiters & Directorate
          </p>
        </motion.div>

        {/* Main Unified Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`glass-card p-5 sm:p-8 md:p-10 rounded-3xl border shadow-2xl space-y-6 bg-slate-900/80 transition-all duration-300 ${
            activeRole === 'employer' ? 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]' :
            activeRole === 'government' ? 'border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]' :
            'border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.15)]'
          }`}
        >
          
          {/* Role Selector Tabs */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">
              Select Workspace Portal
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-white/10">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = activeRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r.id)}
                    className={`relative flex flex-col items-center justify-center py-2.5 sm:py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? `${r.activeTabStyle} border`
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${
                      isSelected ? r.accentText : 'text-slate-500'
                    }`} />
                    <span className="text-xs sm:text-sm font-heading">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Role Indicator */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider block">
                Target Workspace
              </span>
              <strong className="text-white text-xs sm:text-sm font-bold font-heading">
                {currentRoleConfig.label} ({currentRoleConfig.badge})
              </strong>
            </div>
            <span className={`text-[11px] font-bold flex items-center gap-1 ${currentRoleConfig.accentText}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentRoleConfig.desc}</span>
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                {activeRole === 'student' ? 'Student Email' : activeRole === 'employer' ? 'Recruiter Business Email' : 'Administrative Email'}
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 bg-[#0F1630] border border-white/10 rounded-xl text-white font-medium text-sm focus:outline-none transition-all ${
                    activeRole === 'employer' ? 'focus:border-blue-500/60' : activeRole === 'government' ? 'focus:border-amber-500/60' : 'focus:border-pink-500/60'
                  }`}
                  required
                />
              </div>
              <span className="text-xs text-slate-400 mt-1.5 block">
                Preset demo credential: <strong className={`font-bold ${currentRoleConfig.accentText}`}>{currentRoleConfig.email}</strong>
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password / Secure Token
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 bg-[#0F1630] border border-white/10 rounded-xl text-white font-medium text-sm focus:outline-none transition-all ${
                    activeRole === 'employer' ? 'focus:border-blue-500/60' : activeRole === 'government' ? 'focus:border-amber-500/60' : 'focus:border-pink-500/60'
                  }`}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`py-2.5 px-7 text-xs sm:text-sm font-extrabold rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg hover:scale-[1.03] active:scale-95 ${currentRoleConfig.btnStyle}`}
              >
                <span>Sign In as {currentRoleConfig.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official State SSO</span>
            </span>
            <span className="text-slate-400">Directorate of Technical Education</span>
          </div>

        </motion.div>

      </div>
    </div>
  );
};
