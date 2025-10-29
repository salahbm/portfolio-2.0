'use client'

import React, { useEffect, useState } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

const STATE_MACHINE = 'State Machine 1'

const AvatarView: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const { rive, RiveComponent } = useRive({
    src: '/rive/avatar.riv',
    stateMachines: STATE_MACHINE,
    autoplay: true,
    onLoad: () => {
      setIsLoaded(true)
      console.log('Rive loaded successfully')
    },
    onLoadError: (error) => {
      console.error('Rive load error:', error)
    },
  })

  // Get Trigger inputs from the state machine
  const hoverTrig = useStateMachineInput(rive, STATE_MACHINE, 'hover', false)
  const sadTrig = useStateMachineInput(rive, STATE_MACHINE, 'sad', false)
  const thinkingTrig = useStateMachineInput(
    rive,
    STATE_MACHINE,
    'thinking',
    false
  )
  const happyTrig = useStateMachineInput(rive, STATE_MACHINE, 'happy', false)
  const idleTrig = useStateMachineInput(rive, STATE_MACHINE, 'idle', false)

  useEffect(() => {
    if (rive) {
      console.log('Rive instance:', rive)
      console.log('State machines:', rive.stateMachineNames)
    }
  }, [rive])

  return (
    <div className='flex flex-col items-center gap-4'>
      {/* Avatar container */}
      <div
        className='group relative overflow-hidden rounded-2xl border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/20'
        onMouseEnter={() => {
          console.log('Mouse enter, firing hover')
          hoverTrig?.fire()
        }}
        onMouseLeave={() => {
          console.log('Mouse leave, firing idle')
          idleTrig?.fire()
        }}
      >
        {!isLoaded && (
          <div className='flex h-60 w-60 items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent' />
          </div>
        )}
        <RiveComponent
          style={{
            width: 240,
            height: 240,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
      </div>

      {/* Action buttons */}
      <div className='flex flex-wrap items-center justify-center gap-2'>
        <button
          className='rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-sm font-medium transition-all hover:border-violet-500/50 hover:bg-violet-500/20'
          onClick={() => {
            console.log('Hover button clicked')
            hoverTrig?.fire()
          }}
        >
          👋 Hover
        </button>
        <button
          className='rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-sm font-medium transition-all hover:border-blue-500/50 hover:bg-blue-500/20'
          onClick={() => {
            console.log('Sad button clicked')
            sadTrig?.fire()
          }}
        >
          😢 Sad
        </button>
        <button
          className='rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-sm font-medium transition-all hover:border-purple-500/50 hover:bg-purple-500/20'
          onClick={() => {
            console.log('Thinking button clicked')
            thinkingTrig?.fire()
          }}
        >
          🤔 Thinking
        </button>
        <button
          className='rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-sm font-medium transition-all hover:border-pink-500/50 hover:bg-pink-500/20'
          onClick={() => {
            console.log('Happy button clicked')
            happyTrig?.fire()
          }}
        >
          😊 Happy
        </button>
        <button
          className='rounded-lg border border-gray-500/30 bg-gray-500/10 px-3 py-1.5 text-sm font-medium transition-all hover:border-gray-500/50 hover:bg-gray-500/20'
          onClick={() => {
            console.log('Idle button clicked')
            idleTrig?.fire()
          }}
        >
          😐 Idle
        </button>
      </div>
    </div>
  )
}

export default AvatarView
