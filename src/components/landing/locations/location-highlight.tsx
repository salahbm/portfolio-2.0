'use client'

import { cn } from '@/lib/utils'

interface LocationHighlightProps {
  name: string
  gradient: string
  children?: React.ReactNode
  className?: string
}

export function LocationHighlight({
  name,
  gradient,
  children,
  className,
}: LocationHighlightProps) {
  return (
    <span className='group relative inline-flex cursor-pointer items-center gap-1.5 px-2 py-1 transition-all duration-300 hover:scale-105'>
      {/* Background glow (behind text) */}
      <span
        className={cn(
          'absolute inset-0 -z-10 rounded-lg opacity-70 blur-xl transition-all duration-500 group-hover:opacity-100',
          gradient
        )}
        aria-hidden='true'
      />

      {/* Text (always visible above glow) */}
      <span
        className={cn(
          'relative z-10 text-foreground transition-all duration-300 group-hover:scale-110',
          className
        )}
      >
        {name}
      </span>

      {/* Tooltip (on top of everything) */}
      {children && (
        <div className='absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 rounded-xl border border-border bg-card/95 p-2 text-sm text-card-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:translate-y-1 group-hover:opacity-100'>
          {children}
        </div>
      )}
    </span>
  )
}
