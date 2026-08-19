import React, { useState } from 'react';
import { Zap, Plus, X, Search, CheckCircle2 } from 'lucide-react';

const POPULAR_SUGGESTIONS = [
  'React.js', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 
  'Python', 'HTML5', 'CSS3', 'Tailwind CSS', 'SQL', 'PostgreSQL', 
  'MongoDB', 'Docker', 'Git', 'REST APIs', 'Next.js', 'Java', 'C++'
];

export const SkillsSelector = ({ skills = [], onChange, errors = {} }) => {
  const [query, setQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');

  const handleAddSkill = (skillName) => {
    if (!skillName || !skillName.trim()) return;
    const cleanName = skillName.trim();
    
    const exists = skills.some(s => {
      const sName = typeof s === 'string' ? s : s.skill_name;
      return sName.toLowerCase() === cleanName.toLowerCase();
    });

    if (exists) return;

    const newSkillObj = {
      skill_name: cleanName,
      skill_level: selectedLevel
    };

    onChange([...skills, newSkillObj]);
    setQuery('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    const toRemoveName = typeof skillToRemove === 'string' ? skillToRemove : skillToRemove.skill_name;
    const updated = skills.filter(s => {
      const sName = typeof s === 'string' ? s : s.skill_name;
      return sName.toLowerCase() !== toRemoveName.toLowerCase();
    });
    onChange(updated);
  };

  const filteredSuggestions = POPULAR_SUGGESTIONS.filter(item => {
    const isAlreadySelected = skills.some(s => {
      const sName = typeof s === 'string' ? s : s.skill_name;
      return sName.toLowerCase() === item.toLowerCase();
    });
    const matchesQuery = !query || item.toLowerCase().includes(query.toLowerCase());
    return !isAlreadySelected && matchesQuery;
  });

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 bg-[#0F1630]">
      <div className="border-b border-white/10 pb-3">
        <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
          <Zap className="w-5 h-5 text-pink-400" />
          <span>Section 03 — Technical Skills & Competencies</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Skills are normalized and evaluated by our matching engine for role eligibility.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technical skill (e.g. React.js, Docker, Python)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(query);
                }
              }}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={() => handleAddSkill(query)}
            disabled={!query.trim()}
            className="btn-pink-gradient px-5 py-3 text-xs shadow-md cursor-pointer flex items-center justify-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>

        {filteredSuggestions.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Suggested Technologies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {filteredSuggestions.slice(0, 10).map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleAddSkill(tech)}
                  className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-pink-500/50 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>+ {tech}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 pt-3 border-t border-white/10">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Verified Passport Skills ({skills.length})
        </span>

        {skills.length === 0 ? (
          <div className="p-4 bg-slate-950/60 rounded-xl border border-dashed border-white/10 text-center text-xs text-slate-400">
            No technical skills added yet. Use the search box above to add your proficiencies.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {skills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : skill.skill_name;
              return (
                <div
                  key={`${skillName}-${idx}`}
                  className="flex items-center justify-between p-3 px-3.5 bg-slate-900/80 rounded-xl border border-white/10 text-xs"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                    <strong className="text-white font-bold block truncate">{skillName}</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="p-1 text-slate-400 hover:text-rose-400 rounded cursor-pointer"
                    title="Remove Skill"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
