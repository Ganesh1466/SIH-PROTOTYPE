import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  IndianRupee, 
  GraduationCap, 
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
  AlertCircle,
  FileText
} from 'lucide-react';
import { employerApi } from '../../api/employerApi';
import { RAJASTHAN_DISTRICTS, WORK_MODES, ENGINEERING_BRANCHES } from '../../constants/rajasthanLocations';
import toast from 'react-hot-toast';

const POPULAR_SKILLS = [
  'React.js', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 
  'Python', 'HTML5', 'CSS3', 'Tailwind CSS', 'SQL', 'PostgreSQL', 
  'MongoDB', 'Docker', 'Git', 'REST APIs', 'Next.js', 'Java', 'C++', 'AWS'
];

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

  const handleEducationChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: val }
    }));
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

  // Toggle Branch
  const toggleBranch = (branch) => {
    const current = formData.education.branches || [];
    const updated = current.includes(branch)
      ? current.filter(b => b !== branch)
      : [...current, branch];
    handleEducationChange('branches', updated);
  };

  // Save / Publish Handler
  const handleSubmit = async (isDraft = false) => {
    try {
      setSubmitting(true);
      setErrors({});

      // Client-side quick checks
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
            : "🎉 Job Requisition successfully published & synced to Supabase database!",
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
        toast.error(err.response?.data?.message || "Failed to create opportunity.");
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
            Create Job Requisition (Rajasthan)
          </h1>
          <p className="text-xs text-slate-500">
            Collect structured technical requirements to drive 7-factor explainable student candidate matching.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 flex items-center space-x-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>{isPreview ? 'Back to Editor' : 'Preview Requisition'}</span>
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
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>{submitting ? 'Publishing...' : 'Publish Job'}</span>
          </button>
        </div>
      </div>

      {isPreview ? (
        /* PREVIEW MODE */
        <div className="bg-white rounded-2xl p-7 border border-[#E7E9EE] shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {formData.employment_type} Job · {formData.work_mode}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                {formData.title || 'Untitled Job Requisition'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {formData.company_name} · {formData.district}, Rajasthan
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-semibold block">Offered CTC</span>
              <span className="text-lg font-extrabold text-slate-900">
                ₹{(formData.salary_min / 100000).toFixed(1)}–{(formData.salary_max / 100000).toFixed(1)} LPA
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">About the Role</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {formData.description || 'No description provided.'}
              </p>
            </div>

            {/* Required vs Preferred Skills */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Required Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.filter(s => s.requirement_type === 'REQUIRED').map(s => (
                  <span key={s.skill_name} className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-md font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{s.skill_name} {s.is_core && '(Core Skill)'}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Preferred Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.filter(s => s.requirement_type === 'PREFERRED').map(s => (
                  <span key={s.skill_name} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-md font-semibold">
                    {s.skill_name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Education</span>
                <span className="font-bold text-slate-800">{formData.education.qualification}</span>
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
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              {submitting ? 'Publishing...' : 'Publish Job Live'}
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
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <span>Section 01 — Basic Information</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1 sm:col-span-2">
                <label className="block text-slate-700 uppercase tracking-wider">
                  Job Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer / Full Stack Engineer"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`w-full px-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:outline-hidden ${
                    errors.title ? 'border-rose-300' : 'border-slate-200 focus:ring-1 focus:ring-indigo-500'
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
                <label className="block text-slate-700 uppercase tracking-wider">Employment Type <span className="text-rose-500">*</span></label>
                <select
                  value={formData.employment_type}
                  onChange={(e) => handleChange('employment_type', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-slate-700 uppercase tracking-wider">
                  Job Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the role, responsibilities, and what the candidate will work on..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  required
                />
              </div>

              {/* Responsibilities list */}
              <div className="space-y-2 sm:col-span-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="block text-slate-700 uppercase tracking-wider">Key Responsibilities</label>
                  <button
                    type="button"
                    onClick={handleAddResp}
                    className="text-xs text-indigo-600 font-bold hover:underline"
                  >
                    + Add Bullet
                  </button>
                </div>
                {formData.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`e.g. Build responsive React web components`}
                      value={resp}
                      onChange={(e) => handleUpdateResp(idx, e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                    />
                    {formData.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveResp(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 02: RAJASTHAN LOCATION */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>Section 02 — Rajasthan Location</span>
              </h3>
              <p className="text-xs text-slate-500">
                CareerSphere is dedicated to opportunities in the State of Rajasthan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">State</label>
                <input
                  type="text"
                  value="Rajasthan"
                  disabled
                  className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 cursor-not-allowed"
                />
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

          {/* SECTION 03: COMPENSATION */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <IndianRupee className="w-5 h-5 text-indigo-600" />
                <span>Section 03 — Compensation (INR)</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Salary Type</label>
                <select
                  value={formData.salary_type}
                  onChange={(e) => handleChange('salary_type', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  <option value="Annual CTC">Annual CTC (INR/year)</option>
                  <option value="Monthly Salary">Monthly Salary (INR/month)</option>
                  <option value="Unpaid">Unpaid / Volunteering</option>
                </select>
              </div>

              {formData.salary_type !== 'Unpaid' && (
                <>
                  <div className="space-y-1">
                    <label className="block text-slate-700 uppercase tracking-wider">Minimum Salary (INR) <span className="text-rose-500">*</span></label>
                    <input
                      type="number"
                      step={50000}
                      value={formData.salary_min}
                      onChange={(e) => handleChange('salary_min', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 uppercase tracking-wider">Maximum Salary (INR) <span className="text-rose-500">*</span></label>
                    <input
                      type="number"
                      step={50000}
                      value={formData.salary_max}
                      onChange={(e) => handleChange('salary_max', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </>
              )}
            </div>
            {errors.salary && <p className="text-[11px] text-rose-600">{errors.salary}</p>}
          </div>

          {/* SECTION 04: EDUCATION ELIGIBILITY */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Section 04 — Education Eligibility Criteria</span>
              </h3>
              <p className="text-xs text-slate-500">
                Used by the institutional matching engine to filter qualified student nodes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Minimum Qualification <span className="text-rose-500">*</span></label>
                <select
                  value={formData.education.qualification}
                  onChange={(e) => handleEducationChange('qualification', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  <option value="B.Tech">B.Tech / B.E.</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="BCA">BCA</option>
                  <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                  <option value="Any Graduate">Any Technical Graduate</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Academic Year</label>
                <select
                  value={formData.education.academic_year}
                  onChange={(e) => handleEducationChange('academic_year', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                >
                  <option value="4th Year / Graduating">4th Year / Graduating Senior</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Graduate / Alumni">Graduate / Alumni</option>
                  <option value="Any">Any Academic Year</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Minimum CGPA (Optional)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 7.0"
                  value={formData.education.minimum_cgpa}
                  onChange={(e) => handleEducationChange('minimum_cgpa', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Branches Multi-select */}
              <div className="sm:col-span-3 space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-slate-700 uppercase tracking-wider">Eligible Engineering Branches</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ENGINEERING_BRANCHES.map(branch => {
                    const isSelected = formData.education.branches?.includes(branch);
                    return (
                      <button
                        key={branch}
                        type="button"
                        onClick={() => toggleBranch(branch)}
                        className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {branch}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 05: EXPERIENCE */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <span>Section 05 — Experience Expectation</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-semibold">
              {['Fresher', '0–1 Years', '1–2 Years', '2–3 Years', '3+ Years'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleChange('experience_level', lvl)}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    formData.experience_level === lvl
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 06: TECHNICAL REQUIREMENTS */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Section 06 — Technical Skill Requirements (Core Matching Factor)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Specify mandatory vs preferred skills. Skills are canonicalized and fed directly into the 7-factor algorithm.
              </p>
            </div>

            {/* Add Skill Control */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search technical skill (e.g. React.js, Docker, Python)..."
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
                <option value="PREFERRED">Preferred (Bonus Fit)</option>
              </select>

              <label className="flex items-center space-x-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCoreSkill}
                  onChange={(e) => setIsCoreSkill(e.target.checked)}
                  className="w-3.5 h-3.5 text-indigo-600 rounded"
                />
                <span>Core Skill</span>
              </label>

              <button
                type="button"
                onClick={() => handleAddSkill(skillSearch)}
                disabled={!skillSearch.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                + Add
              </button>
            </div>

            {/* Popular quick add */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {POPULAR_SKILLS.filter(s => !formData.skills.some(sk => sk.skill_name === s)).slice(0, 8).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddSkill(s)}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 text-[11px] font-semibold rounded border border-slate-200"
                >
                  + {s}
                </button>
              ))}
            </div>

            {/* Selected Skills */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Target Requisition Skills ({formData.skills.length})
              </span>

              <div className="flex flex-wrap gap-2">
                {formData.skills.map(s => (
                  <div
                    key={s.skill_name}
                    className={`px-3 py-1.5 rounded-lg border flex items-center space-x-2 text-xs ${
                      s.requirement_type === 'REQUIRED'
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 font-medium'
                    }`}
                  >
                    <span>{s.skill_name}</span>
                    <span className="text-[10px] uppercase opacity-75 font-semibold">
                      [{s.requirement_type}] {s.is_core ? '★ Core' : ''}
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
              {errors.skills && <p className="text-[11px] text-rose-600">{errors.skills}</p>}
            </div>
          </div>

          {/* SECTION 07: APPLICATION DETAILS */}
          <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span>Section 07 — Application Details & Closing Date</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Application Deadline <span className="text-rose-500">*</span></label>
                <input
                  type="date"
                  value={formData.application_deadline}
                  onChange={(e) => handleChange('application_deadline', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 uppercase tracking-wider">Max Candidate Submissions (Optional)</label>
                <input
                  type="number"
                  placeholder="e.g. 200"
                  value={formData.max_applications || ''}
                  onChange={(e) => handleChange('max_applications', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden"
                />
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
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                {submitting ? 'Publishing...' : 'Publish Job Requisition →'}
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
