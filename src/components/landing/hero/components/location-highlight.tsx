'use client'

import { useState } from 'react'
import { MapPinIcon } from '@heroicons/react/24/solid'

interface LocationHighlightProps {
  name: string
  gradient: string
  iconColor: string
  children?: React.ReactNode
}

export function LocationHighlight({
  name,
  gradient,
  iconColor,
  children,
}: LocationHighlightProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      className='relative inline-flex cursor-pointer items-center gap-1 transition-all duration-300 hover:scale-105'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated background glow */}
      <span
        className={`absolute inset-0 rounded-lg opacity-40 blur-xl transition-all duration-500 ${gradient} ${
          hovered ? 'scale-125 opacity-70' : 'scale-100 opacity-40'
        }`}
        aria-hidden='true'
      />

      {/* Subtle border effect */}
      <span
        className={`absolute inset-0 rounded-lg border border-current opacity-20 transition-all duration-300 ${iconColor} ${
          hovered ? 'scale-105 opacity-40' : 'scale-100 opacity-20'
        }`}
        aria-hidden='true'
      />

      {/* Icon with pulse animation on hover */}
      <MapPinIcon
        className={`relative z-10 h-4 w-4 transition-all duration-300 sm:h-5 sm:w-5 ${iconColor} ${
          hovered ? 'animate-pulse' : ''
        }`}
      />

      {/* Text with gradient */}
      <span className='text-gradient-lilac relative z-10 transition-all duration-300'>
        {name}
      </span>

      {/* Tooltip on hover */}
      {hovered && children && (
        <div className='absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 rounded-xl border border-border bg-card/95 p-2 text-sm text-card-foreground shadow-lg backdrop-blur-sm duration-200 animate-in fade-in slide-in-from-top-2'>
          {children}
        </div>
      )}
    </span>
  )
}
