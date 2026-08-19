import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Zap, 
  Eye, 
  Save, 
  ArrowLeft, 
  X, 
  CheckCircle2, 
  Search, 
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { RAJASTHAN_DISTRICTS, WORK_MODES } from '../../constants/rajasthanLocations';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const CreateInternshipPost = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    opportunity_type: 'INTERNSHIP',
    title: '',
    department: 'Software Engineering',
    internship_type: 'Technical',
    description: '',
    duration_months: '6 Months',
    company_name: 'TechNova Solutions',
    company_website: 'https://technova.io',
    
    // Location
    state: 'Rajasthan',
    district: 'Jaipur',
    city: 'Jaipur',
    work_mode: 'Hybrid',

    // Stipend
    is_paid: true,
    stipend_min: 10000,
    stipend_max: 18000,

    // Education Eligibility
    education: {
      qualification: 'B.Tech',
      branches: ['CSE (Computer Science & Engineering)', 'IT (Information Technology)'],
      academic_year: '3rd Year',
      minimum_cgpa: '6.5'
    },

    // Skills
    skills: [
      { skill_name: 'HTML5', requirement_type: 'REQUIRED', is_core: true },
      { skill_name: 'CSS3', requirement_type: 'REQUIRED', is_core: true },
      { skill_name: 'JavaScript', requirement_type: 'REQUIRED', is_core: true },
      { skill_name: 'React.js', requirement_type: 'PREFERRED', is_core: false }
    ],

    // Benefits
    mentorship_provided: true,
    certificate_provided: true,
    ppo_available: true,
    flexible_schedule: false,

    // Application
    application_deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    max_applications: 150
  });

  const [skillSearch, setSkillSearch] = useState('');
  const [skillReqType, setSkillReqType] = useState('REQUIRED');

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleEducationChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: val }
    }));
  };

  const handleAddSkill = (name) => {
    if (!name || !name.trim()) return;
    const cleanName = name.trim();
    if (formData.skills.some(s => s.skill_name.toLowerCase() === cleanName.toLowerCase())) return;

    setFormData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        { skill_name: cleanName, requirement_type: skillReqType, is_core: skillReqType === 'REQUIRED' }
      ]
    }));
    setSkillSearch('');
  };

  const handleRemoveSkill = (name) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.skill_name !== name)
    }));
  };

  const handleSubmit = async (isDraft = false) => {
    try {
      setSubmitting(true);
      setErrors({});

      if (!formData.title.trim()) {
        toast.error("Please enter an Internship Title.");
        setErrors({ title: "Title is required." });
        setIsPreview(false);
        return;
      }
      if (!isDraft && !formData.description.trim()) {
        toast.error("Please enter an Internship Description.");
        setErrors({ description: "Description is required." });
        setIsPreview(false);
        return;
      }

      const res = await employerApi.createOpportunity(formData, isDraft);
      if (res.data?.success) {
        toast.success(
          isDraft 
            ? "📁 Internship draft saved successfully!" 
            : "🎉 Internship Program successfully published & synced to Supabase database!",
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
        toast.error(err.response?.data?.message || "Failed to create internship.");
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
            <span>Back to Opportunity Selection</span>
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-heading">
            Create Internship Program (Rajasthan)
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Target 2nd, 3rd, and 4th-year engineering students across RTU and Rajasthan colleges.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-3.5 py-2 bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer transition-all"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            <span>{isPreview ? 'Back to Editor' : 'Preview Program'}</span>
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
            <span>{submitting ? 'Publishing...' : 'Publish Internship'}</span>
          </button>
        </div>
      </motion.div>

      {isPreview ? (
        /* PREVIEW MODE */
        <div className="bg-[#0B1730] rounded-3xl p-7 border border-blue-900/40 shadow-2xl space-y-6">
          <div className="border-b border-blue-900/40 pb-4 flex justify-between items-start">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 font-heading">
                {formData.internship_type} Internship · {formData.duration_months} · {formData.work_mode}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1 font-heading">
                {formData.title || 'Untitled Internship'}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                {formData.company_name} · {formData.district}, Rajasthan
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-semibold block">Monthly Stipend</span>
              <span className="text-lg font-extrabold text-emerald-400 font-metrics">
                {formData.is_paid ? `₹${formData.stipend_min.toLocaleString()} – ₹${formData.stipend_max.toLocaleString()} / mo` : 'Unpaid'}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-white text-sm mb-1 font-heading">About the Internship</h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                {formData.description || 'No description provided.'}
              </p>
            </div>

            {/* Benefits Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-900/40">
              {formData.mentorship_provided && (
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1-on-1 Mentorship</span>
                </span>
              )}
              {formData.certificate_provided && (
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg font-semibold flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Certificate Provided</span>
                </span>
              )}
              {formData.ppo_available && (
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg font-semibold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>PPO Opportunity</span>
                </span>
              )}
            </div>

            {/* Required Skills */}
            <div className="space-y-2 pt-2 border-t border-blue-900/40">
              <h3 className="font-bold text-white text-sm font-heading">Required Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.filter(s => s.requirement_type === 'REQUIRED').map(s => (
                  <span key={s.skill_name} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{s.skill_name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* FORM EDITOR MODE */
        <div className="space-y-6">
          
          {/* SECTION 01: BASIC INFORMATION */}
          <div className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-xl space-y-4">
            <div className="border-b border-blue-900/40 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 font-heading">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <span>Section 01 — Basic Information</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-slate-300 uppercase tracking-wider">
                  Internship Title <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer Intern / AI Research Intern"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-blue-900/40 rounded-xl text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none transition-all text-sm font-medium"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 uppercase tracking-wider">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 rounded-xl text-white focus:border-blue-500/60 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 uppercase tracking-wider">Internship Category <span className="text-blue-400">*</span></label>
                <select
                  value={formData.internship_type}
                  onChange={(e) => handleChange('internship_type', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white rounded-xl focus:border-blue-500/60 focus:outline-none cursor-pointer"
                >
                  <option value="Technical">Technical / Software</option>
                  <option value="Research">Research & Development</option>
                  <option value="Design">UI/UX Design</option>
                  <option value="Data">Data & AI</option>
                  <option value="Other">Other Category</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-slate-300 uppercase tracking-wider">
                  Internship Description <span className="text-blue-400">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe learning objectives, projects students will work on..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-blue-900/40 rounded-xl text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 02: DURATION & LOCATION */}
          <div className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-xl space-y-4">
            <div className="border-b border-blue-900/40 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 font-heading">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Section 02 — Duration & Rajasthan Location</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="block text-slate-300 uppercase tracking-wider">Duration <span className="text-blue-400">*</span></label>
                <select
                  value={formData.duration_months}
                  onChange={(e) => handleChange('duration_months', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white rounded-xl focus:border-blue-500/60 focus:outline-none cursor-pointer"
                >
                  <option value="1 Month">1 Month (Winter / Fast-track)</option>
                  <option value="2 Months">2 Months (Summer Break)</option>
                  <option value="3 Months">3 Months (Standard)</option>
                  <option value="6 Months">6 Months (Semester Internship)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 uppercase tracking-wider">
                  District / City in Rajasthan <span className="text-blue-400">*</span>
                </label>
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
                <label className="block text-slate-300 uppercase tracking-wider">Work Mode <span className="text-blue-400">*</span></label>
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
            </div>
          </div>

          {/* SECTION 03: STIPEND */}
          <div className="bg-[#0B1730] rounded-3xl p-6 border border-blue-900/40 shadow-xl space-y-4">
            <div className="border-b border-blue-900/40 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 font-heading">
                <IndianRupee className="w-5 h-5 text-blue-400" />
                <span>Section 03 — Monthly Stipend</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="block text-slate-300 uppercase tracking-wider">Paid Internship?</label>
                <select
                  value={formData.is_paid ? 'Yes' : 'No'}
                  onChange={(e) => handleChange('is_paid', e.target.value === 'Yes')}
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white rounded-xl focus:border-blue-500/60 focus:outline-none cursor-pointer"
                >
                  <option value="Yes">Yes (Paid Stipend)</option>
                  <option value="No">No (Academic Credit / Unpaid)</option>
                </select>
              </div>

              {formData.is_paid && (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-slate-300 uppercase tracking-wider">Min Monthly Stipend (INR)</label>
                    <input
                      type="number"
                      step={1000}
                      value={formData.stipend_min}
                      onChange={(e) => handleChange('stipend_min', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white font-metrics focus:border-blue-500/60 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-300 uppercase tracking-wider">Max Monthly Stipend (INR)</label>
                    <input
                      type="number"
                      step={1000}
                      value={formData.stipend_max}
                      onChange={(e) => handleChange('stipend_max', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950/80 border border-blue-900/40 text-white font-metrics focus:border-blue-500/60 focus:outline-none"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
