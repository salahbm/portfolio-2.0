'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { useMusicPlayerStore } from '../../store/music-player-store'
import { songs } from './songs'

export function MusicPlayerWidget() {
  const {
    isPlaying,
    currentSongIndex,
    progress,
    togglePlayPause,
    playNext,
    playPrevious,
  } = useMusicPlayerStore()

  const currentSong = songs[currentSongIndex]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentTime = (progress / 100) * currentSong.duration
  const remainingTime = currentSong.duration - currentTime

  return (
    <div className='relative flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl shadow-xl transition-all duration-300'>
      {/* Background with gradient + image */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSong.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className='absolute inset-0 z-0'
        >
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${currentSong.image})` }}
          />
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br opacity-90 mix-blend-overlay',
              currentSong.gradient
            )}
          />
          {/* Adaptive overlay for light/dark */}
          <div className='absolute inset-0 bg-white/30 backdrop-blur-2xl dark:bg-black/40' />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className='relative z-10 flex h-full flex-col justify-between p-4 text-neutral-900 dark:text-white'>
        {/* Top: Song Info */}
        <div className='mt-4 text-center'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSong.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className='truncate text-lg font-semibold drop-shadow-sm dark:drop-shadow-lg'>
                {currentSong.title}
              </h3>
              <p className='truncate text-sm text-neutral-700 dark:text-neutral-300'>
                {currentSong.artist}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Middle: Progress Bar */}
        <div className='my-1'>
          <div className='relative h-1 w-full overflow-hidden rounded-full bg-neutral-300/70 dark:bg-white/20'>
            <motion.div
              className={cn(
                'absolute left-0 top-0 h-full bg-gradient-to-r',
                currentSong.gradient
              )}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className='mt-1 flex justify-between text-[10px] text-neutral-700 dark:text-neutral-300'>
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(remainingTime)}</span>
          </div>
        </div>

        {/* Bottom: Controls */}
        <div className='mb-3 flex flex-col items-center gap-3'>
          <div className='flex items-center justify-center gap-1 lg:gap-5'>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={playPrevious}
              className='rounded-full bg-neutral-200/70 p-2 hover:bg-neutral-300 dark:bg-white/10 dark:hover:bg-white/20'
            >
              <BackwardIcon className='size-5' />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={togglePlayPause}
              className='flex-center rounded-full bg-gradient-to-br from-rose-500 to-purple-500 p-4 text-white shadow-md hover:shadow-lg'
            >
              <AnimatePresence mode='wait'>
                {isPlaying ? (
                  <motion.div
                    key='pause'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <PauseIcon className='size-6' />
                  </motion.div>
                ) : (
                  <motion.div
                    key='play'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <PlayIcon className='size-6' />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={playNext}
              className='rounded-full bg-neutral-200/70 p-2 hover:bg-neutral-300 dark:bg-white/10 dark:hover:bg-white/20'
            >
              <ForwardIcon className='size-5' />
            </motion.button>
          </div>

          {/* Volume */}
          <div className='flex items-center justify-center gap-2 text-neutral-700 dark:text-neutral-300'>
            <SpeakerWaveIcon className='size-4' />
            <div className='h-0.5 w-20 overflow-hidden rounded-full bg-neutral-300/60 dark:bg-white/20'>
              <div className='h-full w-3/4 bg-gradient-to-r from-rose-500 to-purple-500' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
