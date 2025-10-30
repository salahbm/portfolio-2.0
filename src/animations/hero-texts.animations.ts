import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import SplitType from 'split-type'

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin)

export const animateHeroText = (element: HTMLElement): (() => void) => {
  // Get all direct child spans (sections)
  const sections = Array.from(element.children) as HTMLElement[]
  const masterTl = gsap.timeline()
  const splitInstances: SplitType[] = []

  sections.forEach((section) => {
    const delay = parseFloat(
      section.getAttribute('data-animation-delay') || '0'
    )

    // Check if section has gradient class
    const hasGradient = section.classList.contains('text-gradient-lilac')
    const gradientClasses = hasGradient
      ? Array.from(section.classList).filter((c) => c.includes('gradient'))
      : []

    // Split each section into chars for character-by-character animation
    const split = new SplitType(section, {
      types: 'chars,words',
      tagName: 'span',
    })

    splitInstances.push(split)

    // If has gradient, reapply to parent wrapper after split
    if (hasGradient && split.chars) {
      // Remove gradient from individual chars
      split.chars.forEach((char) => {
        gradientClasses.forEach((cls) => char.classList.remove(cls))
      })
      // Ensure parent keeps gradient
      gradientClasses.forEach((cls) => section.classList.add(cls))
    }

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
