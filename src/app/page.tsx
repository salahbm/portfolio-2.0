'use client'

import gsap from 'gsap'

import {
  DrawSVGPlugin,
  Physics2DPlugin,
  ScrambleTextPlugin,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
} from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import { ScrollStory } from '@/components/landing/scroll-story'
import { Hero } from '@/components/landing/hero/hero-view'
import IntroView from '@/components/landing/intro/intro-view'
import { HobbyView } from '@/components/landing/hobby'
import { ContactHero } from '@/components/landing/contact'
import { AboutMe } from '@/components/landing/intro/about-me'
import { JourneyScroll } from '@/components/landing/journey'
import { ThankingView } from '@/components/landing/thanking'
import { Footer } from '@/components/landing/footer'

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
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      'ontouchstart' in window

    // Configure ScrollTrigger for better mobile performance
    ScrollTrigger.config({
      // Prevent issues with mobile browsers
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      // Disable on touch devices to prevent conflicts
      ignoreMobileResize: true,
    })

    // Only enable ScrollSmoother on non-touch devices
    if (!isMobile) {
      ScrollSmoother.create({
        smooth: 1.3,
        effects: true,
        normalizeScroll: false, // Disable to prevent mobile conflicts
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ScrollSmoother.get()?.kill()
    }
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
        <ThankingView />
        <ContactHero />
        <Footer />
      </div>
    </div>
  )
}
