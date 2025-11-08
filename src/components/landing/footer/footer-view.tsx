'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export function Footer() {
  const wave1Ref = useRef<SVGPathElement>(null)
  const wave2Ref = useRef<SVGPathElement>(null)
  const wave3Ref = useRef<SVGPathElement>(null)
  const wave4Ref = useRef<SVGPathElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  // Smooth, long, natural wave generator
  const generateWavePath = (
    amplitude: number,
    frequency: number,
    offset: number,
    randomness: number
  ): string => {
    const points: string[] = []
    const segments = 10
    const width = 1400
    const height = 180

    points.push(`M-100,${height}`)

    for (let i = 0; i <= segments; i++) {
      const x = (width / segments) * i
      const normalY =
        Math.sin((i / segments) * Math.PI * frequency + offset) * amplitude

      const randomY = (Math.random() - 0.5) * randomness
      const y = 60 + normalY + randomY // lifted baseline

      if (i === 0) {
        points.push(`L-100,${y}`)
      } else {
        const prevX = (width / segments) * (i - 1)
        const cpX1 = prevX + (x - prevX) / 3
        const cpX2 = prevX + (2 * (x - prevX)) / 3

        const prevY =
          60 +
          Math.sin(((i - 1) / segments) * Math.PI * frequency + offset) *
            amplitude

        const cpY1 = prevY + (Math.random() - 0.5) * randomness * 0.4
        const cpY2 = y + (Math.random() - 0.5) * randomness * 0.4

        points.push(`C${cpX1},${cpY1} ${cpX2},${cpY2} ${x},${y}`)
      }
    }

    points.push(`L${width + 100},${height} L-100,${height} Z`)
    return points.join(' ')
  }

  useGSAP(() => {
    const waves = [
      { ref: wave1Ref, duration: 5, delay: 0 },
      { ref: wave2Ref, duration: 7, delay: 0.1 },
      { ref: wave3Ref, duration: 9, delay: 0.2 },
      { ref: wave4Ref, duration: 11, delay: 0.3 },
    ]

    // Entry animation
    waves.forEach(({ ref, delay }) => {
      if (ref.current) {
        gsap.from(ref.current, {
          scaleY: 0,
          transformOrigin: 'bottom',
          duration: 1,
          delay,
          ease: 'elastic.out(1, 0.4)',
        })
      }
    })

    // Continuous morphing
    waves.forEach(({ ref, duration }, index) => {
      if (ref.current) {
        const animate = () => {
          const amp = 22 + index * 4
          const freq = 1.7 + index * 0.4
          const rand = 6 - index * 1

          const path1 = generateWavePath(amp, freq, index * 0.3, rand)
          const path2 = generateWavePath(amp, freq, index * 0.3 + Math.PI, rand)

          gsap.to(ref.current, {
            attr: { d: path1 },
            duration: duration / 2,
            ease: 'sine.inOut',
            onComplete: () => {
              gsap.to(ref.current, {
                attr: { d: path2 },
                duration: duration / 2,
                ease: 'sine.inOut',
                onComplete: animate,
              })
            },
          })
        }

        ref.current.setAttribute(
          'd',
          generateWavePath(
            22 + index * 4,
            1.7 + index * 0.4,
            index * 0.3,
            6 - index * 1
          )
        )

        gsap.delayedCall(0.6 + waves[index].delay, animate)
      }
    })

    // Fade text
    if (contentRef.current) {
      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.12,
        delay: 1.2,
        ease: 'power3.out',
      })
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className='relative h-full w-full -translate-y-1/4 overflow-hidden'
    >
      <div className='relative h-[250px] w-full'>
        <svg
          className='absolute bottom-0 left-0 h-full w-full'
          viewBox='0 0 1200 180'
          preserveAspectRatio='none'
        >
          <path ref={wave4Ref} className='fill-[hsl(var(--primary)/0.20)]' />
          <path ref={wave3Ref} className='fill-[hsl(var(--primary)/0.35)]' />
          <path ref={wave2Ref} className='fill-[hsl(var(--primary)/0.60)]' />
          <path ref={wave1Ref} className='fill-[hsl(var(--primary)/1)]' />
        </svg>
      </div>

      <div className='relative bg-gradient-to-b from-primary to-transparent px-4 py-12 text-center text-primary-foreground'>
        <div
          ref={contentRef}
          className='mx-auto max-w-2xl space-y-3 text-base leading-relaxed'
        >
          <p className='text-lg'>
            Designed by me with{' '}
            <span className='inline-block animate-pulse text-red-500'>❤️</span>
          </p>
          <p className='font-syne text-primary-foreground'>
            Developed with patience I didn't know I had.
          </p>
          <p className='pt-2 font-mono text-sm text-primary'>© 2025</p>
        </div>
      </div>
    </footer>
  )
}
