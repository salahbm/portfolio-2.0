'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
} from 'motion/react'
import Image from 'next/image'
import { useDock } from './dock-provider'
import type { DockContextType, DockItemProps } from './dock.types'
import { useCursorContext } from '../cursor'

const DockItem = ({
  id,
  isActive = false,
  src,
  alt,
  priority,
}: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { x } = useCursorContext()
  const dock = useDock() as DockContextType

  const [centerX, setCenterX] = useState(0)
  const [hasError, setHasError] = useState(false)
  const controls = useAnimationControls()

  // Responsive motion size
  const dimension = useTransform(x, (mouseX) => {
    if (!dock?.width) return 40
    return (
      40 +
      38 * Math.cos((((mouseX - centerX) / dock.width) * Math.PI) / 2) ** 58
    )
  })

  const spring = useSpring(40, {
    damping: 10,
    stiffness: 150,
    mass: 0.01,
  })

  useEffect(() => {
    if (dock?.isLocked) {
      spring.set(40)
      return
    }
    const unsubscribe = dimension.on('change', (val) => {
      if (dock?.hovered) {
        spring.set(val)
      } else {
        spring.set(40)
      }
    })

    return () => unsubscribe()
  }, [dimension, spring, dock])

  useEffect(() => {
    const updateCenter = () => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) setCenterX(rect.x + rect.width / 2)
    }
    updateCenter()
    window.addEventListener('resize', updateCenter)
    return () => window.removeEventListener('resize', updateCenter)
  }, [])

  return (
    <motion.li className='relative'>
      <motion.div
        ref={ref}
        id={id}
        className='dock-item-box cursor-pointer'
        aria-describedby={id}
        animate={controls}
        custom={spring}
        transition={{
          default: { duration: 0.2 },
          translateY: { duration: 0.4, ease: 'easeInOut' },
        }}
        style={{ width: spring, height: spring }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src={hasError ? '/dock/launchpad.png' : src}
          alt={alt}
          fill
          sizes='100px'
          priority={priority}
          className='rounded-lg object-contain p-0.5'
          onError={() => setHasError(true)}
        />
      </motion.div>

      {isActive && (
        <span
          className='absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground'
          aria-hidden='true'
        />
      )}
    </motion.li>
  )
}

export default DockItem
