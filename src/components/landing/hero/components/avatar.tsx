'use client'

import React, { useEffect, useRef } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { useAvatarStore } from '@/store/avatar-store'
import gsap from 'gsap'

const STATE_MACHINE = 'State Machine 1'

const AvatarView: React.FC = () => {
  const avatarRef = useRef<HTMLDivElement>(null)
  const { setRive, setIsLoaded, setTriggers, isLoaded, hoverTrig, idleTrig } =
    useAvatarStore()

  const { rive, RiveComponent } = useRive({
    src: '/rive/avatar.riv',
    stateMachines: STATE_MACHINE,
    autoplay: true,
    onLoadError: (error) => console.error('❌ Rive load error:', error),
  })

  const hoverInput = useStateMachineInput(rive, STATE_MACHINE, 'hover', false)
  const sadInput = useStateMachineInput(rive, STATE_MACHINE, 'sad', false)
  const thinkingInput = useStateMachineInput(
    rive,
    STATE_MACHINE,
    'thinking',
    false
  )
  const happyInput = useStateMachineInput(rive, STATE_MACHINE, 'happy', false)
  const idleInput = useStateMachineInput(rive, STATE_MACHINE, 'idle', false)

  useEffect(() => {
    if (
      rive &&
      hoverInput &&
      idleInput &&
      sadInput &&
      thinkingInput &&
      happyInput
    ) {
      setRive(rive)
      setTriggers({
        hoverTrig: hoverInput,
        sadTrig: sadInput,
        thinkingTrig: thinkingInput,
        happyTrig: happyInput,
        idleTrig: idleInput,
      })
      setIsLoaded(true)
      console.log('✅ Rive fully ready')
    }
  }, [
    rive,
    hoverInput,
    sadInput,
    thinkingInput,
    happyInput,
    idleInput,
    setRive,
    setTriggers,
    setIsLoaded,
  ])

  useEffect(() => {
    if (isLoaded && avatarRef.current) {
      gsap.fromTo(
        avatarRef.current,
        { scale: 0.5, delay: 0.5, rotate: -20, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      )
    }
  }, [isLoaded])

  return (
    <div
      ref={avatarRef}
      className='flex-center group relative w-[150px] lg:w-[200px]'
      onMouseEnter={() => hoverTrig?.fire()}
      onMouseLeave={() => idleTrig?.fire()}
    >
      <RiveComponent
        style={{
          width: '200px',
          maxWidth: '200px',
          height: 'auto',
          aspectRatio: '1/1',
        }}
      />

      {!isLoaded && (
        <div className='absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm'>
          <div className='relative h-16 w-16'>
            <span className='absolute inset-0 rounded-full border-4 border-violet-950/30' />
            <span className='border-gradient absolute inset-0 animate-spin rounded-full border-4 border-l-fuchsia-400 border-t-transparent border-t-violet-400' />
          </div>
        </div>
      )}
    </div>
  )
}

export default AvatarView
