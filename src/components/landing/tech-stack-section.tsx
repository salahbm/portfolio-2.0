'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  { name: 'TypeScript', color: 'from-blue-600 to-blue-400' },
  { name: 'React', color: 'from-cyan-600 to-cyan-400' },
  { name: 'Next.js', color: 'from-gray-900 to-gray-700' },
  { name: 'Node.js', color: 'from-green-600 to-green-400' },
  { name: 'Tailwind CSS', color: 'from-teal-600 to-teal-400' },
  { name: 'PostgreSQL', color: 'from-blue-700 to-blue-500' },
  { name: 'GraphQL', color: 'from-pink-600 to-pink-400' },
  { name: 'Docker', color: 'from-blue-600 to-blue-400' },
]

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        scale: 0.8,
        opacity: 0,
      })

      // Create infinite rotation animation for tech items
      itemsRef.current.forEach((item, index) => {
        if (!item) return

        // Entrance animation
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
          },
          scale: 0,
          rotation: -180,
          opacity: 0,
        })

        // Floating animation
        gsap.to(item, {
          y: -20,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.1,
        })

        // Rotation on hover
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            rotation: 360,
            scale: 1.2,
            duration: 0.6,
            ease: 'back.out(1.7)',
          })
        })

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden px-6 py-32'
      id='tech'
    >
      {/* Animated background elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl' />
      </div>

      <div className='mx-auto max-w-7xl'>
        <h2
          ref={titleRef}
          className='mb-20 text-center text-6xl font-black md:text-7xl'
        >
          <span className='text-black dark:text-white'>Tech Stack</span>
          <br />
          <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400'>
            I Work With
          </span>
        </h2>

        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {techStack.map((tech, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el
              }}
              className='group relative flex aspect-square items-center justify-center rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900'
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tech.color} opacity-0 transition-opacity group-hover:opacity-20`}
              />

              <span className='relative z-10 text-center text-xl font-bold text-black dark:text-white'>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
