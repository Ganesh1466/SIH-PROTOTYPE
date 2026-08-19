import React from 'react';

export const MatchGauge = ({ score = 0, level = "", size = "md", showDetails = false }) => {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
  let barColor = "bg-emerald-600";
  let label = level || (normalizedScore >= 90 ? "Excellent Match" : normalizedScore >= 80 ? "Strong Match" : normalizedScore >= 70 ? "Potential Match" : "Skill Gap");

  if (normalizedScore >= 90) {
    colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
    barColor = "bg-emerald-600";
  } else if (normalizedScore >= 80) {
    colorClass = "text-indigo-700 bg-indigo-50 border-indigo-200";
    barColor = "bg-indigo-600";
  } else if (normalizedScore >= 70) {
    colorClass = "text-amber-700 bg-amber-50 border-amber-200";
    barColor = "bg-amber-500";
  } else {
    colorClass = "text-rose-700 bg-rose-50 border-rose-200";
    barColor = "bg-rose-500";
  }

  if (size === "sm") {
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md border text-xs font-semibold ${colorClass}`}>
        <span>{normalizedScore}%</span>
        {level && <span className="opacity-80">· {level}</span>}
      </span>
    );
  }

  return (
    <div className="flex flex-col space-y-1.5 min-w-[110px]">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Fit Score</span>
        <span className={`font-bold px-1.5 py-0.2 text-xs rounded border ${colorClass}`}>
          {normalizedScore}%
        </span>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
          style={{ width: `${normalizedScore}%` }} 
        />
      </div>
      {showDetails && (
        <span className="text-[11px] text-slate-500 font-medium">
          {label}
        </span>
      )}
    </div>
  );
};
