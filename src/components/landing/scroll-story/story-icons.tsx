'use client'

import { useEffect, useRef } from 'react'

import {
  CodeBracketIcon,
  SparklesIcon,
  CommandLineIcon,
  CpuChipIcon,
} from '@heroicons/react/24/solid'
import {
  RocketIcon,
  StarIcon,
  LightningBoltIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons'
import gsap from 'gsap'

export const animateIcons = (icons: HTMLElement[]): (() => void) => {
  // Initial entrance animation - faster and simpler
  gsap.fromTo(
    icons,
    { scale: 0, opacity: 0, y: -20 },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: {
        each: 0.08,
        from: 'random',
      },
    }
  )

  // Continuous floating animation - lighter and smoother
  icons.forEach((icon, index) => {
    // Floating movement - reduced range for subtlety
    gsap.to(icon, {
      y: `random(-8, 8)`,
      x: `random(-6, 6)`,
      duration: `random(2.5, 4)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.15,
    })

    // Rotation animation - smaller angles
    gsap.to(icon, {
      rotate: `random(-8, 8)`,
      duration: `random(3, 5)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.2,
    })

    // Scale pulse - more subtle
    gsap.to(icon, {
      scale: `random(0.97, 1.03)`,
      duration: `random(2, 3)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.1,
    })
  })

  return () => icons.forEach((icon) => gsap.killTweensOf(icon))
}

export function StoryIcons() {
  const iconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (iconsRef.current) {
      const icons = Array.from(iconsRef.current.querySelectorAll('svg'))
      animateIcons(icons as unknown as HTMLElement[])
    }
  }, [])

  return (
    <div
      ref={iconsRef}
      className='pointer-events-none absolute inset-0 overflow-hidden'
    >
      {/* Top left area */}
      <SparklesIcon className='absolute left-[5%] top-[10%] h-6 w-6 text-violet-400 opacity-60 sm:h-8 sm:w-8 md:left-[8%] md:top-[12%] lg:h-10 lg:w-10' />
      <CodeBracketIcon className='absolute left-[10%] top-1/4 h-7 w-7 text-fuchsia-400 opacity-70 sm:h-9 sm:w-9 md:left-[12%] lg:h-11 lg:w-11' />

      {/* Top right area */}
      <RocketIcon className='absolute right-[8%] top-[15%] h-7 w-7 text-violet-500 opacity-60 sm:h-9 sm:w-9 md:right-[10%] md:top-[18%] lg:h-11 lg:w-11' />
      <LightningBoltIcon className='absolute right-[15%] top-[8%] h-6 w-6 text-purple-400 opacity-50 sm:h-7 sm:w-7 md:right-[18%] lg:h-9 lg:w-9' />

      {/* Bottom left area */}
      <CommandLineIcon className='absolute bottom-[20%] left-[6%] h-6 w-6 text-indigo-400 opacity-60 sm:h-8 sm:w-8 md:bottom-[22%] md:left-[8%] lg:h-10 lg:w-10' />
      <MixerHorizontalIcon className='absolute bottom-[12%] left-[12%] h-5 w-5 text-violet-300 opacity-50 sm:h-7 sm:w-7 md:left-[15%] lg:h-8 lg:w-8' />

      {/* Bottom right area */}
      <StarIcon className='absolute bottom-[18%] right-[10%] h-6 w-6 text-fuchsia-400 opacity-60 sm:h-8 sm:w-8 md:bottom-[20%] md:right-[12%] lg:h-10 lg:w-10' />
      <CpuChipIcon className='absolute bottom-[10%] right-[6%] h-7 w-7 text-purple-500 opacity-70 sm:h-9 sm:w-9 md:right-[8%] lg:h-11 lg:w-11' />

      {/* Center scattered icons for depth */}
      <SparklesIcon className='absolute left-1/4 top-[35%] h-4 w-4 text-violet-300 opacity-30 sm:h-5 sm:w-5 md:left-[28%] lg:h-6 lg:w-6' />
      <StarIcon className='absolute right-1/4 top-[40%] h-4 w-4 text-fuchsia-300 opacity-30 sm:h-5 sm:w-5 md:right-[28%] lg:h-6 lg:w-6' />
    </div>
  )
}
