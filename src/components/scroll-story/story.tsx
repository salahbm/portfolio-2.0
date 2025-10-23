'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

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
    <section className='scroll-story relative flex w-full flex-col items-center py-16'>
      <div className='content-wrapper flex w-full flex-col items-start gap-4 px-6 md:flex-row md:gap-10 md:px-10'>
        <h2 className='sticky-heading sticky top-[40%] text-5xl font-semibold leading-tight md:text-7xl'>
          <span className='sr-only'>I can really ship things.</span>
          <span aria-hidden='true'>I can really&nbsp;</span>
        </h2>

        <ul
          className='word-list scroll-snap-y space-y-[50vh] pb-[50vh] pt-[50vh] text-4xl font-semibold md:text-6xl'
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
              {word}
            </li>
          ))}
        </ul>
      </div>

      <div className='flex min-h-[60vh] items-center justify-center px-6'>
        <p className='max-w-xl text-center text-xl leading-relaxed opacity-60 md:text-2xl'>
          …and I love turning ideas into meaningful digital experiences.
        </p>
      </div>

      <style jsx>{`
        .scroll-story {
          scroll-snap-type: y proximity;
        }

        .sticky-heading {
          height: fit-content;
          background: linear-gradient(
            to bottom,
            currentColor 60%,
            color-mix(in oklch, currentColor, transparent 50%)
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .word-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .scroll-item {
          opacity: 0.2;
          transition: opacity 0.3s ease;
        }

        .scroll-item:first-of-type {
          opacity: 1;
        }

        /* CSS Scroll-driven animations for modern browsers */
        @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
          .scroll-item {
            animation-name: brighten;
            animation-fill-mode: both;
            animation-timing-function: linear;
            animation-range: cover calc(50% - 1lh) calc(50% + 1lh);
            animation-timeline: view();
          }

          .scroll-item:last-of-type {
            --end-opacity: 1;
          }

          @keyframes brighten {
            0% {
              opacity: 0.2;
            }
            50% {
              opacity: 1;
              filter: brightness(1.2);
            }
            100% {
              opacity: var(--end-opacity, 0.2);
            }
          }
        }
      `}</style>
    </section>
  )
}
