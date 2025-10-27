'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description:
      'Optimized performance with modern frameworks and best practices for blazing-fast load times.',
  },
  {
    icon: '🎨',
    title: 'Beautiful Design',
    description:
      'Pixel-perfect interfaces that combine aesthetics with exceptional user experience.',
  },
  {
    icon: '📱',
    title: 'Responsive',
    description:
      'Seamless experiences across all devices, from mobile phones to desktop displays.',
  },
  {
    icon: '🔒',
    title: 'Secure',
    description:
      'Built with security best practices and modern authentication systems.',
  },
  {
    icon: '♿',
    title: 'Accessible',
    description:
      'WCAG compliant interfaces ensuring everyone can use your application.',
  },
  {
    icon: '🚀',
    title: 'Scalable',
    description:
      'Architecture designed to grow with your business needs and user base.',
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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
        y: 50,
        opacity: 0,
      })

      // Stagger cards animation
      cardsRef.current.forEach((card) => {
        if (!card) return

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
          y: 100,
          opacity: 0,
          rotateX: 45,
          scale: 0.8,
        })

        // Hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
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
      id='features'
    >
      <div className='mx-auto max-w-7xl'>
        <h2
          ref={titleRef}
          className='mb-20 text-center text-6xl font-black md:text-7xl'
        >
          <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400'>
            What I Bring
          </span>
          <br />
          <span className='text-black dark:text-white'>To The Table</span>
        </h2>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, _index) => (
            <div
              key={_index}
              ref={(el) => {
                cardsRef.current[_index] = el
              }}
              className='group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900'
              style={{ perspective: '1000px' }}
            >
              {/* Gradient overlay on hover */}
              <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100' />

              <div className='relative z-10'>
                <div className='mb-4 text-6xl'>{feature.icon}</div>
                <h3 className='mb-3 text-2xl font-bold text-black dark:text-white'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
