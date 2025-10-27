'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getRandomQuote } from '@/lib/quotes';

export function QuoteBanner() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://type.fit/api/quotes');
        const quotes = await response.json();
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote.text);
        setAuthor(randomQuote.author?.replace(', type.fit', '') || 'Unknown');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quote:', error);
        const fallbackQuote = getRandomQuote();
        setQuote(fallbackQuote);
        setAuthor('');
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 rounded-2xl bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 mb-6"
      >
        <div className="h-16 flex items-center justify-center">
          <div className="animate-pulse text-neutral-500">Loading inspiration...</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900/50 to-neutral-900/30 backdrop-blur-sm border border-neutral-800 mb-6 relative overflow-hidden"
    >
      <div className="absolute top-2 right-2">
        <Sparkles className="h-5 w-5 text-indigo-400 opacity-50" />
      </div>

      <blockquote className="relative">
        <p className="text-sm md:text-base text-neutral-200 italic mb-2 leading-relaxed">
          "{quote}"
        </p>
        {author && (
          <footer className="text-xs text-neutral-500">— {author}</footer>
        )}
      </blockquote>
    </motion.div>
  );
}
