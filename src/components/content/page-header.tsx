'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

type PageHeaderProps = {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const descRef = useRef<HTMLParagraphElement | null>(null)

  // === Parallax setup ===
  const { scrollY } = useScroll()
  const yGrid = useTransform(scrollY, [0, 300], [0, 50]) // slower parallax
  const yTitle = useTransform(scrollY, [0, 300], [0, 20]) // slightly faster

  useEffect(() => {
    if (!gridRef.current || !titleRef.current || !descRef.current) return

    const ctx = gsap.context(() => {
      // 1️⃣ Entrance animation — soft depth reveal
      gsap.fromTo(
        gridRef.current,
        { scale: 1.15, opacity: 0, rotateX: 70, y: 60 },
        {
          scale: 1,
          opacity: 0.6,
          rotateX: 45,
          y: 0,
          duration: 1.6,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(
        titleRef.current,
        { z: -200, opacity: 0, scale: 0.95 },
        {
          z: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.3,
        }
      )

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.9,
        }
      )

      // 2️⃣ Subtle breathing motion
      gsap.to(gridRef.current, {
        scale: 1.03,
        yoyo: true,
        repeat: -1,
        duration: 5,
        ease: 'sine.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      className={cn(
        'relative flex min-h-[30vh] w-full flex-col justify-end overflow-hidden bg-white/10 p-8 backdrop-blur-xl [perspective:600px] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_20%,hsl(270_100%_80%_/_0.15),transparent_70%)] before:content-[""] dark:bg-white/5 md:p-12',
        className
      )}
    >
      {/* === BACKGROUND GRID === */}
      <motion.div
        ref={gridRef}
        style={{ y: yGrid }}
        className='pointer-events-none absolute inset-0 overflow-hidden [transform-style:preserve-3d]'
      >
        <div
          className={cn(
            'absolute inset-0 -ml-[50%] h-[200vh] w-[400vw] origin-[100%_0_0] animate-vfx-retro-grid bg-[length:60px_60px] bg-repeat opacity-40',
            'vfx-bg-retro-grid-light dark:vfx-bg-retro-grid-dark'
          )}
        />
        <div className='absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black)]' />
      </motion.div>

      {/* === FOREGROUND CONTENT === */}
      {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
      <div className='z-10 mx-auto -translate-x-[5%] lg:-translate-x-[15%]'>
        <motion.h1
          ref={titleRef}
          style={{ y: yTitle }}
          className='bg-gradient-to-r from-indigo-300 via-violet-400 to-fuchsia-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl'
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            ref={descRef}
            className='mt-2 max-w-2xl text-base text-muted-foreground md:text-lg'
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* === SOFT OVERLAY GLOW === */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-violet-200/10 to-transparent mix-blend-overlay blur-2xl' />
    </div>
  )
}
