import React from 'react';
import { Briefcase, Building2, CheckCircle2 } from 'lucide-react';

export const ExperienceForm = ({ data = { experience_type: 'fresher' }, onChange, errors = {} }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const isFresher = data.experience_type === 'fresher';

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 bg-[#0F1630]">
      <div className="border-b border-white/10 pb-3">
        <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-pink-400" />
          <span>Section 05 — Work Experience & Internships</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Select your professional status. Freshers are evaluated based on course projects and technical skill readiness.
        </p>
      </div>

      {/* Experience Type Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
        {[
          { id: 'fresher', label: 'Fresher (No Experience)' },
          { id: 'internship', label: 'Completed Internship' },
          { id: 'fulltime', label: 'Full Time Experience' },
          { id: 'freelance', label: 'Freelance / Consulting' }
        ].map((type) => {
          const isSelected = data.experience_type === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => handleChange('experience_type', type.id)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-500/25 to-fuchsia-500/25 text-white border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)] font-extrabold'
                  : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>

      {isFresher ? (
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-white/10 flex items-center space-x-3 text-xs text-slate-300">
          <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0" />
          <div>
            <span className="font-bold text-white block font-heading">Fresher Candidate Profile Configured</span>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
              The matching engine will give 100% weight to your course projects, hackathons, and technical verified skills.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-4 text-xs font-semibold">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Company */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">
                Company / Organization <span className="text-pink-400">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Infotech Solutions"
                  value={data.company_name || ''}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">
                Role / Job Title <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer Intern"
                value={data.role || ''}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none"
                required
              />
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">
                Start Date <span className="text-pink-400">*</span>
              </label>
              <input
                type="date"
                value={data.start_date || ''}
                onChange={(e) => handleChange('start_date', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs font-medium text-white focus:border-pink-500/50 focus:outline-none"
                required
              />
            </div>

            {/* End Date */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">
                End Date
              </label>
              <input
                type="date"
                disabled={data.is_current}
                value={data.end_date || ''}
                onChange={(e) => handleChange('end_date', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs font-medium text-white focus:border-pink-500/50 focus:outline-none disabled:opacity-40"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">
                Responsibilities & Key Contributions
              </label>
              <textarea
                rows={2}
                placeholder="Key deliverables, tech stack used, or measurable performance outcomes..."
                value={data.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
