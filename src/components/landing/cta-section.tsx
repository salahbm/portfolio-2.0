'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance animation
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        scale: 0.8,
        opacity: 0,
        y: 100,
      })

      // Magnetic button effect
      const button = buttonRef.current
      if (button) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2

          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        const handleMouseLeave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          })
        }

        button.addEventListener('mousemove', handleMouseMove)
        button.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          button.removeEventListener('mousemove', handleMouseMove)
          button.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden px-6 py-32'
      id='contact'
    >
      {/* Animated gradient background */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-purple-950/30 dark:via-blue-950/30 dark:to-pink-950/30' />

      <div
        ref={contentRef}
        className='mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white/50 p-12 text-center backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50 md:p-20'
      >
        <h2 className='mb-6 text-5xl font-black md:text-7xl'>
          <span className='text-black dark:text-white'>Let&apos;s Build</span>
          <br />
          <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400'>
            Something Cool
          </span>
        </h2>

        <p className='mb-12 text-xl text-gray-700 dark:text-gray-300'>
          I&apos;m always excited to collaborate on creative ideas or solve
          complex engineering problems. Let&apos;s turn your vision into
          reality.
        </p>

        <a
          ref={buttonRef}
          href='mailto:hello@example.com'
          className='group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-12 py-6 text-xl font-bold text-white shadow-2xl transition-shadow hover:shadow-purple-500/50 dark:from-purple-500 dark:to-blue-500'
        >
          <span>Start a Conversation</span>
          <svg
            className='h-6 w-6 transition-transform group-hover:translate-x-1'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
          </svg>
        </a>

        <div className='mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400'>
          <a
            href='https://github.com'
            className='transition-colors hover:text-black dark:hover:text-white'
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href='https://linkedin.com'
            className='transition-colors hover:text-black dark:hover:text-white'
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href='https://twitter.com'
            className='transition-colors hover:text-black dark:hover:text-white'
          >
            Twitter
          </a>
        </div>
      </div>
    </section>
  )
}
