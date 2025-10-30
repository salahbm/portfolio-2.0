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
      className='font-monument-extended relative text-center sm:text-left'
    >
      {/* Greeting */}

      {/* <h1
        className='text-[clamp(1.5rem,4vw,2.5rem)] leading-tight tracking-wide'
        onMouseEnter={() => hoverTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        <span data-animation-delay='0' className='relative inline-block'>
          Hey <span className='wave-animation'>👋</span>
          <span className='absolute -bottom-2 left-0 w-full'>
            <WaveUnderline />
          </span>
        </span>
      </h1> */}

      <h1
        data-animation-delay='0.4'
        className='text-gradient-lilac mt-2 whitespace-nowrap text-2xl leading-none lg:text-4xl'
      >
        Muhammad
      </h1>

      {/* Title */}
      <h1 className='mt-2 text-xl tracking-wide'>
        <span data-animation-delay='0.6'>a full-stack software engineer</span>
      </h1>
    </div>
  )
}
