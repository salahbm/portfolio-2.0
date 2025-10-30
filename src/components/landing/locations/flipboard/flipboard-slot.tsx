'use client'

import { useRef, useImperativeHandle, forwardRef } from 'react'
import gsap from 'gsap'
import './flipboard.component.css'

const DEFAULT_CHARACTERS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,-'

interface FlipSlotProps {
  characters?: string
  color?: string
  pad?: number
}

export interface FlipSlotRef {
  flip: (character: string, delay?: number) => void
  reset: () => void
  setColor: (value: string) => void
}

export const FlipSlot = forwardRef<FlipSlotRef, FlipSlotProps>(
  ({ characters = DEFAULT_CHARACTERS, color = 'canvasText', pad = 0 }, ref) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const currentCharRef = useRef<string>(' ')
    const animatingRef = useRef(false)

    const flipToChar = (targetChar: string, delay = 0) => {
      if (!elementRef.current || animatingRef.current) return

      const chars = Array.from(` ${characters} `)
      const currentChar = currentCharRef.current

      // --- Fix: fallback if character doesn't exist ---
      const isKnownChar = chars.includes(targetChar)
      const safeTarget = isKnownChar ? targetChar : ' '

      // Always animate even if the same char (to show “tick” effect)
      animatingRef.current = true

      const [foldTop, foldBottom, unfoldTop, unfoldBottom] = Array.from(
        elementRef.current.querySelectorAll('div')
      ) as HTMLDivElement[]

      // Setup text
      foldTop.innerText = foldBottom.innerText = currentChar
      unfoldTop.innerText = unfoldBottom.innerText = safeTarget

      // Reset transforms
      gsap.set([foldTop, foldBottom, unfoldTop, unfoldBottom], {
        clearProps: 'all',
      })
      gsap.set(foldTop, { rotateX: 0 })
      gsap.set(foldBottom, { filter: 'brightness(1)' })
      gsap.set(unfoldTop, { filter: 'brightness(0)' })
      gsap.set(unfoldBottom, { rotateX: 180 })

      const numFlips = pad > 0 ? Math.floor(Math.random() * 3) + 2 : 1
      const flipDuration = 0.3

      const tl = gsap.timeline({
        delay,
        onComplete: () => {
          currentCharRef.current = safeTarget
          animatingRef.current = false
        },
      })

      for (let i = 0; i < numFlips; i++) {
        const isLast = i === numFlips - 1
        const nextChar = isLast
          ? safeTarget
          : chars[Math.floor(Math.random() * chars.length)]

        if (i > 0) {
          tl.call(() => {
            foldTop.innerText = foldBottom.innerText = currentCharRef.current
            unfoldTop.innerText = unfoldBottom.innerText = nextChar
            gsap.set(foldTop, { rotateX: 0 })
            gsap.set(foldBottom, { filter: 'brightness(1)' })
            gsap.set(unfoldTop, { filter: 'brightness(0)' })
            gsap.set(unfoldBottom, { rotateX: 180 })
          })
        }

        tl.to(
          foldTop,
          { rotateX: -180, duration: flipDuration, ease: 'power2.in' },
          `flip${i}`
        )
        tl.to(
          foldBottom,
          {
            filter: 'brightness(0)',
            duration: flipDuration,
            ease: 'power2.in',
          },
          `flip${i}`
        )
        tl.to(
          unfoldTop,
          {
            filter: 'brightness(1)',
            duration: flipDuration,
            ease: 'power2.out',
          },
          `flip${i}`
        )
        tl.to(
          unfoldBottom,
          { rotateX: 0, duration: flipDuration, ease: 'power2.out' },
          `flip${i}`
        )

        if (!isLast) currentCharRef.current = nextChar
      }
    }

    const reset = () => {
      if (!elementRef.current) return

      const [foldTop, foldBottom, unfoldTop, unfoldBottom] = Array.from(
        elementRef.current.querySelectorAll('div')
      ) as HTMLDivElement[]

      currentCharRef.current = ' '
      ;[foldTop, foldBottom, unfoldTop, unfoldBottom].forEach((el) => {
        el.innerText = ' '
      })

      gsap.set([foldTop, foldBottom, unfoldTop, unfoldBottom], {
        clearProps: 'all',
      })
      gsap.set(foldTop, { rotateX: 0 })
      gsap.set(foldBottom, { filter: 'brightness(1)' })
      gsap.set(unfoldTop, { filter: 'brightness(0)' })
      gsap.set(unfoldBottom, { rotateX: 180 })

      animatingRef.current = false
    }

    useImperativeHandle(ref, () => ({
      flip: flipToChar,
      reset,
      setColor: (value: string) => {
        elementRef.current?.style.setProperty('--color', value)
      },
    }))

    return (
      <div
        ref={elementRef}
        className='flip'
        style={{ '--color': color } as React.CSSProperties}
      >
        <div> </div>
        <div> </div>
        <div> </div>
        <div> </div>
      </div>
    )
  }
)

FlipSlot.displayName = 'FlipSlot'
