'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 200,
        opacity: 0.3,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className='relative flex min-h-screen items-center justify-center overflow-hidden px-6'
    >
      {/* Animated background gradient */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-pink-950/20' />

      <div className='max-w-5xl text-center'>
        <h1
          ref={titleRef}
          className='mb-6 text-7xl font-black leading-tight tracking-tight md:text-9xl'
        >
          <span className='text-black dark:text-white'>Hey, I&apos;m</span>
          <br />
          <span className='bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-pink-400'>
            Muhammad
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className='mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-700 dark:text-gray-300 md:text-2xl'
        >
          A full-stack engineer who enjoys crafting clean, performant web
          experiences using TypeScript, Next.js, and Tailwind. I turn ideas into
          meaningful digital experiences.
        </p>

        <div ref={ctaRef} className='flex flex-wrap justify-center gap-4'>
          <a
            href='#billboard'
            className='group relative overflow-hidden rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 dark:bg-white dark:text-black'
          >
            <span className='relative z-10'>Explore My Work</span>
            <div className='absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100' />
          </a>
          <a
            href='#contact'
            className='rounded-full border-2 border-black px-8 py-4 text-lg font-semibold text-black transition-all hover:scale-105 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce'>
        <div className='flex flex-col items-center gap-2'>
          <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
            Scroll
          </span>
          <svg
            className='h-6 w-6 text-gray-600 dark:text-gray-400'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
