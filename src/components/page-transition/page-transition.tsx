'use client'

import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

export function PageTransition() {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement[]>([])
  const isInitialMount = useRef(true)

  useGSAP(
    () => {
      if (isInitialMount.current) {
        isInitialMount.current = false
        return
      }

      const elements = elementsRef.current
      if (!elements.length) return

      const tl = gsap.timeline()

      tl.to(elements, {
        scaleX: 1,
        opacity: 0.9,
        duration: 0.5,
        ease: 'power2.inOut',
        stagger: { amount: 0.15, from: 'center' },
      })

      tl.to(
        elements,
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: 'right center',
          duration: 0.4,
          ease: 'power2.inOut',
          stagger: { amount: 0.1, from: 'center' },
        },
        '+=0.1'
      )

      // Reset WITHOUT clearProps
      tl.set(elements, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: 'left center',
      })
    },
    { dependencies: [pathname], scope: overlayRef }
  )

  return (
    <div
      ref={overlayRef}
      className='pointer-events-none fixed inset-0 z-[9999] select-none'
      aria-hidden='true'
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) elementsRef.current[i] = el
          }}
          className={cn(
            'absolute inset-0',
            'bg-[linear-gradient(135deg,transparent,hsl(var(--primary)/0.25),transparent)]',
            'backdrop-blur-sm',
            'will-change-opacity will-change-transform'
          )}
          style={{
            transform: 'scaleX(0)',
            opacity: 0,
            transformOrigin: 'left center',
          }}
        />
      ))}
    </div>
  )
}
