'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import HoverText from './hover-text'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { WaveUnderline } from './wave-underline'

export default function IntroView() {
  const [activeWord, setActiveWord] = useState<string | null>(null)

  return (
    <section className='relative flex h-screen flex-col items-center justify-center overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className='relative z-10 mx-auto w-full max-w-5xl px-6 text-center font-syne leading-relaxed text-background'
      >
        {/* Headline */}
        <p
          className='text-outline mb-8 font-light leading-[1.4] tracking-wide'
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
          }}
        >
          Hey, I’m{' '}
          <span className='relative font-semibold'>
            Muhammad
            <WaveUnderline />
          </span>
          , but most people just call me Salah (살라).
        </p>

        {/* Location line */}
        <p
          className='text-outline mb-8 font-light leading-normal text-popover-foreground'
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
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
        </p>

        {/* Education line */}
        <p
          className='text-outline font-light leading-[1.6] text-popover-foreground'
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
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
        </p>
      </motion.div>

      <span className='mt-10 flex items-center gap-2 text-sm text-popover-foreground'>
        <InfoCircledIcon className='inline-block' />
        Hover on the gradient texts to see the images
      </span>
    </section>
  )
}
