import React from 'react';

export const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-slate-100 rounded w-1/4"></div>
              <div className="h-3 bg-slate-50 rounded w-1/3"></div>
            </div>
            <div className="w-16 h-6 bg-slate-100 rounded-md"></div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
            <div className="h-2.5 bg-slate-50 rounded w-3/4"></div>
            <div className="h-2.5 bg-slate-50 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
