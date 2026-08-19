import React from 'react';
import { Loader2 } from 'lucide-react';

export const PageLoader = ({ message = "Loading portal workspace..." }) => {
  return (
    <div className="min-h-[500px] w-full flex flex-col items-center justify-center p-8 space-y-4 animate-fade-in">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
        <div className="absolute w-5 h-5 rounded-full bg-indigo-600/10" />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-bold text-slate-800 tracking-tight">{message}</p>
        <p className="text-xs text-slate-600">Rajasthan Career-to-Employment Intelligence Platform</p>
      </div>
    </div>
  );
};
