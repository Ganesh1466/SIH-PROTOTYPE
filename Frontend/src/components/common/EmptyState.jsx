import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = "No records found",
  description = "There are no items matching your criteria at this moment.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-xl border border-slate-200">
      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mb-3 border border-slate-100">
        <Icon className="w-5 h-5 stroke-[1.5]" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
