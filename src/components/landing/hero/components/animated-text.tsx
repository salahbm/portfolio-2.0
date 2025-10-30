'use client'

import { useEffect, useRef } from 'react'
import { animateHeroText } from '@/lib/hero-animations'

interface AnimatedTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function AnimatedText({ children, ...props }: AnimatedTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (ref.current) return animateHeroText(ref.current)
  }, [])

  return (
    <h1 ref={ref} {...props}>
      {children}
    </h1>
  )
}
