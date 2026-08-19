import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { jobApi } from '../../api/jobApi';
import { Badge } from '../../components/common/Badge';
import toast from 'react-hot-toast';

const POPULAR_SKILLS = [
  "React", "JavaScript", "HTML", "CSS", "TypeScript", "Node.js", 
  "Git", "Python", "SQL", "PostgreSQL", "AWS", "Docker", "Jest", "Redux", "Tailwind CSS"
];

export const CreateJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: 'Senior Frontend Engineer',
    companyName: 'TechNova Solutions',
    companyId: 'comp-1',
    description: 'We are seeking an experienced Frontend Developer to lead UI engineering for our cloud-native enterprise intelligence platform in Jaipur.',
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    location: 'Jaipur, Rajasthan',
    salary: '₹8.0 - 12.0 LPA',
    minCgpa: 7.5,
    minExperienceMonths: 12,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology'],
    requiredSkills: ['React', 'JavaScript', 'TypeScript', 'Git'],
    preferredSkills: ['Redux', 'Jest', 'AWS'],
    hardRequirements: ['React', 'JavaScript']
  });

  const [newSkill, setNewSkill] = useState('');

  const toggleSkill = (skill, category) => {
    if (category === 'required') {
      if (formData.requiredSkills.includes(skill)) {
        setFormData(prev => ({
          ...prev,
          requiredSkills: prev.requiredSkills.filter(s => s !== skill),
          hardRequirements: prev.hardRequirements.filter(s => s !== skill)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          requiredSkills: [...prev.requiredSkills, skill],
          preferredSkills: prev.preferredSkills.filter(s => s !== skill)
        }));
      }
    } else if (category === 'preferred') {
      if (formData.preferredSkills.includes(skill)) {
        setFormData(prev => ({
          ...prev,
          preferredSkills: prev.preferredSkills.filter(s => s !== skill)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          preferredSkills: [...prev.preferredSkills, skill],
          requiredSkills: prev.requiredSkills.filter(s => s !== skill),
          hardRequirements: prev.hardRequirements.filter(s => s !== skill)
        }));
      }
    }
  };

  const toggleHardRequirement = (skill) => {
    if (formData.hardRequirements.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        hardRequirements: prev.hardRequirements.filter(s => s !== skill)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        hardRequirements: [...prev.hardRequirements, skill]
      }));
    }
  };

  const handleAddCustomSkill = () => {
    if (!newSkill.trim()) return;
    const s = newSkill.trim();
    if (!formData.requiredSkills.includes(s) && !formData.preferredSkills.includes(s)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, s]
      }));
      setNewSkill('');
      toast.success(`Added ${s} to required skills`);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await jobApi.create(formData);
      toast.success('Job requisition posted to statewide matching engine!');
      navigate('/employer/jobs');
    } catch (err) {
      toast.error(err.message || 'Failed to post job');
    } finally {
      setSubmitting(false);
    }
  };

  const stepsHeader = [
    { num: 1, label: "Basic Information" },
    { num: 2, label: "Requirements" },
    { num: 3, label: "Skills & Hard Filters" },
    { num: 4, label: "Preferences" },
    { num: 5, label: "Preview & Publish" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Post a New Requisition
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Define objective eligibility, mandatory skill filters, and academic cutoffs.
        </p>

        {/* Stepper (Prompt Section 20) */}
        <div className="grid grid-cols-5 gap-2 mt-5 pt-4 border-t border-slate-100 text-xs">
          {stepsHeader.map(s => (
            <div key={s.num} className="space-y-1.5">
              <div className={`h-1.5 rounded-full ${
                step >= s.num ? 'bg-sky-600' : 'bg-slate-100'
              }`} />
              <span className={`text-[11px] font-medium block truncate ${
                step === s.num ? 'text-sky-700 font-bold' : 'text-slate-400'
              }`}>
                {s.num}. {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Step Container */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        
        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Step 1: Role Overview
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Role Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:outline-hidden"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Work Mode
                </label>
                <select
                  value={formData.workMode}
                  onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:outline-hidden"
                >
                  <option value="In-Office">In-Office</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Requirements */}
        {step === 2 && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Step 2: Location & Academic Criteria
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Location (District / City)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Annual Compensation / Stipend
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Minimum CGPA Cutoff
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.minCgpa}
                  onChange={(e) => setFormData({ ...formData, minCgpa: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Min. Experience (Months)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minExperienceMonths}
                  onChange={(e) => setFormData({ ...formData, minExperienceMonths: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Skills & Hard Requirements (Prompt Section 20) */}
        {step === 3 && (
          <div className="space-y-5 max-w-3xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">
                Step 3: Technical Skills & Hard Disqualifiers
              </h2>
              <span className="text-xs text-slate-500 font-medium">Directly feeds matching engine</span>
            </div>

            {/* Custom Skill Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add custom tech skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-md text-xs font-semibold hover:bg-slate-900"
              >
                + Add
              </button>
            </div>

            {/* Skills Matrix */}
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
                  Mandatory Required Skills (45% Weight in Algorithm)
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SKILLS.map(skill => {
                    const isSelected = formData.requiredSkills.includes(skill);
                    const isHard = formData.hardRequirements.includes(skill);
                    return (
                      <div key={skill} className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => toggleSkill(skill, 'required')}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-sky-600 text-white border-sky-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{skill}
                        </button>
                        {isSelected && (
                          <button
                            type="button"
                            onClick={() => toggleHardRequirement(skill)}
                            title={isHard ? "Hard requirement: non-eligible if missing" : "Click to make hard requirement"}
                            className={`p-1 rounded text-[10px] font-bold border cursor-pointer ${
                              isHard
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-700'
                            }`}
                          >
                            {isHard ? 'HARD REQ' : 'SET HARD'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
                  Preferred Additional Skills (10% Weight)
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SKILLS.filter(s => !formData.requiredSkills.includes(s)).map(skill => {
                    const isSelected = formData.preferredSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill, 'preferred')}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Preferences */}
        {step === 4 && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Step 4: Department & Branch Eligibility
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Allowed Engineering & Technical Branches
              </label>
              <div className="space-y-2 text-xs">
                {['Computer Science & Engineering', 'Information Technology', 'Data Science & AI', 'Electronics & Communication'].map(branch => (
                  <label key={branch} className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.allowedBranches.includes(branch)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ ...prev, allowedBranches: [...prev.allowedBranches, branch] }));
                        } else {
                          setFormData(prev => ({ ...prev, allowedBranches: prev.allowedBranches.filter(b => b !== branch) }));
                        }
                      }}
                      className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span>{branch}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Preview & Publish */}
        {step === 5 && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Step 5: Confirm Requisition Specification
            </h2>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Position:</span>
                <strong className="text-slate-900">{formData.title}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <strong className="text-slate-900">{formData.location} ({formData.workMode})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Compensation:</span>
                <strong className="text-slate-900">{formData.salary}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Min CGPA:</span>
                <strong className="text-slate-900">{formData.minCgpa} / 10</strong>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block mb-1">Required Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {formData.requiredSkills.map(s => (
                    <Badge key={s} variant="blue" size="sm">
                      {s} {formData.hardRequirements.includes(s) && '(HARD)'}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-md transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors flex items-center space-x-1 shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors shadow-xs"
            >
              {submitting ? 'Publishing...' : 'Publish Requisition'}
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
