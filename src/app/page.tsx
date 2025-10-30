import { ScrollStory } from '@/components/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneySection } from '@/components/landing/journey'
import { LocationsView } from '@/components/landing/locations'
import { Billboard3D } from '@/components/landing/locations/components/billboard'
import { FlipBoard } from '@/components/landing/locations/flipboard'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <LocationsView />
      <article className='flex flex-col gap-4'>
        <h1 className='font-lader-medium text-4xl'>Ladder Medium</h1>
        <p className='font-milkyway text-4xl'>Milkyway</p>
        <p className='font-monument-extended text-4xl'>Monument Extended</p>
        <p className='font-syne text-4xl'>Syne</p>
      </article>

      {/* 3D Billboard showcase */}

      {/* Story section with scroll animations */}
      <ScrollStory />

      <FlipBoard />

      {/* <JourneySection /> */}
    </div>
  )
}
