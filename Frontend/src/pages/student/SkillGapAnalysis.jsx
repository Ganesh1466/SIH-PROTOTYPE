import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { studentApi } from '../../api/studentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const SkillGapAnalysis = () => {
  const [targetRole, setTargetRole] = useState('Frontend Developer');
  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGapData();
  }, [targetRole]);

  const fetchGapData = async () => {
    try {
      setLoading(true);
      const res = await studentApi.getSkillGap('stu-1', targetRole);
      setGapData(res.data);
    } catch (err) {
      toast.error("Failed to load skill gap analysis");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={3} />;
  }

  const {
    currentReadiness = 72,
    matchingSkills = ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Git & GitHub', 'Tailwind CSS'],
    missingSkills = [
      { skill: 'TypeScript 5.0', currentLevel: 'Beginner', requiredLevel: 'Intermediate', priority: 'High', estimatedWeeks: '1' },
      { skill: 'Testing (Jest / RTL)', currentLevel: 'None', requiredLevel: 'Intermediate', priority: 'High', estimatedWeeks: '1' },
      { skill: 'Next.js App Router', currentLevel: 'Beginner', requiredLevel: 'Advanced', priority: 'Medium', estimatedWeeks: '2' },
      { skill: 'State Management (Redux)', currentLevel: 'Basic', requiredLevel: 'Intermediate', priority: 'Medium', estimatedWeeks: '1' }
    ]
  } = gapData || {};

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-8">
      
      {/* Header & Target Role Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0B1024] to-[#0F1630]"
      >
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-pink-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Competency Diagnostic Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
            Skill Gap & Readiness Diagnostic
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Compare verified student capabilities against real-time Rajasthan corporate requisition requirements.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/80 p-2 px-3 rounded-2xl border border-white/10">
          <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Target Role:</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="px-3 py-1.5 bg-[#0F1630] border border-white/10 rounded-xl text-xs font-bold text-white cursor-pointer focus:border-pink-500/50 focus:outline-none"
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="React Developer">React Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </select>
        </div>
      </motion.div>

      {/* Target Role Readiness Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0F1630]"
      >
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Match Readiness Score</span>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-black text-pink-400 font-metrics drop-shadow-[0_0_12px_rgba(236,72,153,0.5)]">
              {currentReadiness}% Fit Score
            </span>
            <span className="text-xs text-slate-300 font-medium">for {targetRole} active requisitions</span>
          </div>
        </div>

        <Link
          to="/student/learning-path"
          className="btn-pink-gradient px-5 py-2.5 text-xs shadow-md flex items-center space-x-2 cursor-pointer"
        >
          <span>Generate Curated Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* 2-Column: Strong Skills vs Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strong Verified Skills */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl space-y-4 bg-[#0F1630]"
        >
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Verified Competencies ({matchingSkills.length})</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Prerequisites Met
            </span>
          </div>

          <div className="space-y-2.5">
            {matchingSkills.map(skill => (
              <div
                key={skill}
                className="p-3.5 bg-slate-900/60 rounded-2xl border border-white/10 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-white text-xs">{skill}</span>
                  <span className="text-[11px] text-slate-400 block font-medium">Verified via GitHub & assessment nodes</span>
                </div>
                <Badge variant="emerald" size="sm">
                  Competent
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Priority Skill Gaps */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl space-y-4 bg-[#0F1630]"
        >
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Identified Skill Gaps ({missingSkills.length})</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Target Improvement
            </span>
          </div>

          <div className="space-y-3">
            {missingSkills.map((gap, idx) => {
              const isHigh = gap.priority === 'High';
              const isMedium = gap.priority === 'Medium';

              return (
                <div
                  key={gap.skill || idx}
                  className={`p-4 bg-slate-900/60 rounded-2xl border space-y-2 text-xs ${
                    isHigh ? 'border-emerald-500/30' : isMedium ? 'border-amber-500/30' : 'border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white font-heading text-sm">{gap.skill}</h4>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        Current: <strong className="font-bold text-slate-300">{gap.currentLevel || 'Beginner'}</strong> → Required: <strong className="font-bold text-pink-400">{gap.requiredLevel || 'Intermediate'}</strong>
                      </span>
                    </div>

                    {/* GREEN for High Priority, ORANGE/AMBER for Medium Priority */}
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isHigh 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                        : isMedium
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                        : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}>
                      {gap.priority} Priority
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[11px] text-slate-400 font-metrics">
                      Est. Effort: {gap.estimatedWeeks || '1-2'} Weeks
                    </span>
                    <Link
                      to="/student/learning-path"
                      className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center space-x-1"
                    >
                      <span>Start Module</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>

    </div>
  );
};
