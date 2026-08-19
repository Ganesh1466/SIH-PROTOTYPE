import React from 'react';
import { 
  User, 
  GraduationCap, 
  Zap, 
  FolderGit2, 
  Briefcase, 
  Sliders, 
  CheckCircle2, 
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
    <div className="glass-card rounded-2xl p-3 sm:p-4 border border-white/10 shadow-xl bg-[#0F1630]">
      <div className="flex items-center overflow-x-auto no-scrollbar gap-2 pb-1 scroll-smooth">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500/25 to-fuchsia-500/25 text-white border border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.3)] font-extrabold'
                  : step.isComplete
                  ? 'bg-slate-900/80 text-emerald-300 border border-emerald-500/30 hover:bg-slate-800'
                  : 'bg-slate-900/60 text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {step.isComplete && !isActive ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-slate-400'} shrink-0`} />
              )}
              <span>0{step.id} {step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
