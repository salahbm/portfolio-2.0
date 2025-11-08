'use client'

import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { Fragment } from 'react'
import JourneyHeader from './journey-header'

export function JourneyScroll() {
  useGSAP(() => {
    // ---------------------------------------
    // 1. SECTION ZOOM OUT — now triggers later
    // ---------------------------------------
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.journey-section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      })
      .to('.journey-section', {
        rotate: 3,
        scale: 0.88,
        yPercent: 10,
        ease: 'power2.inOut',
      })

    // ---------------------------------------
    // 2. SPLIT TEXT SETUP
    // ---------------------------------------
    const titleSplit = SplitText.create('.journey-content', {
      type: 'words,lines',
    })

    const dollarSplit = SplitText.create('.dollar-text', {
      type: 'chars',
    })

    // ---------------------------------------
    // 3. TEXT ANIMATION — NOW SCROLL TRIGGERED
    // ---------------------------------------
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.journey-content',
          start: 'top 85%',
          end: 'bottom 40%',
          scrub: false,
        },
      })
      .from(titleSplit.words, {
        ease: 'power2.out',
        stagger: 0.035,
        opacity: 0,
        rotate: 5,
        duration: 0.7,
        y: 50,
      })
      .to(
        '.journey-content-dynamic',
        {
          opacity: 1,
          scrambleText: {
            text: '{original}',
            chars: 'lowerCase',
          },
          duration: 2.3,
        },
        '-=.3'
      )
      .fromTo(
        dollarSplit.chars,
        { opacity: 0, scale: 0, y: 40, rotate: -25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          ease: 'elastic.out(1, 0.4)',
          stagger: 0.18,
        },
        '-=1.8'
      )
  })

  return (
    <Fragment>
      <JourneyHeader />

      {/* FIXED HEIGHT + SPACING */}
      <section className='journey-section relative flex min-h-screen w-dvw items-center justify-center overflow-visible px-6'>
        <p className='journey-content mx-auto max-w-4xl font-syne text-xl leading-[3rem] tracking-wide md:text-4xl md:leading-[4rem] 2xl:text-6xl'>
          I thought coding would make me{' '}
          <span className='journey-content-dynamic text-primary'>
            shi*t a lot of money{' '}
            <span className='dollar-text inline-block'>💵🤑💸💰</span>
          </span>
          , and would be easy for just a couple of weekends. Several years,
          thousands of bugs, and way too much coffee later — I’m still here.
        </p>
      </section>
    </Fragment>
  )
}
