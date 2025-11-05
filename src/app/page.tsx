import { ScrollStory } from '@/components/landing/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneyScroll } from '@/components/landing/journey'
import IntroView from '@/components/landing/intro/intro-view'
import MacOSWaves from '@/components/landing/hero/components/macos-bg'
import { Header } from '@/components/header'
import { HobbyView } from '@/components/landing/hobby'
export default function HomePage() {
  return (
    <div className='relative'>
      <Header />
      <MacOSWaves />
      <Hero />
      <IntroView />
      <JourneyScroll />
      <ScrollStory />
      <HobbyView />
    </div>
  )
}
