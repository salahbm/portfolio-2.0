import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import SplitType from 'split-type'

gsap.registerPlugin(MotionPathPlugin)

export const animateName = (): (() => void) => {
  const ctx = gsap.context(() => {
    const muhammad = document.getElementById('name-muhammad')
    const fullStack = document.getElementById('name-full-stack')
    const engineer = document.getElementById('name-software-engineer')
    if (!muhammad || !fullStack || !engineer) return

    // === Dynamic font sizing only for Muhammad ===
    const resizeFont = () => {
      const parent = muhammad.parentElement
      if (!parent) return
      let fontSize = 10
      muhammad.style.fontSize = `${fontSize}px`
      while (muhammad.scrollWidth < parent.clientWidth && fontSize < 500) {
        fontSize += 2
        muhammad.style.fontSize = `${fontSize}px`
      }
      muhammad.style.fontSize = `${fontSize - 2}px`
    }

    resizeFont()
    window.addEventListener('resize', resizeFont)

    const master = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // === Muhammad: Hero 3D scatter ===
    const splitMain = new SplitType(muhammad, { types: 'chars' })

    if (!splitMain.chars) return

    const tlMain = gsap.timeline()
    splitMain.chars.forEach((char, i) => {
      const delay = i * 0.1
      tlMain.from(
        char,
        {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-150, 150),
          z: gsap.utils.random(-200, 200),
          opacity: 0,
          rotateX: gsap.utils.random(-90, 90),
          rotateY: gsap.utils.random(-90, 90),
          rotateZ: gsap.utils.random(-90, 90),
          duration: gsap.utils.random(1.2, 1.8),
        },
        delay
      )

      // Floating loop
      gsap.to(char, {
        y: `+=${gsap.utils.random(-8, 8)}`,
        rotationZ: gsap.utils.random(-4, 4),
        duration: gsap.utils.random(2, 3),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: delay + 2,
      })
    })

    master.add(tlMain, 0)

    // === a full-stack: Slide from right ===
    const splitSub1 = new SplitType(fullStack, { types: 'chars' })
    const tlSub1 = gsap.timeline()
    tlSub1.from(splitSub1.chars, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power3.out',
    })
    gsap.to(splitSub1.chars, {
      y: `+=${gsap.utils.random(-5, 5)}`,
      rotationZ: gsap.utils.random(-3, 3),
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.5,
    })
    master.add(tlSub1, '>-0.2')

    // === software engineer: Slide from right (softer + stagger delay) ===
    const splitSub2 = new SplitType(engineer, { types: 'chars' })
    const tlSub2 = gsap.timeline()
    tlSub2.from(splitSub2.chars, {
      x: 120,
      opacity: 0,
      duration: 1.4,
      stagger: 0.06,
      ease: 'power2.out',
    })
    gsap.to(splitSub2.chars, {
      y: `+=${gsap.utils.random(-4, 4)}`,
      rotationZ: gsap.utils.random(-2, 2),
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.6,
    })
    master.add(tlSub2, '>-0.1')
  })

  return () => ctx.revert()
}
