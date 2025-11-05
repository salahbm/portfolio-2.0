'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './story.component.css'

const WORDS = [
  'design.',
  'prototype.',
  'solve.',
  'build.',
  'develop.',
  'debug.',
  'learn.',
  'ship.',
  'collaborate.',
  'create.',
  'innovate.',
  'test.',
  'optimize.',
  'scale.',
  'repeat.',
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
    <section className='scroll-story relative flex w-full flex-col items-center justify-center py-24'>
      {/* headline + scroll words */}
      <div className='content-wrapper flex w-full flex-col items-center px-6 md:flex-row md:items-start md:justify-center md:gap-10 md:px-12'>
        {/* headline */}
        <h2 className='sticky-heading sticky top-[40%] text-5xl font-semibold leading-tight md:text-7xl'>
          <span className='sr-only'> This is how I bring ideas to life </span>
          <span aria-hidden='true'>I do&nbsp;</span>
        </h2>

        <ul
          className='word-list scroll-snap-y space-y-[10vh] pb-[10vh] pt-[10vh] text-4xl font-semibold md:text-6xl'
          style={{ '--count': WORDS.length } as React.CSSProperties}
        >
          {WORDS.map((word, i) => (
            <li
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el
              }}
              className='scroll-item scroll-snap-center'
              style={{ '--i': i } as React.CSSProperties}
            >
              <span>{word}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex min-h-[50vh] items-center justify-center px-6 text-center md:px-0'>
        <p className='text-gradient-body max-w-xl text-lg font-light leading-relaxed md:text-2xl'>
          Each project is an experiment — a new blend of design, motion, and
          development that grows into something living and memorable.
        </p>
      </div>
    </section>
  )
}
