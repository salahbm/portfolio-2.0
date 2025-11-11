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
import { toast } from 'sonner'

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

    // Mobile browsers change viewport height on scroll,
    // which breaks scroll-based animations.
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true,
    })

    if (isMobile) {
      toast('Mobile browsers may cause animation glitches.', {
        description: 'For the best experience, use desktop.',
        action: { label: 'Close', onClick: () => toast.dismiss() },
      })
    } else {
      ScrollSmoother.create({
        smooth: 2.5,
        effects: true,
        normalizeScroll: false,
      })
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
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
