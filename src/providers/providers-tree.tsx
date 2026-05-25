'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { CursorStyleInjector } from '@/components/cursor'
import { Toaster } from '@/components/ui/sonner'
import { TailwindIndicator } from '@/components/shared/tailwind-indicator'
import { PageTransitionProvider } from '@/components/page-transition'
import { GlobalKeyboardShortcuts } from '@/components/keyboard-shortcuts'
// import { LockScreenProvider } from './lock-screen-provider'
import { ThemeProvider } from './theme-provider'
import { MagnifyingGlass } from '@/components/shared/magnifying-glass/magnifying-glass'
import { easterEgg } from '@/lib/easter-egg'
import { MusicPlayerInitializer } from '@/components/music/music-player-initializer'

export function ProvidersTree({ children }: { children: React.ReactNode }) {
  easterEgg()
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <PageTransitionProvider>
          {/* <LockScreenProvider> */}
          {children}
          {/* </LockScreenProvider> */}
          <CursorStyleInjector />
          <GlobalKeyboardShortcuts />
          <MusicPlayerInitializer />
          <Toaster />
          <MagnifyingGlass />
          <TailwindIndicator />
        </PageTransitionProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
