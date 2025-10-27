'use client';

import React from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';

export function BackgroundBeamsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-auto w-full min-h-screen bg-neutral-950 dark:bg-neutral-950 text-white flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">
      <div className="relative z-10 w-full max-w-3xl mx-auto p-6">{children}</div>
      <BackgroundBeams />
    </div>
  );
}