import React from 'react';
import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = "No records found",
  description = "There are no items matching your criteria at this moment.",
  actionLabel,
  onAction
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-10 text-center glass-card rounded-2xl border border-white/10"
    >
      <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4 shadow-[0_0_20px_rgba(236,72,153,0.15)]">
        <Icon className="w-7 h-7 stroke-[1.75]" />
      </div>
      <h3 className="text-base font-bold text-slate-100 font-heading mb-1">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-pink-gradient px-4 py-2 text-xs font-bold shadow-md cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};
