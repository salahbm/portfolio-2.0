import { ScrollStory } from '@/components/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { LocationsView } from '@/components/landing/locations'
import { FlipBoard } from '@/components/landing/locations/flipboard'
import { JourneySection } from '@/components/landing/journey'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <JourneySection />
      <LocationsView />
      <ScrollStory />
      <FlipBoard />
    </div>
  )
}
