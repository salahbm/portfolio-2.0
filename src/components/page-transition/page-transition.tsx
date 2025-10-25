'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

type TransitionEffect = 'liquid' | 'ripple'

interface PageTransitionProps {
  children: React.ReactNode
  effect?: TransitionEffect
}

export function PageTransition({
  children,
  effect = 'ripple',
}: PageTransitionProps) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement[]>([])
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Skip animation on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const content = contentRef.current
    const elements = elementsRef.current

    if (!content || elements.length === 0) return

    // Create timeline for smooth sequencing
    const tl = gsap.timeline()

    // Choose animation based on effect type
    switch (effect) {
      case 'liquid':
        animateLiquidMorph(tl, elements, content)
        break
      case 'ripple':
        animateRippleWave(tl, elements, content)
        break
    }

    return () => {
      tl.kill()
    }
  }, [pathname, effect])

  // Render different overlay structures based on effect
  const renderOverlay = () => {
    switch (effect) {
      case 'liquid':
        return (
          <>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) elementsRef.current[i] = el
                }}
                className={cn(
                  'absolute h-[200vh] w-[200vw] overflow-hidden rounded-full',
                  'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent',
                  'backdrop-blur-sm'
                )}
                style={{
                  top: `${(i % 2) * 50}%`,
                  left: `${Math.floor(i / 2) * 25}%`,
                  transform: 'translate(-50%, -50%) scale(0)',
                }}
              />
            ))}
          </>
        )

      case 'ripple':
        return (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) elementsRef.current[i] = el
                }}
                className={cn(
                  'absolute inset-0 h-full w-full overflow-hidden',
                  'bg-gradient-to-r from-primary/15 via-primary/25 to-primary/15'
                )}
                style={{
                  transform: 'scaleX(0)',
                }}
              />
            ))}
          </>
        )
    }
  }

  return (
    <>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className='pointer-events-none fixed inset-0 z-50 overflow-hidden'
        aria-hidden='true'
      >
        {renderOverlay()}
      </div>

      {/* Content wrapper */}
      <div ref={contentRef} className='h-full w-full'>
        {children}
      </div>
    </>
  )
}

// Animation functions
function animateLiquidMorph(
  tl: gsap.core.Timeline,
  elements: HTMLElement[],
  content: HTMLElement
) {
  tl.set(elements, { scale: 0, opacity: 1 })
  tl.to(elements, {
    scale: 3,
    duration: 0.8,
    ease: 'power3.inOut',
    stagger: { amount: 0.15, from: 'random' },
  })
  tl.to(
    content,
    { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' },
    '-=0.6'
  )
  tl.to(elements, {
    scale: 0,
    duration: 0.6,
    ease: 'power3.inOut',
    stagger: { amount: 0.1, from: 'random' },
  })
  tl.fromTo(
    content,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.4'
  )
}

function animateRippleWave(
  tl: gsap.core.Timeline,
  elements: HTMLElement[],
  content: HTMLElement
) {
  tl.set(elements, { scaleX: 0, opacity: 1, transformOrigin: 'left center' })
  tl.to(elements, {
    scaleX: 1,
    duration: 0.7,
    ease: 'power2.inOut',
    stagger: { amount: 0.2 },
  })
  tl.to(
    content,
    { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' },
    '-=0.5'
  )
  tl.to(elements, {
    scaleX: 0,
    transformOrigin: 'right center',
    duration: 0.6,
    ease: 'power2.inOut',
    stagger: { amount: 0.15 },
  })
  tl.fromTo(
    content,
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
    '-=0.4'
  )
}
