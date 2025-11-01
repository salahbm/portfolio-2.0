'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Cursor, CursorProvider } from '@/components/cursor'
import { Toaster } from '@/components/ui/sonner'
import { MagnifyingGlass } from '@/components/lab/magnifying-glass/magnifying-glass'
import { TailwindIndicator } from '@/components/ui-helpers/tailwind-indicator'
import { PageTransition } from '@/components/page-transition'
import { LockScreenProvider } from './lock-screen-provider'

export function ProvidersTree({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <CursorProvider>
        <TooltipProvider>
          <PageTransition>
            <LockScreenProvider enabled>{children}</LockScreenProvider>
          </PageTransition>
        </TooltipProvider>
        <Cursor />
        <Toaster />
        <MagnifyingGlass />
        <TailwindIndicator />
      </CursorProvider>
    </ThemeProvider>
  )
}
