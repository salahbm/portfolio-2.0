import { AnimatedText } from '@/components/landing/hero/components/animated-text'
import { LocationHighlight } from '@/components/landing/hero/components/location-highlight'

export function HeroText() {
  return (
    <AnimatedText className='font-header flex flex-col items-center gap-6 text-center text-foreground sm:gap-8 lg:items-start lg:text-left'>
      {/* Greeting */}
      <span
        className='block text-2xl font-normal tracking-wide sm:text-3xl md:text-4xl'
        data-animation-delay='0'
      >
        Hey there! I&apos;m
      </span>

      {/* Name with gradient - block display for proper gradient rendering */}
      <span
        className='text-gradient-lilac block text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'
        data-animation-delay='0.3'
      >
        Muhammad (Salah)
      </span>

      {/* Title */}
      <span
        className='block text-xl font-normal tracking-wide sm:text-2xl md:text-3xl'
        data-animation-delay='0.6'
      >
        — a full-stack software engineer
      </span>

      {/* Location info - single line with proper spacing */}
      <span
        className='mt-4 block max-w-4xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl md:text-2xl'
        data-animation-delay='0.9'
      >
        originally from{' '}
        <LocationHighlight
          name='Bukhara, Uzbekistan'
          gradient='bg-gradient-to-r from-violet-500/30 to-purple-400/30'
          className='font-milkyway text-lg font-normal sm:text-xl md:text-2xl'
        />
        , now creating cool things in{' '}
        <LocationHighlight
          name='Seoul, South Korea'
          gradient='bg-gradient-to-r from-fuchsia-500/30 to-violet-400/30'
          className='font-babygemoy text-lg font-normal sm:text-xl md:text-2xl'
        />
      </span>
    </AnimatedText>
  )
}
