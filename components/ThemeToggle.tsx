'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/localStorage';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = getFromLocalStorage<'light' | 'dark'>('theme', 'light');
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveToLocalStorage('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-800 text-neutral-300">
        <Moon className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full hover:bg-neutral-800 bg-neutral-900/50 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 360 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {theme === 'light' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
}
