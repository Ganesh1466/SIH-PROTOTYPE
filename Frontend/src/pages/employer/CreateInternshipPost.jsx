import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Zap, 
  Calendar, 
  Eye, 
  Save, 
  ArrowLeft, 
  Plus, 
  X, 
  CheckCircle2, 
  Search, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { RAJASTHAN_DISTRICTS, WORK_MODES, ENGINEERING_BRANCHES } from '../../constants/rajasthanLocations';
import toast from 'react-hot-toast';

const POPULAR_SKILLS = [
  'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'Python', 
  'Tailwind CSS', 'Git', 'SQL', 'MongoDB', 'TypeScript', 'Figma'
];

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

  const toggleBranch = (branch) => {
    const current = formData.education.branches || [];
    const updated = current.includes(branch)
      ? current.filter(b => b !== branch)
      : [...current, branch];
    handleEducationChange('branches', updated);
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
            position: "top-center",
            style: {
              background: '#064E3B',
              color: '#ECFDF5',
              border: '1px solid #10B981',
              fontSize: '13px',
              fontWeight: '700',
              padding: '12px 20px',
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)'
            },
            iconTheme: {
              primary: '#10B981',
              secondary: '#ECFDF5'
            }
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
    <div className="max-w-4xl mx-auto space-y-6 py-2 font-sans text-[#171A21]">
      
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E7E9EE] shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Link
            to="/employer/post"
            className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center space-x-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Opportunity Selection</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Internship Program (Rajasthan)
          </h1>
          <p className="text-xs text-slate-500">
            Target 2nd, 3rd, and 4th-year engineering students across RTU and Rajasthan colleges.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 flex items-center space-x-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>{isPreview ? 'Back to Editor' : 'Preview Program'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={submitting}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4 text-slate-600" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>{submitting ? 'Publishing...' : 'Publish Internship'}</span>
          </button>
        </div>
      </div>

      {isPreview ? (
        /* PREVIEW MODE */
        <div className="bg-white rounded-2xl p-7 border border-[#E7E9EE] shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                {formData.internship_type} Internship · {formData.duration_months} · {formData.work_mode}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                {formData.title || 'Untitled Internship'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {formData.company_name} · {formData.district}, Rajasthan
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-semibold block">Monthly Stipend</span>
              <span className="text-lg font-extrabold text-emerald-700">
                {formData.is_paid ? `₹${formData.stipend_min.toLocaleString()} – ₹${formData.stipend_max.toLocaleString()} / mo` : 'Unpaid'}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">About the Internship</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {formData.description || 'No description provided.'}
              </p>
            </div>

            {/* Benefits Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {formData.mentorship_provided && (
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1-on-1 Mentorship</span>
                </span>
              )}
              {formData.certificate_provided && (
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-semibold flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Certificate Provided</span>
                </span>
              )}
              {formData.ppo_available && (
                <span className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-md font-semibold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>PPO Opportunity</span>
                </span>
              )}
            </div>

            {/* Required Skills */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Required Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.filter(s => s.requirement_type === 'REQUIRED').map(s => (
                  <span key={s.skill_name} className="px-2.5 py-1 bg-sky-50 border border-sky-200 text-sky-800 rounded-md font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>{s.skill_name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target Year</span>
                <span className="font-bold text-slate-800">{formData.education.academic_year}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Min CGPA</span>
                <span className="font-bold text-slate-800">{formData.education.minimum_cgpa || 'None'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Deadline</span>
                <span className="font-bold text-slate-800">{formData.application_deadline}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsPreview(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg cursor-pointer"
            >
              Edit Form
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={submitting}
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              {submitting ? 'Publishing...' : 'Publish Internship Live'}
            </button>
          </div>
        </div>
      ) : (
        /* FORM EDITOR MODE */
        <div className="space-y-6">
          
          {/* SECTION 01: BASIC INFORMATION */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-sky-600" />
                <span>Section 01 — Basic Information</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1 sm:col-span-2">
                <label className="block text-slate-700 uppercase tracking-wider">
                  Internship Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer Intern / AI Research Intern"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`w-full px-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:outline-hidden ${
                    errors.title ? 'border-rose-300' : 'border-slate-200 focus:ring-1 focus:ring-sky-500'
                  }`}
                  required
                />
                {errors.title && <p className="text-[11px] text-rose-600">{errors.title}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Internship Category <span className="text-rose-500">*</span></label>
                <select
                  value={formData.internship_type}
                  onChange={(e) => handleChange('internship_type', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  <option value="Technical">Technical / Software</option>
                  <option value="Research">Research & Development</option>
                  <option value="Design">UI/UX Design</option>
                  <option value="Data">Data & AI</option>
                  <option value="Other">Other Category</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-slate-700 uppercase tracking-wider">
                  Internship Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe learning objectives, projects students will work on, and mentorship details..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 02: DURATION & LOCATION */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-sky-600" />
                <span>Section 02 — Duration & Rajasthan Location</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Duration <span className="text-rose-500">*</span></label>
                <select
                  value={formData.duration_months}
                  onChange={(e) => handleChange('duration_months', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  <option value="1 Month">1 Month (Winter / Fast-track)</option>
                  <option value="2 Months">2 Months (Summer Break)</option>
                  <option value="3 Months">3 Months (Standard)</option>
                  <option value="6 Months">6 Months (Semester Internship)</option>
                  <option value="12 Months">12 Months (Graduate Trainee)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">
                  District / City in Rajasthan <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => {
                    handleChange('district', e.target.value);
                    handleChange('city', e.target.value);
                  }}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  {RAJASTHAN_DISTRICTS.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Work Mode <span className="text-rose-500">*</span></label>
                <select
                  value={formData.work_mode}
                  onChange={(e) => handleChange('work_mode', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  {WORK_MODES.map(m => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 03: STIPEND */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <IndianRupee className="w-5 h-5 text-sky-600" />
                <span>Section 03 — Monthly Stipend</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Paid Internship?</label>
                <select
                  value={formData.is_paid ? 'Yes' : 'No'}
                  onChange={(e) => handleChange('is_paid', e.target.value === 'Yes')}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  <option value="Yes">Yes (Paid Stipend)</option>
                  <option value="No">No (Academic Credit / Unpaid)</option>
                </select>
              </div>

              {formData.is_paid && (
                <>
                  <div className="space-y-1">
                    <label className="block text-slate-700 uppercase tracking-wider">Min Monthly Stipend (INR)</label>
                    <input
                      type="number"
                      step={1000}
                      value={formData.stipend_min}
                      onChange={(e) => handleChange('stipend_min', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 uppercase tracking-wider">Max Monthly Stipend (INR)</label>
                    <input
                      type="number"
                      step={1000}
                      value={formData.stipend_max}
                      onChange={(e) => handleChange('stipend_max', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* SECTION 04: ELIGIBILITY & BENEFITS */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-sky-600" />
                <span>Section 04 — Academic Eligibility & Program Benefits</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Target Academic Year</label>
                <select
                  value={formData.education.academic_year}
                  onChange={(e) => handleEducationChange('academic_year', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Any">Any Year</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Minimum Qualification</label>
                <select
                  value={formData.education.qualification}
                  onChange={(e) => handleEducationChange('qualification', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  <option value="B.Tech">B.Tech / B.E.</option>
                  <option value="BCA">BCA / MCA</option>
                  <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                  <option value="Any">Any Degree</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Min CGPA (Optional)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 6.5"
                  value={formData.education.minimum_cgpa}
                  onChange={(e) => handleEducationChange('minimum_cgpa', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Benefits Checkboxes */}
              <div className="sm:col-span-3 pt-3 border-t border-slate-100 space-y-2">
                <label className="block text-slate-700 uppercase tracking-wider">Student Program Highlights</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'mentorship_provided', label: '1-on-1 Mentorship' },
                    { key: 'certificate_provided', label: 'Verified Certificate' },
                    { key: 'ppo_available', label: 'Pre-Placement Offer (PPO)' },
                    { key: 'flexible_schedule', label: 'Flexible Work Hours' }
                  ].map(b => (
                    <label key={b.key} className="flex items-center space-x-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[b.key]}
                        onChange={(e) => handleChange(b.key, e.target.checked)}
                        className="w-4 h-4 text-sky-600 rounded"
                      />
                      <span>{b.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 05: TECHNICAL SKILLS */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Section 05 — Technical Skill Prerequisites</span>
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter required skill (e.g. JavaScript, HTML, Figma)..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(skillSearch);
                    }
                  }}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              <select
                value={skillReqType}
                onChange={(e) => setSkillReqType(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden"
              >
                <option value="REQUIRED">Required (Mandatory)</option>
                <option value="PREFERRED">Preferred (Bonus)</option>
              </select>

              <button
                type="button"
                onClick={() => handleAddSkill(skillSearch)}
                disabled={!skillSearch.trim()}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                + Add
              </button>
            </div>

            {/* Selected Skills */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Prerequisite Skills ({formData.skills.length})
              </span>

              <div className="flex flex-wrap gap-2">
                {formData.skills.map(s => (
                  <div
                    key={s.skill_name}
                    className={`px-3 py-1.5 rounded-lg border flex items-center space-x-2 text-xs ${
                      s.requirement_type === 'REQUIRED'
                        ? 'bg-sky-50 border-sky-200 text-sky-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 font-medium'
                    }`}
                  >
                    <span>{s.skill_name}</span>
                    <span className="text-[10px] uppercase opacity-75 font-semibold">
                      [{s.requirement_type}]
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s.skill_name)}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="bg-white rounded-xl p-4 border border-[#E7E9EE] shadow-2xs flex justify-between items-center">
            <Link
              to="/employer/post"
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </Link>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={submitting}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg cursor-pointer"
              >
                Save Draft
              </button>

              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                {submitting ? 'Publishing...' : 'Publish Internship Program →'}
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
