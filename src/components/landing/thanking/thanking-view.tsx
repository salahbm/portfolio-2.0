import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ThankingView = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.thanking-background', { opacity: 0.5 })
      gsap.set('.thanking-text', {
        willChange: 'transform',
        opacity: 0,
        y: 100,
        rotateX: -15,
      })

      // Pin the section
      ScrollTrigger.create({
        trigger: '.thanking-scroll',
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
      })

      // Background opacity: 0.5 -> 1 while scrolling
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.thanking-scroll',
            start: 'top top',
            end: '+=200%',
            scrub: 1,
          },
        })
        .to('.thanking-background', {
          opacity: 1,
          ease: 'power2.inOut',
        })

      // Animate text entrance with stagger
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.thanking-scroll',
          start: 'top top',
          end: '+=100%',
          scrub: 1,
        },
      })

      textTimeline.to(
        '.thanking-text',
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.2,
          ease: 'power3.out',
        },
        0
      )

      // Horizontal drift animations
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.thanking-scroll',
            start: 'top top',
            end: '+=200%',
            scrub: 1,
          },
        })
        .to('#thanking-title-1', { xPercent: 60 }, 0)
        .to('#thanking-title-2', { xPercent: 20 }, 0)
        .to('#thanking-title-3', { xPercent: -25 }, 0)
        .to('#thanking-title-4', { xPercent: 10 }, 0)

      // Add character split animation for extra coolness
      const titles = document.querySelectorAll('.thanking-text')
      if (!titles) return
      titles.forEach((title) => {
        const chars = title?.textContent?.split('')
        if (!chars) return
        title.innerHTML = chars
          .map(
            (char) =>
              `<span class="inline-block char" style="opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
          )
          .join('')

        gsap.to(title.querySelectorAll('.char'), {
          opacity: 1,
          y: 0,
          rotateY: 0,
          stagger: 0.03,
          scrollTrigger: {
            trigger: '.thanking-scroll',
            start: 'top top',
            end: '+=80%',
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className='w-full'>
      {/* Main thanking section */}
      <section className='thanking-scroll relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-gray-900'>
        {/* Animated background layer - supports light/dark mode */}
        <div className='thanking-background absolute inset-0 -z-10 h-full w-full bg-gray-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-gray-800 dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]' />

        {/* Text content with perspective */}
        <div className='perspective-1000 px-4 md:px-8'>
          <h1
            id='thanking-title-1'
            className='thanking-text mb-2 font-extrabold tracking-tight text-foreground md:mb-4'
            style={{
              transformStyle: 'preserve-3d',
              fontSize: 'clamp(5rem, 8vw, 10rem)',
            }}
          >
            Hey,
          </h1>
          <h1
            id='thanking-title-2'
            className='thanking-text mb-2 font-extrabold tracking-tight text-primary md:mb-4'
            style={{
              transformStyle: 'preserve-3d',
              fontSize: 'clamp(3.5rem, 8vw, 9rem)',
            }}
          >
            you really
          </h1>
          <h1
            id='thanking-title-3'
            className='thanking-text text-2xl font-extrabold tracking-tight text-[#ef4333] dark:text-[#d70000] sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl'
            style={{ transformStyle: 'preserve-3d' }}
          >
            scrolling huh ?
          </h1>
          <em
            id='thanking-title-4'
            className='thanking-text mt-2 font-extrabold tracking-tight text-accent'
            style={{
              transformStyle: 'preserve-3d',
              fontSize: 'clamp(2rem, 5vw, 5rem)',
            }}
          >
            not bottom but close
          </em>
        </div>

        {/* Decorative elements */}
        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div className='absolute left-4 top-10 h-20 w-20 rounded-full bg-indigo-500 opacity-20 blur-3xl dark:bg-blue-500 sm:left-6 sm:top-12 sm:h-24 sm:w-24 md:left-10 md:top-20 md:h-32 md:w-32' />
          <div className='absolute bottom-10 right-4 h-24 w-24 rounded-full bg-purple-500 opacity-20 blur-3xl sm:bottom-12 sm:right-6 sm:h-32 sm:w-32 md:bottom-20 md:right-10 md:h-40 md:w-40' />
        </div>
      </section>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}

export { ThankingView }
