import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const AboutMe: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-expect-error - checking for IE compatibility
          navigator.msMaxTouchPoints > 0
      )
    }
    checkTouch()
  }, [])

  // Framer Motion scroll for touch devices
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  // GSAP for non-touch devices
  useGSAP(() => {
    if (isTouchDevice || !textRef.current) return

    const textElement = textRef.current
    const scrollWidth = textElement.scrollWidth
    const windowWidth = window.innerWidth

    gsap.to(textElement, {
      x: -(scrollWidth - windowWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
  }, [isTouchDevice])

  return (
    <div
      ref={containerRef}
      className='w-full overflow-hidden bg-foreground py-20 md:py-32 lg:py-40'
    >
      <div className='flex whitespace-nowrap'>
        {isTouchDevice ? (
          <motion.p
            ref={textRef}
            style={{ x }}
            className='inline-block font-monument-extended font-extrabold leading-none text-background'
            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
          >
            about me * about me * about me * about me * about me * about me *
            about me * about me *
          </motion.p>
        ) : (
          <p
            ref={textRef}
            className='inline-block font-monument-extended font-extrabold leading-none text-background'
            style={{ fontSize: 'clamp(4rem, 15vw, 10rem)' }}
          >
            about me * about me * about me * about me * about me * about me *
          </p>
        )}
      </div>
    </div>
  )
}

export { AboutMe }
