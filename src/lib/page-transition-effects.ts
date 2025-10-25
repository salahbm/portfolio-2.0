import gsap from 'gsap'

/**
 * Liquid morphing circles transition effect
 */
export const liquidMorphTransition = (
  circles: HTMLElement[],
  content: HTMLElement
): gsap.core.Timeline => {
  const tl = gsap.timeline()

  // Set initial state
  tl.set(circles, {
    scale: 0,
    opacity: 1,
  })

  // Expand circles with stagger effect
  tl.to(circles, {
    scale: 3,
    duration: 0.8,
    ease: 'power3.inOut',
    stagger: {
      amount: 0.15,
      from: 'random',
    },
  })

  // Fade out old content
  tl.to(
    content,
    {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: 'power2.in',
    },
    '-=0.6'
  )

  // Contract circles
  tl.to(circles, {
    scale: 0,
    duration: 0.6,
    ease: 'power3.inOut',
    stagger: {
      amount: 0.1,
      from: 'random',
    },
  })

  // Fade in new content
  tl.fromTo(
    content,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    },
    '-=0.4'
  )

  return tl
}

/**
 * Ripple wave transition effect
 */
export const rippleWaveTransition = (
  waves: HTMLElement[],
  content: HTMLElement
): gsap.core.Timeline => {
  const tl = gsap.timeline()

  // Set initial state
  tl.set(waves, {
    scaleX: 0,
    opacity: 1,
    transformOrigin: 'left center',
  })

  // Expand waves from left to right
  tl.to(waves, {
    scaleX: 1,
    duration: 0.7,
    ease: 'power2.inOut',
    stagger: {
      amount: 0.2,
    },
  })

  // Fade out old content
  tl.to(
    content,
    {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
    },
    '-=0.5'
  )

  // Contract waves from right
  tl.to(waves, {
    scaleX: 0,
    transformOrigin: 'right center',
    duration: 0.6,
    ease: 'power2.inOut',
    stagger: {
      amount: 0.15,
    },
  })

  // Fade in new content
  tl.fromTo(
    content,
    {
      opacity: 0,
      scale: 1.05,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    },
    '-=0.4'
  )

  return tl
}

export function animateRippleWave(
  tl: gsap.core.Timeline,
  elements: HTMLElement[],
  content: HTMLElement
): void {
  tl.set(elements, { scaleX: 0, opacity: 1, transformOrigin: 'left center' })
  tl.to(elements, {
    scaleX: 1,
    duration: 0.5,
    ease: 'power2.inOut',
    stagger: { amount: 0.2 },
  })
  tl.to(
    content,
    { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' },
    '-=0.5'
  )
  tl.to(elements, {
    scaleX: 0,
    transformOrigin: 'right center',
    duration: 0.35,
    ease: 'power2.inOut',
    stagger: { amount: 0.15 },
  })
  tl.fromTo(
    content,
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
    '-=0.4'
  )
}
