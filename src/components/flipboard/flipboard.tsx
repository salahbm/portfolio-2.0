'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { FlipLine, FlipLineRef } from './flipboard-line'
import './flipboard.component.css'

interface LineConfig {
  text: string
  pad: number
  color?: string
  alignment?: 'left' | 'right'
}

const LINES: LineConfig[] = [
  { text: 'Bukhara,', pad: 1, alignment: 'left', color: 'hsl(120,70%,90%)' },
  { text: 'Uzbekistan', pad: 2, alignment: 'right' },
  { text: '-', pad: 3, alignment: 'right', color: 'hsl(44,82%,49%)' },
  { text: 'Seoul,', pad: 4, alignment: 'right', color: 'hsl(200,80%,90%)' },
  { text: 'South Korea', pad: 5, alignment: 'right' },
]

export function FlipBoard() {
  const lineRefs = useRef<(FlipLineRef | null)[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    document.documentElement.style.setProperty('--perspective', '1')
  }, [])

  const handleMouseEnter = () => {
    // Only run animation if not currently animating
    if (isAnimating) return

    setIsAnimating(true)

    // Run the flip animation for all lines
    LINES.forEach((line, index) => {
      const formatted =
        line.alignment === 'right'
          ? line.text.toLowerCase().padStart(12, ' ')
          : line.text.toLowerCase().padEnd(12, ' ')
      lineRefs.current[index]?.run(formatted)
    })

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }

    // Animation duration: ~2 seconds (accounting for stagger and flip duration)
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Fragment>
      <div className='board' onMouseEnter={handleMouseEnter}>
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
    </Fragment>
  )
}
