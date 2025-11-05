'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {
  SparklesIcon,
  CubeIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  CodeBracketIcon,
  BugAntIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  PaintBrushIcon,
  BeakerIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import './story.component.css'

const WORDS = [
  {
    text: 'design.',
    icon: PaintBrushIcon,
    color: 'from-pink-400 to-rose-500',
  },
  {
    text: 'prototype.',
    icon: CubeIcon,
    color: 'from-purple-400 to-indigo-500',
  },
  {
    text: 'solve.',
    icon: LightBulbIcon,
    color: 'from-yellow-400 to-orange-500',
  },
  {
    text: 'build.',
    icon: WrenchScrewdriverIcon,
    color: 'from-blue-400 to-cyan-500',
  },
  {
    text: 'develop.',
    icon: CodeBracketIcon,
    color: 'from-green-400 to-emerald-500',
  },
  {
    text: 'debug.',
    icon: BugAntIcon,
    color: 'from-red-400 to-pink-500',
  },
  {
    text: 'learn.',
    icon: AcademicCapIcon,
    color: 'from-indigo-400 to-purple-500',
  },
  {
    text: 'ship.',
    icon: RocketLaunchIcon,
    color: 'from-orange-400 to-red-500',
  },
  {
    text: 'collaborate.',
    icon: UserGroupIcon,
    color: 'from-teal-400 to-cyan-500',
  },
  {
    text: 'create.',
    icon: SparklesIcon,
    color: 'from-fuchsia-400 to-pink-500',
  },
  {
    text: 'innovate.',
    icon: BeakerIcon,
    color: 'from-violet-400 to-purple-500',
  },
  {
    text: 'test.',
    icon: CheckBadgeIcon,
    color: 'from-emerald-400 to-green-500',
  },
  {
    text: 'optimize.',
    icon: ChartBarIcon,
    color: 'from-sky-400 to-blue-500',
  },
  {
    text: 'scale.',
    icon: ArrowTrendingUpIcon,
    color: 'from-amber-400 to-orange-500',
  },
  {
    text: 'repeat.',
    icon: ArrowPathIcon,
    color: 'from-cyan-400 to-teal-500',
  },
]

export function ScrollStory() {
  const itemsRef = useRef<HTMLLIElement[]>([])

  useEffect(() => {
    // Check if browser supports CSS scroll-driven animations
    const supportsScrollTimeline =
      CSS.supports('(animation-timeline: scroll())') &&
      CSS.supports('(animation-range: 0% 100%)')

    if (supportsScrollTimeline) {
      // Modern browsers will use CSS animations, no JS needed
      return
    }

    // Fallback to GSAP for browsers without scroll-driven animation support
    gsap.registerPlugin(ScrollTrigger)

    const items = itemsRef.current.filter(Boolean)
    if (items.length === 0) return

    // Set initial opacity
    gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) })

    // Create the dimming animation
    const dimmer = gsap
      .timeline()
      .to(items.slice(1), {
        opacity: 1,
        stagger: 0.5,
      })
      .to(
        items.slice(0, items.length - 1),
        {
          opacity: 0.2,
          stagger: 0.5,
        },
        0
      )

    ScrollTrigger.create({
      trigger: items[0],
      endTrigger: items[items.length - 1],
      start: 'center center',
      end: 'center center',
      animation: dimmer,
      scrub: 0.2,
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className='scroll-story relative flex w-full flex-col items-center justify-center overflow-hidden py-16 md:py-24 lg:py-32'
    >
      {/* Title */}
      <div className='mb-20 px-6 text-center md:mb-32 lg:mb-44'>
        <h1 className='text-gradient-flare font-monument-extended text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-7xl'>
          This is how I bring ideas to life
        </h1>
      </div>

      {/* headline + scroll words */}
      <div className='content-wrapper flex w-full flex-col items-center px-4 sm:px-6 md:flex-row md:items-start md:justify-center md:gap-8 md:px-8 lg:gap-16 lg:px-12'>
        {/* headline */}
        <h2 className='sticky-heading sticky top-[35%] mb-8 text-4xl font-semibold leading-tight text-foreground/90 sm:text-5xl md:top-[40%] md:mb-0 md:text-6xl lg:text-7xl'>
          <span className='sr-only'> This is how I bring ideas to life </span>
          <span aria-hidden='true'>I do&nbsp;</span>
        </h2>

        <ul
          className='word-list scroll-snap-y w-full space-y-[15vh] pb-[15vh] pt-[5vh] md:w-auto md:space-y-[12vh] md:pb-[12vh] md:pt-[10vh]'
          style={{ '--count': WORDS.length } as React.CSSProperties}
        >
          {WORDS.map((word, i) => {
            const Icon = word.icon
            return (
              <li
                key={i}
                ref={(el) => {
                  if (el) itemsRef.current[i] = el
                }}
                className='scroll-item scroll-snap-center relative flex items-center justify-center gap-4 md:justify-start md:gap-6 lg:gap-8'
                style={{ '--i': i } as React.CSSProperties}
              >
                {/* Icon with 3D effect and ripple */}
                <div className='icon-wrapper relative'>
                  <div className='ripple-container absolute inset-0'>
                    <div className='ripple ripple-1' />
                    <div className='ripple ripple-2' />
                    <div className='ripple ripple-3' />
                  </div>
                  <div
                    className={`icon-3d relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-2xl sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 ${word.color}`}
                  >
                    <Icon className='h-8 w-8 text-white drop-shadow-lg sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14' />
                  </div>
                </div>

                {/* Word */}
                <span
                  className={`word-text bg-gradient-to-r bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl md:text-5xl lg:text-6xl ${word.color}`}
                >
                  {word.text}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Closing message */}
      <div className='mt-20 flex min-h-[40vh] items-center justify-center px-6 text-center md:mt-32 md:min-h-[50vh] md:px-8 lg:px-0'>
        <p className='text-gradient-vibe max-w-2xl text-base font-light leading-relaxed sm:text-lg md:max-w-3xl md:text-xl lg:text-3xl'>
          Each project is an experiment — a new blend of design, motion, and
          development that grows into something living and memorable.
        </p>
      </div>
    </motion.section>
  )
}
