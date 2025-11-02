'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTheme } from 'next-themes'

const sparkColors = ['#6c29e2', '#ff6947', '#c6ff79']
const sparkPositions = [
  { top: '10%', left: '15%' },
  { top: '25%', left: '40%' },
  { top: '45%', left: '20%' },
  { top: '60%', left: '55%' },
  { top: '30%', left: '70%' },
  { top: '75%', left: '35%' },
]

export default function AkaComponent() {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLSpanElement[]>([])
  const sparkRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // --- base fade in
      tl.fromTo(
        container,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.4 }
      )

      // --- colored layers
      tl.from(
        layersRef.current,
        { opacity: 0, y: 40, scale: 0.9, stagger: 0.15, duration: 0.7 },
        '-=0.3'
      )

      // --- sparks pop
      tl.from(
        sparkRefs.current,
        {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      )
    }, container)

    return () => ctx.revert()
  }, [theme])

  const isDark = theme === 'dark'
  const layerColors = isDark
    ? [
        { color: '#6c29e2', offset: 2 },
        { color: '#ff6947', offset: 5 },
        { color: '#ffffff', offset: 7 },
        { color: '#c6ff79', offset: 8 },
      ]
    : [
        { color: '#c6ff79', offset: 8 },
        { color: '#ff6947', offset: 7 },
        { color: '#ffffff', offset: 5 },
        { color: '#6c29e2', offset: 2 },
      ]

  return (
    <div
      id='aka-container'
      ref={containerRef}
      className='absolute right-1/4 top-1/2 z-20 -rotate-[15deg]'
    >
      <div className='relative select-none font-syne text-[clamp(0.7rem,6vw,12rem)] leading-none tracking-tight'>
        {layerColors.map((layer, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) layersRef.current[i] = el
            }}
            className='pointer-events-none absolute'
            style={{
              color: layer.color,
              left: `${layer.offset}px`,
              top: `${layer.offset}px`,
              transform: 'skewX(-10deg)',
              textShadow: `0 0 10px ${layer.color}55`,
              zIndex: i + 1,
            }}
          >
            aka
          </span>
        ))}

        {sparkPositions.map((pos, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) sparkRefs.current[i] = el
            }}
            className='absolute rounded-full blur-[2px]'
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              top: pos.top,
              left: pos.left,
              background: sparkColors[i % sparkColors.length],
              boxShadow: `0 0 10px ${sparkColors[i % sparkColors.length]}, 0 0 20px ${sparkColors[i % sparkColors.length]}`,
              opacity: 0.8,
              zIndex: 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
