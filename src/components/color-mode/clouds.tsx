'use client'

import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export interface CloudsProps {
  isDark: boolean
  width?: number
  height?: number
}

interface Cloud {
  id: number
  top: number
  left: number
  width: number
  opacity: number
  speed: number
  direction: 'left' | 'right'
}

const Clouds = ({ isDark, width = 210, height = 210 }: CloudsProps) => {
  const [clouds, setClouds] = useState<Cloud[]>([])
  const cloudRefs = useRef<HTMLDivElement[]>([])

  // Generate clouds client-side
  useEffect(() => {
    if (typeof window === 'undefined') return

    const total = 30
    const newClouds = Array.from({ length: total }).map((_, i) => {
      const direction = Math.random() > 0.5 ? 'right' : 'left'
      const width = 40 + Math.random() * 80
      const top = 10 + Math.random() * 70
      const opacity = 0.25 + Math.random() * 0.35
      const speed = 25 + Math.random() * 25 // seconds

      // spawn logic
      const startLeft =
        i < total / 2
          ? Math.random() * 100 // visible cloud
          : direction === 'right'
            ? -width - Math.random() * 30 // offscreen left
            : 100 + Math.random() * 30 // offscreen right

      return {
        id: i,
        top,
        left: startLeft,
        width,
        opacity,
        speed,
        direction,
      }
    })
    setClouds(newClouds as Cloud[])
  }, [])

  useEffect(() => {
    if (isDark || clouds.length === 0) return
    const refs = cloudRefs.current
    refs.forEach((el) => el && gsap.killTweensOf(el))

    refs.forEach((el, i) => {
      const cloud = clouds[i]
      if (!el || !cloud) return

      const travelDistance = width + cloud.width + 150
      const directionMultiplier = cloud.direction === 'right' ? 1 : -1

      const animate = () => {
        // starting X offset (offscreen)
        gsap.set(el, {
          x:
            cloud.direction === 'right'
              ? -cloud.width - Math.random() * 50
              : width + Math.random() * 50,
          y: Math.random() * 5 - 2,
        })

        gsap.to(el, {
          x: directionMultiplier * travelDistance,
          duration: cloud.speed,
          ease: 'none',
          onComplete: animate,
        })
      }

      // Initial placement
      gsap.set(el, {
        x:
          cloud.left +
          (cloud.direction === 'right' ? -width / 2 : width / 2) * 0.2,
        y: Math.random() * 4 - 2,
      })

      // Random delay to stagger motion
      gsap.delayedCall(Math.random() * 5, animate)
    })

    return () => refs.forEach((el) => el && gsap.killTweensOf(el))
  }, [isDark, clouds, width])

  if (isDark) return null

  return (
    <AnimatePresence>
      {!isDark && (
        <motion.div
          key='clouds'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='pointer-events-none absolute inset-0 overflow-hidden'
          style={{ width, height }}
        >
          {clouds.map((cloud, i) => (
            <div
              key={cloud.id}
              ref={(el) => {
                if (el) cloudRefs.current[i] = el
              }}
              className='absolute'
              style={{
                top: `${cloud.top}%`,
                left: `${cloud.left}%`,
                width: `${Math.max(5, cloud.width - i * 10)}px`,
                opacity: cloud.opacity,
                zIndex: 1,
              }}
            >
              <Image
                src='/weather/cloud.png'
                alt='Cloud'
                className='h-auto w-full drop-shadow-sm'
                width={cloud.width}
                height={cloud.width}
                priority={false}
              />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Clouds
