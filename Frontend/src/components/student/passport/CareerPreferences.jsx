import React from 'react';
import { Sliders, MapPin, Briefcase, Check, Building } from 'lucide-react';

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
  const preferredRoles = data.preferred_roles || [];
  const preferredLocations = data.preferred_locations || [];

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
    <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-indigo-600" />
          <span>Section 06 — Career Preferences & Placement Criteria</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Specify your target domains and geographic availability across Rajasthan.
        </p>
      </div>

      <div className="space-y-5 text-xs font-semibold">
        
        {/* Preferred Job Roles */}
        <div className="space-y-2">
          <label className="block text-slate-700 uppercase tracking-wider">
            Target Job Roles (Select all that apply) <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {AVAILABLE_ROLES.map((role) => {
              const isSelected = preferredRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{role}</span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
          {errors.preferred_roles && <p className="text-[11px] text-rose-600 font-medium">{errors.preferred_roles}</p>}
        </div>

        {/* Preferred Locations */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-slate-700 uppercase tracking-wider">
            Preferred Job Locations in Rajasthan <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AVAILABLE_LOCATIONS.map((loc) => {
              const isSelected = preferredLocations.includes(loc);
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleLocation(loc)}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{loc}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
          {errors.preferred_locations && <p className="text-[11px] text-rose-600 font-medium">{errors.preferred_locations}</p>}
        </div>

        {/* Work Mode & Opportunity Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div className="space-y-1.5">
            <label className="block text-slate-700 uppercase tracking-wider">
              Preferred Work Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['On-site', 'Hybrid', 'Remote'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleSelect('work_mode', mode)}
                  className={`py-2 px-3 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                    data.work_mode === mode
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-700 uppercase tracking-wider">
              Opportunity Preference <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Internship', 'Full Time', 'Both'].map((opp) => (
                <button
                  key={opp}
                  type="button"
                  onClick={() => handleSelect('opportunity_type', opp)}
                  className={`py-2 px-3 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                    data.opportunity_type === opp
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {opp}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
