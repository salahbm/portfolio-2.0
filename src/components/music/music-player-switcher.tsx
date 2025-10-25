'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
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
import { useHotkeys } from 'react-hotkeys-hook'
import { useUserAgent } from '@/hooks/use-user-agent'

export function MusicPlayerSwitcher() {
  const ref = useRef<HTMLDivElement>(null)
  const { x } = useCursorContext()
  const dock = useDock() as DockContextType
  const controls = useAnimationControls()
  const [centerX, setCenterX] = useState(0)

  const { isMobile } = useUserAgent()

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

  const isPlaying = useMusicPlayerStore((state) => state.isPlaying)
  const togglePlayPause = useMusicPlayerStore((state) => state.togglePlayPause)

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

  if (isMobile)
    return (
      <button
        onClick={togglePlayPause}
        className={cn(
          navigationMenuTriggerStyle(),
          'flex-center relative aspect-square rounded-xl border p-4 data-[active]:bg-accent lg:hidden [&_svg]:shrink-0'
        )}
      >
        {isPlaying ? (
          <Fragment>
            <PauseIcon className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <span className='absolute right-0 top-0 size-2 animate-pulse rounded-full bg-green-500' />
          </Fragment>
        ) : (
          <PlayIcon className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        )}
        <span className='sr-only'>Toggle color mode</span>
      </button>
    )

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
        <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium tracking-[2px] text-muted-foreground'>
          Cmd+M
        </span>
      </TooltipContent>
    </Tooltip>
  )
}
