import { ScrollStory } from '@/components/landing/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneyScroll } from '@/components/landing/journey'
import { ParallaxScrollWrapper } from '@/components/providers/parallax-scroll-wrapper'

export default function HomePage() {
  return (
    <ParallaxScrollWrapper>
      <Hero />
      <JourneyScroll />
      <ScrollStory />
    </ParallaxScrollWrapper>
  )
}
