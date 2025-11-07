import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const JourneyHeader = () => {
  useGSAP(() => {
    gsap.to('.journey-header-title', {
      duration: 1,
      scale: 1,
      scrollTrigger: {
        trigger: '.journey-header-container',
        start: 'top 55%',
        end: 'top 20%',
        scrub: true,
      },
    })
  })

  return (
    <div className='journey-header-container relative flex h-dvh min-h-screen w-dvw items-center justify-center overflow-hidden'>
      <div className='journey-header-title flex scale-[10] flex-col items-center justify-center'>
        <h2 className='font-syne text-4xl font-extrabold uppercase leading-5 tracking-tighter'>
          What I've been
        </h2>
        <h2 className='font-syne text-4xl font-extrabold uppercase tracking-tighter'>
          Working On
        </h2>
      </div>
    </div>
  )
}

export default JourneyHeader
