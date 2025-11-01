'use client'

import { animateHeroText } from '@/animations/hero-texts.animations'
import { WaveUnderline } from '@/components/landing/hero/components/wave-underline'
import { useAvatarStore } from '@/store/avatar-store'
import { useEffect, useRef } from 'react'
import AkaComponent from './aka.component'

export function HeroText() {
  const { hoverTrig, idleTrig } = useAvatarStore()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const cleanup = animateHeroText(ref.current)
    return cleanup
  }, [])

  return (
    <div
      ref={ref}
      className='font-syne relative text-center sm:text-left'
      onMouseEnter={() => hoverTrig?.fire()}
      onMouseLeave={() => idleTrig?.fire()}
    >
      <h1
        data-animation-delay='0.4'
        className='mt-2 whitespace-nowrap text-2xl leading-none text-secondary lg:text-4xl'
      >
        Salah
      </h1>
      <WaveUnderline />
      <AkaComponent />
    </div>
  )
}
