import { motion, AnimatePresence } from 'motion/react';
import { useRef } from 'react';

import moonImg from '@/assets/moon.png';
import sunImg from '@/assets/sun.png';
import { useTheme } from '@/components/layout/theme-layout';
import { cn } from '@/lib/utils';

import Clouds from './clouds';
import Stars from './stars';

export interface ThemeToggleProps {
  initialDark?: boolean;
  onToggle?: (isDark: boolean) => void;
}

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();

  // 🌗 click toggle
  const handleToggle = () => {
    const newDarkState = theme === 'dark';
    setTheme(newDarkState ? 'light' : 'dark');
    if (onToggle) {
      onToggle(newDarkState);
    }
  };

  return (
    <motion.button
      ref={ref}
      layout
      onClick={handleToggle}
      className={cn(
        'relative rounded-2xl p-2 overflow-hidden transition-all duration-700 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.7),_inset_-2px_-4px_8px_rgba(0,0,0,0.2),_0_6px_12px_rgba(0,0,0,0.25)] w-24 h-9 border-1 lg:w-32 lg:h-12 lg:border-3',
        // light
        'bg-gradient-to-br from-blue-200/70 to-sky-400/70 border-blue-300 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.6),_inset_-2px_-4px_6px_rgba(0,0,0,0.25),_0_4px_8px_rgba(0,0,0,0.15)]',
        // dark
        'dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-900 dark:border-slate-500 dark:shadow-[inset_2px_2px_5px_rgba(255,255,255,0.1),_inset_-2px_-4px_6px_rgba(0,0,0,0.5),_0_4px_8px_rgba(0,0,0,0.3)]'
      )}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* ☁️ Clouds (Day) */}
      <Clouds
        isDark={theme === 'dark'}
        width={ref.current?.offsetWidth}
        height={ref.current?.offsetHeight}
      />

      {/* 🌟 Stars (Night) */}
      <Stars
        isDark={theme === 'dark'}
        width={ref.current?.offsetWidth}
        height={ref.current?.offsetHeight}
      />

      {/* 🌞 / 🌙 Moving knob with multi-layer glow */}
      <motion.div
        layout
        className="absolute top-1/2 -translate-y-1/2 rounded-2xl flex items-center justify-center z-[10]"
        animate={{
          x: theme === 'dark' ? 3 : (ref.current?.offsetWidth ?? 128) - 55,
          rotate: theme === 'dark' ? -10 : 10,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Multiple layered light glows */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl blur-[20px]"
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
              background:
                theme === 'dark'
                  ? 'radial-gradient(circle, rgba(160,180,255,0.7), rgba(160,180,255,0) 70%)'
                  : 'radial-gradient(circle, rgba(255,220,100,1), rgba(255,220,100,0) 80%)',
              zIndex: 0,
            }}
          />
        ))}

        {/* Icon (Moon or Sun) */}
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.img
              key="moon"
              src={moonImg}
              alt="Moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="size-8 object-contain relative z-[11] drop-shadow-[0_0_15px_rgba(160,180,255,0.7)]"
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
              className="size-8 object-contain relative z-[11] drop-shadow-[0_0_18px_rgba(255,220,100,1)]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
