import React from 'react';
import { Briefcase, Building2, Calendar, CheckCircle2, Award } from 'lucide-react';

export const ExperienceForm = ({ data = { experience_type: 'fresher' }, onChange, errors = {} }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const isFresher = data.experience_type === 'fresher';

  return (
    <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          <span>Section 05 — Work Experience & Internships</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Select your professional status. Freshers are evaluated based on course projects and technical skill readiness.
        </p>
      </div>

      {/* Experience Type Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
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
              className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>

      {isFresher ? (
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-3 text-xs text-slate-600">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold text-slate-900 block">Fresher Candidate Profile Configured</span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              The matching engine will give 100% weight to your course projects, hackathons, and technical verified skills.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs font-semibold">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Company */}
            <div className="space-y-1">
              <label className="block text-slate-700 uppercase tracking-wider">
                Company / Organization <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Infotech Solutions"
                  value={data.company_name || ''}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  required
                />
              </div>
              {errors.exp_company && <p className="text-[11px] text-rose-600 font-medium">{errors.exp_company}</p>}
            </div>

            {/* Role */}
            <div className="space-y-1">
              <label className="block text-slate-700 uppercase tracking-wider">
                Role / Job Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer Intern"
                value={data.role || ''}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                required
              />
              {errors.exp_role && <p className="text-[11px] text-rose-600 font-medium">{errors.exp_role}</p>}
            </div>

            {/* Start Date */}
            <div className="space-y-1">
              <label className="block text-slate-700 uppercase tracking-wider">
                Start Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={data.start_date || ''}
                onChange={(e) => handleChange('start_date', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                required
              />
            </div>

            {/* End Date */}
            <div className="space-y-1">
              <label className="block text-slate-700 uppercase tracking-wider">
                End Date (or Expected)
              </label>
              <input
                type="date"
                disabled={data.is_current}
                value={data.end_date || ''}
                onChange={(e) => handleChange('end_date', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>

            {/* Current Position Checkbox */}
            <div className="sm:col-span-2 flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="isCurrent"
                checked={data.is_current || false}
                onChange={(e) => handleChange('is_current', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <label htmlFor="isCurrent" className="text-xs text-slate-700 font-medium cursor-pointer">
                I am currently working / interning in this role
              </label>
            </div>

            {/* Description */}
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-slate-700 uppercase tracking-wider">
                Responsibilities & Key Contributions
              </label>
              <textarea
                rows={2}
                placeholder="Key deliverables, tech stack used, or measurable performance outcomes..."
                value={data.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
