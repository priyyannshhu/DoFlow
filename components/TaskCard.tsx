'use client';

import { motion } from 'framer-motion';
import { Trash2, CheckCircle2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function TaskCard({ id, text, completed, completedAt, onToggle, onDelete, index }: TaskCardProps) {
  return (
    <motion.div
      layout
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-2xl bg-neutral-900/70 dark:bg-neutral-900/70 backdrop-blur-md p-4 border border-neutral-800 dark:border-neutral-800 shadow-lg hover:shadow-2xl hover:border-neutral-700 transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start gap-3">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Checkbox
            id={id}
            checked={completed}
            onCheckedChange={() => onToggle(id)}
            className="h-5 w-5 mt-0.5 rounded-md data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <label
            htmlFor={id}
            className={`block text-base cursor-pointer transition-all duration-200 ${
              completed
                ? 'line-through text-neutral-500 dark:text-neutral-500'
                : 'text-neutral-100 dark:text-neutral-100'
            }`}
          >
            {text}
          </label>

          {completed && completedAt && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 mt-1 text-xs text-green-400"
            >
              <CheckCircle2 className="h-3 w-3" />
              <span>Completed at {completedAt}</span>
            </motion.div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="h-9 w-9 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors text-neutral-400"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
