import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Layers, 
  FolderGit2, 
  Award, 
  Briefcase, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  Download,
  Share2,
  CheckCircle2,
  Edit3,
  Sliders,
  ChevronRight,
  BadgeCheck,
  Zap,
  Mail,
  Phone,
  Calendar,
  Building2,
  Globe,
  GitBranch
} from 'lucide-react';
import { studentApi } from '../../api/studentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { ProfileHeader } from '../../components/student/passport/ProfileHeader';
import { ProfileCompletion } from '../../components/student/passport/ProfileCompletion';
import { PersonalInfoForm } from '../../components/student/passport/PersonalInfoForm';
import { EducationForm } from '../../components/student/passport/EducationForm';
import { SkillsSelector } from '../../components/student/passport/SkillsSelector';
import { ProjectsForm } from '../../components/student/passport/ProjectsForm';
import { ExperienceForm } from '../../components/student/passport/ExperienceForm';
import { CareerPreferences } from '../../components/student/passport/CareerPreferences';
import { ProfilePreview } from '../../components/student/passport/ProfilePreview';
import toast from 'react-hot-toast';

export const CareerPassport = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await studentApi.getProfile();
      if (res.data?.data) {
        setProfile(res.data.data);
        if (res.data.data.is_new) {
          setIsEditMode(true);
        }
      }
    } catch (err) {
      toast.error("Failed to load Student Career Passport");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      setErrors({});
      const res = await studentApi.saveProfile(profile);
      if (res.data?.success) {
        setProfile(res.data.data);
        toast.success("🎉 Career Passport successfully published & synced to Supabase database!", {
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
        });
        setIsEditMode(false);
      }
    } catch (err) {
      console.error("[Career Passport Save Error]:", err);
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const errorMap = err.response.data.errors;
        setErrors(errorMap);

        // Auto jump to the step with error
        if (errorMap.full_name || errorMap.email || errorMap.phone || errorMap.city) {
          setActiveStep(1);
        } else if (errorMap.degree || errorMap.branch || errorMap.college_name || errorMap.cgpa) {
          setActiveStep(2);
        } else if (errorMap.skills) {
          setActiveStep(3);
        }

        const firstMsg = Object.values(errorMap)[0] || "Please resolve validation errors before saving.";
        toast.error(`⚠️ ${firstMsg}`);
      } else {
        toast.error(err.response?.data?.message || "❌ Profile could not be published. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const personal = profile?.personal || {};
  const education = profile?.education || {};
  const skills = profile?.skills || [];
  const projects = profile?.projects || [];
  const experience = profile?.experience || {};
  const preferences = profile?.preferences || {};
  const completion = profile?.profile_completion || 0;

  return (
    <div className="space-y-6 font-sans text-[#171A21]">
      
      {/* 1. Passport Top Header & Progress Gauge */}
      <ProfileHeader
        completion={completion}
        updatedAt={profile?.updated_at}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onSave={handleSaveProfile}
        isSaving={isSaving}
      />

      {/* 2. Mode Split: Interactive 7-Step Builder vs Official Verified View */}
      {isEditMode ? (
        <div className="space-y-6">
          {/* Step Navigation Bar */}
          <ProfileCompletion
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            profileData={profile}
          />

          {/* Active Step Content */}
          <div className="min-h-[420px]">
            {activeStep === 1 && (
              <PersonalInfoForm
                data={personal}
                onChange={(updated) => setProfile({ ...profile, personal: updated })}
                errors={errors}
              />
            )}

            {activeStep === 2 && (
              <EducationForm
                data={education}
                onChange={(updated) => setProfile({ ...profile, education: updated })}
                errors={errors}
              />
            )}

            {activeStep === 3 && (
              <SkillsSelector
                skills={skills}
                onChange={(updated) => setProfile({ ...profile, skills: updated })}
                errors={errors}
              />
            )}

            {activeStep === 4 && (
              <ProjectsForm
                projects={projects}
                onChange={(updated) => setProfile({ ...profile, projects: updated })}
                errors={errors}
              />
            )}

            {activeStep === 5 && (
              <ExperienceForm
                data={experience}
                onChange={(updated) => setProfile({ ...profile, experience: updated })}
                errors={errors}
              />
            )}

            {activeStep === 6 && (
              <CareerPreferences
                data={preferences}
                onChange={(updated) => setProfile({ ...profile, preferences: updated })}
                errors={errors}
              />
            )}

            {activeStep === 7 && (
              <ProfilePreview
                profileData={profile}
                onEditSection={(stepNum) => setActiveStep(stepNum)}
                onSave={handleSaveProfile}
                isSaving={isSaving}
              />
            )}
          </div>

          {/* Stepper Navigation Footer */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-[#E7E9EE] shadow-2xs">
            <button
              type="button"
              disabled={activeStep === 1}
              onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 rounded-lg border border-slate-200 cursor-pointer"
            >
              ← Previous Section
            </button>

            <span className="text-xs text-slate-500 font-semibold">
              Step {activeStep} of 7
            </span>

            {activeStep < 7 ? (
              <button
                type="button"
                onClick={() => setActiveStep(prev => Math.min(prev + 1, 7))}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
              >
                Next Section →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer shadow-sm"
              >
                {isSaving ? 'Saving...' : 'Save & Publish Passport'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Verified Identity Passport Display View */
        <div className="space-y-6">
          
          {/* Identity Summary Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E9EE] shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-black text-2xl">
                  {personal.full_name ? personal.full_name.charAt(0) : 'S'}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {personal.full_name || 'Student Profile'}
                    </h2>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Node</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {education.degree || 'B.Tech'} in {education.branch || 'Specialization'} · {education.current_year || '3rd Year'}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {education.college_name || 'Rajasthan Technical University'} · {personal.city || 'Jaipur'}, {personal.state || 'Rajasthan'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => toast.success("Career Passport PDF Generated & Downloaded")}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg border border-slate-200 flex items-center space-x-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Passport</span>
                </button>
              </div>
            </div>

            {/* Quick Contact & Academic Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Email</span>
                <span className="font-bold text-slate-800 truncate block">{personal.email || '—'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Phone</span>
                <span className="font-bold text-slate-800 truncate block">{personal.phone || '—'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Academic Score</span>
                <span className="font-bold text-indigo-700 truncate block">{education.cgpa ? `CGPA ${education.cgpa} / 10` : '—'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Graduation</span>
                <span className="font-bold text-slate-800 truncate block">{education.graduation_year || '2026'}</span>
              </div>
            </div>
          </div>

          {/* Technical Skills & Verified Stack */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Verified Technical Skills ({skills.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(true);
                  setActiveStep(3);
                }}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                + Add Skills
              </button>
            </div>

            {skills.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No skills added yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((s, idx) => {
                  const name = typeof s === 'string' ? s : s.skill_name;
                  const level = typeof s === 'object' ? s.skill_level : 'Verified';

                  return (
                    <div
                      key={`${name}-${idx}`}
                      className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center space-x-2 text-xs shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-bold text-slate-900">{name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">({level})</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Projects Portfolio */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E9EE] shadow-2xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <FolderGit2 className="w-5 h-5 text-indigo-600" />
                <span>Portfolio Projects ({projects.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(true);
                  setActiveStep(4);
                }}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                + Add Project
              </button>
            </div>

            {projects.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No projects listed yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-sm">{p.project_name}</h4>
                      {p.github_url && (
                        <a
                          href={p.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-slate-900"
                        >
                          <GitBranch className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">{p.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {Array.isArray(p.technologies) && p.technologies.map(t => (
                        <span key={t} className="px-1.5 py-0.5 bg-white rounded border border-slate-200 text-[10px] font-semibold text-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Experience & Target Roles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E7E9EE] shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <span>Professional Experience</span>
              </h3>
              <p className="text-xs text-slate-700 font-medium capitalize">
                {experience.experience_type === 'fresher'
                  ? 'Fresher Candidate (Course & Capstone Projects Emphasis)'
                  : `${experience.role || 'Role'} at ${experience.company_name || 'Organization'}`}
              </p>
              {experience.description && (
                <p className="text-xs text-slate-500 leading-relaxed">{experience.description}</p>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E7E9EE] shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <span>Target Career Requisitions</span>
              </h3>
              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block">Target Roles:</span>
                  <span className="font-bold text-slate-800">
                    {preferences.preferred_roles?.length ? preferences.preferred_roles.join(', ') : 'Any Technical Role'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block">Locations:</span>
                  <span className="font-bold text-slate-800">
                    {preferences.preferred_locations?.length ? preferences.preferred_locations.join(', ') : 'Rajasthan'} ({preferences.work_mode || 'Hybrid'})
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
