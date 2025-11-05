'use client'

import { Fragment, PropsWithChildren, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { animateRippleWave } from '@/animations/page-transition-effects'
import { cn } from '@/lib/utils'

export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement[]>([])
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const content = contentRef.current
    const elements = elementsRef.current
    if (!content || elements.length === 0) return

    const tl = gsap.timeline({ defaults: { overwrite: 'auto' } })
    animateRippleWave(tl, elements, content)

    return () => {
      tl.kill()
    }
  }, [pathname])

  return (
    <Fragment>
      {/* Smooth transition overlay */}
      <div
        ref={overlayRef}
        className='pointer-events-none fixed inset-0 z-[9999] select-none overflow-hidden'
        aria-hidden='true'
      >
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) elementsRef.current[i] = el
            }}
            className={cn(
              'absolute inset-0 h-full w-full',
              'bg-gradient-to-r from-primary/20 via-primary/25 to-primary/15',
              'rounded-2xl backdrop-blur-[2px]'
            )}
            style={{ transform: 'scaleX(0)' }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className='relative h-full w-full overflow-hidden will-change-transform'
      >
        {children}
      </div>
    </Fragment>
  )
}
