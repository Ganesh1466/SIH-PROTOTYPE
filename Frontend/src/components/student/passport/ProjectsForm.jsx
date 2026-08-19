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
    <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 bg-[#0F1630]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
            <FolderGit2 className="w-5 h-5 text-pink-400" />
            <span>Section 04 — Technical Projects & Portfolio</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Demonstrate hands-on problem solving and code architecture to prospective recruiters.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="btn-pink-gradient px-4 py-2 text-xs shadow-md cursor-pointer flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 bg-slate-950/60 rounded-2xl border border-dashed border-white/10 text-center space-y-3">
          <FolderGit2 className="w-8 h-8 text-pink-400 mx-auto" />
          <div>
            <p className="text-xs font-bold text-white">No projects added yet</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Adding at least one capstone or fullstack project boosts candidate shortlisting by 3.4x.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddProject}
            className="btn-pink-gradient px-4 py-2 text-xs font-bold shadow-md cursor-pointer"
          >
            + Add First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-4 text-xs font-semibold relative"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider font-heading">
                  Project #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveProject(idx)}
                  className="text-rose-400 hover:text-rose-300 text-xs flex items-center space-x-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Project Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-slate-300 uppercase tracking-wider">
                    Project Title <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AgriSetu — Smart Agriculture Marketplace"
                    value={proj.project_name || ''}
                    onChange={(e) => handleUpdateProject(idx, 'project_name', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none"
                    required
                  />
                </div>

                {/* Project Description */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-slate-300 uppercase tracking-wider">
                    Project Overview & Architecture <span className="text-pink-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the problem, your architecture decisions, database structure..."
                    value={proj.description || ''}
                    onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none"
                    required
                  />
                </div>

                {/* Technologies Used */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-slate-300 uppercase tracking-wider">
                    Technologies Used (comma separated) <span className="text-pink-400">*</span>
                  </label>
                  <div className="relative">
                    <Code className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. React.js, Node.js, Express, Supabase, Tailwind CSS"
                      value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || ''}
                      onChange={(e) => {
                        const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        handleUpdateProject(idx, 'technologies', arr);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Live URL */}
                <div className="space-y-1.5">
                  <label className="block text-slate-300 uppercase tracking-wider">
                    Live Demo URL
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://my-app.vercel.app"
                      value={proj.project_url || ''}
                      onChange={(e) => handleUpdateProject(idx, 'project_url', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* GitHub URL */}
                <div className="space-y-1.5">
                  <label className="block text-slate-300 uppercase tracking-wider">
                    GitHub Repo URL
                  </label>
                  <div className="relative">
                    <GitBranch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://github.com/username/project"
                      value={proj.github_url || ''}
                      onChange={(e) => handleUpdateProject(idx, 'github_url', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
