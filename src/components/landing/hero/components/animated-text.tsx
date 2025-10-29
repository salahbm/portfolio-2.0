'use client'

import { useEffect, useRef } from 'react'
import { animateHeroText } from '@/components/landing/hero/utils/hero-animation'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedText({ children, className }: AnimatedTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (ref.current) return animateHeroText(ref.current)
  }, [])

  return (
    <h1 ref={ref} className={cn('text-balance', className)}>
      {children}
    </h1>
  )
}
