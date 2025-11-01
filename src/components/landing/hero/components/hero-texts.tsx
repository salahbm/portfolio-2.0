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
    <div ref={ref} className='font-syne relative text-center sm:text-left'>
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
        className='mt-2 whitespace-nowrap text-2xl leading-none text-primary lg:text-4xl'
      >
        Salah
      </h1>

      {/* <AkaComponent /> */}
    </div>
  )
}
