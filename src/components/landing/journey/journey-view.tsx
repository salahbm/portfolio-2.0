'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './journey.component.css'

gsap.registerPlugin(ScrollTrigger)

export default function JourneyScroll() {
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
    const fontSizeMin = 16
    const fontSizeMax = 20
    const fontRatioMin = 1.15
    const fontRatioMax = 1.33
    const fontWidthMin = 375
    const fontWidthMax = 1500

    const fluidMin = fontSizeMin * Math.pow(fontRatioMin, level)
    const fluidMax = fontSizeMax * Math.pow(fontRatioMax, level)
    const fluidPreferred = (fluidMax - fluidMin) / (fontWidthMax - fontWidthMin)

    return `clamp(${fluidMin / 16}rem, ${fluidMin / 16}rem - ${(fluidPreferred * fontWidthMin) / 16}rem + ${fluidPreferred * 100}vi, ${fluidMax / 16}rem)`
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
            // Animate from 200% to 100% as scroll progresses
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
    if (progressContainerRef.current) {
      const height = (progressContainerRef.current as HTMLElement).offsetHeight
      setContainerHeight(height)
    }
  }, [])

  const progressYPixels = useTransform(
    scrollYProgress,
    [0, 1],
    [0, containerHeight]
  )

  return (
    <div
      ref={containerRef}
      className='scroll-progress-wrapper font-sf-medium relative h-screen w-full overflow-x-hidden bg-background text-foreground'
    >
      <div ref={scrollContentRef} className='scroll-content'>
        <div className='wrapper-edge' />
        <section
          className='z-1 fixed left-1/2 top-1/2 flex h-[50vh] w-[calc(100vw-4rem)] max-w-[1600px] -translate-x-1/2 -translate-y-1/2'
          style={{
            fontSize: calculateFluidSize(4.5),
          }}
        >
          <div
            className='border-b-2 border-t-2 border-border'
            style={{
              content: '',
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '100vw',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />

          <div
            ref={progressContainerRef}
            className='progress-container'
            style={{
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingInline: '0.75rem',
              position: 'relative',
            }}
          >
            <span className='sr-only'>100% complete</span>

            <div
              className='sync'
              style={{
                position: 'relative',
                height: '100%',
              }}
            >
              <motion.span
                className='sync-span text-foreground'
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: 0,
                  display: 'inline-block',
                  y: progressYPixels,
                  padding: '0.125rem',
                }}
              >
                <span
                  className='progress-line-horizontal'
                  style={{
                    position: 'relative',
                    fontVariantNumeric: 'tabular-nums',
                    paddingInline: '0.125rem',
                    display: 'inline-block',
                  }}
                >
                  {progress}% complete
                </span>
              </motion.span>
            </div>
          </div>

          <div className='heading relative pl-2'>
            <div
              className='border-l-2 border-r-2 border-border'
              style={{
                content: '',
                position: 'absolute',
                left: 0,
                right: 0,
                height: '100vh',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />

            {lineHeight > 0 && (
              <div
                className='text-muted-foreground'
                style={{
                  position: 'absolute',
                  height: `${lineHeight}px`,
                  aspectRatio: '1',
                  right: 0,
                  bottom: '100%',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  padding: '0 2ch 1ch 0',
                }}
              >
                {Math.round(lineHeight * 0.86)}px
              </div>
            )}

            <h1
              ref={headingRef}
              contentEditable
              spellCheck={false}
              suppressContentEditableWarning
              style={{
                margin: 0,
                lineHeight: 1,
                fontSize: 'inherit',
                backgroundImage: `linear-gradient(90deg, hsl(var(--foreground)) 0 0)`,
                backgroundSize: '200% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: '200%',
                backgroundPositionY: '0%',
                color: 'transparent',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextStroke: '2px hsl(var(--foreground))',
                display: 'inline',
                letterSpacing: '0.05ch',
                outline: 'none',
                cursor: 'text',
              }}
            >
              Craft bespoke, artisanal user interfaces driven by a mastery of
              the fundamentals. Craft bespoke, artisanal user interfaces driven
              by a mastery of the fundamentals. Craft bespoke, artisanal user
              interfaces driven by a mastery of the fundamentals.
            </h1>
          </div>
        </section>
      </div>
    </div>
  )
}
