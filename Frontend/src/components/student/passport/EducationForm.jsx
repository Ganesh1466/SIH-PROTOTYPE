import React from 'react';
import { GraduationCap, Award, BookOpen, Building2, Calendar } from 'lucide-react';

export const EducationForm = ({ data = {}, onChange, errors = {} }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 bg-[#0F1630]">
      <div className="border-b border-white/10 pb-3">
        <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-pink-400" />
          <span>Section 02 — Education & Academic Record</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Verified degree credentials used for institutional placement ranking and corporate eligibility criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
        
        {/* Highest Qualification */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 uppercase tracking-wider">
            Highest Qualification <span className="text-pink-400">*</span>
          </label>
          <select
            value={data.highest_qualification || 'B.Tech'}
            onChange={(e) => handleChange('highest_qualification', e.target.value)}
            className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white focus:border-pink-500/50 focus:outline-none cursor-pointer"
          >
            <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
            <option value="Polytechnic Diploma">Polytechnic Diploma</option>
            <option value="M.Tech">M.Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="B.Sc">B.Sc Computer Science / IT</option>
          </select>
        </div>

        {/* Degree Name */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 uppercase tracking-wider">
            Degree Name <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. B.Tech"
              value={data.degree || ''}
              onChange={(e) => handleChange('degree', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-all"
              required
            />
          </div>
          {errors.degree && <p className="text-[11px] text-rose-400 font-medium">{errors.degree}</p>}
        </div>

        {/* Branch / Specialization */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-slate-300 uppercase tracking-wider">
            Branch / Specialization <span className="text-pink-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Computer Science & Engineering (AI/ML)"
            value={data.branch || ''}
            onChange={(e) => handleChange('branch', e.target.value)}
            className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-all"
            required
          />
          {errors.branch && <p className="text-[11px] text-rose-400 font-medium">{errors.branch}</p>}
        </div>

        {/* College / University Name */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-slate-300 uppercase tracking-wider">
            College / University Name <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Rajasthan Technical University, Kota"
              value={data.college_name || ''}
              onChange={(e) => handleChange('college_name', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-all"
              required
            />
          </div>
          {errors.college_name && <p className="text-[11px] text-rose-400 font-medium">{errors.college_name}</p>}
        </div>

        {/* Current Year */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 uppercase tracking-wider">
            Current Year of Study <span className="text-pink-400">*</span>
          </label>
          <select
            value={data.current_year || '3rd Year'}
            onChange={(e) => handleChange('current_year', e.target.value)}
            className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white focus:border-pink-500/50 focus:outline-none cursor-pointer"
          >
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Graduated">Graduated / Alumni</option>
          </select>
        </div>

        {/* CGPA */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 uppercase tracking-wider">
            Cumulative CGPA (0.0 – 10.0 Scale)
          </label>
          <div className="relative">
            <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              step="0.01"
              placeholder="e.g. 8.64"
              min={0}
              max={10}
              value={data.cgpa || ''}
              onChange={(e) => handleChange('cgpa', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white focus:border-pink-500/50 focus:outline-none font-metrics"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
