'use client'
import { AnimatedText } from '@/components/landing/hero/components/animated-text'
import { WaveUnderline } from '@/components/landing/hero/components/wave-underline'
import { useAvatarStore } from '@/store/avatar-store'

export function HeroText() {
  const { hoverTrig, happyTrig, idleTrig } = useAvatarStore()
  return (
    <div className='flex flex-col items-center gap-6 text-center text-foreground sm:gap-8 md:gap-10 lg:items-start lg:text-left'>
      {/* Greeting */}

      <AnimatedText
        className='block text-2xl font-light tracking-wide sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
        onMouseEnter={() => hoverTrig?.fire()}
        onMouseLeave={() => idleTrig?.fire()}
      >
        <span data-animation-delay='0' className='relative inline-block'>
          Hey <span className='wave-animation'>👋</span>
          <span className='absolute bottom-2 left-0 w-4/5 sm:w-[70%] md:w-3/5 lg:w-full'>
            <WaveUnderline />
          </span>
        </span>
      </AnimatedText>

      {/* Name with gradient */}
      <div className='flex flex-col items-center gap-3 lg:items-start lg:gap-4'>
        <AnimatedText className='block text-2xl font-light tracking-wide sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
          <span data-animation-delay='0.2'>I&apos;m</span>
        </AnimatedText>

        <AnimatedText
          onMouseEnter={() => happyTrig?.fire()}
          onMouseLeave={() => idleTrig?.fire()}
        >
          <span
            data-animation-delay='0.4'
            className='text-gradient-lilac block whitespace-nowrap text-5xl font-black leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]'
          >
            Muhammad
          </span>
          <span
            data-animation-delay='0.6'
            className='text-gradient-lilac block whitespace-nowrap text-5xl font-black leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]'
          >
            (Salah)
          </span>
        </AnimatedText>
      </div>

      {/* Title */}
      <AnimatedText className='block text-xl font-light tracking-wide sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
        <span data-animation-delay='0.8'>a full-stack software engineer</span>
      </AnimatedText>
    </div>
  )
}
