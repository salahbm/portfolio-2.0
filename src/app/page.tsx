import { ScrollStory } from '@/components/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { LocationsView } from '@/components/landing/locations'
import { FlipBoard } from '@/components/landing/locations/flipboard'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <LocationsView />

      {/* 3D Billboard showcase */}

      {/* Story section with scroll animations */}
      <ScrollStory />

      <FlipBoard />

      {/* <JourneySection /> */}
    </div>
  )
}
