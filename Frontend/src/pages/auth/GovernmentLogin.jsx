import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Landmark, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const GovernmentLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('rajgoverment@gmail.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password, 'government');
    if (success) {
      navigate('/government/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-100">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-10 h-10 rounded-lg bg-amber-500 items-center justify-center text-slate-950 font-bold text-sm">
            <Landmark className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Directorate Intelligence Console
          </h1>
          <p className="text-xs text-slate-400">
            Technical Education Department · Government of Rajasthan
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-xl space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Departmental Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-xs font-medium text-white focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                required
              />
              <span className="text-[11px] text-amber-400 font-medium mt-1 block">
                Assigned administrative email: <strong className="font-semibold">rajgoverment@gmail.com</strong>
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Secure Access Token / Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-xs font-medium text-white focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-md transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer mt-5"
            >
              <span>Authenticate Directorate Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <Link to="/" className="text-amber-400 font-semibold hover:underline">
              ← Portal Directory
            </Link>
            <span className="text-slate-500">Official Directorate Console</span>
          </div>
        </div>

      </div>
    </div>
  );
};
