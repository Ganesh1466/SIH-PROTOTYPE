import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('student01@gmail.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password, 'student');
    if (success) {
      navigate('/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#171A21]">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-10 h-10 rounded-lg bg-indigo-600 items-center justify-center text-white font-bold text-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Student Portal Sign In
          </h1>
          <p className="text-xs text-slate-500">
            Rajasthan Technical Education Department · CareerSphere
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Student Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                required
              />
              <span className="text-[11px] text-indigo-600 font-medium mt-1 block">
                Assigned demo account: <strong className="font-semibold">student01@gmail.com</strong>
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer mt-5"
            >
              <span>Continue to Student Workspace (Rahul Sharma)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link to="/" className="text-indigo-600 font-semibold hover:underline">
              ← Portal Directory
            </Link>
            <span className="text-slate-400">Government of Rajasthan</span>
          </div>
        </div>

      </div>
    </div>
  );
};
