'use client'
import useEvent from 'react-use-event-hook'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
} from 'motion/react'

import { useSwitchColorMode } from '@/hooks/use-switch-color-mode'

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { useMousePosition } from '@/hooks/use-mouse-position'
import { useDock } from '@/components/dock'
import { DockContextType } from '@/components/dock/dock.types'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

export function ColorModeDropdownSwitcher() {
  const ref = useRef<HTMLButtonElement>(null)
  const { x } = useMousePosition()
  const dock = useDock() as DockContextType

  const [centerX, setCenterX] = useState(0)
  const [hasError, setHasError] = useState(false)
  const controls = useAnimationControls()

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

  const { setColorMode, theme } = useSwitchColorMode()

  const handleClick = useEvent(() => {
    setColorMode(theme === 'light' ? 'dark' : 'light')
  })

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          ref={ref}
          onClick={handleClick}
          className='dock-item-box relative hidden lg:flex'
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
            src={hasError ? '/dock/settings.png' : '/dock/weather.png'}
            alt='Theme Switcher'
            fill
            sizes='100px'
            priority
            className='cursor-pointer rounded-lg object-contain p-0.5'
            onError={() => setHasError(true)}
          />
        </motion.button>
      </TooltipTrigger>
      <Button
        variant='outline'
        className={cn(
          'flex h-9 w-9 flex-col items-center justify-center rounded-xl border-border p-0 data-[active]:bg-accent lg:hidden'
        )}
        onClick={handleClick}
        aria-label='Switch color mode'
      >
        {theme === 'light' ? (
          <SunIcon className='h-4 w-4 stroke-[1.5px]' />
        ) : (
          <MoonIcon className='h-4 w-4 stroke-[1.5px]' />
        )}
      </Button>
      <TooltipContent
        className='flex flex-row items-center gap-1'
        sideOffset={8}
      >
        Switch color mode
        <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium tracking-[2px] text-muted-foreground'>
          S+C
        </span>
      </TooltipContent>
    </Tooltip>
  )
}
