'use client'

import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react'
import { FlipSlot, FlipSlotRef } from './flipboard-slot'

const DEFAULT_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'

interface FlipLineProps {
  text?: string
  color?: string
  length?: number
  pad?: number
  alignment?: 'left' | 'right'
  characters?: string
}

export interface FlipLineRef {
  run: (text: string) => void
  setColor: (color: string) => void
  setPad: (pad: number) => void
}

export const FlipLine = forwardRef<FlipLineRef, FlipLineProps>(
  (
    {
      text = '',
      color = 'hsl(0,0%,90%)',
      length = 10,
      pad = 0,
      alignment = 'left',
      characters = DEFAULT_CHARACTERS,
    },
    ref
  ) => {
    const slotRefs = useRef<(FlipSlotRef | null)[]>([])

    useEffect(() => {
      if (text) {
        const formatted =
          alignment === 'right'
            ? text.toLowerCase().padStart(length, ' ')
            : text.toLowerCase().padEnd(length, ' ')
        run(formatted)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const run = (update: string) => {
      const letters = Array.from(update.padEnd(length, ' '))
      for (let i = 0; i < Math.min(letters.length, length); i++) {
        slotRefs.current[i]?.flip(letters[i], i / 10)
      }
    }

    useImperativeHandle(ref, () => ({
      run,
      setColor: (newColor: string) => {
        slotRefs.current.forEach((slot) => slot?.setColor(newColor))
      },
      setPad: (_newPad: number) => {
        // Pad is set on individual slots, so we'd need to recreate them
        // For now, this is a no-op as pad is set at creation time
      },
    }))

    return (
      <div className='flip-line'>
        {Array.from({ length }).map((_, i) => (
          <FlipSlot
            key={i}
            ref={(el) => {
              slotRefs.current[i] = el
            }}
            characters={characters}
            color={color}
            pad={pad}
          />
        ))}
      </div>
    )
  }
)

FlipLine.displayName = 'FlipLine'
