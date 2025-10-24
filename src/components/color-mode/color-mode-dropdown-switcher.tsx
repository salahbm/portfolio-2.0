'use client'

import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'
import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
} from 'motion/react'

import { cn } from '@/lib/utils'
import { useSwitchColorMode } from '@/hooks/use-switch-color-mode'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { useMagnifyingGlassStore } from '@/components/lab/magnifying-glass/magnifying-glass-store'
import { useCursorContext } from '@/components/cursor'
import { useDock } from '@/components/dock'
import { DockContextType } from '@/components/dock/dock.types'

export function ColorModeDropdownSwitcher({
  className,
}: {
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { x } = useCursorContext()
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
  const isMagnifyingGlassActive = useMagnifyingGlassStore(
    (state) => state.isActive
  )

  const [open, setOpen] = useState<boolean>(false)

  const handleEscapeKeyDown = useEvent((e: KeyboardEvent): void => {
    if (isMagnifyingGlassActive) {
      e.preventDefault()
    }
  })

  useHotkeys('s+c', (): void => {
    setOpen(!open)
  })

  useEffect(() => {
    if (open) {
      dock?.addLock('color-mode-switcher')
    } else {
      dock?.removeLock('color-mode-switcher')
    }
  }, [dock, open])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          'flex-center !m-0 !p-0 focus-visible:outline-none',
          className
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <motion.div
                ref={ref}
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
                  src={hasError ? '/dock/settings.png' : '/dock/weather.png'}
                  alt='Theme Switcher'
                  fill
                  sizes='100px'
                  priority
                  className='rounded-lg object-contain p-0.5'
                  onError={() => setHasError(true)}
                />
              </motion.div>
              <span
                className={cn(
                  navigationMenuTriggerStyle(),
                  'flex-center aspect-square rounded-xl border p-4 data-[active]:bg-accent lg:hidden'
                )}
              >
                <SunIcon className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <MoonIcon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle color mode</span>
              </span>
            </div>
          </TooltipTrigger>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={10}
        alignOffset={-4}
        onEscapeKeyDown={handleEscapeKeyDown}
        className='bg-background'
      >
        <DropdownMenuCheckboxItem
          checked={theme === 'light'}
          onClick={() => setColorMode('light')}
          className='flex flex-row items-center gap-2'
        >
          <SunIcon className='h-4 w-4' />
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'dark'}
          onClick={() => setColorMode('dark')}
          className='flex flex-row items-center gap-2'
        >
          <MoonIcon className='h-4 w-4' />
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'system'}
          onClick={() => setColorMode('system')}
          className='flex flex-row items-center gap-2'
        >
          <ComputerDesktopIcon className='h-4 w-4' />
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
