import React from 'react';
import { 
  User, 
  GraduationCap, 
  Zap, 
  FolderGit2, 
  Briefcase, 
  Sliders, 
  CheckCircle2, 
  Circle,
  Eye
} from 'lucide-react';

export const ProfileCompletion = ({ activeStep, setActiveStep, profileData }) => {
  const safeData = profileData || {};
  const { personal, education, skills, projects, experience, preferences } = safeData;

  const steps = [
    {
      id: 1,
      title: "Personal Info",
      weight: "20%",
      icon: User,
      isComplete: Boolean(personal?.full_name && personal?.email && personal?.phone && personal?.city)
    },
    {
      id: 2,
      title: "Education",
      weight: "20%",
      icon: GraduationCap,
      isComplete: Boolean(education?.degree && education?.college_name && education?.current_year)
    },
    {
      id: 3,
      title: "Technical Skills",
      weight: "20%",
      icon: Zap,
      isComplete: Boolean(Array.isArray(skills) && skills.length > 0)
    },
    {
      id: 4,
      title: "Projects",
      weight: "15%",
      icon: FolderGit2,
      isComplete: Boolean(Array.isArray(projects) && projects.length > 0 && projects[0].project_name)
    },
    {
      id: 5,
      title: "Experience",
      weight: "10%",
      icon: Briefcase,
      isComplete: Boolean(experience?.experience_type === 'fresher' || (experience?.company_name && experience?.role))
    },
    {
      id: 6,
      title: "Preferences",
      weight: "15%",
      icon: Sliders,
      isComplete: Boolean(preferences?.preferred_roles?.length > 0 && preferences?.preferred_locations?.length > 0)
    },
    {
      id: 7,
      title: "Passport Review",
      weight: "Final",
      icon: Eye,
      isComplete: true
    }
  ];

  return (
    <div className="bg-white rounded-xl p-4 border border-[#E7E9EE] shadow-2xs">
      <div className="flex items-center justify-between overflow-x-auto gap-2 pb-1">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : step.isComplete
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {step.isComplete && !isActive ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'} shrink-0`} />
              )}
              <span>0{step.id} {step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
