import React from 'react';
import { 
  CheckCircle2, 
  Edit3,
  Save
} from 'lucide-react';

export const ProfilePreview = ({ profileData, onEditSection, onSave, isSaving }) => {
  const safeData = profileData || {};
  const { personal = {}, education = {}, skills = [], projects = [], experience = {}, preferences = {} } = safeData;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-6 bg-[#0F1630]">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-pink-400 font-heading">
            Section 07 — Final Validation
          </span>
          <h3 className="text-xl font-extrabold text-white font-heading tracking-tight mt-0.5">
            Career Passport Preview
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Review your verified credentials before saving to the Directorate database.
          </p>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="btn-pink-gradient px-5 py-2.5 text-xs shadow-md flex items-center space-x-2 cursor-pointer w-full sm:w-auto justify-center"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving Profile...' : 'Save & Publish Passport'}</span>
        </button>
      </div>

      <div className="space-y-5 text-xs">
        
        {/* 1. Identity & Education Lockup */}
        <div className="p-5 bg-slate-900/80 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h4 className="text-lg font-extrabold text-white font-heading">{personal.full_name || 'Rahul Sharma'}</h4>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Verified Identity</span>
              </span>
            </div>
            <p className="text-slate-300 font-semibold">
              {education.degree || 'B.Tech'} in {education.branch || 'Computer Science Engineering'} · {education.current_year || '4th Year'}
            </p>
            <p className="text-slate-400">
              {education.college_name || 'Rajasthan Technical University'} · {personal.city || 'Jaipur'}, {personal.state || 'Rajasthan'}
            </p>
            <p className="text-pink-300 font-metrics text-[11px] pt-1">
              Email: {personal.email || 'student01@gmail.com'} · Phone: {personal.phone || '9876543210'} {education.cgpa ? `· CGPA: ${education.cgpa}/10` : ''}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEditSection(1)}
            className="text-pink-400 hover:text-pink-300 font-bold flex items-center space-x-1 text-xs cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Personal & Education</span>
          </button>
        </div>

        {/* 2. Skills Preview */}
        <div className="p-5 bg-slate-900/80 rounded-2xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              Verified Technical Stack ({skills.length})
            </span>
            <button
              type="button"
              onClick={() => onEditSection(3)}
              className="text-pink-400 hover:text-pink-300 font-bold flex items-center space-x-1 text-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Skills</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((s, idx) => {
              const name = typeof s === 'string' ? s : s.skill_name;
              return (
                <span
                  key={`${name}-${idx}`}
                  className="px-3 py-1 bg-slate-950 rounded-full border border-white/10 text-slate-200 font-bold text-xs inline-flex items-center space-x-1.5 shadow-md"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                  <span>{name}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* 3. Projects Preview */}
        <div className="p-5 bg-slate-900/80 rounded-2xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              Portfolio Projects ({projects.length})
            </span>
            <button
              type="button"
              onClick={() => onEditSection(4)}
              className="text-pink-400 hover:text-pink-300 font-bold flex items-center space-x-1 text-xs cursor-pointer"
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
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-white/10 space-y-1">
                  <strong className="text-white font-bold block font-heading">{p.project_name}</strong>
                  <p className="text-slate-300 text-xs">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
