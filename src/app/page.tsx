import { Billboard3D } from '@/components/billboard'
import { ScrollStory } from '@/components/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneySection } from '@/components/landing/journey'

export default function HomePage() {
  return (
    <div>
      <Hero />

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
