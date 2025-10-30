import { ScrollStory } from '@/components/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneySection } from '@/components/landing/journey'
import { LocationsView } from '@/components/landing/locations'

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
      {/* <section
        id='billboard'
        className='flex min-h-screen items-center justify-center py-20'
      >
        <Billboard3D />
      </section> */}

      {/* Story section with scroll animations */}
      <ScrollStory />

      {/* <JourneySection /> */}
    </div>
  )
}
