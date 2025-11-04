'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import './journey.component.css'

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress of the component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Transform scroll progress to percentage for display
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100])

  const progressText = useTransform(
    progressPercent,
    (value) => `${Math.round(value)}% complete`
  )

  // Transform scroll progress for text gradient position
  const gradientPosition = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['180%', '100%', '100%']
  )

  return (
    <div className='journey-section' ref={containerRef}>
      <section className='fluid'>
        <div className='progress'>
          <span aria-hidden='true'>100% complete</span>
          <motion.span className='sync'>
            <motion.span>{progressText}</motion.span>
          </motion.span>
        </div>
        <div className='heading'>
          <motion.h1
            style={{
              backgroundPositionX: gradientPosition,
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </motion.h1>
        </div>
      </section>
    </div>
  )
}
