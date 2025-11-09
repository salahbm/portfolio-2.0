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
    // Detect touch device synchronously (before any GSAP setup)
    // Check multiple indicators to catch real devices AND Chrome DevTools emulator
    const hasTouchEvents = 'ontouchstart' in window
    const hasTouchPoints = navigator.maxTouchPoints > 0
    // @ts-expect-error - msMaxTouchPoints is IE-specific
    const hasMsTouchPoints = navigator.msMaxTouchPoints > 0
    const isMobileUserAgent =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    const isSmallScreen = window.innerWidth <= 1024

    // Consider it a touch device if ANY of these are true
    const isTouchDevice =
      hasTouchEvents ||
      hasTouchPoints ||
      hasMsTouchPoints ||
      (isMobileUserAgent && isSmallScreen)

    // Only enable ScrollSmoother on non-touch devices
    if (!isTouchDevice) {
      ScrollSmoother.create({
        smooth: 1.3,
        effects: true,
        normalizeScroll: true, // Only normalize when using ScrollSmoother
      })
    }

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
        <ThankingView />
        <ContactHero />
        <Footer />
      </div>
    </div>
  )
}
