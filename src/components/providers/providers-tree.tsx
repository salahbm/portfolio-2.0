'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Cursor, CursorProvider } from '@/components/cursor'

export function ProvidersTree({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <CursorProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Cursor />
      </CursorProvider>
    </ThemeProvider>
  )
}
