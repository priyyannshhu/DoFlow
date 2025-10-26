'use client';

import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function TaskCard({ id, text, completed, onToggle, onDelete, index }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-2xl">
        <div className="flex items-center gap-3">
          <Checkbox
            id={id}
            checked={completed}
            onCheckedChange={() => onToggle(id)}
            className="h-5 w-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label
            htmlFor={id}
            className={`flex-1 text-base cursor-pointer transition-all duration-200 ${
              completed
                ? 'line-through text-muted-foreground opacity-60'
                : 'text-foreground'
            }`}
          >
            {text}
          </label>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="h-9 w-9 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
