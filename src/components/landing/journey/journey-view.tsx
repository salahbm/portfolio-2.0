'use client'

import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { Fragment } from 'react'
import JourneyHeader from './journey-header'

export function JourneyScroll() {
  useGSAP(() => {
    // ---------------------------------------
    // 1. SECTION PARALLAX SCALE
    // ---------------------------------------
    gsap.set('.journey-section', {
      scale: 0.92,
    })

    gsap.to('.journey-section', {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.journey-section',
        start: 'top bottom',
        end: 'top center',
        scrub: 1.2,
      },
    })

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
    // 3. TEXT REVEAL WITH SCROLL
    // ---------------------------------------
    gsap.set(titleSplit.words, {
      opacity: 0,
      y: 60,
      rotateX: -90,
    })

    gsap.set('.journey-content-dynamic', {
      opacity: 0,
    })

    gsap.set(dollarSplit.chars, {
      opacity: 0,
      scale: 0,
      y: 50,
      rotate: -45,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.journey-content',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
      },
    })

    tl.to(titleSplit.words, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.02,
      ease: 'power3.out',
    })
      .to(
        '.journey-content-dynamic',
        {
          opacity: 1,
          duration: 0.3,
        },
        '-=0.4'
      )
      .to(
        dollarSplit.chars,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          stagger: 0.05,
          ease: 'back.out(2)',
        },
        '-=0.2'
      )

    // ---------------------------------------
    // 4. FLOATING EMOJI LOOP (AFTER SCROLL)
    // ---------------------------------------
    gsap.to('.emoji-text', {
      y: -8,
      rotate: 5,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: '.emoji-text',
        start: 'top 60%',
      },
    })
  })

  return (
    <Fragment>
      <JourneyHeader />

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
          of bugs, and way too much coffee later — I'm still here. Since then
          ...
        </p>
      </section>
    </Fragment>
  )
}
