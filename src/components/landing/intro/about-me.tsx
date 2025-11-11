import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  // GSAP for non-touch devices
  useGSAP(() => {
    if (!textRef.current) return

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
      },
    })
  })

  return (
    <div
      ref={containerRef}
      className='w-full overflow-hidden bg-foreground py-20 md:py-32 lg:py-40'
    >
      <p
        ref={textRef}
        className='inline-block whitespace-nowrap font-monument-extended font-extrabold leading-none text-background'
        style={{ fontSize: 'clamp(4rem, 15vw, 10rem)' }}
      >
        about me * about me * about me * about me * about me * about me *
      </p>
    </div>
  )
}

export { AboutMe }
