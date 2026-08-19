import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Zap, 
  Eye, 
  Save, 
  ArrowLeft, 
  X, 
  Search
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { RAJASTHAN_DISTRICTS, WORK_MODES } from '../../constants/rajasthanLocations';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const CreateJobPost = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    opportunity_type: 'JOB',
    title: '',
    department: 'Engineering & Technology',
    employment_type: 'Full Time',
    description: '',
    responsibilities: [''],
    company_name: 'TechNova Solutions',
    company_website: 'https://technova.io',
    
    // Location
    state: 'Rajasthan',
    district: 'Jaipur',
    city: 'Jaipur',
    work_mode: 'Hybrid',

    // Compensation
    salary_type: 'Annual CTC',
    salary_min: 400000,
    salary_max: 800000,

    // Education
    education: {
      qualification: 'B.Tech',
      branches: ['CSE (Computer Science & Engineering)', 'IT (Information Technology)'],
      academic_year: '4th Year / Graduating',
      minimum_cgpa: '7.0'
    },

    // Experience
    experience_level: 'Fresher',
    experience_min: 0,
    experience_max: 2,

    // Skills
    skills: [
      { skill_name: 'React.js', requirement_type: 'REQUIRED', is_core: true },
      { skill_name: 'JavaScript', requirement_type: 'REQUIRED', is_core: true },
      { skill_name: 'Git', requirement_type: 'PREFERRED', is_core: false }
    ],

    // Application Details
    application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    max_applications: 200
  });

  const [skillSearch, setSkillSearch] = useState('');
  const [skillReqType, setSkillReqType] = useState('REQUIRED');
  const [isCoreSkill, setIsCoreSkill] = useState(false);

  // Field change handler
  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  // Responsibility list handlers
  const handleAddResp = () => {
    setFormData(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, '']
    }));
  };

  const handleUpdateResp = (index, val) => {
    const updated = [...formData.responsibilities];
    updated[index] = val;
    setFormData(prev => ({ ...prev, responsibilities: updated }));
  };

  const handleRemoveResp = (index) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, idx) => idx !== index)
    }));
  };

  // Skill handlers
  const handleAddSkill = (name) => {
    if (!name || !name.trim()) return;
    const cleanName = name.trim();
    if (formData.skills.some(s => s.skill_name.toLowerCase() === cleanName.toLowerCase())) return;

    setFormData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        { skill_name: cleanName, requirement_type: skillReqType, is_core: isCoreSkill }
      ]
    }));
    setSkillSearch('');
    setIsCoreSkill(false);
  };

  const handleRemoveSkill = (name) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.skill_name !== name)
    }));
  };

  // Save / Publish Handler
  const handleSubmit = async (isDraft = false) => {
    try {
      setSubmitting(true);
      setErrors({});

      if (!formData.title.trim()) {
        toast.error("Please enter a Job Title.");
        setErrors({ title: "Job Title is required." });
        setIsPreview(false);
        return;
      }
      if (!isDraft && !formData.description.trim()) {
        toast.error("Please enter a Job Description.");
        setErrors({ description: "Description is required." });
        setIsPreview(false);
        return;
      }

      const res = await employerApi.createOpportunity(formData, isDraft);
      if (res.data?.success) {
        toast.success(
          isDraft 
            ? "📁 Opportunity draft saved successfully!" 
            : "🎉 Job Requisition successfully published!",
          {
            duration: 4500,
            position: "top-center"
          }
        );
        navigate('/employer/jobs');
      }
    } catch (err) {
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const errorMap = err.response.data.errors;
        setErrors(errorMap);
        const firstMsg = Object.values(errorMap)[0] || "Please resolve validation errors before publishing.";
        toast.error(`⚠️ ${firstMsg}`);
        setIsPreview(false);
      } else {
        toast.error(err.response?.data?.message || "Failed to create opportunity.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 font-sans text-slate-100 pb-8">
      
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0B1730] via-[#0E1E40] to-[#0B1730]"
      >
        <div className="space-y-1">
          <Link
            to="/employer/post"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Opportunity Choice</span>
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-heading">
            Create Job Requisition (Rajasthan)
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Collect structured technical requirements to drive 7-factor explainable student candidate matching.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-3.5 py-2 bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer transition-all"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            <span>{isPreview ? 'Back to Editor' : 'Preview Requisition'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={submitting}
            className="px-3.5 py-2 bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold rounded-xl border border-blue-900/40 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4 text-slate-400" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.4)] cursor-pointer flex items-center space-x-1.5"
          >
            <span>{submitting ? 'Publishing...' : 'Publish Job'}</span>
          </button>
        </div>
      </motion.div>

      {/* FORM EDITOR MODE */}
      <div className="space-y-6">
        
        {/* SECTION 01: BASIC INFORMATION */}
        <div className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-xl space-y-4">
          <div className="border-b border-blue-900/40 pb-3">
            <h3 className="text-base font-bold text-white font-heading flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span>Section 01 — Basic Information</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-slate-300 uppercase tracking-wider">
                Job Title <span className="text-blue-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer / Full Stack Engineer"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-blue-900/40 rounded-xl text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none transition-all text-sm font-medium"
                required
              />
              {errors.title && <p className="text-[11px] text-rose-400">{errors.title}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 rounded-xl text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">Employment Type <span className="text-blue-400">*</span></label>
              <select
                value={formData.employment_type}
                onChange={(e) => handleChange('employment_type', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white rounded-xl focus:border-blue-500/60 focus:outline-none cursor-pointer"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-slate-300 uppercase tracking-wider">
                Job Description <span className="text-blue-400">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Describe the role, responsibilities, and what the candidate will work on..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-blue-900/40 rounded-xl text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Responsibilities list */}
            <div className="space-y-2.5 sm:col-span-2 pt-3 border-t border-blue-900/40">
              <div className="flex justify-between items-center">
                <label className="block text-slate-300 uppercase tracking-wider">Key Responsibilities</label>
                <button
                  type="button"
                  onClick={handleAddResp}
                  className="text-xs text-blue-400 font-bold hover:text-blue-300 cursor-pointer"
                >
                  + Add Bullet
                </button>
              </div>
              {formData.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="e.g. Build responsive React web components"
                    value={resp}
                    onChange={(e) => handleUpdateResp(idx, e.target.value)}
                    className="flex-1 px-4 py-2 bg-slate-950/80 border border-blue-900/40 rounded-xl text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none"
                  />
                  {formData.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveResp(idx)}
                      className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 02: LOCATION & SALARY */}
        <div className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-xl space-y-4">
          <div className="border-b border-blue-900/40 pb-3">
            <h3 className="text-base font-bold text-white font-heading flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Section 02 — Rajasthan Location & Compensation</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">District / City</label>
              <select
                value={formData.district}
                onChange={(e) => {
                  handleChange('district', e.target.value);
                  handleChange('city', e.target.value);
                }}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white rounded-xl focus:border-blue-500/60 focus:outline-none cursor-pointer"
              >
                {RAJASTHAN_DISTRICTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">Work Mode</label>
              <select
                value={formData.work_mode}
                onChange={(e) => handleChange('work_mode', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white rounded-xl focus:border-blue-500/60 focus:outline-none cursor-pointer"
              >
                {WORK_MODES.map(m => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider">Min Salary (INR)</label>
              <input
                type="number"
                step={50000}
                value={formData.salary_min}
                onChange={(e) => handleChange('salary_min', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white font-metrics focus:border-blue-500/60 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 03: TECHNICAL SKILLS */}
        <div className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-xl space-y-4">
          <div className="border-b border-blue-900/40 pb-3">
            <h3 className="text-base font-bold text-white font-heading flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span>Section 03 — Technical Skill Requirements</span>
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search technical skill (e.g. React.js, Docker)..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(skillSearch);
                  }
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-blue-900/40 rounded-xl text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => handleAddSkill(skillSearch)}
              disabled={!skillSearch.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
            >
              + Add Skill
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {formData.skills.map(s => (
              <div
                key={s.skill_name}
                className="px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/20 text-blue-300 flex items-center space-x-2 text-xs font-bold shadow-md"
              >
                <span>{s.skill_name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s.skill_name)}
                  className="text-slate-400 hover:text-rose-400 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
