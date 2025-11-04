'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
} from 'motion/react'

import { useMusicPlayerStore } from '@/store/music-player-store'

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { useMousePosition } from '@/hooks/use-mouse-position'
import { useDock } from '@/components/dock'
import { DockContextType } from '@/components/dock/dock.types'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import { useHotkeys } from 'react-hotkeys-hook'

export function MusicPlayerSwitcher() {
  const ref = useRef<HTMLButtonElement>(null)
  const { x } = useMousePosition()
  const dock = useDock() as DockContextType
  const controls = useAnimationControls()
  const [centerX, setCenterX] = useState(0)

  // Responsive motion size
  const dimension = useTransform(x, (mouseX) => {
    if (!dock?.width) return 40
    return (
      40 +
      38 * Math.cos((((mouseX - centerX) / dock.width) * Math.PI) / 2) ** 58
    )
  })

  const spring = useSpring(40, {
    damping: 10,
    stiffness: 150,
    mass: 0.01,
  })

  useEffect(() => {
    const updateCenter = () => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) setCenterX(rect.x + rect.width / 2)
    }
    updateCenter()
    window.addEventListener('resize', updateCenter)
    return () => window.removeEventListener('resize', updateCenter)
  }, [])

  const { isPlaying, togglePlayPause, initAudio, cleanupAudio } =
    useMusicPlayerStore()

  // Initialize global audio on mount
  useEffect(() => {
    initAudio()
    return () => {
      cleanupAudio()
    }
  }, [initAudio, cleanupAudio])

  useHotkeys(
    'meta+m',
    (): void => {
      togglePlayPause()
    },
    {
      enabled: true,
    }
  )

  useEffect(() => {
    const unsubscribe = dimension.on('change', (val) => {
      if (dock?.hovered) {
        spring.set(val)
      } else {
        spring.set(40)
      }
    })

    return () => unsubscribe()
  }, [dimension, spring, dock])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          ref={ref}
          onClick={togglePlayPause}
          className='dock-item-box relative hidden cursor-pointer lg:flex'
          animate={controls}
          custom={spring}
          transition={{
            default: { duration: 0.2 },
            translateY: { duration: 0.4, ease: 'easeInOut' },
          }}
          style={{ width: spring, height: spring }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src='/dock/itunes.png'
            alt='Music Player'
            fill
            sizes='100px'
            priority
            className='rounded-lg object-contain p-0.5'
          />
          {/* Play/Pause indicator overlay */}
          <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/30 opacity-0 transition-opacity hover:opacity-100'>
            {isPlaying ? (
              <PauseIcon className='size-6 text-white drop-shadow-lg' />
            ) : (
              <PlayIcon className='size-6 text-white drop-shadow-lg' />
            )}
          </div>
        </motion.button>
      </TooltipTrigger>
      <TooltipContent sideOffset={8}>
        {isPlaying ? 'Pause' : 'Play'} Music
        <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium tracking-[2px] text-muted-foreground'>
          Cmd+M
        </span>
      </TooltipContent>
    </Tooltip>
  )
}
