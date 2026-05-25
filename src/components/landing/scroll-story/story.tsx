'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { WORDS } from './story-words'
import { cn } from '@/lib/utils'

export function ScrollStory() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const exitTextRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const wrapper = wrapperRef.current!
      const heading = headingRef.current!
      const rail = railRef.current!
      const exitText = exitTextRef.current!

      const ctx = gsap.context(() => {
        wrapper.querySelectorAll<HTMLElement>('.blob-container')

        const getRailTravel = () =>
          Math.max(
            0,
            Math.max(rail.scrollWidth, rail.getBoundingClientRect().width) -
              window.innerWidth +
              window.innerWidth * 1.3
          )

        const getScrollDistance = () =>
          Math.max(window.innerHeight * 4.5, getRailTravel() * 1.35)

        // -------- Initial state
        gsap.set(wrapper, { position: 'relative' })
        gsap.set('.scroll-story-background', { opacity: 0.1 })

        gsap.set(heading, {
          position: 'absolute',
          left: '50%',
          top: '100%',
          xPercent: -50,
          yPercent: -50,
          scale: 5.4,
          opacity: 1,
        })

        gsap.set(rail, {
          display: 'flex',
          gap: '6rem',
          whiteSpace: 'nowrap',
          x: '100vw',
          opacity: 0,
          willChange: 'transform',
        })

        gsap.set(exitText, {
          position: 'absolute',
          left: '50%',
          top: '40%',
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 1,
        })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            scrub: 0.65,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        tl.to(heading, {
          top: '50%',
          scale: 1,
          duration: 1.1,
          ease: 'power1.out',
        })

        tl.to(
          rail,
          { x: 0, opacity: 1, duration: 0.9, ease: 'power1.out' },
          '>-0.05'
        )

        // fade 0.4 → 1
        tl.to(
          '.scroll-story-background',
          {
            opacity: 1,
            duration: 1,
            ease: 'none',
          },
          '<'
        )

        tl.to(
          heading,
          { opacity: 0, scale: 0.72, duration: 0.75, ease: 'power1.in' },
          '>-0.05'
        )

        tl.to(
          rail,
          {
            x: () => -getRailTravel(),
            ease: 'none',
            duration: 8.5,
          },
          '>-0.05'
        )
        // Fade rail out when finished
        tl.to(
          rail,
          {
            opacity: 0,
            duration: 1,
            ease: 'none',
          },
          '>-0.1'
        )
        // Continue zooming exit text
        tl.to(
          exitText,
          {
            opacity: 1,
            y: 0,
            duration: 1.25,
            ease: 'power1.out',
          },
          '<'
        )

        tl.to(
          exitText,
          {
            scale: 1.9,
            yPercent: -5,
            duration: 1.8,
            ease: 'none',
          },
          '>-0.2'
        )
      }, wrapper)

      return () => ctx.revert()
    },
    { dependencies: [] }
  )

  return (
    <section className='relative min-h-dvh'>
      <div
        ref={wrapperRef}
        id='scroll-story'
        className='relative flex h-dvh items-center justify-start overflow-hidden'
      >
        <div className='scroll-story-background bg-gradient-harmonic pointer-events-none absolute inset-0 -z-10' />

        <h2
          ref={headingRef}
          id='scroll-story-heading'
          className='shrink-0 whitespace-nowrap bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text font-monument-extended font-extrabold text-transparent'
          style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
        >
          I do
        </h2>

        <div
          className='flex items-center px-8 md:px-12 lg:px-20'
          id='scroll-story-rail'
          ref={railRef}
        >
          {WORDS.map((w, i) => {
            const Icon = w.icon
            return (
              <div
                key={i}
                className='blob-container relative flex min-w-fit items-center gap-4 md:gap-6 lg:gap-8'
              >
                <div
                  className={cn(
                    'blob pointer-events-none absolute inset-0 h-24 w-24 rounded-full bg-gradient-to-br sm:h-32 sm:w-32 md:h-40 md:w-40',
                    w.color,
                    'opacity-40 blur-3xl'
                  )}
                />
                <div
                  className={cn(
                    'relative flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br sm:h-16 sm:w-16 md:h-20 md:w-20 md:rounded-xl',
                    w.color
                  )}
                >
                  <Icon className='h-6 w-6 text-white sm:h-8 sm:w-8 md:h-10 md:w-10' />
                </div>
                <span
                  className={cn(
                    'cursor-text bg-gradient-to-r font-semibold text-transparent',
                    w.color,
                    'bg-clip-text'
                  )}
                  style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
                >
                  {w.text}
                </span>
              </div>
            )
          })}
        </div>
        <div
          ref={exitTextRef}
          id='scroll-story-exit-text'
          className='px-4 text-center md:px-6'
        >
          <p
            className='max-w-xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text font-extrabold leading-relaxed text-transparent md:max-w-2xl lg:max-w-3xl'
            style={{ fontSize: 'clamp(1rem, 2.5vw, 2.5rem)' }}
          >
            By the time you reach the end of this scroll, I’m probably brewing
            another idea, breaking something, fixing it again, and calling it
            “innovation.”
          </p>
        </div>
      </div>
    </section>
  )
}
