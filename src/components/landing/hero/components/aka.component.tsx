'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const layerColors = [
  { color: '#ffffff', offset: 0 },
  { color: '#1f2f4d', offset: 10 },
  { color: '#ec6a5f', offset: -5 },
  { color: '#f3bf61', offset: 9 },
  { color: '#6c29e2', offset: 8 },
  { color: '#e45064', offset: -7 },
]

const sparkColors = ['#1f2f4d', '#ec6a5f', '#f3bf61']

const sparks = [
  { top: '14%', left: '42%', width: '8.5px', height: '5.7px' },
  { top: '84%', left: '22%', width: '5.7px', height: '6.8px' },
  { top: '74%', left: '28%', width: '7.8px', height: '5.5px' },
  { top: '52%', left: '83%', width: '6.8px', height: '6.3px' },
  { top: '26%', left: '31%', width: '7.3px', height: '6.3px' },
  { top: '46%', left: '29%', width: '5.7px', height: '6.9px' },
  { top: '36%', left: '13%', width: '8.8px', height: '6.2px' },
  { top: '31%', left: '57%', width: '8.5px', height: '7.3px' },
]

export default function AkaComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLSpanElement[]>([])
  const sparkRefs = useRef<HTMLSpanElement[]>([])

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
      className='pointer-events-none absolute right-6 top-[10%] -rotate-[15deg] select-none 2xl:right-[10%]'
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
        <span className='relative z-10 font-syne text-accent drop-shadow-[12px_12px_7px_rgba(255,255,255,0.7)]'>
          aka
        </span>

        {/* Sparks */}
        {sparks.map((spark, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) sparkRefs.current[i] = el
            }}
            className='absolute rounded-full blur-[3px]'
            style={{
              width: spark.width,
              height: spark.height,
              top: spark.top,
              left: spark.left,
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
