'use client'

import { Fragment, PropsWithChildren, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { animateRippleWave } from '@/lib/page-transition-effects'

export function PageTransition({ children }: PropsWithChildren) {
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

    animateRippleWave(tl, elements, content)

    return () => {
      tl.kill()
    }
  }, [pathname])

  return (
    <Fragment>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className='pointer-events-none fixed inset-0 z-50 overflow-hidden'
        aria-hidden='true'
      >
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
      </div>

      {/* Content wrapper */}
      <div ref={contentRef} className='h-full w-full'>
        {children}
      </div>
    </Fragment>
  )
}
