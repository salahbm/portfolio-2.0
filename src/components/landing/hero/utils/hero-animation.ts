import { gsap } from 'gsap'
import SplitType from 'split-type'

export const animateHeroText = (element: HTMLElement): (() => void) => {
  // Get all direct child spans (sections)
  const sections = Array.from(element.children) as HTMLElement[]
  const masterTl = gsap.timeline()
  const splitInstances: SplitType[] = []

  sections.forEach((section) => {
    const delay = parseFloat(
      section.getAttribute('data-animation-delay') || '0'
    )

    // Split each section into chars for character-by-character animation
    const split = new SplitType(section, {
      types: 'chars,words',
      tagName: 'span',
    })

    splitInstances.push(split)

    if (split.chars) {
      // Animate characters with stagger
      masterTl.from(
        split.chars,
        {
          opacity: 0,
          y: 20,
          rotateX: -90,
          transformOrigin: '50% 50%',
          duration: 0.6,
          ease: 'back.out(1.5)',
          stagger: {
            amount: 0.4,
            from: 'start',
          },
        },
        delay
      )
    }
  })

  // Animate location highlights AFTER text appears
  const highlights = element.querySelectorAll('.group')
  if (highlights.length > 0) {
    masterTl.from(
      highlights,
      {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.2,
      },
      '+=0.3' // Delay after text animation
    )
  }

  // Add subtle continuous animation to gradient text
  const gradientSpans = element.querySelectorAll('.text-gradient-lilac')
  gradientSpans.forEach((span) => {
    gsap.to(span, {
      backgroundPosition: '200% center',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  return () => {
    splitInstances.forEach((split) => {
      split.revert()
    })
  }
}

export const animateIcons = (icons: HTMLElement[]): (() => void) => {
  // Initial entrance animation - faster and simpler
  gsap.fromTo(
    icons,
    { scale: 0, opacity: 0, y: -20 },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: {
        each: 0.08,
        from: 'random',
      },
    }
  )

  // Continuous floating animation - lighter and smoother
  icons.forEach((icon, index) => {
    // Floating movement - reduced range for subtlety
    gsap.to(icon, {
      y: `random(-8, 8)`,
      x: `random(-6, 6)`,
      duration: `random(2.5, 4)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.15,
    })

    // Rotation animation - smaller angles
    gsap.to(icon, {
      rotate: `random(-8, 8)`,
      duration: `random(3, 5)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.2,
    })

    // Scale pulse - more subtle
    gsap.to(icon, {
      scale: `random(0.97, 1.03)`,
      duration: `random(2, 3)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.1,
    })
  })

  return () => icons.forEach((icon) => gsap.killTweensOf(icon))
}
