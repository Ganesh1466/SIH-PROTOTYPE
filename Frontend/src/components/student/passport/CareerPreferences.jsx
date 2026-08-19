import React from 'react';
import { Sliders, Check } from 'lucide-react';

const AVAILABLE_ROLES = [
  'Frontend Developer', 'React Developer', 'Backend Developer', 
  'Full Stack Developer', 'Node.js Engineer', 'Python / Django Developer', 
  'Mobile App Developer (Flutter/React Native)', 'DevOps & Cloud Engineer', 
  'Data Analyst / ML Engineer', 'QA / Automation Engineer'
];

const AVAILABLE_LOCATIONS = [
  'Jaipur', 'Kota', 'Jodhpur', 'Udaipur', 'Bikaner', 'Ajmer', 'Remote / Work From Home', 'Anywhere in Rajasthan'
];

export const CareerPreferences = ({ data = {}, onChange, errors = {} }) => {
  const preferredRoles = data.preferred_roles || ['Frontend Developer', 'React Developer'];
  const preferredLocations = data.preferred_locations || ['Jaipur', 'Remote / Work From Home'];

  const toggleRole = (role) => {
    const exists = preferredRoles.includes(role);
    const updated = exists 
      ? preferredRoles.filter(r => r !== role)
      : [...preferredRoles, role];
    onChange({ ...data, preferred_roles: updated });
  };

  const toggleLocation = (loc) => {
    const exists = preferredLocations.includes(loc);
    const updated = exists 
      ? preferredLocations.filter(l => l !== loc)
      : [...preferredLocations, loc];
    onChange({ ...data, preferred_locations: updated });
  };

  const handleSelect = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 bg-[#0F1630]">
      <div className="border-b border-white/10 pb-3">
        <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-pink-400" />
          <span>Section 06 — Career Preferences & Placement Criteria</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Specify your target domains and geographic availability across Rajasthan.
        </p>
      </div>

      <div className="space-y-5 text-xs font-semibold">
        
        {/* Preferred Job Roles */}
        <div className="space-y-2">
          <label className="block text-slate-300 uppercase tracking-wider">
            Target Job Roles (Select all that apply) <span className="text-pink-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {AVAILABLE_ROLES.map((role) => {
              const isSelected = preferredRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500/25 to-fuchsia-500/25 text-white font-extrabold border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                      : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{role}</span>
                  {isSelected && <Check className="w-4 h-4 text-pink-400 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Locations */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <label className="block text-slate-300 uppercase tracking-wider">
            Preferred Job Locations in Rajasthan <span className="text-pink-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {AVAILABLE_LOCATIONS.map((loc) => {
              const isSelected = preferredLocations.includes(loc);
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleLocation(loc)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 font-extrabold border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{loc}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Work Mode & Opportunity Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
          <div className="space-y-2">
            <label className="block text-slate-300 uppercase tracking-wider">
              Preferred Work Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['On-site', 'Hybrid', 'Remote'].map((mode) => {
                const isSelected = (data.work_mode || 'Hybrid') === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleSelect('work_mode', mode)}
                    className={`py-2.5 px-3 rounded-xl border text-center font-extrabold text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'btn-pink-gradient text-white shadow-md'
                        : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-300 uppercase tracking-wider">
              Opportunity Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Internship', 'Full Time', 'Both'].map((opp) => {
                const isSelected = (data.opportunity_type || 'Both') === opp;
                return (
                  <button
                    key={opp}
                    type="button"
                    onClick={() => handleSelect('opportunity_type', opp)}
                    className={`py-2.5 px-3 rounded-xl border text-center font-extrabold text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'btn-pink-gradient text-white shadow-md'
                        : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {opp}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
