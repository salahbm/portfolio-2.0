'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'

interface LockScreenProps {
  onLoadComplete?: () => void
}

export const LockScreen: React.FC<LockScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true) // start in loading state
  const [showStart, setShowStart] = useState(false) // reveal Start after loading
  const [showScreen, setShowScreen] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const blobsRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Tick time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Animate dynamic background (subtle macOS-like motion)
  useEffect(() => {
    if (!bgRef.current || !blobsRef.current) return

    // Animate big gradient positions
    gsap.to(bgRef.current, {
      backgroundPosition: '60% 30%, 40% 80%',
      duration: 10,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Slow rotate a soft conic glow layer
    gsap.to(blobsRef.current, {
      rotate: 360,
      transformOrigin: '50% 50%',
      duration: 60,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  // Loading simulation -> reveals Start button (progress-only)
  useEffect(() => {
    if (!isLoading) return
    const startTime = Date.now()
    const raf = { id: 0 }

    const step = () => {
      const elapsed = Date.now() - startTime
      const next = Math.min((elapsed / 2000) * 100, 100)
      setProgress(next)
      if (next < 100) {
        raf.id = requestAnimationFrame(step)
      } else {
        setIsLoading(false)
        setShowStart(true)
      }
    }

    raf.id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.id)
  }, [isLoading])

  const dismiss = useCallback(() => {
    if (!containerRef.current) return
    const tl = gsap.timeline({
      onComplete: () => {
        setShowScreen(false)
        onLoadComplete?.()
      },
    })
    tl.to(containerRef.current, {
      opacity: 0,
      filter: 'blur(20px)',
      scale: 1.04,
      duration: 0.9,
      ease: 'power2.inOut',
    })
  }, [onLoadComplete])

  // Intro animation (bottom cluster rises in)
  // Intro animation (zoom-in entrance)
  useEffect(() => {
    if (!bottomRef.current) return
    gsap.fromTo(
      bottomRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
      }
    )
  }, [])

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date)

  const formatDate = (date: Date) => {
    const weekday = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date)
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      date
    )
    const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
      date
    )
    return `${weekday}, ${month} ${day}`
  }

  if (!showScreen) return null

  return (
    <div
      ref={containerRef}
      className='relative z-[999] h-screen overflow-hidden font-sf-medium'
    >
      {/* Dynamic wallpaper gradient (animated positions) */}
      <div
        ref={bgRef}
        className='absolute inset-0'
        style={{
          backgroundImage: `
            radial-gradient(1200px 800px at 30% 20%,
              hsl(var(--bg-indigo)) 0%,
              hsl(var(--bg-blue)) 55%,
              hsl(var(--bg-navy)) 100%),
            radial-gradient(1200px 900px at 70% 80%,
              hsl(var(--bg-cyan)) 0%,
              hsl(var(--bg-teal)) 50%,
              hsl(var(--bg-navy)) 100%)
          `,
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: '140% 140%, 140% 140%',
        }}
      />

      {/* Slow rotating glow layer for subtle depth */}
      <div
        ref={blobsRef}
        className='pointer-events-none absolute inset-0 opacity-35'
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.06), transparent 40%, rgba(255,255,255,0.08), transparent 85%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Top: Time & Date (macOS style; time bolder) */}
      <div className='absolute left-1/2 top-10 -translate-x-1/2 select-none text-center text-white'>
        <div className='text-[56px] font-semibold leading-none tracking-tight md:text-[150px]'>
          {formatTime(currentTime)}
        </div>
        <div className='mt-2 text-base font-light tracking-wide text-white/85 md:text-xl'>
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Bottom cluster: avatar + progress or start */}
      <div
        ref={bottomRef}
        className='absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-5 text-white lg:bottom-14'
      >
        {/* Avatar */}
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // fallback gradient
          }}
          className='relative h-24 w-24 overflow-hidden rounded-full shadow-[0_0_30px_rgba(255,255,255,0.12)] ring-4 ring-white/15 md:h-28 md:w-28'
        >
          <Image
            src='/medias/images/avatar.webp'
            alt='Salah'
            fill
            sizes='(min-width: 1024px) 280px, (min-width: 768px) 240px, 200px'
            className='translate-y-[8%] object-cover object-top' // slight downward offset
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>

        {/* Username */}
        <div className='select-none text-xl font-light tracking-wide md:text-2xl'>
          Salah
        </div>

        {/* Progress only (no spinner) then Start */}
        {isLoading && !showStart && (
          <div className='flex flex-col items-center gap-3'>
            {/* Linear progress bar */}
            <div className='h-1 w-64 overflow-hidden rounded-full bg-white/20 md:w-80'>
              <div
                className='h-full rounded-full bg-white'
                style={{
                  width: `${progress}%`,
                  transform: 'scaleX(1)', // forces layout recalculation
                  willChange: 'width',
                  boxShadow: '0 0 8px rgba(255,255,255,0.55)',
                }}
              />
            </div>
            <div className='select-none text-xs font-light tracking-wide text-white/75'>
              Loading…
            </div>
          </div>
        )}

        <AnimatePresence initial={false} mode='wait'>
          {!isLoading && showStart && (
            <motion.button
              key='start-btn'
              onClick={dismiss}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.25, ease: 'easeIn' },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='group relative overflow-hidden rounded-full bg-white/10 px-10 py-2.5 ring-offset-background backdrop-blur-md transition-[background-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-violet))] focus-visible:ring-offset-2'
              aria-label='Start'
            >
              <span className='relative z-10 text-base font-medium tracking-wide text-white md:text-lg'>
                Start
              </span>

              {/* shimmer */}
              <div className='absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-white/0 via-white/15 to-white/0 transition-transform duration-700 group-hover:translate-x-[120%]' />

              {/* subtle brand border glow */}
              <span
                aria-hidden
                className='pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 [box-shadow:0_0_0_1px_hsl(var(--brand-violet)/0.15),0_6px_24px_hsl(var(--brand-violet)/0.2)]'
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
