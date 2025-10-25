'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'

interface Song {
  id: number
  title: string
  artist: string
  album: string
  image: string
  gradient: string
  audio: string
  duration: number
}

const songs: Song[] = [
  {
    id: 1,
    title: 'Sato',
    artist: 'Uzbek Music',
    album: 'Uzbek Music',
    image: '/music/sato-navo.webp',
    gradient: 'from-purple-500 via-pink-500 to-red-500',
    audio: '/music/sato-uzbek.mp3',
    duration: 386, // 6:26
  },
  {
    id: 2,
    title: 'Lofi Hip Hop',
    artist: 'Soulful Beats',
    album: 'Soulful Beats',
    image: '/music/lofi.jpg',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    audio: '/music/lofi-hiphop.mp3',
    duration: 213, // 3:33
  },
  {
    id: 3,
    title: 'Where you are',
    artist: 'Halal Beats',
    album: 'Juma Vibes',
    image: '/music/halal-beats.jpg',
    gradient: 'from-orange-500 via-rose-500 to-pink-500',
    audio: '/music/halal-beats.mp3',
    duration: 163, // 2:43
  },
  {
    id: 4,
    title: 'Hotel California',
    artist: 'The Eagles',
    album: 'Hotel California',
    image: '/music/hotel-california.jpg',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    audio: '/music/hotel-california.mp3',
    duration: 390, // 6:30
  },
]

export function MusicPlayerWidget() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentSong = songs[currentSongIndex]

  // Handle play / pause and progress tracking
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }

    const updateProgress = () => {
      if (audio.duration) {
        const newProgress = (audio.currentTime / audio.duration) * 100
        setProgress(newProgress)
      }
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('ended', handleNext)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('ended', handleNext)
    }
  }, [isPlaying, currentSongIndex])

  const handlePlayPause = () => setIsPlaying(!isPlaying)

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length)
    setProgress(0)
    setIsPlaying(true)
  }

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length)
    setProgress(0)
    setIsPlaying(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentTime = (progress / 100) * currentSong.duration
  const remainingTime = currentSong.duration - currentTime

  return (
    <div className='relative flex aspect-square w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-neutral-100 shadow-xl transition-all duration-300 dark:bg-neutral-900'>
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

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={currentSong.audio} preload='auto' />

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
          <div className='flex items-center justify-center gap-5'>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className='rounded-full bg-neutral-200/70 p-2 hover:bg-neutral-300 dark:bg-white/10 dark:hover:bg-white/20'
            >
              <BackwardIcon className='size-5' />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayPause}
              className='rounded-full bg-gradient-to-br from-rose-500 to-purple-500 p-4 text-white shadow-md hover:shadow-lg'
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
              onClick={handleNext}
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
