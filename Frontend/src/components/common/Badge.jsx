import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const base = "inline-flex items-center font-medium rounded-md tracking-tight transition-colors";
  
  const sizes = {
    sm: "px-1.5 py-0.5 text-[11px]",
    md: "px-2 py-0.5 text-xs",
    lg: "px-2.5 py-1 text-xs font-semibold"
  };

  const variants = {
    default: "bg-slate-100 text-slate-700 border border-slate-200/70",
    primary: "bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium",
    purple: "bg-purple-50 text-purple-700 border border-purple-100 font-medium",
    blue: "bg-sky-50 text-sky-700 border border-sky-100 font-medium",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium",
    warning: "bg-amber-50 text-amber-700 border border-amber-100 font-medium",
    danger: "bg-rose-50 text-rose-700 border border-rose-100 font-medium",
    saffron: "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium",
    navy: "bg-slate-800 text-slate-200 border border-slate-700 font-medium",
    excellent: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold",
    strong: "bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold",
    potential: "bg-amber-50 text-amber-800 border border-amber-200 font-semibold",
    gap: "bg-rose-50 text-rose-800 border border-rose-200 font-semibold"
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};
