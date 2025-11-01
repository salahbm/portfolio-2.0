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
    <section className='sticky left-0 right-0 top-0 z-10 flex -translate-y-[5%] flex-col items-center -space-y-7 leading-tight 2xl:translate-y-[17%] 2xl:-space-y-10'>
      <p
        id='name-full-stack'
        className='transform-3d font-syne self-start whitespace-nowrap pl-6 text-start text-[clamp(1rem,6vw,4rem)] leading-tight text-primary 2xl:text-[clamp(1rem,6vw,12rem)]'
        onMouseEnter={() => sadTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        a full-stack
      </p>
      <p
        id='name-software-engineer'
        className='transform-3d font-syne self-start whitespace-nowrap pl-6 text-start text-[clamp(1rem,6vw,4rem)] leading-tight text-primary 2xl:text-[clamp(1rem,6vw,12rem)]'
        onMouseEnter={() => thinkingTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        software engineer
      </p>
      <p
        id='name-muhammad'
        className='transform-3d text-gradient-lilac font-monument-extended whitespace-nowrap leading-tight'
        onMouseEnter={() => happyTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        Muham
        <br />
        <span className='inline-block w-full -translate-y-[0.47em] text-right'>
          mad
        </span>
      </p>
    </section>
  )
}

export default NameComponent
