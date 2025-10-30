import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import SplitType from 'split-type'

gsap.registerPlugin(MotionPathPlugin)

export const animateName = (): (() => void) => {
  const ctx = gsap.context(() => {
    const container = document.getElementById('name-salah')
    if (!container) return

    /**
     * Dynamically scale text to fit inside its parent (respects padding)
     */
    const resizeFont = () => {
      const parent = container.parentElement
      if (!parent) return

      // Get available width inside the parent (accounts for padding)
      const availableWidth = parent.clientWidth

      // Reset font size temporarily to measure text width accurately
      container.style.fontSize = '10px'
      const textWidth = container.scrollWidth

      // Scale font size proportionally to available space
      const scale = availableWidth / textWidth
      container.style.fontSize = `${10 * scale}px`
    }

    resizeFont()
    window.addEventListener('resize', resizeFont)

    // Split each character
    const split = new SplitType(container, { types: 'chars' })
    const letters = split.chars
    if (!letters) return

    // Find the actual “l” element dynamically
    const lIndex = letters.findIndex(
      (char) => char.textContent?.toLowerCase() === 'l'
    )

    letters.forEach((letter, i) => {
      const delay = i * 0.15

      // Handle the actual "l" separately
      if (i === lIndex) {
        gsap.from(letter, {
          motionPath: {
            path: [
              { x: -200, y: 200 },
              { x: 0, y: 0 },
            ],
            curviness: 1.25,
          },
          opacity: 0,
          duration: 1.6,
          delay,
          ease: 'power2.out',
        })

        gsap.to(letter, {
          rotateX: 180,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          repeatDelay: 3.5,
          transformOrigin: 'center center',
        })
        return
      }

      // Animate all other letters by index
      switch (i) {
        case 0:
          gsap.from(letter, {
            y: 200,
            opacity: 0,
            rotate: -30,
            ease: 'elastic.out(1,0.5)',
            duration: 1.5,
            delay,
          })
          break
        case 1:
          gsap.from(letter, {
            scale: 0,
            rotation: 360,
            duration: 1.2,
            delay,
            ease: 'back.out(2)',
          })
          break
        case 2:
          gsap.from(letter, {
            y: -200,
            opacity: 0,
            duration: 1.2,
            delay,
            ease: 'power4.out',
          })
          break
        case 4:
          gsap.from(letter, {
            y: 300,
            opacity: 0,
            rotateX: 90,
            duration: 1.3,
            delay,
            ease: 'expo.out',
          })
          break
      }
    })
  })

  return () => ctx.revert()
}
