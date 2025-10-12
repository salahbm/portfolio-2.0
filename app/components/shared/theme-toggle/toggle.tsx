import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

import moonImg from '@/assets/moon.png';
import sunImg from '@/assets/sun.png';
import { cn } from '@/lib/utils';

import Clouds from './clouds';
import Stars from './stars';

export interface ThemeToggleProps {
  initialDark?: boolean;
  onToggle?: (isDark: boolean) => void;
}

export function ThemeToggle({ initialDark = false, onToggle }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(initialDark);

  // Add/remove dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // 🌗 click toggle
  const handleToggle = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    if (onToggle) {
      onToggle(newDarkState);
    }
  };

  return (
    <motion.button
      layout
      onClick={handleToggle}
      className={cn(
        // base frame structure
        'relative w-48 h-20 rounded-full p-2 overflow-hidden transition-all duration-700 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.7),_inset_-2px_-4px_8px_rgba(0,0,0,0.2),_0_6px_12px_rgba(0,0,0,0.25)]',

        // theme color variations (matte plastic feel)
        isDark
          ? 'bg-gradient-to-br from-slate-700 to-slate-900 border-5 border-slate-500 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.1),_inset_-2px_-4px_6px_rgba(0,0,0,0.5),_0_4px_8px_rgba(0,0,0,0.3)]'
          : 'bg-gradient-to-br from-blue-200/80 to-sky-400/80 border-5 border-blue-300 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.6),_inset_-2px_-4px_6px_rgba(0,0,0,0.25),_0_4px_8px_rgba(0,0,0,0.15)]'
      )}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* ☁️ Clouds (Day) */}
      <Clouds isDark={isDark} />

      {/* 🌟 Stars (Night) */}
      <Stars isDark={isDark} />

      {/* 🌞 / 🌙 Moving knob with multi-layer glow */}
      <motion.div
        layout
        className="absolute top-2 w-16 h-16 rounded-full flex items-center justify-center z-[10]"
        animate={{
          x: isDark ? '-5%' : '170%', // moon left, sun right
          rotate: isDark ? -10 : 10, // subtle tilt
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Multiple layered light glows */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full blur-[20px]"
            animate={{
              scale: [1, 1.2 + i * 0.05, 1],
              opacity: [0.3 + i * 0.1, 0.7 - i * 0.1, 0.3 + i * 0.1],
            }}
            transition={{
              duration: 2 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(160,180,255,0.5), rgba(160,180,255,0) 70%)'
                : 'radial-gradient(circle, rgba(255,220,100,0.7), rgba(255,220,100,0) 70%)',
              zIndex: 0,
            }}
          />
        ))}

        {/* Icon (Moon or Sun) */}
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.img
              key="moon"
              src={moonImg}
              alt="Moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="w-[50px] h-[50px] object-contain relative z-[11] drop-shadow-[0_0_15px_rgba(160,180,255,0.7)]"
            />
          ) : (
            <motion.img
              key="sun"
              src={sunImg}
              alt="Sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 0.8, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="w-[50px] h-[50px] object-contain relative z-[11] drop-shadow-[0_0_18px_rgba(255,220,100,0.7)]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
