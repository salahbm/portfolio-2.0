'use client'

import { useState } from 'react'
import HoverText from './hover-text'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { WaveUnderline } from './wave-underline'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

gsap.registerPlugin(SplitText)

/* Prevent outline affecting SplitText children */
const outlineFix = `
.text-outline span:not(.hover-word),
.text-outline div:not(.hover-word) {
  color: transparent;
  -webkit-text-stroke: inherit;
}
`

export default function IntroView() {
  const [activeWord, setActiveWord] = useState<string | null>(null)

  useGSAP(() => {
    let intro1, intro2, intro3

    document.fonts.ready.then(() => {
      //  Split ONLY the main text parts
      intro1 = SplitText.create('.intro-1-split', { type: 'words' })
      intro2 = SplitText.create('.intro-2-split', { type: 'words' })
      intro3 = SplitText.create('.intro-3-split', { type: 'words' })

      //  COLOR ANIMATIONS — ONLY for split parts
      gsap.to(intro1.words, {
        color: '#1C00C4',
        ease: 'power1.inOut',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.intro-1',
          start: 'top 70%',
          end: '30% center',
          scrub: true,
        },
      })

      gsap.to(intro2.words, {
        color: '#1C00C4',
        ease: 'power1.inOut',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.intro-2',
          start: 'top 50%',
          end: 'bottom center',
          scrub: true,
        },
      })

      gsap.to(intro3.words, {
        color: '#1C00C4',
        ease: 'power1.inOut',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.intro-3',
          start: 'top 60%',
          end: 'bottom center',
          scrub: true,
        },
      })
    })

    //  HERO SCALE/ROTATE
    const heroTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.intro-section',
        start: '10% top',
        end: 'bottom top',
        scrub: true,
      },
    })

    heroTL.to('.intro-section', {
      rotate: 10,
      scale: 0.3,
      yPercent: 20,
      ease: 'power1.inOut',
    })
  })

  return (
    <section className='relative flex min-h-[150vh] flex-col items-center justify-center overflow-hidden'>
      {/* FIXED OUTLINE BEHAVIOR */}
      <style>{outlineFix}</style>
      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,theme(colors.gray.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.200)_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-neutral-900 dark:bg-[linear-gradient(to_right,theme(colors.gray.800)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.800)_1px,transparent_1px)]' />

      <div className='intro-section relative z-10 mx-auto w-full max-w-5xl px-6 text-end font-syne leading-relaxed'>
        {/* INTRO 1 */}
        <div
          className='intro-1 text-outline mb-8 font-light leading-[1.4] tracking-wide'
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
        >
          <span className='intro-1-split'>Hey, I’m </span>

          <span className='intro-1-split relative font-semibold'>
            Muhammad,
            <span className='absolute -bottom-2 left-0 right-0'>
              <WaveUnderline />
            </span>{' '}
          </span>

          <span className='intro-1-split'>
            but most people just call me Salah (살라).
          </span>
        </div>

        {/* INTRO 2 */}
        <div
          className='intro-2 text-outline mb-8 font-light leading-normal'
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)' }}
        >
          <span className='intro-2-split'>Originally from </span>

          {/*  Hover text IGNORE GSAP */}
          <HoverText
            wordKey='bukhara'
            label='Bukhara, Uzbekistan'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
          />

          <span className='intro-2-split'>
            . These days, you’ll find me wandering through{' '}
          </span>

          <HoverText
            wordKey='seoul'
            label='Seoul, South Korea'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
          />

          <span className='intro-2-split'>
            , chasing light and ideas since 2019.
          </span>
        </div>

        {/* INTRO 3 */}
        <div
          className='intro-3 text-outline font-light leading-[1.6]'
          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.5rem)' }}
        >
          <span className='intro-3-split'>Studied Computer Science at </span>

          <HoverText
            wordKey='dankook'
            label='Dankook University'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
          />

          <span className='intro-3-split'>
            , and I’ve been writing code, breaking things, and learning to fix
            them better ever since.
          </span>
        </div>
      </div>

      <span className='mt-5 flex w-full items-center justify-end gap-2 px-4 text-sm text-muted-foreground opacity-80 lg:max-w-4xl'>
        <InfoCircledIcon className='inline-block' />
        Hover on the gradient texts to see the images
      </span>
    </section>
  )
}
