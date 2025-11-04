'use client'

import { useEffect } from 'react'
import { useMotionValue, MotionValue } from 'motion/react'

/**
 * Hook to track mouse position using Framer Motion's useMotionValue
 * Returns x and y motion values that update on mousemove
 */
export function useMousePosition(): {
  x: MotionValue<number>
  y: MotionValue<number>
} {
  const x = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  )
  const y = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [x, y])

  return { x, y }
}
