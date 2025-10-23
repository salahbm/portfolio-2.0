'use client'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
} from 'motion/react'
import { DockContextType, DockItemProps } from './dock.types'
import { useDock } from './dock-provider'
import { useCursorContext } from '../cursor'

const DockItem = ({ id, isActive = false, children }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { x } = useCursorContext()
  const dock = useDock() as DockContextType

  const [elCenterX, setElCenterX] = useState<number>(0)
  const controls = useAnimationControls()

  const dimension = useTransform(x, (mouseX) => {
    return (
      40 +
      38 *
        Math.cos((((mouseX - elCenterX) / (dock.width ?? 0)) * Math.PI) / 2) **
          58
    )
  })

  const spring = useSpring(40, {
    damping: 10,
    stiffness: 150,
    mass: 0.01,
  })

  useEffect(() => {
    return dimension.onChange((val) => {
      if (dock?.hovered) {
        spring.set(val)
      } else {
        spring.set(40)
      }
    })
  }, [spring, dimension, dock?.hovered])

  useEffect(() => {
    const rect = ref.current ? ref.current.getBoundingClientRect() : null
    if (rect) setElCenterX(rect.x + rect.width / 2)
  }, [])

  useEffect(() => {
    const resize = () => {
      const rect = ref.current ? ref.current.getBoundingClientRect() : null
      if (rect) setElCenterX(rect.x + rect.width / 2)
    }
    document.addEventListener('resize', resize)
    return () => document.removeEventListener('resize', resize)
  }, [])

  return (
    <motion.li className='relative'>
      <motion.div
        ref={ref}
        id={id}
        className='ui-box cursor-pointer'
        data-cursor='pointer'
        aria-describedby={id}
        animate={controls}
        custom={spring}
        transition={{
          default: {
            duration: 0.2,
          },
          translateY: {
            duration: 0.4,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
          },
        }}
        style={{
          height: spring,
          width: spring,
        }}
        whileHover={{
          backgroundColor: 'hsl(209, 81.2%, 84.5%)',
          borderColor: 'hsl(206, 81.9%, 65.3%)',
          boxShadow:
            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
        whileTap={{ scale: 0.85 }}
        whileFocus={{
          backgroundColor: 'hsl(209, 81.2%, 84.5%)',
          borderColor: 'hsl(206, 81.9%, 65.3%)',
          boxShadow:
            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
      >
        {children}
      </motion.div>
      {isActive && (
        <span
          className='absolute -bottom-2.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground'
          aria-hidden='true'
        />
      )}
    </motion.li>
  )
}

export default DockItem
