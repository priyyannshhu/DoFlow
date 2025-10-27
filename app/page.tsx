'use client';

import { useEffect, useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TaskCard } from '@/components/TaskCard';
import { Footer } from '@/components/Footer';
import { BackgroundBeamsWrapper } from '@/components/BackgroundBeamsWrapper';
import { DateSelector } from '@/components/DateSelector';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { QuoteBanner } from '@/components/QuoteBanner';
import { Task, formatDate, getTasksForDate, saveTasksForDate } from '@/lib/storage';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  useEffect(() => {
    setMounted(true);
    const todayDate = formatDate(new Date());
    setSelectedDate(todayDate);
    const savedTasks = getTasksForDate(todayDate);
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveTasksForDate(selectedDate, tasks);
    }
  }, [tasks, mounted, selectedDate]);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    const tasksForDate = getTasksForDate(newDate);
    setTasks(tasksForDate);
  };

  const addTask = () => {
    if (newTask.trim() === '') return;

    const task: Task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed
                ? new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })
                : undefined,
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  if (!mounted) {
    return null;
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <BackgroundBeamsWrapper>
      <div className="flex flex-col min-h-screen">
        <header className="flex justify-between items-center mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
              DoFlow
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>
        </header>

        <QuoteBanner />

        <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />

        {tasks.length > 0 && (
          <ProgressIndicator total={tasks.length} completed={completedCount} />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="my-6"
        >
          <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-neutral-800">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 h-12 rounded-xl border-neutral-800 bg-neutral-900/50 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-indigo-500 px-4 text-base"
              />
              <Button
                onClick={addTask}
                size="icon"
                className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-indigo-500/50"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 mb-6">
          <AnimatePresence mode="popLayout">
            {tasks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-16 rounded-2xl bg-neutral-900/30 backdrop-blur-sm border border-neutral-800"
              >
                <CheckCircle2 className="h-20 w-20 text-neutral-700 mb-4" />
                <p className="text-lg text-neutral-400">
                  No tasks yet. Add one to get started!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    completed={task.completed}
                    completedAt={task.completedAt}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    index={index}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </BackgroundBeamsWrapper>
  );
}
