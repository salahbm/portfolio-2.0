import { gsap } from 'gsap'

export const animateAka = (): (() => void) => {
  const ctx = gsap.context(() => {
    const akaContainer = document.getElementById('aka-container')
    if (!akaContainer) return

    const layers = akaContainer.querySelectorAll('span.pointer-events-none') // the colored layers
    const sparks = akaContainer.querySelectorAll('span.rounded-full') // spark elements
    const topText = akaContainer.querySelector('span.relative') // the white/green top text

    // --- Intro timeline ---
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Step 1: base container fade-in (very light)
    tl.fromTo(
      akaContainer,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.8 }
    )

    // Step 2: each colored layer enters separately
    tl.from(
      layers,
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.15,
      },
      '-=0.3'
    )

    // Step 3: sparks appear with pop and glow
    tl.from(
      sparks,
      {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      },
      '-=0.2'
    )

    // Step 4: final top text (white/green) slides in gently
    if (topText) {
      tl.fromTo(
        topText,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.1'
      )
    }
  })

  return () => ctx.revert()
}
