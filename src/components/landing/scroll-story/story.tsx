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
import { StoryIcons } from './story-icons'

const WORDS = [
  { text: 'design.', icon: PaintBrushIcon, color: 'from-pink-500 to-rose-600' },
  {
    text: 'prototype.',
    icon: CubeIcon,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    text: 'solve.',
    icon: LightBulbIcon,
    color: 'from-yellow-500 to-orange-600',
  },
  {
    text: 'build.',
    icon: WrenchScrewdriverIcon,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    text: 'develop.',
    icon: CodeBracketIcon,
    color: 'from-green-500 to-emerald-600',
  },
  { text: 'debug.', icon: BugAntIcon, color: 'from-red-500 to-pink-600' },
  {
    text: 'learn.',
    icon: AcademicCapIcon,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    text: 'ship.',
    icon: RocketLaunchIcon,
    color: 'from-orange-500 to-red-600',
  },
  {
    text: 'collaborate.',
    icon: UserGroupIcon,
    color: 'from-teal-500 to-cyan-600',
  },
  {
    text: 'create.',
    icon: SparklesIcon,
    color: 'from-fuchsia-500 to-pink-600',
  },
  {
    text: 'innovate.',
    icon: BeakerIcon,
    color: 'from-violet-500 to-purple-600',
  },
  {
    text: 'test.',
    icon: CheckBadgeIcon,
    color: 'from-emerald-500 to-green-600',
  },
  { text: 'optimize.', icon: ChartBarIcon, color: 'from-sky-500 to-blue-600' },
  {
    text: 'scale.',
    icon: ArrowTrendingUpIcon,
    color: 'from-amber-500 to-orange-600',
  },
  { text: 'repeat.', icon: ArrowPathIcon, color: 'from-cyan-500 to-teal-600' },
]

export function ScrollStory() {
  const itemsRef = useRef<HTMLLIElement[]>([])
  const iconsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const supportsScrollTimeline =
      CSS.supports('(animation-timeline: scroll())') &&
      CSS.supports('(animation-range: 0% 100%)')

    gsap.registerPlugin(ScrollTrigger)

    const items = itemsRef.current.filter(Boolean)
    const icons = iconsRef.current.filter(Boolean)
    if (items.length === 0) return

    // Parallax effect for icons
    icons.forEach((icon, i) => {
      gsap.to(icon, {
        y: -50,
        rotation: 360,
        scrollTrigger: {
          trigger: items[i],
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    if (supportsScrollTimeline) {
      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    }

    // Fallback opacity animation
    gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) })

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
      className='scroll-story relative flex w-full flex-col items-center justify-center py-12 md:py-24'
    >
      <StoryIcons />
      <h1 className='text-gradient-flare mb-16 px-4 text-center font-monument-extended text-3xl font-extrabold leading-tight md:mb-32 md:text-5xl lg:mb-44 lg:text-7xl'>
        This is how I bring ideas to life
      </h1>

      <div className='content-wrapper flex w-full flex-col items-center px-4 md:flex-row md:items-start md:justify-center md:gap-10 md:px-12'>
        <h2 className='sticky-heading sticky left-0 top-[30%] mb-8 w-full text-3xl font-semibold leading-tight md:top-[40%] md:mb-0 md:text-5xl lg:w-auto lg:text-7xl'>
          <span className='sr-only'> This is how I bring ideas to life </span>
          <span
            aria-hidden='true'
            className='text-gradient-flare font-monument-vibe'
          >
            I do&nbsp;
          </span>
        </h2>

        <ul
          className='word-list scroll-snap-y space-y-[10vh] pb-[10vh] pt-[10vh]'
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
                className='scroll-item scroll-snap-center flex items-center gap-3 md:gap-6'
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className='icon-wrapper shrink-0'>
                  <div
                    className={`icon-glow ${word.color.replace('from-', 'text-').split(' ')[0]}`}
                  />
                  <div
                    ref={(el) => {
                      if (el) iconsRef.current[i] = el
                    }}
                    className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg md:h-16 md:w-16 lg:h-20 lg:w-20 ${word.color}`}
                  >
                    <Icon className='h-6 w-6 text-white md:h-8 md:w-8 lg:h-10 lg:w-10' />
                  </div>
                </div>
                <span
                  className={`bg-gradient-to-r bg-clip-text text-2xl font-semibold text-transparent md:text-4xl lg:text-6xl ${word.color}`}
                >
                  {word.text}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className='mt-16 flex min-h-[30vh] items-center justify-center px-6 text-center md:mt-24 md:min-h-[50vh] md:px-0'>
        <p className='text-gradient-vibe max-w-2xl text-base font-light leading-relaxed md:max-w-3xl md:text-lg lg:text-2xl xl:text-4xl'>
          Each project is an experiment — a new blend of design, motion, and
          development that grows into something living and memorable.
        </p>
      </div>
    </motion.section>
  )
}
