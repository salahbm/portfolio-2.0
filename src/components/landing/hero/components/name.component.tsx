'use client'

import React, { useEffect } from 'react'
import { animateName } from '@/animations/hero-name.animation'
import { useAvatarStore } from '@/store/avatar-store'

const NameComponent: React.FC = () => {
  const { happyTrig, idleTrig, sadTrig, thinkingTrig } = useAvatarStore()

  useEffect(() => {
    const cleanup = animateName()
    return cleanup
  }, [])

  return (
    <section className='sticky bottom-[10%] left-6 right-6 z-10 flex flex-col items-center -space-y-7 leading-tight 2xl:-space-y-10'>
      <p
        id='name-full-stack'
        className='transform-3d font-syne self-start whitespace-nowrap pl-6 text-end text-[clamp(1rem,6vw,4rem)] leading-tight text-background 2xl:text-[clamp(1rem,6vw,12rem)]'
        onMouseEnter={() => sadTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        a full-stack
      </p>
      <p
        id='name-software-engineer'
        className='transform-3d font-syne self-start whitespace-nowrap pl-6 text-end text-[clamp(1rem,6vw,4rem)] leading-tight text-background 2xl:text-[clamp(1rem,6vw,12rem)]'
        onMouseEnter={() => thinkingTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        software engineer
      </p>
      <p
        id='name-muhammad'
        className='transform-3d font-monument-extended text-gradient-dark hidden whitespace-nowrap leading-tight lg:inline-block'
        onMouseEnter={() => happyTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        Muhammad
      </p>
    </section>
  )
}

export default NameComponent
