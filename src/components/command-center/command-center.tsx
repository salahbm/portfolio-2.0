'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'

import { cn } from '@/lib/utils'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
} from 'motion/react'
import { VFXConfettiSurface } from '@/components/ui-vfx/vfx-confetti-surface'
import { CommandIcon } from '@/components/icons/command-icon'

import { CommandCenterDialog } from '@/components/command-center/command-center-dialog'
import { QRCodeDialog } from '@/components/command-center/qrcode-dialog'
import { KeyboardShortcutsDialog } from '@/components/command-center/keyboard-shortcuts-dialog'
import Image from 'next/image'
import { useCursorContext } from '../cursor'
import { useDock } from '../dock'
import { DockContextType } from '../dock/dock.types'

export function CommandCenter({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { x } = useCursorContext()
  const dock = useDock() as DockContextType
  const isLockedRef = useRef(dock?.isLocked)

  const [centerX, setCenterX] = useState(0)
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
    if (isLockedRef.current) {
      spring.set(40)
      return
    }
    const unsubscribe = dimension.on('change', (val) => {
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

  const pathname = usePathname()

  const [commandDialogOpen, setCommandDialogOpen] = useState<boolean>(false)

  const [qrcodeDialogOpen, setQRCodeDialogOpen] = useState<boolean>(false)
  const [qrcodeValue, setQRCodeValue] = useState<string>('')

  const [keyboardShortcutsDialogOpen, setKeyboardShortcutsDialogOpen] =
    useState<boolean>(false)

  useEffect(() => {
    setQRCodeDialogOpen(false)
  }, [pathname])

  useHotkeys(
    'meta+k',
    (): void => {
      setCommandDialogOpen(true)
    },
    {
      enabled:
        !commandDialogOpen && !qrcodeDialogOpen && !keyboardShortcutsDialogOpen,
    }
  )

  const handleButtonClick = useEvent((): void => {
    setCommandDialogOpen(true)
  })

  const handleExecCommand = useEvent((): void => {
    setCommandDialogOpen(false)
  })

  const handleCreateQRCode = useEvent((currentURL): void => {
    setQRCodeValue(currentURL)
    setQRCodeDialogOpen(true)
  })

  const handleOpenKeyboardShortcutsDialog = useEvent((): void => {
    setKeyboardShortcutsDialogOpen(true)
  })

  useEffect(() => {
    isLockedRef.current = dock?.isLocked
  }, [dock?.isLocked])

  return (
    <div className='flex flex-col'>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type='button' onClick={handleButtonClick}>
            <motion.div
              ref={ref}
              className='lg:ui-box relative hidden cursor-pointer'
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
                src='/dock/finder.png'
                alt='Command Center'
                fill
                sizes='100vw'
                quality={100}
                priority={true}
                className='rounded-lg object-contain'
              />
            </motion.div>
            <span
              className={cn(
                navigationMenuTriggerStyle(),
                'flex-center aspect-square rounded-xl border p-4 data-[active]:bg-accent lg:hidden',
                className
              )}
              aria-label='Command Center'
            >
              <CommandIcon className='size-4 stroke-[1.5px]' />
            </span>
          </button>
        </TooltipTrigger>

        <TooltipContent
          className='flex flex-row items-center gap-1'
          sideOffset={8}
        >
          <span>Command center</span>
          <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium tracking-[2px] text-muted-foreground'>
            ⌘K
          </span>
        </TooltipContent>
      </Tooltip>
      <CommandCenterDialog
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
        onExecCommand={handleExecCommand}
        createQRCode={handleCreateQRCode}
        openKeyboardShortcutsDialog={handleOpenKeyboardShortcutsDialog}
      />
      <QRCodeDialog
        open={qrcodeDialogOpen}
        value={qrcodeValue}
        onOpenChange={setQRCodeDialogOpen}
      />
      <KeyboardShortcutsDialog
        open={keyboardShortcutsDialogOpen}
        onOpenChange={setKeyboardShortcutsDialogOpen}
      />
      <VFXConfettiSurface />
    </div>
  )
}
