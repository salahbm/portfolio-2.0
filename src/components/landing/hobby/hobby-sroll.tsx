'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useUserAgent } from '@/hooks/use-user-agent'

gsap.registerPlugin(ScrollTrigger, SplitText)

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
          // ---------------------------
          // VERTICAL HEADER ANIMATION
          // Parallax top->bottom + vertical clip reveal
          // ---------------------------
          const headerParaEl = document.querySelector(
            '.hobbies-header-para'
          ) as HTMLElement | null
          const headerTitleEl = document.querySelector(
            '.hobbies-header-title'
          ) as HTMLElement | null
          const headerBlock = document.querySelector(
            '.hobbies-header'
          ) as HTMLElement | null

          if (headerBlock && headerParaEl && headerTitleEl) {
            const headerSplit = new SplitText(headerParaEl, {
              type: 'words,lines',
            })

            // Initial states
            gsap.set(headerTitleEl, {
              y: -60,
              opacity: 0,
              clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            })
            gsap.set(headerSplit.words, { y: 60, opacity: 0 })

            const headerTl = gsap.timeline({
              scrollTrigger: {
                trigger: headerBlock,
                start: 'top bottom', // enter viewport
                end: 'bottom top', // leave viewport
                scrub: true,
              },
            })

            // Title: slide from top, reveal downward
            headerTl.to(
              headerTitleEl,
              {
                y: 0,
                opacity: 1,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                ease: 'power2.out',
                duration: 0.6,
              },
              0
            )

            // Paragraph words: rise from below progressively
            headerTl.to(
              headerSplit.words,
              {
                y: 0,
                opacity: 1,
                stagger: 0.02,
                ease: 'power2.out',
                duration: 0.4,
              },
              0.05
            )
          }

          // ---------------------------
          // DESKTOP: Horizontal pinned section
          // ---------------------------
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

              // PANEL 1 REVEALS
              gsap.to('#hobby-problem-1', {
                opacity: 1,
                xPercent: -6,
                duration: 0.8,
                ease: 'power1.inOut',
                scrollTrigger: {
                  trigger: '.hobbies-1',
                  start: 'left 75%',
                  containerAnimation: horizontalTween,
                },
              })
              gsap.to('#hobby-solution-1', {
                opacity: 1,
                duration: 0.6,
                delay: 0.1,
                ease: 'power1.inOut',
                scrollTrigger: {
                  trigger: '.hobbies-1',
                  start: 'left 70%',
                  containerAnimation: horizontalTween,
                },
              })

              // PANEL 2 REVEALS
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

              // PANEL 3 REVEALS
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
            // ---------------------------
            // MOBILE: Vertical only
            // ---------------------------
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
                  end: 'bottom center',
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
                  end: 'bottom center',
                },
              })
            }

            mobileBlock('.hobbies-1', '#hobby-problem-1', '#hobby-solution-1')
            mobileBlock('.hobbies-2', '#hobby-problem-2', '#hobby-solution-2')
            mobileBlock('.hobbies-3', '#hobby-problem-3', '#hobby-solution-3')
          }

          // ---------------------------
          // FINAL BLOCK: "Don't believe?"
          // ---------------------------
          const disbelief = document.querySelector('.disbelief')
          if (disbelief) {
            gsap.set('.disbelief-word', { y: 80, opacity: 0, scale: 0.95 })
            gsap.to('.disbelief-word', {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.08,
              ease: 'power2.out',
              duration: 0.6,
              scrollTrigger: {
                trigger: disbelief,
                start: 'top 70%',
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
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger && root.contains(st.trigger as Node)) st.kill()
          })
          gsap.killTweensOf(root.querySelectorAll('*'))
        }
      }, root)

      return () => ctx.revert()
    },
    { dependencies: [isMobile], scope: rootRef }
  )

  return (
    <div ref={rootRef} className='w-full bg-transparent'>
      {/* =========================
          VERTICAL HEADER (Parallax top->bottom)
      ========================== */}
      <section className='hobbies-header relative flex h-screen w-full items-center justify-center px-8 pt-10'>
        {/* Subtle gradient guide from top to bottom */}
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5' />
        <div className='relative z-[1] flex w-full flex-col items-center justify-center gap-4'>
          <h2 className='hobbies-header-title font-syne text-5xl font-extrabold uppercase tracking-[0.25em] text-primary md:text-6xl'>
            Hobbies
          </h2>
          <p className='hobbies-header-para w-full max-w-[1000px] px-8 text-left font-syne text-2xl font-bold leading-snug lg:px-0'>
            Personal bits that keep me curious and balanced while I build for
            the web.
          </p>
        </div>
      </section>

      {/* =========================
          PINNED HORIZONTAL SCROLL
      ========================== */}
      <div
        ref={wrapperRef}
        className='h-screen w-full overflow-hidden bg-transparent'
      >
        <div
          ref={sliderRef}
          className='flex h-full w-max flex-nowrap items-stretch will-change-transform'
        >
          {/* =========================
              HOBBY 1: GYM — bold / kinetic
          ========================== */}
          <section className='hobbies-1 flex h-screen w-screen items-center justify-center px-6 md:px-10'>
            <div className='relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-12'>
              {/* Left accent bar */}
              <div className='hidden md:col-span-1 md:block'>
                <div className='h-56 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20' />
              </div>

              <div className='md:col-span-11'>
                <div className='relative'>
                  {/* kinetic border wrapper */}
                  <div className='absolute -inset-1 -skew-y-1 rounded-2xl bg-gradient-to-r from-primary/40 via-primary/10 to-transparent blur-md' />
                  <h3
                    id='hobby-problem-1'
                    className='relative w-full rounded-2xl border border-border/50 bg-secondary/70 px-6 py-10 font-syne text-2xl font-extrabold text-secondary-foreground shadow-2xl md:text-4xl'
                    style={{ opacity: 0 }}
                  >
                    Gym • Push limits, build consistency.
                  </h3>
                </div>

                <p
                  id='hobby-solution-1'
                  className='mt-6 w-full rounded-xl border border-primary/30 bg-primary/90 px-6 py-8 font-syne text-lg font-semibold text-primary-foreground shadow-lg md:text-xl'
                  style={{ opacity: 0 }}
                >
                  When I’m not building things for the web, I’m usually at the
                  gym, trying to test my limits.
                </p>
              </div>
            </div>
          </section>

          {/* =========================
              HOBBY 2: COOKING — warm / playful / doodle
          ========================== */}
          <section className='hobbies-2 flex h-screen w-screen items-center justify-center px-6 md:px-10'>
            <div className='relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-12'>
              {/* Doodle frame */}
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
                  I experiment in the kitchen, mostly learning what <em>not</em>{' '}
                  to do. (FYI: I was a chef.)
                </p>
              </div>
            </div>
          </section>

          {/* =========================
              HOBBY 3: CAFÉ + LOFI — soft / airy / glow
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
      <section className='disbelief relative flex min-h-[80vh] w-full items-center justify-center px-6 py-24 md:py-36'>
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent' />
        <div className='relative z-[1] mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center'>
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
      </section>
    </div>
  )
}

export default HobbyScroll
