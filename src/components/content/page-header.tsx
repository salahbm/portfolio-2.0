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
  const containerRef = useRef<HTMLDivElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const descRef = useRef<HTMLParagraphElement | null>(null)

  // Parallax setup with smoother values
  const { scrollY } = useScroll()
  const yGrid = useTransform(scrollY, [0, 500], [0, 150])
  const yTitle = useTransform(scrollY, [0, 500], [0, 80])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    if (!gridRef.current || !titleRef.current) return

    const ctx = gsap.context(() => {
      // Stagger entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Grid entrance - more dramatic
      tl.fromTo(
        gridRef.current,
        {
          scale: 1.3,
          opacity: 0,
          rotateX: 80,
          y: 100,
          filter: 'blur(20px)',
        },
        {
          scale: 1,
          opacity: 0.5,
          rotateX: 45,
          y: 0,
          filter: 'blur(0px)',
          duration: 2,
        }
      )

      // Title entrance - layered depth
      tl.fromTo(
        titleRef.current,
        {
          z: -300,
          opacity: 0,
          scale: 0.8,
          rotateX: -15,
          filter: 'blur(10px)',
        },
        {
          z: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.4,
        },
        '-=1.5'
      )

      // Description entrance - smooth fade up
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
          },
          '-=0.8'
        )
      }

      // Subtle continuous breathing animation
      gsap.to(gridRef.current, {
        scale: 1.02,
        yoyo: true,
        repeat: -1,
        duration: 6,
        ease: 'sine.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className={cn(
        'relative flex w-full flex-col justify-end overflow-hidden pt-10',
        'min-h-fit sm:min-h-[45vh] md:min-h-[50vh] lg:min-h-[25vh]',
        'bg-background/95 backdrop-blur-xl',
        '[perspective-origin:50%_50%] [perspective:1000px]',
        'before:absolute before:inset-0',
        'before:bg-[radial-gradient(ellipse_at_50%_30%,hsl(270_100%_80%_/_0.12),transparent_60%)]',
        'before:content-[""]',
        'dark:bg-background/90',
        'dark:before:bg-[radial-gradient(ellipse_at_50%_30%,hsl(270_100%_70%_/_0.08),transparent_60%)]',
        className
      )}
    >
      {/* Animated Grid Background */}
      <motion.div
        ref={gridRef}
        style={{ y: yGrid }}
        className={cn(
          'pointer-events-none absolute inset-0 overflow-hidden',
          '[transform-style:preserve-3d]'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 h-[250vh] w-[200vw]',
            '-left-1/2 origin-center',
            'animate-vfx-retro-grid',
            'bg-[length:80px_80px] sm:bg-[length:100px_100px] md:bg-[length:120px_120px]',
            'bg-repeat opacity-30',
            'vfx-bg-retro-grid-light dark:vfx-bg-retro-grid-dark',
            'sm:opacity-35 md:opacity-40'
          )}
        />
        {/* Gradient mask for depth */}
        <div
          className={cn(
            'absolute inset-0 bg-background',
            '[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]'
          )}
        />
      </motion.div>

      {/* Content Container */}
      <div
        className={cn(
          'relative z-10 mx-auto w-full max-w-7xl',
          'px-4 pb-12 sm:px-6 sm:pb-16 md:px-8 md:pb-20 lg:px-12 lg:pb-24'
        )}
      >
        <motion.div
          style={{ y: yTitle }}
          className={cn(
            'mx-auto max-w-4xl',
            'text-center sm:text-left',
            'md:-translate-x-[5%] lg:-translate-x-[10%]'
          )}
        >
          {/* Title */}
          <motion.h1
            ref={titleRef}
            className={cn(
              'font-extrabold tracking-tight',
              'bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-500',
              'dark:from-indigo-300 dark:via-violet-300 dark:to-fuchsia-400',
              'bg-clip-text text-transparent',
              'text-3xl leading-tight',
              'sm:text-4xl sm:leading-tight',
              'md:text-5xl md:leading-tight',
              'lg:text-6xl lg:leading-tight',
              'xl:text-7xl xl:leading-tight',
              '[text-shadow:0_0_40px_rgb(139_92_246_/_0.3)]',
              'drop-shadow-sm'
            )}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              ref={descRef}
              className={cn(
                'mt-3 text-muted-foreground',
                'text-sm leading-relaxed',
                'sm:text-base',
                'md:text-lg',
                'max-w-xl sm:max-w-2xl',
                'mx-auto sm:mx-0'
              )}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Atmospheric Glow Overlay */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-gradient-to-t from-transparent via-violet-500/5 to-transparent',
          'dark:via-violet-400/8',
          'mix-blend-overlay blur-3xl'
        )}
      />

      {/* Bottom gradient fade */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 h-24',
          'bg-gradient-to-t from-background to-transparent',
          'sm:h-32 md:h-40'
        )}
      />
    </motion.div>
  )
}
