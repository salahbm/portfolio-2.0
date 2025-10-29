import { HeroIcons } from './components/hero-icons'
import { HeroText } from './components/hero-texts'
import AvatarView from './components/avatar'

export function Hero() {
  return (
    <section className='relative flex h-fit min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-violet-950/10 dark:from-background dark:via-background dark:to-violet-950/20'>
      {/* Floating icons */}
      <HeroIcons />

      {/* Main content container */}

      {/* Hero text */}

      <HeroText />

      {/* Avatar */}

      <AvatarView />
    </section>
  )
}
