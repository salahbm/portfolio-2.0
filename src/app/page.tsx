'use client'

import { ScrollStory } from '@/components/landing/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import { JourneyScroll } from '@/components/landing/journey'
import IntroView from '@/components/landing/intro/intro-view'
import { HobbyView } from '@/components/landing/hobby'
import { ContactHero } from '@/components/landing/contact'
import { AboutMe } from '@/components/landing/intro/about-me'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

import {
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  Physics2DPlugin,
  ScrambleTextPlugin,
} from 'gsap/all'

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  useGSAP,
  SplitText,
  MorphSVGPlugin,
  ScrambleTextPlugin,
  DrawSVGPlugin,
  MotionPathPlugin,
  Physics2DPlugin
)

export default function HomePage() {
  useGSAP(() => {
    // SMOOTH SCROLL
    ScrollSmoother.create({
      smooth: 1.3,
      effects: true,
      normalizeScroll: true,
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
        <AboutMe />
        <IntroView />
        <JourneyScroll />
        <ScrollStory />
        <HobbyView />
        <ContactHero />
      </div>
    </div>
  )
}
