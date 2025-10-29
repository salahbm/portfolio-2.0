import { gsap } from 'gsap'
import SplitType from 'split-type'

export const animateHeroText = (element: HTMLElement): (() => void) => {
  const split = new SplitType(element, { types: 'words,chars' })

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Animate words with stagger
  tl.from(split.words, {
    yPercent: 100,
    opacity: 0,
    rotateX: -90,
    scale: 0.8,
    duration: 1,
    stagger: {
      each: 0.03,
      ease: 'power2.out',
    },
  })

  // Add subtle continuous animation to gradient text
  const gradientSpans = element.querySelectorAll('.text-gradient-lilac')
  gradientSpans.forEach((span) => {
    gsap.to(span, {
      backgroundPosition: '200% center',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  return () => split.revert()
}

export const animateIcons = (icons: HTMLElement[]): (() => void) => {
  // Initial entrance animation
  gsap.fromTo(
    icons,
    { scale: 0, rotate: -180, opacity: 0, y: -50 },
    {
      scale: 1,
      rotate: 0,
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
      stagger: {
        each: 0.15,
        from: 'random',
      },
    }
  )

  // Continuous floating animation
  icons.forEach((icon, index) => {
    // Floating movement
    gsap.to(icon, {
      y: `random(-${10 + index * 2}, ${10 + index * 2})`,
      x: `random(-${8 + index}, ${8 + index})`,
      duration: `random(3, 6)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.2,
    })

    // Rotation animation
    gsap.to(icon, {
      rotate: `random(-15, 15)`,
      duration: `random(4, 8)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.3,
    })

    // Scale pulse
    gsap.to(icon, {
      scale: `random(0.95, 1.05)`,
      duration: `random(2, 4)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.1,
    })
  })

  return () => icons.forEach((icon) => gsap.killTweensOf(icon))
}
