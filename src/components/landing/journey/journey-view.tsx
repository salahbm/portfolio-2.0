'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './journey.component.css'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const FONTSIZE_MIN = 16
const FONTSIZE_MAX = 20
const FONT_RATIO_MIN = 1.15
const FONT_RATIO_MAX = 1.33
const FONT_WIDTH_MIN = 375
const FONT_WIDTH_MAX = 1500

export function JourneyScroll() {
  const [progress, setProgress] = useState(0)
  const [lineHeight, setLineHeight] = useState(0)
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const scrollContentRef = useRef(null)
  const progressContainerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  // Calculate fluid typography
  const calculateFluidSize = (level = 4.5) => {
    const fluidMin = FONTSIZE_MIN * Math.pow(FONT_RATIO_MIN, level)
    const fluidMax = FONTSIZE_MAX * Math.pow(FONT_RATIO_MAX, level)
    const fluidPreferred =
      (fluidMax - fluidMin) / (FONT_WIDTH_MAX - FONT_WIDTH_MIN)

    return `clamp(${fluidMin / 16}rem, ${fluidMin / 16}rem - ${(fluidPreferred * FONT_WIDTH_MIN) / 16}rem + ${fluidPreferred * 100}vi, ${fluidMax / 16}rem)`
  }

  useEffect(() => {
    // Measure line height
    if (headingRef.current) {
      const computedStyle = window.getComputedStyle(headingRef.current)
      const lh = parseFloat(computedStyle.lineHeight)
      setLineHeight(lh)
    }

    // GSAP scroll-triggered text fill animation
    if (
      headingRef.current &&
      containerRef.current &&
      scrollContentRef.current
    ) {
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: scrollContentRef.current,
        scroller: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          if (headingRef.current) {
            const newPosition = 200 - self.progress * 100
            gsap.set(headingRef.current, {
              backgroundPositionX: `${newPosition}%`,
            })
          }
        },
      })

      return () => {
        scrollTriggerInstance.kill()
      }
    }
  }, [])

  useEffect(() => {
    // Update progress
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgress(Math.round(latest * 100))
    })

    return () => {
      unsubscribe()
    }
  }, [scrollYProgress])

  // Transform scroll progress to pixel values for percentage movement
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (progressContainerRef.current) {
        const height = (progressContainerRef.current as HTMLDivElement)
          .offsetHeight
        setContainerHeight(height)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  const progressYPixels = useTransform(
    scrollYProgress,
    [0, 1],
    [0, containerHeight]
  )

  return (
    <section
      ref={containerRef}
      className='font-sf-medium no-scrollbar relative isolate box-border h-screen w-full overflow-y-auto overflow-x-hidden'
    >
      <div ref={scrollContentRef} className='relative h-[150vh]'>
        {/* Left edge line - hidden on mobile */}
        <div
          className='pointer-events-none absolute left-0 top-0 z-0 hidden h-screen w-8 md:block'
          aria-hidden='true'
        />

        <div
          className='sticky left-1/2 top-1/2 z-10 flex h-[50vh] w-[calc(100vw-10rem)] -translate-y-1/2'
          style={{
            fontSize: calculateFluidSize(4.5),
          }}
        >
          {/* Progress container */}
          <div
            ref={progressContainerRef}
            className='pointer-events-none relative flex h-full flex-col justify-between whitespace-nowrap px-3 text-sm max-md:absolute max-md:bottom-0 max-md:right-full max-md:top-0 max-md:z-[2] max-md:w-8 max-md:p-0'
          >
            <span className='sr-only'>100% complete</span>

            <div className='relative h-full'>
              <motion.span
                className='absolute right-5 top-0 inline-block p-0.5 text-background'
                style={{
                  y: progressYPixels,
                }}
              >
                <span className='progress-line relative inline-block -rotate-90 px-0.5 tabular-nums lg:rotate-0'>
                  {progress}% complete
                </span>
              </motion.span>
            </div>
          </div>

          {/* Heading container */}
          <div className='pointer-events-auto relative mx-auto self-center text-center'>
            {/* Line height indicator */}
            {lineHeight > 0 && (
              <div
                className={cn(
                  `p-[0 2ch 1ch 0] pointer-events-none absolute bottom-full right-0 flex aspect-square items-end justify-end text-sm text-background h-[${lineHeight}px]`
                )}
              >
                {Math.round(lineHeight * 0.86)}px
              </div>
            )}

            <h1
              ref={headingRef}
              contentEditable
              spellCheck={false}
              suppressContentEditableWarning
              className='journey-heading m-auto inline cursor-text tracking-[0.05ch] text-transparent outline-none selection:bg-primary selection:text-primary-foreground focus-visible:outline-dashed focus-visible:outline-[0.05em] focus-visible:outline-offset-[0.1em] focus-visible:outline-primary'
            >
              Craft bespoke, artisanal user interfaces driven by a mastery of
              the fundamentals. Craft bespoke, artisanal user interfaces driven
              by a mastery of the fundamentals. Craft bespoke, artisanal user
              interfaces driven by a mastery of the fundamentals.
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
