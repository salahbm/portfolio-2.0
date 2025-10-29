import { HeroIcons } from './components/hero-icons'
import { HeroText } from './components/hero-texts'

export function Hero() {
  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-violet-950/10 dark:from-background dark:via-background dark:to-violet-950/20'>
      {/* Animated gradient orbs */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-violet-500/10 blur-3xl' />
        <div
          className='absolute -right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-fuchsia-500/10 blur-3xl'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-purple-500/5 blur-3xl'
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Floating icons */}
      <HeroIcons />

      {/* Hero text */}
      <HeroText />
    </section>
  )
}
