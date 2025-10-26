'use client';

import { useEffect, useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TaskCard } from '@/components/TaskCard';
import { Footer } from '@/components/Footer';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/localStorage';
import { getRandomQuote } from '@/lib/quotes';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [mounted, setMounted] = useState(false);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setMounted(true);
    const savedTasks = getFromLocalStorage<Task[]>('tasks', []);
    setTasks(savedTasks);
    setQuote(getRandomQuote());
  }, []);

  useEffect(() => {
    if (mounted) {
      saveToLocalStorage('tasks', tasks);
    }
  }, [tasks, mounted]);

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
        task.id === id ? { ...task, completed: !task.completed } : task
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

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-8 transition-colors duration-300">
      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
        <header className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            "{quote}"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12 rounded-2xl border-2 focus-visible:ring-2 focus-visible:ring-primary px-4 text-base"
            />
            <Button
              onClick={addTask}
              size="icon"
              className="h-12 w-12 rounded-2xl bg-primary hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </Button>
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
                className="flex flex-col items-center justify-center py-16"
              >
                <CheckCircle2 className="h-20 w-20 text-muted-foreground/30 mb-4" />
                <p className="text-lg text-muted-foreground">
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
    </div>
  );
}
