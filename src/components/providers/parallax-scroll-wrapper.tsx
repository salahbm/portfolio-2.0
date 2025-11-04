'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

interface ParallaxScrollWrapperProps {
  children: React.ReactNode[]
}

export function ParallaxScrollWrapper({
  children,
}: ParallaxScrollWrapperProps) {
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const outerWrappersRef = useRef<(HTMLDivElement | null)[]>([])
  const innerWrappersRef = useRef<(HTMLDivElement | null)[]>([])
  const currentIndexRef = useRef(-1)
  const animatingRef = useRef(false)
  const currentTweenRef = useRef<gsap.core.Timeline | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || children.length === 0) return

    gsap.registerPlugin(Observer)

    const sections = sectionsRef.current.filter(Boolean) as HTMLElement[]
    const outerWrappers = outerWrappersRef.current.filter(
      Boolean
    ) as HTMLDivElement[]
    const innerWrappers = innerWrappersRef.current.filter(
      Boolean
    ) as HTMLDivElement[]

    if (sections.length === 0) return

    // Initial setup - clear any existing transforms
    sections.forEach((section, i) => {
      if (i === 0) {
        gsap.set(section, {
          visibility: 'visible',
          opacity: 1,
          zIndex: 10,
          yPercent: 0,
        })
        gsap.set([outerWrappers[i], innerWrappers[i]], { yPercent: 0 })
      } else {
        gsap.set(section, {
          visibility: 'hidden',
          opacity: 0,
          zIndex: 0,
          yPercent: 0,
        })
        gsap.set(outerWrappers[i], { yPercent: 100 })
        gsap.set(innerWrappers[i], { yPercent: -100 })
      }
    })

    currentIndexRef.current = 0

    const wrap = (index: number) => {
      return Math.max(0, Math.min(sections.length - 1, index))
    }

    function gotoSection(index: number, direction: number) {
      const wrappedIndex = wrap(index)

      // Don't animate if we're already at this section
      if (wrappedIndex === currentIndexRef.current || animatingRef.current) {
        return
      }

      // Kill any existing animation
      if (currentTweenRef.current) {
        currentTweenRef.current.kill()
      }

      animatingRef.current = true

      const fromTop = direction === -1
      const dFactor = fromTop ? -1 : 1
      const currentIndex = currentIndexRef.current

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: 'power1.inOut' },
        onComplete: () => {
          animatingRef.current = false
          currentTweenRef.current = null

          // Clean up old section
          gsap.set(sections[currentIndex], {
            visibility: 'hidden',
            opacity: 0,
            zIndex: 0,
            yPercent: 0,
          })
        },
      })

      currentTweenRef.current = tl

      const currentSection = sections[currentIndex]
      const newSection = sections[wrappedIndex]

      // Set z-indices clearly - new section on top during animation
      gsap.set(currentSection, { zIndex: 5 })
      gsap.set(newSection, {
        zIndex: 10,
        visibility: 'visible',
      })

      // Animate out current section (fade + slight move)
      tl.to(
        currentSection,
        {
          yPercent: -15 * dFactor,
          opacity: 0,
          duration: 1.25,
        },
        0
      )

      // Animate in new section (reveal with parallax)
      tl.fromTo(
        newSection,
        {
          opacity: 0,
          yPercent: 15 * dFactor,
        },
        {
          opacity: 1,
          yPercent: 0,
        },
        0
      )

      tl.fromTo(
        [outerWrappers[wrappedIndex], innerWrappers[wrappedIndex]],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0
      )

      currentIndexRef.current = wrappedIndex
    }

    // Create Observer with better tolerance
    const observer = Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () => {
        if (!animatingRef.current && currentIndexRef.current > 0) {
          gotoSection(currentIndexRef.current - 1, -1)
        }
      },
      onUp: () => {
        if (
          !animatingRef.current &&
          currentIndexRef.current < sections.length - 1
        ) {
          gotoSection(currentIndexRef.current + 1, 1)
        }
      },
      tolerance: 30,
      preventDefault: true,
    })

    // Cleanup
    return () => {
      if (currentTweenRef.current) {
        currentTweenRef.current.kill()
      }
      observer.kill()
    }
  }, [mounted, children.length])

  if (!mounted) {
    return null
  }

  return (
    <div className='fixed inset-0 overflow-hidden'>
      {children.map((child, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionsRef.current[index] = el
          }}
          className='fixed left-0 top-0 h-screen w-full'
          style={{
            zIndex: 0,
            visibility: 'hidden',
            opacity: 0,
          }}
        >
          <div
            ref={(el) => {
              outerWrappersRef.current[index] = el
            }}
            className='h-full w-full overflow-y-auto overflow-x-hidden'
          >
            <div
              ref={(el) => {
                innerWrappersRef.current[index] = el
              }}
              className='h-full w-full'
            >
              {child}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
