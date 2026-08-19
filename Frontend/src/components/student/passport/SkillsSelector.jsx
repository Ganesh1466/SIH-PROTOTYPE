import React, { useState } from 'react';
import { Zap, Plus, X, Search, CheckCircle2, Award } from 'lucide-react';

const POPULAR_SUGGESTIONS = [
  'React.js', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 
  'Python', 'HTML5', 'CSS3', 'Tailwind CSS', 'SQL', 'PostgreSQL', 
  'MongoDB', 'Docker', 'Git', 'REST APIs', 'Next.js', 'Java', 'C++'
];

export const SkillsSelector = ({ skills = [], onChange, errors = {} }) => {
  const [query, setQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');
  const [selectedYears, setSelectedYears] = useState(1);

  const handleAddSkill = (skillName) => {
    if (!skillName || !skillName.trim()) return;
    const cleanName = skillName.trim();
    
    // Check if already present case-insensitively
    const exists = skills.some(s => {
      const sName = typeof s === 'string' ? s : s.skill_name;
      return sName.toLowerCase() === cleanName.toLowerCase();
    });

    if (exists) return;

    const newSkillObj = {
      skill_name: cleanName,
      skill_level: selectedLevel,
      years_experience: selectedYears
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
    <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Zap className="w-5 h-5 text-indigo-600" />
          <span>Section 03 — Technical Skills & Competencies</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Skills are normalized and evaluated by our matching engine for role eligibility (45% weight on required stack).
        </p>
      </div>

      {/* Input & Add Skill */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search or enter technical skill (e.g. React.js, Docker, Python)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(query);
                }
              }}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <button
            type="button"
            onClick={() => handleAddSkill(query)}
            disabled={!query.trim()}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Popular Quick-Add Suggestions */}
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
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200/80 text-slate-600 text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <span>+ {tech}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Skills List */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Verified Passport Skills ({skills.length})
          </span>
          {skills.length < 3 && (
            <span className="text-[11px] text-amber-600 font-semibold">
              Add at least 3 skills for optimal job matching
            </span>
          )}
        </div>

        {skills.length === 0 ? (
          <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-center text-xs text-slate-400">
            No technical skills added yet. Use the search box above to add your proficiencies.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {skills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : skill.skill_name;
              const level = typeof skill === 'object' ? skill.skill_level || 'Intermediate' : 'Intermediate';

              return (
                <div
                  key={`${skillName}-${idx}`}
                  className="flex items-center justify-between p-2.5 px-3 bg-slate-50 hover:bg-white rounded-lg border border-slate-200 hover:border-indigo-200 transition-all shadow-2xs group text-xs"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-bold block truncate">{skillName}</strong>
                      <span className="text-[10px] text-slate-500 font-semibold">{level}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                    title="Remove Skill"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {errors.skills && <p className="text-[11px] text-rose-600 font-medium">{errors.skills}</p>}
      </div>

    </div>
  );
};
