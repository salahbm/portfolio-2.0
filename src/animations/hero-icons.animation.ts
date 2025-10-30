import { gsap } from 'gsap'

export const animateIcons = (icons: HTMLElement[]): (() => void) => {
  // Initial entrance animation with varied timing
  icons.forEach((icon, index) => {
    const entranceDelay = index * 0.15

    gsap.fromTo(
      icon,
      { scale: 0, opacity: 0, rotate: -45 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
        delay: entranceDelay,
      }
    )
  })

  // Create unique animations for each icon based on its position
  icons.forEach((icon, index) => {
    const animationType = index % 5 // 5 different animation patterns

    switch (animationType) {
      case 0:
        // Large floating motion with rotation
        gsap.to(icon, {
          y: -25,
          x: 15,
          rotate: 15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        gsap.to(icon, {
          scale: 1.1,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        break

      case 1:
        // Orbital motion
        gsap.to(icon, {
          motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: 20, y: -15 },
              { x: 0, y: -30 },
              { x: -20, y: -15 },
              { x: 0, y: 0 },
            ],
            curviness: 1.5,
          },
          duration: 8,
          repeat: -1,
          ease: 'none',
        })
        gsap.to(icon, {
          rotate: 360,
          duration: 8,
          repeat: -1,
          ease: 'none',
        })
        break

      case 2:
        // Pulse and glow effect
        gsap.to(icon, {
          scale: 1.15,
          opacity: 0.8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })
        gsap.to(icon, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        break

      case 3:
        // Figure-8 motion
        gsap.to(icon, {
          motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: 15, y: -20 },
              { x: 0, y: -40 },
              { x: -15, y: -20 },
              { x: 0, y: 0 },
              { x: -15, y: 20 },
              { x: 0, y: 40 },
              { x: 15, y: 20 },
              { x: 0, y: 0 },
            ],
            curviness: 2,
          },
          duration: 12,
          repeat: -1,
          ease: 'none',
        })
        break

      case 4:
        // Gentle sway with rotation
        gsap.to(icon, {
          x: 20,
          rotate: -10,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        gsap.to(icon, {
          y: 15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        break
    }
  })

  return () => icons.forEach((icon) => gsap.killTweensOf(icon))
}
