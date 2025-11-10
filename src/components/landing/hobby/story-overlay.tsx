'use client'

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface StoryOverlayProps {
  title: string
  description?: string
  isActive: boolean
  className?: string
}

export const StoryOverlay: React.FC<StoryOverlayProps> = ({
  title,
  description,
  isActive,
  className,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (isActive && titleRef.current) {
      // Split text into characters for animation
      const titleText = titleRef.current.textContent || ''
      titleRef.current.innerHTML = titleText
        .split('')
        .map(
          (char, i) =>
            `<span class="inline-block" style="opacity: 0; transform: translateY(20px);" data-char="${i}">${char === ' ' ? '&nbsp;' : char}</span>`
        )
        .join('')

      // Animate characters in
      const chars = titleRef.current.querySelectorAll('[data-char]')
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'back.out(1.7)',
      })

      // Animate description
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
        )
      }
    }
  }, [isActive, title])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'pointer-events-none absolute inset-0 z-30 hidden flex-col justify-end p-6 pb-24 lg:flex',
            className
          )}
        >
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />

          {/* Content */}
          <div className='relative z-10'>
            <h2
              ref={titleRef}
              className='mb-2 text-3xl font-bold text-white drop-shadow-lg'
            >
              {title}
            </h2>
            {description && (
              <p ref={descRef} className='text-sm text-white/90 drop-shadow-md'>
                {description}
              </p>
            )}
          </div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='absolute right-6 top-6 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-xl'
          />
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='absolute left-6 top-1/3 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-xl'
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
