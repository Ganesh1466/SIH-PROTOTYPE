import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  GraduationCap, 
  Zap, 
  FolderGit2, 
  Briefcase, 
  Sliders, 
  MapPin, 
  ExternalLink,
  Edit3,
  Save
} from 'lucide-react';

export const ProfilePreview = ({ profileData, onEditSection, onSave, isSaving }) => {
  const safeData = profileData || {};
  const { personal = {}, education = {}, skills = [], projects = [], experience = {}, preferences = {} } = safeData;

  return (
    <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E7E9EE] shadow-2xs space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
            Section 07 — Final Validation
          </span>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            Career Passport Preview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your verified credentials before saving to the Directorate database.
          </p>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center space-x-2 cursor-pointer w-full sm:w-auto justify-center"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving Profile...' : 'Save & Publish Passport'}</span>
        </button>
      </div>

      <div className="space-y-5 text-xs">
        
        {/* 1. Identity & Education Lockup */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h4 className="text-lg font-bold text-slate-900">{personal.full_name || 'Anonymous Student'}</h4>
              <span className="inline-flex items-center space-x-1 px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verified Identity</span>
              </span>
            </div>
            <p className="text-slate-600 font-semibold">
              {education.degree || 'B.Tech'} in {education.branch || 'Specialization'} · {education.current_year || '3rd Year'}
            </p>
            <p className="text-slate-500">
              {education.college_name || 'Rajasthan Technical University'} · {personal.city || 'Jaipur'}, {personal.state || 'Rajasthan'}
            </p>
            <p className="text-slate-400 text-[11px] pt-1">
              Email: {personal.email} · Phone: {personal.phone} {education.cgpa ? `· CGPA: ${education.cgpa}/10` : ''}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEditSection(1)}
            className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1 text-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Personal & Education</span>
          </button>
        </div>

        {/* 2. Skills Preview */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              Verified Technical Stack ({skills.length})
            </span>
            <button
              type="button"
              onClick={() => onEditSection(3)}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1 text-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Skills</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((s, idx) => {
              const name = typeof s === 'string' ? s : s.skill_name;
              return (
                <span
                  key={`${name}-${idx}`}
                  className="px-2.5 py-1 bg-white rounded-md border border-slate-200 text-slate-800 font-semibold shadow-2xs inline-flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{name}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* 3. Projects Preview */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              Portfolio Projects ({projects.length})
            </span>
            <button
              type="button"
              onClick={() => onEditSection(4)}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1 text-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Projects</span>
            </button>
          </div>

          {projects.length === 0 ? (
            <p className="text-slate-400 italic">No projects listed.</p>
          ) : (
            <div className="space-y-2.5">
              {projects.map((p, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <strong className="text-slate-900 font-bold block">{p.project_name}</strong>
                  <p className="text-slate-600 text-xs">{p.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1 text-[11px] text-slate-500">
                    <span className="font-semibold">Tech:</span>
                    <span>{Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Experience & Career Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-xs">Experience</span>
              <button
                type="button"
                onClick={() => onEditSection(5)}
                className="text-indigo-600 hover:text-indigo-800 font-bold"
              >
                Edit
              </button>
            </div>
            <p className="text-slate-700 font-medium capitalize">
              {experience.experience_type === 'fresher' 
                ? 'Fresher (Academic & Project Focus)' 
                : `${experience.role || 'Intern'} at ${experience.company_name || 'Organization'}`}
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-xs">Target Roles & Locations</span>
              <button
                type="button"
                onClick={() => onEditSection(6)}
                className="text-indigo-600 hover:text-indigo-800 font-bold"
              >
                Edit
              </button>
            </div>
            <p className="text-slate-700 font-medium">
              Roles: {preferences.preferred_roles?.join(', ') || 'Any Technical Role'}
            </p>
            <p className="text-slate-500 text-[11px]">
              Locations: {preferences.preferred_locations?.join(', ') || 'Rajasthan'} ({preferences.work_mode || 'Hybrid'})
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
