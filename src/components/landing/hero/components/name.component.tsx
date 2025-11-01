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
    <section className='sticky bottom-24 left-0 right-0 flex flex-col items-center space-y-0 leading-tight lg:bottom-0'>
      <p
        id='name-full-stack'
        className='transform-3d font-syne self-end whitespace-nowrap text-end text-6xl leading-none text-primary'
        onMouseEnter={() => sadTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        a full-stack
      </p>
      <p
        id='name-software-engineer'
        className='transform-3d font-syne self-end whitespace-nowrap text-end text-6xl leading-none text-primary'
        onMouseEnter={() => thinkingTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        software engineer
      </p>
      <p
        id='name-muhammad'
        className='transform-3d text-gradient-lilac font-monument-extended whitespace-nowrap text-center leading-none'
        onMouseEnter={() => happyTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        Muhammad
      </p>
    </section>
  )
}

export default NameComponent
