'use client'

import React, { useEffect } from 'react'
import { animateName } from '@/animations/hero-name.animation'
import AkaComponent from './aka.component'
import { useAvatarStore } from '@/store/avatar-store'

const NameComponent: React.FC = () => {
  const { happyTrig, idleTrig } = useAvatarStore()

  useEffect(() => {
    const cleanup = animateName()
    return cleanup
  }, [])

  return (
    <section className='flex-center sticky bottom-0 left-0 right-0 px-20 align-bottom'>
      <p
        id='name-salah'
        className='font-monument-extended whitespace-nowrap text-center leading-none text-[#c6ff79]'
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
