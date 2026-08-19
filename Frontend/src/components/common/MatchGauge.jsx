import React from 'react';
import { motion } from 'framer-motion';

export const MatchGauge = ({ score = 0, level = "", size = "md", showDetails = false }) => {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  let colorClass = "text-pink-400 bg-pink-500/10 border-pink-500/30";
  let barGradient = "from-pink-500 via-rose-500 to-fuchsia-500";
  let glowStyle = "shadow-[0_0_12px_rgba(236,72,153,0.3)]";
  let label = level || (normalizedScore >= 90 ? "Excellent Match" : normalizedScore >= 80 ? "Strong Match" : normalizedScore >= 70 ? "Potential Match" : "Skill Gap");

  if (normalizedScore >= 85) {
    colorClass = "text-pink-300 bg-pink-500/15 border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.25)]";
    barGradient = "from-pink-500 via-rose-500 to-fuchsia-500";
  } else if (normalizedScore >= 70) {
    colorClass = "text-indigo-300 bg-indigo-500/15 border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)]";
    barGradient = "from-indigo-500 to-cyan-400";
    glowStyle = "shadow-[0_0_12px_rgba(99,102,241,0.3)]";
  } else {
    colorClass = "text-amber-300 bg-amber-500/15 border-amber-500/40";
    barGradient = "from-amber-500 to-orange-500";
    glowStyle = "";
  }

  if (size === "sm") {
    return (
      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full border text-xs font-bold font-metrics ${colorClass}`}>
        <span>{normalizedScore}% Match</span>
        {level && <span className="opacity-80">· {level}</span>}
      </span>
    );
  }

  if (size === "lg") {
    const strokeDashoffset = 283 - (283 * normalizedScore) / 100;
    return (
      <div className="flex flex-col items-center justify-center p-3 glass-card rounded-2xl border border-white/10">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-slate-800"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className="text-pink-500"
              strokeWidth="8"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
              stroke="url(#pink-magenta-gradient)"
              fill="transparent"
            />
            <defs>
              <linearGradient id="pink-magenta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#D946EF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white font-metrics tracking-tight">{normalizedScore}%</span>
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">AI FIT</span>
          </div>
        </div>
        {showDetails && (
          <span className="mt-2 text-xs font-bold text-slate-300">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1.5 min-w-[120px]">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">AI FIT SCORE</span>
        <span className={`font-bold px-2 py-0.5 text-xs rounded-full border font-metrics ${colorClass}`}>
          {normalizedScore}%
        </span>
      </div>
      <div className="w-full bg-slate-900/80 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
        <motion.div 
          className={`h-full rounded-full bg-gradient-to-r ${barGradient} ${glowStyle}`} 
          initial={{ width: 0 }}
          animate={{ width: `${normalizedScore}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {showDetails && (
        <span className="text-[11px] text-slate-400 font-medium truncate">
          {label}
        </span>
      )}
    </div>
  );
};
