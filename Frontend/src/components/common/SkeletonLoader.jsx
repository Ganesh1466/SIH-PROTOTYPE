import React from 'react';

export const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-5 glass-card rounded-2xl border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-slate-800/80 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-800/90 rounded-lg w-1/3"></div>
              <div className="h-3 bg-slate-800/50 rounded-lg w-1/4"></div>
            </div>
            <div className="w-20 h-8 bg-slate-800/80 rounded-xl"></div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
            <div className="h-3 bg-slate-800/60 rounded-lg w-3/4"></div>
            <div className="h-3 bg-slate-800/40 rounded-lg w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
