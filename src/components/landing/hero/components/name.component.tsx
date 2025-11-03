'use client'

import React, { useEffect } from 'react'
import { animateName } from '@/animations/hero-name.animation'
import { useAvatarStore } from '@/store/avatar-store'
import AkaComponent from './aka.component'

const NameComponent: React.FC = () => {
  const { happyTrig, idleTrig, sadTrig, thinkingTrig } = useAvatarStore()

  useEffect(() => {
    const cleanup = animateName()
    return cleanup
  }, [])

  return (
    <section className='2xl:last:-space-y-30 sticky -bottom-20 left-0 right-0 z-10 flex flex-col items-center -space-y-7 leading-tight 2xl:-space-y-20'>
      <p
        id='name-full-stack'
        className='transform-3d self-start whitespace-nowrap pl-6 text-end font-syne text-[clamp(1rem,6vw,4rem)] leading-tight text-background 2xl:text-[clamp(1rem,6vw,12rem)]'
        onMouseEnter={() => sadTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        a full-stack
      </p>
      <p
        id='name-software-engineer'
        className='transform-3d self-start whitespace-nowrap pl-6 text-end font-syne text-[clamp(1rem,6vw,4rem)] leading-tight text-background 2xl:text-[clamp(1rem,6vw,12rem)]'
        onMouseEnter={() => thinkingTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        software engineer
      </p>
      <p
        id='name-muhammad'
        className='transform-3d text-gradient-dark hidden whitespace-nowrap font-monument-extended leading-tight lg:inline-block'
        onMouseEnter={() => happyTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        Salah
      </p>
      <AkaComponent />
    </section>
  )
}

export default NameComponent
