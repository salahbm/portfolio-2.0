'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useUserAgent } from '@/hooks/use-user-agent'
import { useMounted } from '@/hooks/use-mounted'
import { useCursorContext } from './cursor-provider'
import { ColorMap, IconMap } from './cursor.types'

export function Cursor() {
  const { isMobile } = useUserAgent()
  const mounted = useMounted()
  const { color, cursorType, cursorRef, x, y } = useCursorContext()
  const Icon = IconMap[cursorType]

  if (isMobile || !mounted) return null

  return (
    <motion.span
      ref={cursorRef}
      aria-hidden='true'
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform'
      )}
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        opacity: 0, // shown via provider's show()
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <Icon
        className={cn(
          'mix-blend-difference',
          cursorType === 'click' ? 'h-9 w-9' : 'h-7 w-7',
          color ? `text-${color}` : ColorMap[cursorType]
        )}
      />
    </motion.span>
  )
}
