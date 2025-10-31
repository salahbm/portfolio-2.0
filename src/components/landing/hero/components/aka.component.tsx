'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { animateAka } from '@/animations/hero-aka.animation'
import { useTheme } from 'next-themes' // detect light/dark mode

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

    animateAka()

    // --- Entry Animation for sparks ---
    gsap.fromTo(
      sparkRefs.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 0.9,
        scale: 1,
        duration: 1.1,
        ease: 'back.out(1.7)',
        stagger: 0.08,
        delay: 1.4,
      }
    )

    // --- Parallax ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(layersRef.current, {
        x: (i) => x * (i + 1) * 6,
        y: (i) => y * (i + 1) * 6,
        duration: 0.6,
        ease: 'power3.out',
      })

      gsap.to(sparkRefs.current, {
        x: x * 20,
        y: y * 20,
        duration: 1,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to([...layersRef.current, ...sparkRefs.current], {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [theme])

  // Layer order depends on theme
  const isDark = theme === 'dark'
  const layerColors = isDark
    ? [
        { color: '#ff6947', offset: 12 }, // soft orange bottom
        { color: '#c6ff79', offset: 2 }, // green top for dark
        { color: '#6c29e2', offset: 6 }, // soft purple middle
      ]
    : [
        { color: '#ff6947', offset: 12 }, // soft orange bottom
        { color: '#ffffff', offset: 2 }, // white top for light
        { color: '#6c29e2', offset: 6 }, // soft purple middle
      ]

  const topTextColor = isDark ? '#ffffff' : '#c6ff79'

  return (
    <div
      id='aka-container'
      ref={containerRef}
      className='absolute -right-4 -top-8 -rotate-12 lg:right-0 lg:top-0'
    >
      <div className='relative select-none font-milkyway text-[clamp(2rem,6vw,12rem)] leading-none tracking-tight'>
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

        {/* Sparks */}
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

        {/* Foreground (theme-based top layer) */}
        <span
          className='relative drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)] transition-colors duration-300'
          style={{
            color: topTextColor,
            zIndex: 5,
          }}
        >
          aka
        </span>
      </div>
    </div>
  )
}
