import { Billboard3D } from '@/components/billboard'
import { ScrollStory } from '@/components/scroll-story'
import { HeroSection, CTASection } from '@/components/landing'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-white text-black dark:bg-black dark:text-white'>
      {/* Hero section with GSAP animations */}
      <HeroSection />

      {/* 3D Billboard showcase */}
      <section
        id='billboard'
        className='flex min-h-screen items-center justify-center py-20'
      >
        <Billboard3D />
      </section>

      {/* Story section with scroll animations */}
      <ScrollStory />

      {/* Closing CTA with magnetic button */}
      <CTASection />
    </div>
  )
}
