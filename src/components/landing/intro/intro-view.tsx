'use client'

import { useState } from 'react'

import HoverText from './hover-text'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { WaveUnderline } from './wave-underline'
import { AboutMe } from './about-me'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

export default function IntroView() {
  const [activeWord, setActiveWord] = useState<string | null>(null)

  useGSAP(() => {
    // SplitText instances
    const intro1 = SplitText.create('.intro-1', { type: 'words' })
    const intro2 = SplitText.create('.intro-2', { type: 'words' })
    const intro3 = SplitText.create('.intro-3', { type: 'words' })

    // Faster coloring animation (short scroll + small stagger)
    gsap.to(intro1.words, {
      color: '#2e54d1',
      ease: 'power1.inOut',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.intro-1',
        start: 'top 85%',
        end: 'top 70%',
        scrub: true,
      },
    })

    gsap.to(intro2.words, {
      color: '#2e54d1',
      ease: 'power1.inOut',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.intro-2',
        start: 'top 80%',
        end: 'top 65%',
        scrub: true,
      },
    })

    gsap.to(intro3.words, {
      color: '#2e54d1',
      ease: 'power1.inOut',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.intro-3',
        start: 'top 80%',
        end: 'top 65%',
        scrub: true,
      },
    })

    // Hero timeline
    const heroTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.intro-section',
        start: '1% top',
        end: 'bottom top',
        scrub: true,
      },
    })

    heroTL.to('.intro-section', {
      rotate: 7,
      scale: 0.3,
      yPercent: 30,
      ease: 'power1.inOut',
    })
  })

  return (
    <section className='relative flex flex-col items-center justify-center overflow-hidden'>
      <AboutMe />

      <div className='intro-section relative z-10 mx-auto my-[500px] w-full max-w-5xl px-6 text-end font-syne leading-relaxed'>
        <div
          className='intro-1 text-outline mb-8 font-light leading-[1.4] tracking-wide'
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
          }}
        >
          Hey, I’m{' '}
          <span className='relative font-semibold'>
            Muhammad,
            <span className='absolute -bottom-2 left-0 right-0'>
              <WaveUnderline />
            </span>{' '}
          </span>
          but most people just call me Salah (살라).
        </div>

        <div
          className='intro-2 text-outline mb-8 font-light leading-normal'
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
          }}
        >
          Originally from{' '}
          <HoverText
            wordKey='bukhara'
            label='Bukhara, Uzbekistan'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
          />
          . These days, you’ll find me wandering through{' '}
          <HoverText
            wordKey='seoul'
            label='Seoul, South Korea'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
          />
          , chasing light and ideas since 2019.
        </div>

        <div
          className='intro-3 text-outline font-light leading-[1.6]'
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 2.5rem)',
          }}
        >
          Studied Computer Science at{' '}
          <HoverText
            wordKey='dankook'
            label='Dankook University'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
          />
          , and I’ve been writing code, breaking things, and learning to fix
          them better ever since.
        </div>
      </div>

      <span className='mt-10 flex items-center gap-2 text-sm text-muted-foreground'>
        <InfoCircledIcon className='inline-block' />
        Hover on the gradient texts to see the images
      </span>
    </section>
  )
}
