'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { CursorStyleInjector } from '@/components/cursor'
import { Toaster } from '@/components/ui/sonner'
import { MagnifyingGlass } from '@/components/lab/magnifying-glass/magnifying-glass'
import { TailwindIndicator } from '@/components/ui-helpers/tailwind-indicator'
import { PageTransition } from '@/components/page-transition'
import { GlobalKeyboardShortcuts } from '@/components/keyboard-shortcuts'
import { LockScreenProvider } from './lock-screen-provider'
import { ThemeProvider } from './theme-provider'

export function ProvidersTree({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <LockScreenProvider>{children}</LockScreenProvider>
        <PageTransition />
        <CursorStyleInjector />
        <GlobalKeyboardShortcuts />
        <Toaster />
        <MagnifyingGlass />
        <TailwindIndicator />
      </TooltipProvider>
    </ThemeProvider>
  )
}
