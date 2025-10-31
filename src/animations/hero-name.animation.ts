import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import SplitType from 'split-type'

gsap.registerPlugin(MotionPathPlugin)

export const animateName = (): (() => void) => {
  const ctx = gsap.context(() => {
    const container = document.getElementById('name-salah')
    if (!container) return

    /**
     * Dynamically scale text to fill its parent width precisely
     */
    const resizeFont = () => {
      const parent = container.parentElement
      if (!parent) return

      let fontSize = 10
      container.style.fontSize = `${fontSize}px`

      // Incrementally grow until it nearly fills the container
      while (container.scrollWidth < parent.clientWidth && fontSize < 500) {
        fontSize += 2
        container.style.fontSize = `${fontSize}px`
      }

      // Back off slightly to avoid overflow
      container.style.fontSize = `${fontSize - 2}px`
    }

    resizeFont()
    window.addEventListener('resize', resizeFont)

    // Split text into characters
    const split = new SplitType(container, { types: 'chars' })
    const letters = split.chars
    if (!letters) return

    // Global timeline (coordinated sequencing)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    letters.forEach((letter, i) => {
      const delay = i * 0.1
      const randomX = gsap.utils.random(-200, 200)
      const randomY = gsap.utils.random(-150, 150)
      const randomZ = gsap.utils.random(-200, 200)
      const randomRotation = gsap.utils.random(-90, 90)

      // Initial creative entrance (spatial + rotation)
      tl.from(
        letter,
        {
          x: randomX,
          y: randomY,
          z: randomZ,
          opacity: 0,
          rotateX: randomRotation,
          rotateY: randomRotation,
          rotateZ: randomRotation,
          duration: gsap.utils.random(1.2, 2.0),
        },
        delay
      )

      // Continuous organic floating loop
      gsap.to(letter, {
        y: `+=${gsap.utils.random(-10, 10)}`,
        rotationZ: gsap.utils.random(-5, 5),
        duration: gsap.utils.random(2, 3),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: delay + 2,
      })
    })
  })

  return () => ctx.revert()
}
