'use client'

import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'

const layerColors = [
  { color: '#ffffff', offset: 0 },
  { color: '#6c29e2', offset: 3 },
  { color: '#ff6947', offset: -5 },
  { color: '#c6ff79', offset: 9 },
]

const sparkColors = ['#6c29e2', '#ff6947', '#c6ff79']

export default function AkaComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLSpanElement[]>([])
  const sparkRefs = useRef<HTMLSpanElement[]>([])

  // --- generate random spark positions ONCE per mount ---
  const sparkPositions = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      top: `${Math.random() * 80 + 10}%`, // between 10%–90%
      left: `${Math.random() * 80 + 10}%`, // between 10%–90%
    }))
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // --- Fade & pop in
      tl.fromTo(
        container,
        { opacity: 0, scale: 0.8, rotate: 30, delay: 0.5 },
        { opacity: 1, scale: 1, rotate: -15, duration: 0.8 }
      )

      // --- Layers rise in
      tl.from(
        layersRef.current,
        { opacity: 0, y: 20, scale: 0.95, stagger: 0.1, duration: 0.6 },
        '-=0.3'
      )

      // --- Sparks pop with randomness
      tl.from(
        sparkRefs.current,
        {
          opacity: 0,
          scale: 0,
          y: () => gsap.utils.random(-20, 20),
          x: () => gsap.utils.random(-20, 20),
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      )

      // --- Mouse parallax
      const xTo = gsap.quickTo(container, 'x', {
        duration: 0.6,
        ease: 'power3.out',
      })
      const yTo = gsap.quickTo(container, 'y', {
        duration: 0.6,
        ease: 'power3.out',
      })

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window
        const moveX = (e.clientX / innerWidth - 0.5) * 30
        const moveY = (e.clientY / innerHeight - 0.5) * 20
        xTo(moveX)
        yTo(moveY)
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      id='aka-container'
      ref={containerRef}
      className='pointer-events-none absolute right-[13%] top-[60%] -rotate-[15deg] select-none'
    >
      <div className='relative font-syne text-[clamp(1rem,6vw,8rem)] leading-none tracking-tight'>
        {/* Layered glow */}
        {layerColors.map((layer, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) layersRef.current[i] = el
            }}
            className='absolute'
            style={{
              color: layer.color,
              left: `${layer.offset}px`,
              top: `${layer.offset}px`,
              transform: 'skewX(-10deg)',
              filter: 'blur(0.5px)',
              textShadow: `0 0 10px ${layer.color}`,
              zIndex: i + 1,
            }}
          >
            aka
          </span>
        ))}

        {/* Main text */}
        <span className='relative z-10 text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'>
          aka
        </span>

        {/* Sparks */}
        {sparkPositions.map((pos, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) sparkRefs.current[i] = el
            }}
            className='absolute rounded-full blur-[3px]'
            style={{
              width: `${5 + Math.random() * 4}px`,
              height: `${5 + Math.random() * 4}px`,
              top: pos.top,
              left: pos.left,
              background: sparkColors[i % sparkColors.length],
              boxShadow: `0 0 10px ${sparkColors[i % sparkColors.length]}, 0 0 20px ${sparkColors[i % sparkColors.length]}`,
              opacity: 0.8,
              zIndex: 3,
            }}
          />
        ))}
      </div>
    </div>
  )
}
