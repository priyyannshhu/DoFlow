'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressIndicatorProps {
  total: number;
  completed: number;
}

export function ProgressIndicator({ total, completed }: ProgressIndicatorProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-neutral-800"
    >
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-neutral-800"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            className="text-indigo-500"
            initial={{ strokeDasharray: '0 175.93' }}
            animate={{
              strokeDasharray: `${(percentage / 100) * 175.93} 175.93`,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-neutral-100">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-neutral-100">
            {completed} of {total} completed
          </span>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
