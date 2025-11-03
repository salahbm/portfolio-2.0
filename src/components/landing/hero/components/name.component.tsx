'use client'

import React, { useEffect } from 'react'
import { animateName } from '@/animations/hero-name.animation'

import AkaComponent from './aka.component'

const NameComponent: React.FC = () => {
  useEffect(() => {
    const cleanup = animateName()
    return cleanup
  }, [])

  return (
    <section className='2xl:last:-space-y-30 2xl:-space-y-15 z-10 mt-auto flex flex-col items-center -space-y-7 leading-tight'>
      <p
        id='name-full-stack'
        className='transform-3d whitespace-nowrap text-center font-syne text-[clamp(1rem,6vw,4rem)] leading-tight text-background 2xl:text-[clamp(1rem,6vw,12rem)]'
      >
        a full-stack
      </p>
      <p
        id='name-software-engineer'
        className='transform-3d whitespace-nowrap text-center font-syne text-[clamp(1rem,6vw,4rem)] leading-tight text-background 2xl:text-[clamp(1rem,6vw,12rem)]'
      >
        software engineer
      </p>
      <p
        id='name-muhammad'
        className='transform-3d text-gradient-dark relative whitespace-nowrap font-monument-extended leading-tight lg:inline-block'
      >
        Salah
      </p>
      <AkaComponent />
    </section>
  )
}

export default NameComponent
