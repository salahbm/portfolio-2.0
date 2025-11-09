'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation } from 'motion/react'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function ContactHero() {
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const arrowsRef = useRef<HTMLDivElement>(null)

  // === GSAP ScrollTrigger Animations ===
  useGSAP(
    () => {
      if (!containerRef.current || !textRef.current || !arrowsRef.current)
        return

      const ctx = gsap.context(() => {
        // Text animation
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            },
          }
        )

        // Arrows animation
        gsap.fromTo(
          arrowsRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            },
          }
        )
      }, containerRef)

      return () => ctx.revert()
    },
    { scope: containerRef }
  )

  // === Blob Entrance (scale + breathing) ===
  useEffect(() => {
    controls
      .start({
        scale: [0.7, 1],
        opacity: [0, 1],
        transition: { duration: 1, ease: 'easeOut' },
      })
      .then(() => {
        controls.start({
          scale: [1, 1.03, 1.05, 1.02, 1],
          transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
        })
      })
  }, [controls])

  // === Mailto ===
  function openEmail() {
    window.open('mailto:salahbm.001@gmail.com')
  }

  // === Blob Path (single stable shape, no hover morph) ===
  const blobPath =
    'M50,-60C70,-40,90,-20,90,0C90,20,70,40,50,60C30,80,10,100,-10,100C-30,100,-50,80,-70,60C-90,40,-100,20,-100,0C-100,-20,-90,-40,-70,-60C-50,-80,-30,-100,-10,-100C10,-100,30,-80,50,-60Z'

  // === Unique Arrows ===
  const ArrowA = ({ delay = 0 }: { delay?: number }) => (
    <motion.svg
      width='72'
      height='28'
      viewBox='0 0 72 28'
      fill='none'
      className='shrink-0'
      animate={{ x: [0, 18, 0] }}
      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <path
        d='M4 14h50'
        stroke='#1f2937'
        strokeWidth='2.5'
        strokeLinecap='round'
      />
      <path
        d='M50 6l14 8-14 8'
        stroke='#1f2937'
        strokeWidth='2.5'
        strokeLinejoin='round'
        strokeLinecap='round'
        fill='none'
      />
    </motion.svg>
  )

  const ArrowB = ({ delay = 0 }: { delay?: number }) => (
    <motion.svg
      width='76'
      height='30'
      viewBox='0 0 76 30'
      fill='none'
      className='shrink-0'
      animate={{ x: [0, 14, 0] }}
      transition={{
        duration: 1.05,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <path
        d='M6 15h52'
        stroke='#ef4444'
        strokeWidth='3.2'
        strokeLinecap='round'
      />
      <path
        d='M50 6l18 9-18 9'
        fill='#ef4444'
        stroke='#ef4444'
        strokeWidth='2.2'
        strokeLinejoin='round'
        strokeLinecap='round'
      />
    </motion.svg>
  )

  const ArrowC = ({ delay = 0 }: { delay?: number }) => (
    <motion.svg
      width='68'
      height='26'
      viewBox='0 0 68 26'
      fill='none'
      className='shrink-0'
      animate={{ x: [0, 22, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <path
        d='M2 13h46'
        stroke='#7c3aed'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeDasharray='6 6'
      />
      <path
        d='M46 5l14 8-14 8'
        fill='#7c3aed'
        stroke='#7c3aed'
        strokeWidth='2'
        strokeLinejoin='round'
        strokeLinecap='round'
      />
    </motion.svg>
  )

  return (
    <div
      ref={containerRef}
      className='relative mx-auto flex min-h-screen flex-col items-center justify-center gap-16 bg-gradient-to-br from-slate-50 to-slate-200 px-6 py-16 dark:from-slate-950 dark:to-slate-900 lg:flex-row lg:items-center lg:gap-12 lg:px-12'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-15 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>
      {/* Left: Text */}
      <div ref={textRef} className='max-w-4xl text-center lg:text-left'>
        <p className='mb-3 text-sm text-primary'>
          Are you looking for a talented developer to enhance your digital
          presence?
        </p>
        <h1 className='text-gradient-harmony mb-6 font-monument-extended text-[44px] leading-[1.05] md:text-7xl'>
          let&apos;s bring your ideas to life
        </h1>
        <p className='text-secondary-foreground'>
          Contact me or{' '}
          <a
            onClick={() => window.open('https://t.me/imsalah19')}
            className='font-syne text-yellow-500 underline'
          >
            chat with me
          </a>{' '}
          right now.
        </p>
      </div>

      {/* Middle: Unique Arrows */}
      <div
        ref={arrowsRef}
        className='flex rotate-90 items-center gap-2 sm:gap-3 lg:rotate-0'
        aria-hidden
      >
        <ArrowA delay={0} />
        <ArrowB delay={0.12} />
        <ArrowC delay={0.24} />
      </div>

      {/* Right: Blob + Mail */}
      <motion.div
        animate={controls}
        className='relative flex size-[200px] cursor-pointer items-center justify-center lg:size-[240px]'
        onClick={openEmail}
        role='button'
        aria-label='Email: salahbm.001@gmail.com'
        title='Email me'
      >
        <svg
          width='240'
          height='240'
          viewBox='0 0 220 220'
          className='overflow-visible'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <filter
              id='blob-shadow-glow'
              x='-50%'
              y='-50%'
              width='200%'
              height='200%'
            >
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
                result='shadow-blur'
              />
              <feOffset in='shadow-blur' dx='0' dy='6' result='shadow-offset' />
              <feFlood
                floodColor='#000000'
                floodOpacity='0.25'
                result='shadow-color'
              />
              <feComposite
                in='shadow-color'
                in2='shadow-offset'
                operator='in'
                result='shadow'
              />
              <feMerge>
                <feMergeNode in='shadow' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>

          <g transform='translate(110,110)'>
            <motion.path
              d={blobPath}
              fill='#ef4444'
              filter='url(#blob-shadow-glow)'
              style={{ transformOrigin: 'center' }}
            />
          </g>
        </svg>

        {/* Mail Icon (Radix) */}
        <motion.button
          type='button'
          onClick={openEmail}
          className='absolute inset-0 grid place-items-center rounded-full outline-none'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          aria-label='Open mail to salahbm.001@gmail.com'
          style={{
            filter:
              'drop-shadow(0 4px 10px rgba(0,0,0,0.25)) drop-shadow(0 0 12px rgba(255,255,255,0.3))',
          }}
        >
          <EnvelopeClosedIcon className='size-12 text-white drop-shadow-lg sm:size-14' />
        </motion.button>
      </motion.div>
    </div>
  )
}
