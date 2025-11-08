'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'

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

import { CommandCenterDialog } from '@/components/command-center/command-center-dialog'
import { QRCodeDialog } from '@/components/command-center/qrcode-dialog'
import { KeyboardShortcutsDialog } from '@/components/command-center/keyboard-shortcuts-dialog'
import Image from 'next/image'
import { useMousePosition } from '@/hooks/use-mouse-position'
import { useDock } from '../dock'
import { DockContextType } from '../dock/dock.types'
import { cn } from '@/lib/utils'
import { CommandIcon } from '../icons/command-icon'
import { Button } from '../ui/button'

export function CommandCenter() {
  const ref = useRef<HTMLButtonElement>(null)
  const { x } = useMousePosition()
  const dock = useDock() as DockContextType

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
    if (
      commandDialogOpen ||
      qrcodeDialogOpen ||
      keyboardShortcutsDialogOpen ||
      !dock?.width ||
      dock?.isLocked
    ) {
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
  }, [
    dimension,
    spring,
    dock,
    commandDialogOpen,
    qrcodeDialogOpen,
    keyboardShortcutsDialogOpen,
  ])

  useEffect(() => {
    if (commandDialogOpen || qrcodeDialogOpen || keyboardShortcutsDialogOpen) {
      dock?.addLock('command-center')
    } else {
      dock?.removeLock('command-center')
    }
  }, [dock, commandDialogOpen, qrcodeDialogOpen, keyboardShortcutsDialogOpen])

  return (
    <div className='flex flex-col'>
      <Button
        variant='outline'
        className={cn(
          'flex h-9 w-9 flex-col items-center justify-center rounded-xl border-border p-0 data-[active]:bg-accent lg:hidden'
        )}
        onClick={handleButtonClick}
        aria-label='Command Center'
      >
        <CommandIcon className='h-4 w-4 stroke-[1.5px]' />
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            ref={ref}
            type='button'
            onClick={handleButtonClick}
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
              src='/dock/finder.png'
              alt='Command Center'
              fill
              sizes='100px'
              priority={true}
              className='cursor-pointer rounded-lg object-contain'
            />
          </motion.button>
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
