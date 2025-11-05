'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { CursorStyleInjector } from '@/components/cursor'
import { Toaster } from '@/components/ui/sonner'
import { MagnifyingGlass } from '@/components/lab/magnifying-glass/magnifying-glass'
import { TailwindIndicator } from '@/components/ui-helpers/tailwind-indicator'
import { PageTransition } from '@/components/page-transition'
import { LockScreenProvider } from './lock-screen-provider'
import { ThemeProvider } from './theme-provider'
import { useEffect } from 'react'
import { easterEgg } from '@/lib/easter-egg'

export function ProvidersTree({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    easterEgg()
  }, [])

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <PageTransition>
          <LockScreenProvider>{children}</LockScreenProvider>
          <CursorStyleInjector />
          <Toaster />
          <MagnifyingGlass />
          <TailwindIndicator />
        </PageTransition>
      </TooltipProvider>
    </ThemeProvider>
  )
}
