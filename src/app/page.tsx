import { ScrollStory } from '@/components/landing/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneyScroll } from '@/components/landing/journey'
import IntroView from '@/components/landing/intro/intro-view'
import MacOSWaves from '@/components/landing/hero/components/macos-bg'
import { Header } from '@/components/header'
import { HobbyView } from '@/components/landing/hobby'
import { ContactHero } from '@/components/landing/contact'

export default function HomePage() {
  return (
    <div className='relative pb-12'>
      <Header />
      <MacOSWaves />
      <Hero />
      <IntroView />
      <JourneyScroll />
      <ScrollStory />
      <HobbyView />
      <ContactHero />
    </div>
  )
}
