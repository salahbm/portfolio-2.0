'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import HoverText from './hover-text'

export default function IntroView() {
  const [activeWord, setActiveWord] = useState<string | null>(null)

  return (
    <section className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-foreground'>
      {/* Hero text */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className='relative z-10 mx-auto max-w-4xl text-center leading-relaxed'
      >
        <p className='mb-6 text-2xl font-light md:text-[2.25rem]'>
          Hey, I’m{' '}
          <span className='text-gradient-lilac font-semibold'>Muhammad</span> —
          though most folks know me as{' '}
          <span className='text-gradient-lilac font-semibold'>Salah</span>.
        </p>

        <p className='mb-6 text-xl font-light md:text-[1.75rem]'>
          Born in{' '}
          <HoverText
            wordKey='bukhara'
            label='Bukhara, Uzbekistan'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
          />
          , now vibing in{' '}
          <HoverText
            wordKey='seoul'
            label='Seoul, South Korea'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
          />{' '}
          since 2019.
        </p>

        <p className='text-lg font-light md:text-[1.5rem]'>
          Graduated from{' '}
          <HoverText
            wordKey='dankook'
            label='Dankook University'
            activeWord={activeWord}
            setActiveWord={setActiveWord}
          />{' '}
          with a CS degree — still geeking out on code every day.
        </p>
      </motion.div>
    </section>
  )
}
