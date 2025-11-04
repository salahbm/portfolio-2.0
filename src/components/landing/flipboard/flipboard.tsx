'use client'

import { useEffect, useRef, useState } from 'react'
import { FlipLine, FlipLineRef } from './flipboard-line'
import { useInView } from '@/hooks/use-in-view'
import useEvent from 'react-use-event-hook'

interface LineConfig {
  text: string
  pad: number
  color?: string
  alignment?: 'left' | 'right'
}

const LINES: LineConfig[] = [
  { text: 'Bukhara,', pad: 1, alignment: 'left' },
  { text: 'Uzbekistan', pad: 2, alignment: 'right' },
  {
    text: '------------',
    pad: 3,
    alignment: 'right',
    color: 'hsl(44,82%,49%)',
  },
  { text: 'Seoul,', pad: 4, alignment: 'right' },
  { text: 'South Korea', pad: 5, alignment: 'right' },
]

export function FlipBoard() {
  const lineRefs = useRef<(FlipLineRef | null)[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [boardRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.25 })

  const triggerAnimation = useEvent(() => {
    if (isAnimating || !isInView) return

    setIsAnimating(true)
    lineRefs.current.forEach((line) => line?.reset())

    setTimeout(() => {
      LINES.forEach((line, index) => {
        const formatted =
          line.alignment === 'right'
            ? line.text.toLowerCase().padStart(12, ' ')
            : line.text.toLowerCase().padEnd(12, ' ')
        lineRefs.current[index]?.run(formatted)
      })

      setTimeout(() => {
        setIsAnimating(false)
      }, 2500)
    }, 100)
  })

  // Automatically trigger when the board becomes visible
  useEffect(() => {
    if (isInView) triggerAnimation()
  }, [isInView, triggerAnimation])

  useEffect(() => {
    document.documentElement.style.setProperty('--perspective', '1')
  }, [])

  return (
    <div className='flex h-screen items-center justify-center'>
      <div
        ref={boardRef}
        className='w-fit cursor-pointer select-none items-center justify-center overflow-hidden px-2 py-3 uppercase'
        onClick={triggerAnimation}
      >
        {LINES.map((line, index) => (
          <FlipLine
            key={index}
            ref={(el) => {
              lineRefs.current[index] = el
            }}
            text={line.text}
            pad={line.pad}
            color={line.color}
            alignment={line.alignment}
            length={12}
          />
        ))}
      </div>
    </div>
  )
}
