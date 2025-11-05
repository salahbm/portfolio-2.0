import { gsap } from 'gsap'

export function animateRippleWave(
  tl: gsap.core.Timeline,
  elements: HTMLElement[],
  content: HTMLElement
): void {
  // Reset and prep
  tl.set(elements, {
    scaleX: 0,
    opacity: 1,
    transformOrigin: 'left center',
    willChange: 'transform, opacity',
  })

  // Subtle depth illusion
  tl.set(content, { transformOrigin: 'center center', zIndex: 1 })

  // Expand wave (macOS “liquid window” feel)
  tl.to(elements, {
    scaleX: 1.12,
    duration: 0.55,
    ease: 'power3.inOut',
    stagger: { amount: 0.25, from: 'start' },
  })

  // Fade + shrink old content
  tl.to(
    content,
    {
      opacity: 0,
      scale: 0.97,
      filter: 'blur(2px)',
      duration: 0.35,
      ease: 'power2.inOut',
    },
    '-=0.45'
  )

  // Collapse wave to right
  tl.to(elements, {
    scaleX: 0,
    transformOrigin: 'right center',
    duration: 0.42,
    ease: 'power3.inOut',
    stagger: { amount: 0.18, from: 'end' },
  })

  // Bring in new content
  tl.fromTo(
    content,
    { opacity: 0, scale: 1.04, filter: 'blur(1.5px)' },
    {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.55,
      ease: 'power3.out',
      clearProps: 'filter',
    },
    '-=0.3'
  )
}
