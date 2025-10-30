'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function WaveUnderline() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    // Always animate the wave
    gsap.to(pathRef.current, {
      attr: {
        d: 'M0,5 Q10,0 20,5 T40,5 T60,5 T80,5 T100,5',
      },
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <svg
      height='10'
      viewBox='0 0 100 10'
      preserveAspectRatio='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        ref={pathRef}
        d='M0,5 Q10,0 20,5 T40,5 T60,5 T80,5 T100,5'
        fill='none'
        stroke='currentColor'
        strokeWidth='4'
        className='text-lime-400'
      />
    </svg>
  )
}
