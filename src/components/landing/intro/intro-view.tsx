'use client'

import { useState } from 'react'
import HoverText from './hover-text'
import { WaveUnderline } from './wave-underline'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { useTheme } from 'next-themes'

gsap.registerPlugin(SplitText)

/* Prevent outline affecting SplitText children */
const outlineFix = `
.text-outline span:not(.hover-word),
.text-outline div:not(.hover-word) {
  color: gray;
  -webkit-text-stroke: inherit;
}
`

export default function IntroView() {
  const { theme } = useTheme()
  const [activeWord, setActiveWord] = useState<string | null>(null)

  const color = theme === 'light' ? '#5A85F2' : '#fff'

  useGSAP(() => {
    let intro1, intro2, intro3

    document.fonts.ready.then(() => {
      //  Split ONLY the main text parts
      intro1 = SplitText.create('.intro-1-split', { type: 'chars' })
      intro2 = SplitText.create('.intro-2-split', { type: 'chars' })
      intro3 = SplitText.create('.intro-3-split', { type: 'chars' })

      //  COLOR ANIMATIONS — ONLY for split parts
      gsap.to(intro1.chars, {
        color,
        ease: 'power1.inOut',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.intro-1',
          start: 'top 70%',
          end: '30% center',
          scrub: true,
        },
      })

      gsap.to(intro2.chars, {
        color,
        ease: 'power1.inOut',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.intro-2',
          start: 'top 50%',
          end: 'bottom center',
          scrub: true,
        },
      })

      gsap.to(intro3.chars, {
        color,
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
      scale: 0.3,
      yPercent: 20,
      ease: 'power1.inOut',
    })
  }, [theme])

  return (
    <section className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden py-12 md:min-h-[120vh] lg:min-h-[150vh]'>
      {/* FIXED OUTLINE BEHAVIOR */}
      <style>{outlineFix}</style>

      <div className='intro-section relative z-10 mx-auto w-full max-w-5xl px-4 text-end font-syne leading-relaxed md:px-6'>
        {/* INTRO 1 */}
        <div
          className='intro-1 text-outline mb-6 font-light leading-[1.4] tracking-wide md:mb-8'
          style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}
        >
          <span className='intro-1-split'>Hey👋, I’m </span>

          <span className='intro-1-split relative font-semibold'>
            Muhammad,
            <span className='absolute -bottom-2 left-0 right-0'>
              <WaveUnderline />
            </span>{' '}
          </span>

          <span className='intro-1-split'>
            but some people call me Salah (살라).
          </span>
        </div>

        {/* INTRO 2 */}
        <div
          className='intro-2 text-outline mb-6 font-light leading-normal md:mb-8'
          style={{ fontSize: 'clamp(1.1rem, 3vw, 2.5rem)' }}
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
          style={{ fontSize: 'clamp(1rem, 2.5vw, 2.5rem)' }}
        >
          <span className='intro-3-split'>
            Studied Mobile Software Engineering & Global Software Engineering at{' '}
            (I know it's a long name, but u can call it Software Engineering
            ){' '}
          </span>
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

      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,theme(colors.gray.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.200)_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-neutral-900 dark:bg-[linear-gradient(to_right,theme(colors.gray.800)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.800)_1px,transparent_1px)]' />
    </section>
  )
}
