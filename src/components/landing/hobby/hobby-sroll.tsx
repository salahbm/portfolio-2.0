'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useGSAP } from '@gsap/react'
import { useUserAgent } from '@/hooks/use-user-agent'
import HorryIcons from './horry-icons'

const HobbyScroll = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const { isMobile } = useUserAgent()

  useGSAP(
    () => {
      const root = rootRef.current
      const wrapper = wrapperRef.current
      const slider = sliderRef.current
      if (!root || !wrapper || !slider) return

      const ctx = gsap.context(() => {
        const run = () => {
          // HEADER GROW AFTER CENTER
          gsap.fromTo(
            '.hobbies-header',
            { scale: 0.7 },
            {
              scale: 1.6,
              scrollTrigger: {
                trigger: '.hobbies-header',
                start: 'top center', // starts earlier
                end: 'bottom top', // ends MUCH later
                scrub: 1.2, // smoother scrubbing
              },
            }
          )

          // -----------------------------------------
          // DESKTOP: Horizontal pinned section
          // -----------------------------------------
          if (!isMobile) {
            const sliderWidth = slider.scrollWidth
            const wrapperWidth = wrapper.offsetWidth
            const scrollAmount = sliderWidth - wrapperWidth

            if (scrollAmount > 0) {
              const horizontalTween = gsap.to(slider, {
                x: -scrollAmount,
                ease: 'none',
              })

              ScrollTrigger.create({
                trigger: wrapper,
                start: 'top top',
                end: `+=${scrollAmount}`,
                scrub: true,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                animation: horizontalTween,
              })

              // -----------------------------------------
              // UPDATED PANEL 1 — starts *much lower*, rises smoothly
              // -----------------------------------------
              gsap.fromTo(
                '#hobby-problem-1',
                {
                  opacity: 0,
                  y: 700, // deeper start
                },
                {
                  opacity: 1,
                  y: 0,
                  xPercent: -6,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: '.hobbies-1',
                    start: 'left 95%', // starts much earlier
                    end: 'left 55%',
                    scrub: true,
                    containerAnimation: horizontalTween,
                  },
                }
              )

              gsap.fromTo(
                '#hobby-solution-1',
                {
                  opacity: 0,
                  y: 700,
                },
                {
                  opacity: 1,
                  y: 0,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: '.hobbies-1',
                    start: 'left 88%',
                    end: 'left 55%',
                    scrub: true,
                    containerAnimation: horizontalTween,
                  },
                }
              )

              // PANEL 2
              gsap.to('#hobby-problem-2', {
                opacity: 1,
                rotate: 0,
                scale: 1,
                y: 0,
                duration: 0.9,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: '.hobbies-2',
                  start: 'left 75%',
                  containerAnimation: horizontalTween,
                },
              })
              gsap.to('#hobby-solution-2', {
                opacity: 1,
                duration: 0.6,
                delay: 0.1,
                ease: 'power1.inOut',
                scrollTrigger: {
                  trigger: '.hobbies-2',
                  start: 'left 70%',
                  containerAnimation: horizontalTween,
                },
              })

              // PANEL 3
              gsap.to('#hobby-problem-3', {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.9,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: '.hobbies-3',
                  start: 'left 75%',
                  containerAnimation: horizontalTween,
                },
              })
              gsap.to('#hobby-solution-3', {
                opacity: 1,
                duration: 0.6,
                delay: 0.1,
                ease: 'power1.inOut',
                scrollTrigger: {
                  trigger: '.hobbies-3',
                  start: 'left 70%',
                  containerAnimation: horizontalTween,
                },
              })
            }
          } else {
            // -----------------------------------------
            // MOBILE fallback — vertical reveal
            // -----------------------------------------
            const mobileBlock = (
              triggerSel: string,
              problemSel: string,
              solutionSel: string
            ) => {
              gsap.to(problemSel, {
                opacity: 1,
                duration: 0.8,
                ease: 'power1.inOut',
                scrollTrigger: {
                  trigger: triggerSel,
                  start: 'top 70%',
                },
              })
              gsap.to(solutionSel, {
                opacity: 1,
                duration: 0.6,
                delay: 0.1,
                ease: 'power1.inOut',
                scrollTrigger: {
                  trigger: triggerSel,
                  start: 'top 70%',
                },
              })
            }

            mobileBlock('.hobbies-1', '#hobby-problem-1', '#hobby-solution-1')
            mobileBlock('.hobbies-2', '#hobby-problem-2', '#hobby-solution-2')
            mobileBlock('.hobbies-3', '#hobby-problem-3', '#hobby-solution-3')
          }

          // -----------------------------------------
          // FINAL BLOCK
          // -----------------------------------------
          const disbelief = document.querySelector('.disbelief')
          if (disbelief) {
            gsap.set('.disbelief-word', { y: 80, opacity: 0, scale: 0.95 })
            gsap.to('.disbelief-word', {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.15,
              ease: 'power2.out',
              duration: 1,
              scrollTrigger: {
                trigger: disbelief,
                start: 'top 45%',
              },
            })
          }

          ScrollTrigger.refresh()
        }

        run()

        const onResize = () => {
          ScrollTrigger.refresh()
          run()
        }
        window.addEventListener('resize', onResize)

        return () => {
          window.removeEventListener('resize', onResize)
        }
      }, root)

      return () => ctx.revert()
    },
    { dependencies: [isMobile], scope: rootRef }
  )

  return (
    <div ref={rootRef} className='w-full bg-transparent'>
      {/* =========================
          NEW HEADER
      ========================== */}
      <section className='hobbies-header relative flex h-[120vh] w-full flex-col items-center justify-center pt-10 lg:px-8'>
        <h2 className='text-center font-monument-extended text-3xl font-extrabold uppercase tracking-[0.18em] text-primary md:text-5xl'>
          You think I only code?
        </h2>
        <p className='mt-6 max-w-[850px] text-center font-syne text-2xl font-semibold text-popover-foreground'>
          Lemme in, you will be surprised ;)
        </p>

        <HorryIcons />
      </section>

      {/* =========================
          PINNED HORIZONTAL SCROLL
      ========================== */}
      <div ref={wrapperRef} className='h-screen w-full overflow-hidden'>
        <div
          ref={sliderRef}
          className='flex h-full w-max flex-nowrap items-stretch will-change-transform'
        >
          {/* =========================
              HOBBY 1
          ========================== */}
          <section className='hobbies-1 flex h-screen w-screen items-center justify-center px-6 md:px-10'>
            <div className='relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-12'>
              <div className='hidden md:col-span-1 md:block'>
                <div className='h-56 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20' />
              </div>

              <div className='md:col-span-11'>
                <div className='relative'>
                  <div className='absolute -inset-1 -skew-y-1 rounded-2xl bg-gradient-to-r from-primary/40 via-primary/10 to-transparent blur-md' />
                  <h3
                    id='hobby-problem-1'
                    className='relative w-full rounded-2xl border border-border/50 bg-secondary/70 px-6 py-10 font-syne text-2xl font-extrabold text-secondary-foreground shadow-2xl md:text-4xl'
                  >
                    Gym • Push limits, build consistency.
                  </h3>
                </div>

                <p
                  id='hobby-solution-1'
                  className='mt-6 w-full rounded-xl border border-primary/30 bg-primary/90 px-6 py-8 font-syne text-lg font-semibold text-primary-foreground shadow-lg md:text-xl'
                >
                  When I’m not building things for the web, I’m usually at the
                  gym, trying to test my limits.
                </p>
              </div>
            </div>
          </section>

          {/* =========================
              HOBBY 2
          ========================== */}
          <section className='hobbies-2 flex h-screen w-screen items-center justify-center px-6 md:px-10'>
            <div className='relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-12'>
              <div className='md:col-span-12'>
                <div className='relative'>
                  <div className='pointer-events-none absolute -inset-2 rounded-3xl [background:repeating-linear-gradient(135deg,theme(colors.amber.500/_20),theme(colors.amber.500/_20)_6px,transparent_6px,transparent_12px)]' />
                  <h3
                    id='hobby-problem-2'
                    className='relative w-full -rotate-1 rounded-3xl border-2 border-amber-500/60 bg-amber-50/90 px-6 py-10 font-syne text-2xl font-extrabold text-amber-900 shadow-xl md:text-4xl'
                    style={{
                      opacity: 0,
                      rotate: '3deg',
                      scale: 0.96,
                      transform: 'translateY(5px)',
                    }}
                  >
                    Kitchen experiments • Learning what <em>not</em> to do.
                  </h3>
                </div>

                <p
                  id='hobby-solution-2'
                  className='mt-6 w-full rotate-1 rounded-2xl border-2 border-amber-400/60 bg-white px-6 py-8 font-syne text-lg font-semibold text-amber-900 shadow-md md:text-xl'
                  style={{ opacity: 0 }}
                >
                  I experiment in the kitchen, mostly on weekends <em>not</em>{' '}
                  creating something yummy. (FYI: I am ex-chef.)
                </p>
              </div>
            </div>
          </section>

          {/* =========================
              HOBBY 3
          ========================== */}
          <section className='hobbies-3 flex h-screen w-screen items-center justify-center px-6 md:px-10'>
            <div className='relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-12'>
              <div className='md:col-span-12'>
                <div className='relative'>
                  <div className='absolute -inset-2 rounded-3xl bg-primary/10 blur-2xl' />
                  <h3
                    id='hobby-problem-3'
                    className='relative w-full rounded-3xl border border-slate-200/60 bg-white/60 px-6 py-10 font-syne text-2xl font-extrabold text-slate-900 shadow-lg backdrop-blur-md md:text-4xl'
                    style={{
                      opacity: 0,
                      filter: 'blur(6px)',
                      transform: 'translateY(20px)',
                    }}
                  >
                    Cafés + lofi • Where deep work happens.
                  </h3>
                </div>

                <p
                  id='hobby-solution-3'
                  className='mt-6 w-full rounded-2xl border border-slate-200/60 bg-white px-6 py-8 font-syne text-lg font-semibold text-slate-900 shadow-sm md:text-xl'
                  style={{ opacity: 0 }}
                >
                  I love a good café with a beautiful view and lofi songs —
                  that’s where most of my deep work happens.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =========================
          FINAL: "Don't believe?"
      ========================== */}
      <section className='disbelief relative flex min-h-[120vh] w-full flex-col items-center justify-center px-6 py-24 md:py-36'>
        <div className='fel relative z-[1] mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center'>
          <span className='disbelief-word block font-syne text-5xl font-extrabold uppercase tracking-[0.08em] md:text-7xl'>
            Don’t
          </span>
          <span className='disbelief-word block font-syne text-5xl font-extrabold uppercase tracking-[0.08em] md:text-7xl'>
            believe
          </span>
          <span className='disbelief-word block font-syne text-5xl font-extrabold uppercase tracking-[0.08em] md:text-7xl'>
            ?
          </span>
        </div>
        <div className='relative z-[1] mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center'>
          <span className='disbelief-word block font-syne text-3xl font-extrabold uppercase tracking-[0.08em] md:text-5xl'>
            check
          </span>
          <span className='disbelief-word block font-syne text-3xl font-extrabold uppercase tracking-[0.08em] md:text-5xl'>
            this
          </span>
          <span className='disbelief-word block font-syne text-3xl font-extrabold uppercase tracking-[0.08em] md:text-5xl'>
            out
          </span>
        </div>
      </section>
    </div>
  )
}

export default HobbyScroll
