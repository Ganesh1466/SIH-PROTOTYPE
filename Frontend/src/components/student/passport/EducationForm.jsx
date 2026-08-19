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
    <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          <span>Section 02 — Education & Academic Record</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified degree credentials used for institutional placement ranking and corporate eligibility criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
        
        {/* Highest Qualification */}
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            Highest Qualification <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.highest_qualification || 'B.Tech'}
            onChange={(e) => handleChange('highest_qualification', e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
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
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            Degree Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. B.Tech"
              value={data.degree || ''}
              onChange={(e) => handleChange('degree', e.target.value)}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
                errors.degree ? 'border-rose-300 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:ring-1 focus:ring-indigo-500'
              }`}
              required
            />
          </div>
          {errors.degree && <p className="text-[11px] text-rose-600 font-medium">{errors.degree}</p>}
        </div>

        {/* Branch / Specialization */}
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-slate-700 uppercase tracking-wider">
            Branch / Specialization <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Computer Science & Engineering (AI/ML)"
            value={data.branch || ''}
            onChange={(e) => handleChange('branch', e.target.value)}
            className={`w-full px-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
              errors.branch ? 'border-rose-300 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:ring-1 focus:ring-indigo-500'
            }`}
            required
          />
          {errors.branch && <p className="text-[11px] text-rose-600 font-medium">{errors.branch}</p>}
        </div>

        {/* College / University Name */}
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-slate-700 uppercase tracking-wider">
            College / University Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Rajasthan Technical University, Kota"
              value={data.college_name || ''}
              onChange={(e) => handleChange('college_name', e.target.value)}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
                errors.college_name ? 'border-rose-300 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:ring-1 focus:ring-indigo-500'
              }`}
              required
            />
          </div>
          {errors.college_name && <p className="text-[11px] text-rose-600 font-medium">{errors.college_name}</p>}
        </div>

        {/* Current Year */}
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            Current Year of Study <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.current_year || '3rd Year'}
            onChange={(e) => handleChange('current_year', e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
          >
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Graduated">Graduated / Alumni</option>
          </select>
        </div>

        {/* Graduation Year */}
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            Expected Graduation Year
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              placeholder="e.g. 2026"
              min={2020}
              max={2032}
              value={data.graduation_year || '2026'}
              onChange={(e) => handleChange('graduation_year', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>
          {errors.graduation_year && <p className="text-[11px] text-rose-600 font-medium">{errors.graduation_year}</p>}
        </div>

        {/* CGPA */}
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-slate-700 uppercase tracking-wider">
            Cumulative CGPA (0.0 – 10.0 Scale)
          </label>
          <div className="relative">
            <Award className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              step="0.01"
              placeholder="e.g. 8.64"
              min={0}
              max={10}
              value={data.cgpa || ''}
              onChange={(e) => handleChange('cgpa', e.target.value)}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
                errors.cgpa ? 'border-rose-300 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:ring-1 focus:ring-indigo-500'
              }`}
            />
          </div>
          {errors.cgpa && <p className="text-[11px] text-rose-600 font-medium">{errors.cgpa}</p>}
        </div>

      </div>
    </div>
  );
};
