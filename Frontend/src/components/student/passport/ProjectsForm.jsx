import React from 'react';
import { FolderGit2, Plus, Trash2, Globe, GitBranch, Code } from 'lucide-react';

export const ProjectsForm = ({ projects = [], onChange, errors = {} }) => {
  const handleAddProject = () => {
    onChange([
      ...projects,
      {
        id: `proj-${Date.now()}`,
        project_name: '',
        description: '',
        technologies: [],
        project_url: '',
        github_url: ''
      }
    ]);
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const handleRemoveProject = (index) => {
    const updated = projects.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <FolderGit2 className="w-5 h-5 text-indigo-600" />
            <span>Section 04 — Technical Projects & Portfolio</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstrate hands-on problem solving and code architecture to prospective recruiters.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center space-y-3">
          <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto" />
          <div>
            <p className="text-xs font-bold text-slate-700">No projects added yet</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Adding at least one capstone or fullstack project boosts candidate shortlisting by 3.4x.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddProject}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-md cursor-pointer"
          >
            + Add First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs font-semibold relative"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/80">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Project #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveProject(idx)}
                  className="text-rose-500 hover:text-rose-700 text-xs flex items-center space-x-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Project Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-slate-700 uppercase tracking-wider">
                    Project Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AgriSetu — Smart Agriculture Marketplace"
                    value={proj.project_name || ''}
                    onChange={(e) => handleUpdateProject(idx, 'project_name', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                    required
                  />
                  {errors[`project_${idx}_name`] && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors[`project_${idx}_name`]}</p>
                  )}
                </div>

                {/* Project Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-slate-700 uppercase tracking-wider">
                    Project Overview & Architecture (min 20 chars) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the problem, your architecture decisions, database structure, and outcomes..."
                    value={proj.description || ''}
                    onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                    required
                  />
                  {errors[`project_${idx}_desc`] && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors[`project_${idx}_desc`]}</p>
                  )}
                </div>

                {/* Technologies Used */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-slate-700 uppercase tracking-wider">
                    Technologies Used (comma separated) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Code className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. React.js, Node.js, Express, Supabase, Tailwind CSS"
                      value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || ''}
                      onChange={(e) => {
                        const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        handleUpdateProject(idx, 'technologies', arr);
                      }}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                      required
                    />
                  </div>
                  {errors[`project_${idx}_tech`] && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors[`project_${idx}_tech`]}</p>
                  )}
                </div>

                {/* Live URL */}
                <div className="space-y-1">
                  <label className="block text-slate-700 uppercase tracking-wider">
                    Live Demo URL (Optional)
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://my-app.vercel.app"
                      value={proj.project_url || ''}
                      onChange={(e) => handleUpdateProject(idx, 'project_url', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* GitHub URL */}
                <div className="space-y-1">
                  <label className="block text-slate-700 uppercase tracking-wider">
                    GitHub Repo URL (Optional)
                  </label>
                  <div className="relative">
                    <GitBranch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://github.com/username/project"
                      value={proj.github_url || ''}
                      onChange={(e) => handleUpdateProject(idx, 'github_url', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  {errors[`project_${idx}_github`] && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors[`project_${idx}_github`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
