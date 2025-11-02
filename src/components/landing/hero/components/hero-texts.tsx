'use client'

import { animateHeroText } from '@/animations/hero-texts.animations'
import { WaveUnderline } from '@/components/landing/hero/components/wave-underline'
import { useAvatarStore } from '@/store/avatar-store'
import { useEffect, useRef } from 'react'

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
      className='relative text-center font-syne sm:text-left'
      onMouseEnter={() => hoverTrig?.fire()}
      onMouseLeave={() => idleTrig?.fire()}
    >
      <h1
        data-animation-delay='0.4'
        className='mt-2 whitespace-nowrap text-2xl leading-none text-secondary lg:text-4xl'
      >
        Muhammad
      </h1>
      <WaveUnderline />
    </div>
  )
}
