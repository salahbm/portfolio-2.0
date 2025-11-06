'use client'

import { ScrollStory } from '@/components/landing/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneyScroll } from '@/components/landing/journey'
import IntroView from '@/components/landing/intro/intro-view'
import { HobbyView } from '@/components/landing/hobby'
import { ContactHero } from '@/components/landing/contact'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

export default function HomePage() {
  useGSAP(() => {
    // GLOBAL SCROLLSMOOTHER
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    })
    // INTRO ABOUT ME SCROLL CONTROLLER
    gsap.to('.about-me-text', {
      x: () =>
        -(
          document.querySelector('.about-me-text')!.scrollWidth -
          window.innerWidth
        ),
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-me-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  })

  return (
    <div id='smooth-wrapper'>
      <div id='smooth-content'>
        <Hero />
        <IntroView />
        <JourneyScroll />
        <ScrollStory />
        <HobbyView />
        <ContactHero />
      </div>
    </div>
  )
}
