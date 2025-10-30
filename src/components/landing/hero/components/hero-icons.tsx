'use client'

import { useEffect, useRef } from 'react'
import { animateIcons } from '@/animations/hero-icons.animation'
import {
  CodeBracketIcon,
  SparklesIcon,
  CommandLineIcon,
  CpuChipIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid'
import { RocketIcon, LightningBoltIcon } from '@radix-ui/react-icons'

export function HeroIcons() {
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
      className='pointer-events-none absolute inset-0 z-[2] overflow-hidden'
    >
      {/* Top left area */}
      <SparklesIcon className='absolute left-[5%] top-[10%] h-6 w-6 text-violet-400 opacity-60 sm:h-8 sm:w-8 md:left-[8%] md:top-[12%] lg:h-10 lg:w-10' />
      <CodeBracketIcon className='absolute left-[10%] top-1/4 h-7 w-7 text-fuchsia-400 opacity-70 sm:h-9 sm:w-9 md:left-[12%] lg:h-11 lg:w-11' />

      {/* Top right area */}
      <RocketIcon className='absolute right-[8%] top-[15%] h-7 w-7 text-violet-500 opacity-60 sm:h-9 sm:w-9 md:right-[10%] md:top-[18%] lg:h-11 lg:w-11' />
      <LightningBoltIcon className='absolute right-[15%] top-[8%] h-6 w-6 text-purple-400 opacity-50 sm:h-7 sm:w-7 md:right-[18%] lg:h-9 lg:w-9' />

      {/* Center scattered icons for depth */}
      <SparklesIcon className='absolute left-1/4 top-[35%] h-4 w-4 text-violet-300 opacity-30 sm:h-5 sm:w-5 md:left-[28%] lg:h-6 lg:w-6' />
      <ComputerDesktopIcon className='absolute right-1/4 top-[40%] h-4 w-4 text-fuchsia-300 opacity-30 sm:h-5 sm:w-5 md:right-[28%] lg:h-6 lg:w-6' />

      {/* Bottom right area */}
      <CommandLineIcon className='absolute bottom-[20%] left-[6%] h-6 w-6 text-indigo-400 opacity-60 sm:h-8 sm:w-8 md:bottom-[22%] md:left-[8%] lg:h-10 lg:w-10' />

      <CpuChipIcon className='absolute bottom-[10%] right-[6%] h-7 w-7 text-purple-500 opacity-70 sm:h-9 sm:w-9 md:right-[8%] lg:h-11 lg:w-11' />
      <CurrencyDollarIcon className='absolute bottom-[18%] right-[10%] h-6 w-6 text-green-400 opacity-60 sm:h-8 sm:w-8 md:bottom-[20%] md:right-[12%] lg:h-10 lg:w-10' />
    </div>
  )
}
