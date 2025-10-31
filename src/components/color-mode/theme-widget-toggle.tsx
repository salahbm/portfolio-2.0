'use client'

import { motion, AnimatePresence } from 'framer-motion'
import useEvent from 'react-use-event-hook'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import Clouds from './clouds'
import Stars from './stars'
import { useSwitchColorMode } from '@/hooks/use-switch-color-mode'

export function WeatherToggle({
  onToggle,
}: {
  onToggle?: (isDark: boolean) => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const { setColorMode, theme } = useSwitchColorMode()

  const handleToggle = useEvent(() => {
    const isCurrentlyDark = theme === 'dark'
    setColorMode(isCurrentlyDark ? 'light' : 'dark')
    onToggle?.(!isCurrentlyDark)
  })

  const isDark = theme === 'dark'

  return (
    <motion.button
      ref={ref}
      layout
      onClick={handleToggle}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={cn(
        'relative aspect-square h-full w-full overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-700',
        // Light theme background
        'bg-gradient-to-br from-sky-100/80 via-blue-200/60 to-sky-400/60',
        // Dark theme background
        'dark:from-slate-700/60 dark:via-slate-800/80 dark:to-slate-950/90'
      )}
    >
      {/* Background Atmosphere */}
      <div className='absolute inset-0 z-[5]'>
        <Clouds
          isDark={isDark}
          width={ref.current?.offsetWidth}
          height={ref.current?.offsetHeight}
        />
      </div>
      <div className='absolute inset-0 z-[5]'>
        <Stars
          isDark={isDark}
          width={ref.current?.offsetWidth}
          height={ref.current?.offsetHeight}
        />
      </div>

      {/* Centered Glow Directly Behind Icon */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className='z-1 absolute -left-2 top-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[35px]'
          animate={{
            scale: [1, 1.15 + i * 0.05, 1],
            opacity: [0.4 + i * 0.1, 0.7 - i * 0.1, 0.4 + i * 0.1],
          }}
          transition={{
            duration: 2.2 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
          style={{
            width: '100px',
            height: '100px',
            background: isDark
              ? 'radial-gradient(circle, rgba(160,180,255,0.8), rgba(160,180,255,0) 70%)'
              : 'radial-gradient(circle, rgba(255,230,120,0.9), rgba(255,230,120,0) 75%)',
          }}
        />
      ))}

      {/* Weather Icon Section */}
      <motion.div
        layout
        className='z-2 absolute inset-0 flex items-center justify-center'
        animate={{
          background: isDark
            ? 'radial-gradient(circle at 70% 20%, rgba(90,100,160,0.6), rgba(0,0,0,0.6) 90%)'
            : 'radial-gradient(circle at 40% 25%, rgba(255,255,255,0.4), rgba(135,206,250,0.7) 90%)',
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Weather Icon Animation */}
      <AnimatePresence mode='wait' initial={false}>
        {isDark ? (
          <motion.img
            key='moon'
            src='/weather/moon.png'
            alt='Moon'
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: -15, opacity: 1, scale: 1 }}
            exit={{ y: -25, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className='z-[5] size-16 drop-shadow-[0_0_25px_rgba(170,190,255,0.9)]'
          />
        ) : (
          <motion.img
            key='sun'
            src='/weather/sun.png'
            alt='Sun'
            initial={{ y: -10, opacity: 0, scale: 0.9 }}
            animate={{ y: -15, opacity: 1, scale: 1 }}
            exit={{ y: 15, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className='z-[5] size-16 drop-shadow-[0_0_35px_rgba(255,230,120,0.9)]'
          />
        )}
      </AnimatePresence>

      {/* Label (for realism) */}
      <div className='absolute bottom-3 left-4 z-30 text-left'>
        <motion.div
          layout
          className='text-[0.9rem] font-medium text-slate-900 dark:text-slate-100'
        >
          Seoul, South Korea
        </motion.div>
        <motion.div
          layout
          className='text-3xl font-semibold text-slate-800 dark:text-slate-50'
        >
          {isDark ? '17°' : '23°'}
        </motion.div>
        <motion.div
          layout
          className='text-xs text-slate-600 dark:text-slate-300'
        >
          {isDark ? 'Clear Night' : 'Sunny'}
        </motion.div>
      </div>
    </motion.button>
  )
}
