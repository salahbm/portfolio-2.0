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
    gsap.set('.journey-section', {
      yPercent: -10,
      rotate: -1,
      scale: 1.1,
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.journey-section',
          start: 'top 85%',
          end: 'top top',
          scrub: 0.8,
        },
      })
      .to('.journey-section', {
        yPercent: 5,
        ease: 'none',
      })
      .to(
        '.journey-section',
        {
          rotate: 1.5,
          scale: 0.95,
          yPercent: 0,
          ease: 'none',
        },
        '+=0.5'
      )

    // ---------------------------------------
    // 2. SPLIT TEXT SETUP
    // ---------------------------------------
    const titleSplit = SplitText.create('.journey-content', {
      type: 'words,lines',
    })

    const dollarSplit = SplitText.create('.emoji-text', {
      type: 'chars',
    })

    // ---------------------------------------
    // 3. TEXT ANIMATION — NOW SCROLL TRIGGERED
    // ---------------------------------------
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.journey-content',
          start: 'top 75%',
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
      <section className='journey-section relative flex min-h-dvh w-dvw items-center justify-center overflow-visible px-4 py-12 md:min-h-dvh md:px-6 lg:min-h-[120vh]'>
        <p
          className='journey-content mx-auto max-w-4xl font-syne leading-relaxed tracking-wide md:leading-[3rem] lg:leading-[4rem]'
          style={{ fontSize: 'clamp(1.125rem, 3vw, 2.5rem)' }}
        >
          Once I thought coding would make me{' '}
          <span className='journey-content-dynamic text-primary'>
            shi*t lot of money{' '}
            <span className='emoji-text inline-block'>💵🤑💸💰</span>
          </span>
          , and would be easy to achieve in some weeks. Several years, thousands
          of bugs, and way too much coffee later — I’m still here. Since then
          ...
        </p>
      </section>
    </Fragment>
  )
}
