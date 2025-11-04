import { ScrollStory } from '@/components/landing/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneySection } from '@/components/landing/journey'
import { ParallaxScrollWrapper } from '@/components/providers/parallax-scroll-wrapper'

export default function HomePage() {
  return (
    <ParallaxScrollWrapper>
      <Hero />
      <JourneySection />
      <ScrollStory />
    </ParallaxScrollWrapper>
  )
}
