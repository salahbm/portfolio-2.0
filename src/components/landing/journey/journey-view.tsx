'use client'

import './journey.component.css'

export function JourneySection() {
  return (
    <section className='fluid bg-transparent text-neutral-100'>
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
