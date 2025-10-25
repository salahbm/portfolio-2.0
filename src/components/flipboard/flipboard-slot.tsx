'use client'

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import gsap from 'gsap'

const DEFAULT_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz1234567890'

interface FlipSlotProps {
  characters?: string
  color?: string
  pad?: number
}

export interface FlipSlotRef {
  flip: (character: string, delay?: number) => void
  setChars: (value: string) => void
  setColor: (value: string) => void
}

export const FlipSlot = forwardRef<FlipSlotRef, FlipSlotProps>(
  ({ characters = DEFAULT_CHARACTERS, color = 'canvasText', pad = 0 }, ref) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const charsRef = useRef<string[]>(Array.from(` ${characters} `))
    const padRef = useRef(pad)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const scrubberRef = useRef<gsap.core.Tween | null>(null)

    const generateTimeline = () => {
      if (!elementRef.current) return

      const currentTimeline = timelineRef.current
      const scrubber = scrubberRef.current

      if (currentTimeline) currentTimeline.kill()
      if (scrubber) scrubber.kill()

      const [foldTop, foldBottom, unfoldTop, unfoldBottom] = Array.from(
        elementRef.current.querySelectorAll('div')
      ) as HTMLDivElement[]

      const chars = charsRef.current

      gsap.set([foldTop, unfoldBottom], { clearProps: 'all' })

      unfoldTop.innerText = unfoldBottom.innerText = chars[1] || ' '
      foldTop.innerText = foldBottom.innerText = chars[0] || ' '

      const timeline = gsap
        .timeline({
          paused: true,
          repeat: chars.length - 2,
          onRepeat: () => {
            const index = Math.floor(timeline.totalTime() / timeline.duration())
            const next = chars[index % chars.length] || ' '
            const current = chars[(index + 1) % chars.length] || ' '
            unfoldTop.innerText = unfoldBottom.innerText = current
            foldTop.innerText = foldBottom.innerText = next
          },
        })
        .fromTo(
          unfoldBottom,
          { rotateX: 180 },
          {
            rotateX: 0,
            duration: 1,
          },
          0
        )
        .fromTo(
          unfoldTop,
          { filter: 'brightness(0)' },
          {
            filter: 'brightness(1)',
            duration: 1,
          },
          0
        )
        .fromTo(
          foldTop,
          { rotateX: 0 },
          {
            duration: 1,
            rotateX: -180,
          },
          0
        )
        .fromTo(
          foldBottom,
          { filter: 'brightness(1)' },
          {
            duration: 1,
            filter: 'brightness(0)',
          },
          0
        )

      const duration = timeline.totalDuration()
      const newScrubber = gsap.to(timeline, {
        totalTime: duration,
        repeat: -1,
        paused: true,
        duration: duration,
        ease: 'none',
      })
      newScrubber.time(timeline.totalDuration())

      timelineRef.current = timeline
      scrubberRef.current = newScrubber
    }

    useEffect(() => {
      gsap.defaults({
        duration: 1,
        ease: 'none',
      })

      generateTimeline()

      return () => {
        timelineRef.current?.kill()
        scrubberRef.current?.kill()
      }
    }, [])

    useImperativeHandle(ref, () => ({
      flip: (character: string, delay = 0) => {
        const chars = charsRef.current
        const timeline = timelineRef.current
        const scrubber = scrubberRef.current

        if (!timeline || !scrubber) return

        const currentIndex = chars.indexOf(
          chars[Math.floor(timeline.totalTime())] || ' '
        )
        const desiredIndex =
          chars.indexOf(character) !== -1 ? chars.indexOf(character) : 0

        const shift =
          currentIndex > desiredIndex
            ? chars.length - 1 - currentIndex + desiredIndex
            : desiredIndex - currentIndex

        const padding =
          currentIndex === desiredIndex
            ? 0
            : padRef.current * (chars.length - 1)

        gsap.to(scrubber, {
          delay,
          totalTime: `+=${shift + padding}`,
          ease: 'power1.out',
          duration: (shift + padding) * gsap.utils.random(0.02, 0.06),
        })
      },
      setChars: (value: string) => {
        charsRef.current = Array.from(` ${value} `)
        generateTimeline()
      },
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
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
)

FlipSlot.displayName = 'FlipSlot'
