'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import HoverText from './hover-text'

export default function IntroView() {
  const [activeWord, setActiveWord] = useState<string | null>(null)
  const containerRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (!activeWord) return
    const container = containerRefs.current[activeWord]
    if (!container) return
    const imgs = container.querySelectorAll('.hover-image')
    if (!imgs.length) return

    gsap.killTweensOf(imgs)
    gsap.fromTo(
      imgs,
      { opacity: 0, scale: 0.7, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'back.out(2)',
        stagger: 0.08,
        duration: 0.6,
      }
    )
  }, [activeWord])

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b0f19] via-[#141b2d] to-[#0b0f19] text-white'>
      {/* Ambient glassy glows */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 left-1/2 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(175,130,255,0.15)_0%,transparent_70%)] blur-3xl' />
        <div className='absolute bottom-0 right-0 h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(100,200,255,0.1)_0%,transparent_70%)] blur-3xl' />
      </div>

      {/* Text Container */}
      <div className='relative z-50 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 px-6 text-center text-[1.1rem] leading-relaxed text-white/90 shadow-[0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-xl md:text-[1.25rem]'>
        <p className='mb-3'>
          Hey, I’m{' '}
          <span className='bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text font-semibold text-transparent'>
            Muhammad
          </span>{' '}
          — though most folks know me as{' '}
          <span className='bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text font-semibold text-transparent'>
            Salah
          </span>
          .
        </p>
        <p className='mb-3'>
          Born in{' '}
          <HoverText
            wordKey='bukhara'
            label='Bukhara, Uzbekistan'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
            containerRefs={containerRefs}
          />
          , now vibing in{' '}
          <HoverText
            wordKey='seoul'
            label='Seoul, South Korea'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
            containerRefs={containerRefs}
          />{' '}
          since 2019.
        </p>
        <p>
          Graduated from{' '}
          <HoverText
            wordKey='dankook'
            label='Dankook University'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
            containerRefs={containerRefs}
          />{' '}
          with a CS degree — still geeking out on code every day.
        </p>
      </div>

      {/* Subtle glass grid */}
      <div className='pointer-events-none absolute inset-0 grid grid-cols-[repeat(auto-fit,50px)] opacity-[0.03]'>
        {[...Array(300)].map((_, i) => (
          <div key={i} className='border border-white/10'></div>
        ))}
      </div>
    </div>
  )
}
