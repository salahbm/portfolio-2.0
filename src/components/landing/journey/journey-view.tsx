'use client'

import './journey.component.css'

export function JourneySection() {
  return (
    <section className='fluid text-neutral-100'>
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-pink-950/20' />
      <div className='heading'>
        <div className='measure' />
        <h1 className='select-none'>
          From the ancient streets of{' '}
          <span className='text-gradient'>Bukhara</span> to the fast lanes of{' '}
          <span className='text-gradient'>Seoul</span>, my journey began as a
          student and evolved into a career in software engineering. Today, I
          build digital experiences that connect culture, logic, and design.
        </h1>
      </div>
    </section>
  )
}
