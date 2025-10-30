import { HeroIcons } from './components/hero-icons'
import { HeroText } from './components/hero-texts'
import AvatarView from './components/avatar'

export function Hero() {
  return (
    <section className='relative flex h-fit min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-violet-950/10 px-4 py-12 dark:from-background dark:via-background dark:to-violet-950/20 sm:px-6 md:px-8 lg:py-20'>
      {/* Floating icons */}
      <HeroIcons />

      {/* Main content container */}
      <div className='relative z-10 flex w-full max-w-7xl flex-col-reverse items-center justify-center gap-12 md:gap-16 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-20 xl:gap-24'>
        {/* Avatar - appears first on mobile, right side on desktop */}
        <div className='shrink-0 lg:w-1/3'>
          <AvatarView />
        </div>

        {/* Hero text - appears second on mobile, left side on desktop */}
        <div className='flex-1'>
          <HeroText />
        </div>
      </div>
    </section>
  )
}
