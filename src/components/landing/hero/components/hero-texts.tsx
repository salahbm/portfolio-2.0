import { AnimatedText } from '@/components/landing/hero/components/animated-text'
import { LocationHighlight } from '@/components/landing/hero/components/location-highlight'

export function HeroText() {
  return (
    <div className='relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:max-w-5xl lg:px-8'>
      <AnimatedText className='text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl'>
        Hey there! I&apos;m{' '}
        <span className='text-gradient-lilac'>Muhammad (Salah)</span> — a
        full-stack software engineer originally from{' '}
        <LocationHighlight
          name='Bukhara, Uzbekistan'
          gradient='bg-gradient-to-r from-violet-500/20 to-purple-400/20'
          iconColor='text-violet-400'
        />
        , now creating cool things in{' '}
        <LocationHighlight
          name='Seoul, South Korea'
          gradient='bg-gradient-to-r from-fuchsia-500/20 to-violet-400/20'
          iconColor='text-fuchsia-400'
        />
        .
      </AnimatedText>
    </div>
  )
}
