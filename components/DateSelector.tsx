'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate, formatDisplayDate } from '@/lib/storage';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    onDateChange(formatDate(date));
  };

  const goToNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    onDateChange(formatDate(date));
  };

  const goToToday = () => {
    onDateChange(formatDate(new Date()));
  };

  const isToday = selectedDate === formatDate(new Date());

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col gap-4 mb-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousDay}
            className="h-9 w-9 rounded-full hover:bg-neutral-800 text-neutral-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1 text-center">
            <h2 className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
              Tasks for {formatDisplayDate(selectedDate)}
            </h2>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextDay}
            className="h-9 w-9 rounded-full hover:bg-neutral-800 text-neutral-300"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="h-10 pl-10 rounded-xl border-neutral-800 bg-neutral-900/50 text-neutral-100 focus-visible:ring-2 focus-visible:ring-indigo-500"
          />
        </div>

        {!isToday && (
          <Button
            onClick={goToToday}
            variant="outline"
            className="rounded-xl border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 text-neutral-100"
          >
            Today
          </Button>
        )}
      </div>
    </motion.div>
  );
}
