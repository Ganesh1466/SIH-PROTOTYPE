import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const base = "inline-flex items-center font-semibold rounded-full tracking-tight transition-all duration-150 backdrop-blur-xs";
  
  const sizes = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-xs font-bold"
  };

  const variants = {
    default: "bg-slate-800/80 text-slate-300 border border-white/10",
    pink: "bg-pink-500/15 text-pink-300 border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.15)]",
    primary: "bg-pink-500/15 text-pink-300 border border-pink-500/30",
    purple: "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30",
    blue: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
    success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    saffron: "bg-amber-500/20 text-amber-300 border border-amber-500/40",
    navy: "bg-slate-900 text-slate-200 border border-slate-700",
    excellent: "bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold shadow-[0_0_12px_rgba(236,72,153,0.2)]",
    strong: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold",
    potential: "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold",
    gap: "bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold"
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};
