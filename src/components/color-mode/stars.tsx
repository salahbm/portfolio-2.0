'use client'

import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export interface StarsProps {
  isDark: boolean
  width?: number
  height?: number
}

interface Star {
  id: number
  top: string
  left: string
  size: number
  rotate: number
}

const Stars = ({ isDark, width = 210, height = 210 }: StarsProps) => {
  const [stars, setStars] = useState<Star[]>([])
  const starRefs = useRef<HTMLDivElement[]>([])

  // Generate stars only on client
  useEffect(() => {
    if (typeof window === 'undefined') return

    const newStars = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
    }))
    setStars(newStars)
  }, [])

  useEffect(() => {
    if (!isDark) return
    starRefs.current.forEach((el) => el && gsap.killTweensOf(el))
    starRefs.current.forEach((el) => {
      if (!el) return
      gsap.to(el, {
        opacity: 0.3 + Math.random() * 0.5,
        duration: 0.8 + Math.random() * 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 1.2,
      })
    })
  }, [isDark, stars])

  if (!isDark) return null

  return (
    <AnimatePresence>
      {isDark && (
        <motion.div
          key='stars'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className='pointer-events-none absolute inset-0 overflow-hidden'
          style={{ width, height }}
        >
          {stars.map((star, i) => (
            <div
              key={star.id}
              ref={(el) => {
                if (el) {
                  starRefs.current[i] = el
                }
              }}
              className='absolute'
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                transform: `rotate(${star.rotate}deg)`,
              }}
            >
              <Image
                src='/weather/star.png'
                alt='Star'
                className='h-auto w-full'
                width={star.size}
                height={star.size}
              />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Stars
