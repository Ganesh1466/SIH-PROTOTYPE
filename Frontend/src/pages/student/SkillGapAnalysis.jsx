import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  GraduationCap, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { studentApi } from '../../api/studentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

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
    matchingSkills = [],
    missingSkills = [],
    roleExpectations = {}
  } = gapData || {};

  return (
    <div className="space-y-6">
      
      {/* Header & Target Role Selector (Prompt Section 15) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Skill Gap & Competency Analysis
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare verified technical capabilities against current industry hiring requirements.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-500 font-medium">Target Role:</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-800 cursor-pointer focus:outline-hidden"
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="React Developer">React Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
          </select>
        </div>
      </div>

      {/* Target Role Readiness Strip */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase text-slate-400">Readiness Score</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-indigo-600">{currentReadiness}% Match</span>
            <span className="text-xs text-slate-500">for {targetRole} requisitions in Rajasthan</span>
          </div>
        </div>

        <Link
          to="/student/learning-path"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-colors shadow-xs"
        >
          <span>Generate Learning Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2-Column: Strong Skills vs Skill Gaps (Prompt Section 15) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strong Skills */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Strong Verified Skills ({matchingSkills.length})</span>
            </h3>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Prerequisites Met
            </span>
          </div>

          <div className="space-y-2">
            {matchingSkills.map(skill => (
              <div
                key={skill}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900">{skill}</span>
                  <span className="text-[11px] text-slate-500 block">Verified via assessment & projects</span>
                </div>
                <Badge variant="success" size="sm">
                  Competent
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Skill Gaps */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Identified Skill Gaps ({missingSkills.length})</span>
            </h3>
            <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Needs Improvement
            </span>
          </div>

          <div className="space-y-2.5">
            {missingSkills.map((gap, idx) => (
              <div
                key={gap.skill || idx}
                className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/70 space-y-2 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900">{gap.skill}</h4>
                    <span className="text-[11px] text-slate-500">
                      Current: <strong className="font-medium text-slate-700">{gap.currentLevel || 'Beginner'}</strong> → Required: <strong className="font-medium text-slate-700">{gap.requiredLevel || 'Intermediate'}</strong>
                    </span>
                  </div>
                  <Badge variant={gap.priority === 'High' ? 'gap' : 'warning'} size="sm">
                    {gap.priority} Priority
                  </Badge>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center">
                  <span className="text-[11px] text-slate-500">
                    Est. Effort: {gap.estimatedWeeks || '1-2'} Weeks
                  </span>
                  <Link
                    to="/student/learning-path"
                    className="text-xs font-semibold text-indigo-600 hover:underline flex items-center space-x-1"
                  >
                    <span>Start Module</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
