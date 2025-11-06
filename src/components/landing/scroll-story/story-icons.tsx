'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

const STORY_IMAGES = [
  { id: 1, src: '/story/built.png', alt: 'Built' },
  { id: 2, src: '/story/debug.png', alt: 'Debug' },
  { id: 3, src: '/story/learn.png', alt: 'Learn' },
  { id: 4, src: '/story/ship.png', alt: 'Ship' },
  { id: 5, src: '/story/collaborate.png', alt: 'Collaborate' },
  { id: 6, src: '/story/develop.png', alt: 'Develop' },
  { id: 7, src: '/story/repeat.png', alt: 'Repeat' },
  { id: 8, src: '/story/solve.png', alt: 'Solve' },
  { id: 9, src: '/story/debug.png', alt: 'Debug' },
  { id: 10, src: '/story/learn.png', alt: 'Learn' },
  { id: 11, src: '/story/ship.png', alt: 'Ship' },
  { id: 12, src: '/story/collaborate.png', alt: 'Collaborate' },
]

// Larger, better-balanced layout
const IMAGE_POSITIONS = [
  { left: '5%', top: '10%', size: 110 },
  { left: '10%', top: '25%', size: 125 },
  { right: '8%', top: '15%', size: 130 },
  { right: '15%', top: '8%', size: 100 },
  { left: '6%', bottom: '20%', size: 115 },
  { left: '12%', bottom: '12%', size: 100 },
  { right: '10%', bottom: '18%', size: 120 },
  { right: '6%', bottom: '10%', size: 125 },
  { left: '25%', top: '35%', size: 110 },
  { right: '25%', top: '40%', size: 105 },
  { left: '18%', top: '50%', size: 115 },
  { right: '18%', bottom: '35%', size: 120 },
]

export function StoryIcons() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [shadowIntensity, setShadowIntensity] = useState<number[]>(
    Array(STORY_IMAGES.length).fill(0.3)
  )

  // --- Mouse Parallax ---
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
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

  // --- Scroll Shadow Dynamics ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const progress = scrollY / (docHeight - windowHeight)
      setScrollProgress(progress)

      const newIntensity = shadowIntensity.map((_, index) => {
        const base = 0.3
        const variation = Math.sin(progress * Math.PI * 2 + index) * 0.2
        return Math.max(0.1, Math.min(0.5, base + variation))
      })
      setShadowIntensity(newIntensity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [shadowIntensity])

  // --- Felt-style Animation ---
  useEffect(() => {
    const images = imagesRef.current.filter(Boolean) as HTMLElement[]

    // Entry animation
    gsap.fromTo(
      images,
      { scale: 0.6, opacity: 0, y: 40, rotateZ: -10 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotateZ: 0,
        duration: 0.9,
        ease: 'back.out(1.8)',
        stagger: { each: 0.08, from: 'random' },
      }
    )

    images.forEach((image, index) => {
      // Gentle float
      gsap.to(image, {
        y: `random(-8, 8)`,
        x: `random(-6, 6)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      })

      // Shimmering felt “glow flicker”
      gsap.to(image, {
        rotateZ: `random(-1.5, 1.5)`,
        skewX: `random(-1, 1)`,
        duration: `random(0.2, 0.4)`,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.1,
      })

      // Soft light shimmer (like cloth catching light)
      gsap.to(image, {
        filter: 'brightness(1.15)',
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      })
    })

    return () => images.forEach((img) => gsap.killTweensOf(img))
  }, [loadedImages])

  // --- Scroll Transformation ---
  useEffect(() => {
    const images = imagesRef.current.filter(Boolean) as HTMLElement[]

    images.forEach((image, index) => {
      const scrollOffset = scrollProgress * 100 * (index % 2 === 0 ? 1 : -1)
      gsap.to(image, {
        y: `+=${scrollOffset * 0.2}`,
        rotateZ: `+=${scrollOffset * 0.05}`,
        duration: 0.4,
        ease: 'power2.out',
      })
    })
  }, [scrollProgress])

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id))
  }

  return (
    <div
      ref={containerRef}
      className='pointer-events-none absolute inset-0 overflow-hidden'
    >
      {STORY_IMAGES.map((image, index) => {
        const position = IMAGE_POSITIONS[index]
        const intensity = shadowIntensity[index] || 0.3

        const style: React.CSSProperties = {
          position: 'absolute',
          width: `${position.size}px`,
          height: `${position.size}px`,
          ...(position.left ? { left: position.left } : {}),
          ...(position.right ? { right: position.right } : {}),
          ...(position.top ? { top: position.top } : {}),
          ...(position.bottom ? { bottom: position.bottom } : {}),
          filter: `drop-shadow(0 ${10 + intensity * 25}px ${
            20 + intensity * 40
          }px rgba(0,0,0,${intensity}))`,
          transformOrigin: 'center center',
        }

        return (
          <div
            key={image.id}
            ref={(el) => {
              if (el) imagesRef.current[index] = el
            }}
            style={style}
            className='opacity-85 transition-all duration-300'
          >
            <div className='relative h-full w-full'>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={`${position.size}px`}
                className='rounded-xl object-cover will-change-transform'
                onLoad={() => handleImageLoad(image.id)}
                unoptimized={process.env.NODE_ENV === 'development'}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
