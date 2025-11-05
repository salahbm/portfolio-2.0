import { ScrollStory } from '@/components/landing/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneyScroll } from '@/components/landing/journey'
import { ParallaxScrollWrapper } from '@/components/providers/parallax-scroll-wrapper'
import IntroView from '@/components/landing/intro/intro-view'
export default function HomePage() {
  return (
    <div className='relative h-full'>
      <Hero />
      <IntroView />
      {/* <JourneyScroll /> */}
      <ScrollStory />
    </div>
  )
}
