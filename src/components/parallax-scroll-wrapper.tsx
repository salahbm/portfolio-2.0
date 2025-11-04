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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || children.length === 0) return

    // Register GSAP Observer plugin
    gsap.registerPlugin(Observer)

    const sections = sectionsRef.current.filter(Boolean) as HTMLElement[]
    const outerWrappers = outerWrappersRef.current.filter(
      Boolean
    ) as HTMLDivElement[]
    const innerWrappers = innerWrappersRef.current.filter(
      Boolean
    ) as HTMLDivElement[]

    if (sections.length === 0) return

    // Initial setup - show first section immediately without animation
    sections.forEach((section, i) => {
      if (i === 0) {
        gsap.set(section, { autoAlpha: 1, zIndex: 1 })
        gsap.set([outerWrappers[i], innerWrappers[i]], { yPercent: 0 })
      } else {
        gsap.set(section, { autoAlpha: 0, zIndex: 0 })
        gsap.set(outerWrappers[i], { yPercent: 100 })
        gsap.set(innerWrappers[i], { yPercent: -100 })
      }
    })

    currentIndexRef.current = 0

    const wrap = (index: number) => {
      if (index < 0) return 0
      if (index >= sections.length) return sections.length - 1
      return index
    }

    function gotoSection(index: number, direction: number) {
      const wrappedIndex = wrap(index)

      // Don't animate if we're already at this section
      if (wrappedIndex === currentIndexRef.current) return

      animatingRef.current = true

      const fromTop = direction === -1
      const dFactor = fromTop ? -1 : 1
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: 'power1.inOut' },
        onComplete: () => {
          animatingRef.current = false
        },
      })

      // Animate out the current section
      const currentSection = sections[currentIndexRef.current]
      gsap.set(currentSection, { zIndex: 0 })
      tl.to(currentSection, {
        yPercent: -15 * dFactor,
        duration: 1.25,
      }).set(currentSection, { autoAlpha: 0 })

      // Animate in the new section
      const newSection = sections[wrappedIndex]
      gsap.set(newSection, { autoAlpha: 1, zIndex: 1 })
      tl.fromTo(
        [outerWrappers[wrappedIndex], innerWrappers[wrappedIndex]],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0
      ).fromTo(newSection, { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)

      currentIndexRef.current = wrappedIndex
    }

    // Create Observer for scroll/touch/pointer events
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
      tolerance: 10,
      preventDefault: true,
    })

    // Cleanup
    return () => {
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
          className='invisible fixed left-0 top-0 h-screen w-full'
          style={{ zIndex: 0 }}
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
