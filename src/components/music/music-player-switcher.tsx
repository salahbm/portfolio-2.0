'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
} from 'motion/react'

import { cn } from '@/lib/utils'
import { useMusicPlayerStore } from '@/store/music-player-store'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { useCursorContext } from '@/components/cursor'
import { useDock } from '@/components/dock'
import { DockContextType } from '@/components/dock/dock.types'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'

export function MusicPlayerSwitcher() {
  const ref = useRef<HTMLDivElement>(null)
  const { x } = useCursorContext()
  const dock = useDock() as DockContextType

  const [centerX, setCenterX] = useState(0)
  const [hasError, setHasError] = useState(false)
  const controls = useAnimationControls()

  const isPlaying = useMusicPlayerStore((state) => state.isPlaying)
  const togglePlayPause = useMusicPlayerStore((state) => state.togglePlayPause)

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
    const unsubscribe = dimension.on('change', (val) => {
      if (dock?.isLocked) {
        spring.set(40)
        return
      }
      if (dock?.hovered) {
        spring.set(val)
      } else {
        spring.set(40)
      }
    })

    return () => unsubscribe()
  }, [dimension, spring, dock])

  useEffect(() => {
    const updateCenter = () => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) setCenterX(rect.x + rect.width / 2)
    }
    updateCenter()
    window.addEventListener('resize', updateCenter)
    return () => window.removeEventListener('resize', updateCenter)
  }, [])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <motion.button
            ref={(ref) => {
              if (ref) {
                ref.addEventListener('click', togglePlayPause)
              }
            }}
            className='lg:dock-item-box relative hidden cursor-pointer'
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
              src={hasError ? '/dock/itunes.png' : '/dock/itunes.png'}
              alt='Music Player'
              fill
              sizes='100px'
              priority
              className='rounded-lg object-contain p-0.5'
              onError={() => setHasError(true)}
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
          <button
            onClick={togglePlayPause}
            className={cn(
              navigationMenuTriggerStyle(),
              'flex-center aspect-square rounded-xl border p-4 data-[active]:bg-accent lg:hidden'
            )}
          >
            {isPlaying ? (
              <PauseIcon className='size-4' />
            ) : (
              <PlayIcon className='size-4' />
            )}
            <span className='sr-only'>Toggle music player</span>
          </button>
        </div>
      </TooltipTrigger>
      <TooltipContent sideOffset={8}>
        {isPlaying ? 'Pause' : 'Play'} Music
      </TooltipContent>
    </Tooltip>
  )
}
