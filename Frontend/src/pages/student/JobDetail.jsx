import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Share2, 
  ShieldCheck, 
  Clock, 
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import { jobApi } from '../../api/jobApi';
import { matchingApi } from '../../api/matchingApi';
import { applicationApi } from '../../api/applicationApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [match, setMatch] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetail();
  }, [id]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const [jobRes, matchRes, appsRes] = await Promise.all([
        jobApi.getById(id),
        matchingApi.calculate('stu-1', id),
        applicationApi.getAll({ studentId: 'stu-1' })
      ]);

      setJob(jobRes.data);
      setMatch(matchRes.data);
      const applied = appsRes.data?.some(a => a.jobId === id);
      setIsApplied(applied);
    } catch (err) {
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      const res = await applicationApi.apply('stu-1', id);
      if (res.alreadyApplied) {
        toast('Already applied for this position', { icon: 'ℹ️' });
      } else {
        toast.success('Application submitted successfully!');
        setIsApplied(true);
      }
    } catch (err) {
      toast.error(err.message || 'Application submission failed');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={3} />;
  }

  if (!job) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500 text-xs">Opportunity requisition not found.</p>
        <Link to="/student/jobs" className="text-indigo-600 font-bold text-xs mt-2 inline-block">
          ← Back to All Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/student/jobs"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </Link>

        <button
          onClick={() => toast.success("Job posting link copied")}
          className="p-1.5 text-slate-400 hover:text-slate-700 bg-white rounded-md border border-slate-200"
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* 2-Column Recruitment Layout (Prompt Section 11) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Job Specification (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl p-6 sm:p-7 border border-slate-200 space-y-6">
          
          {/* Main Title & Company */}
          <div className="space-y-2 pb-5 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="blue" size="sm">
                {job.employmentType}
              </Badge>
              <Badge variant="default" size="sm">
                {job.workMode}
              </Badge>
              <span className="text-xs text-slate-400">
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {job.title}
            </h1>

            <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
              <span className="text-slate-900 font-bold">{job.companyName}</span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 inline" />
                <span>{job.location}</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-indigo-600 font-semibold">{job.salary || job.stipend}</span>
            </div>
          </div>

          {/* Role Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Role Overview
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Key Responsibilities
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Mandatory Skills & Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {job.requiredSkills?.map(s => {
                const isMatched = match?.matchedSkills?.includes(s);
                return (
                  <span
                    key={s}
                    className={`px-2 py-1 rounded text-xs font-medium border ${
                      isMatched 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {isMatched ? `✓ ${s}` : `⚠ ${s} (Missing)`}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Preferred Skills */}
          {job.preferredSkills && job.preferredSkills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Preferred Additional Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {job.preferredSkills.map(s => (
                  <span key={s} className="px-2 py-1 rounded bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Academic Criteria */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Eligible Branches:</span>
              <strong className="text-slate-800">{job.allowedBranches?.join(', ') || 'Any Technical Branch'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Minimum CGPA:</span>
              <strong className="text-slate-800">{job.minCgpa || 7.0} / 10</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Experience:</span>
              <strong className="text-slate-800">{job.minExperienceMonths ? `${job.minExperienceMonths} mos` : 'Fresher / Internship'}</strong>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Your Match Card (4 cols - Prompt Section 11) */}
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          
          <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Your Match Evaluation
              </h3>
              <Badge variant={match?.matchScore >= 80 ? 'strong' : 'warning'} size="sm">
                {match?.matchScore || 0}% Fit
              </Badge>
            </div>

            {/* Checklist */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-md">
                <span className="text-slate-600">Required Skills</span>
                <span className="font-semibold text-slate-900">
                  {match?.matchedSkills?.length || 0} / {job.requiredSkills?.length || 0}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-md">
                <span className="text-slate-600">Education & CGPA</span>
                <span className="font-semibold text-emerald-600">✓ Eligible</span>
              </div>

              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-md">
                <span className="text-slate-600">Experience Tier</span>
                <span className="font-semibold text-emerald-600">✓ Eligible</span>
              </div>

              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-md">
                <span className="text-slate-600">Location Match</span>
                <span className="font-semibold text-indigo-600">✓ Matched</span>
              </div>

              {match?.missingSkills?.length > 0 && (
                <div className="p-2.5 bg-amber-50 rounded-md border border-amber-200 text-amber-900 text-xs">
                  <span className="font-semibold block mb-0.5">Missing Skill:</span>
                  <span>{match.missingSkills.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Action CTA */}
            {isApplied ? (
              <button
                disabled
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center space-x-1.5 cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Application Submitted</span>
              </button>
            ) : (match?.matchScore ?? 0) >= (job?.minApplyThreshold || 86) ? (
              <button
                disabled={applying}
                onClick={handleApply}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-md transition-all shadow-xs bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-98 flex items-center justify-center space-x-1.5"
              >
                <span>{applying ? 'Submitting Application...' : 'Apply with Career Passport'}</span>
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  disabled
                  title="A minimum 86% match score is required to apply directly"
                  className="w-full py-2.5 px-4 text-xs font-semibold rounded-md bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed flex items-center justify-center space-x-1.5"
                >
                  <span>Min 86% Match Required to Apply</span>
                </button>
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 text-center font-medium">
                  Your current fit is {match?.matchScore || 0}%. You need {86 - (match?.matchScore || 0)}% more to unlock direct recruitment applications.
                </p>
              </div>
            )}

            <p className="text-[11px] text-slate-400 text-center">
              Verified skills and academic CGPA will be transmitted to the employer review portal.
            </p>
          </div>

          {/* Quick Learning Advice */}
          {match?.missingSkills?.length > 0 && (
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="font-semibold text-slate-900 block">
                Bridge your skill gap to apply
              </span>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Add <strong className="font-medium text-slate-700">{match.missingSkills.join(', ')}</strong> to your tech stack to reach 86%+ fit score.
              </p>
              <Link
                to="/student/skill-gap"
                className="text-xs font-semibold text-indigo-600 hover:underline block pt-1"
              >
                View Skill Gap & Learning Roadmap →
              </Link>
            </div>
          )}


        </div>

      </div>

    </div>
  );
};
