'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'motion/react'

export default function ScrollBlob() {
  const controls = useAnimation()
  const blobRef = useRef<SVGPathElement>(null)
  const [hovered, setHovered] = useState(false)
  const [deform, setDeform] = useState({ tx: 0, ty: 0, s: 1 })

  // === Entrance animation (pop-in then breathing) ===
  useEffect(() => {
    controls
      .start({
        scale: [0.8, 1],
        opacity: [0, 1],
        transition: { duration: 1, ease: 'easeOut' },
      })
      .then(() => {
        controls.start({
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
        })
      })
  }, [controls])

  // === Interactive deformation effect ===
  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const el = blobRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    const r = Math.hypot(x, y)
    const max = Math.min(rect.width, rect.height) / 2
    const t = Math.min(r / max, 1)

    const tx = x * 0.1
    const ty = y * 0.1
    const s = 1 + t * 0.04
    setDeform({ tx, ty, s })
  }

  function onPointerLeave() {
    setDeform({ tx: 0, ty: 0, s: 1 })
    setHovered(false)
  }

  // === Click: smooth scroll to next section ===
  const handleScroll = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)')
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    } else {
      // Fallback to scrolling one viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className='absolute right-5 top-5 translate-y-1/2'>
      <motion.div
        animate={controls}
        className='group relative flex size-[150px] cursor-pointer items-center justify-center'
        onClick={handleScroll}
      >
        <svg
          width='150'
          height='150'
          viewBox='0 0 200 200'
          className='overflow-visible'
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
        >
          <motion.path
            ref={blobRef}
            d={
              hovered
                ? 'M55,-65C75,-45,95,-25,95,0C95,25,75,45,55,65C35,85,15,105,-10,105C-35,105,-55,85,-75,65C-95,45,-105,25,-105,0C-105,-25,-95,-45,-75,-65C-55,-85,-35,-105,-10,-105C15,-105,35,-85,55,-65Z'
                : 'M50,-60C70,-40,90,-20,90,0C90,20,70,40,50,60C30,80,10,100,-10,100C-30,100,-50,80,-70,60C-90,40,-100,20,-100,0C-100,-20,-90,-40,-70,-60C-50,-80,-30,-100,-10,-100C10,-100,30,-80,50,-60Z'
            }
            animate={{
              transform: `translate(${deform.tx}px, ${deform.ty}px) scale(${
                hovered ? deform.s + 0.1 : deform.s
              })`,
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            fill='hsl(var(--primary))'
            transform='translate(100 100)'
            style={{
              transformBox: 'fill-box',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>

        {/* Centered Text - positioned absolutely to center over blob */}
        <div className='pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4'>
          {/* "Scroll" text: appears on hover */}
          <p className='-rotate-90 font-mono text-sm text-primary-foreground opacity-0 transition-all duration-500 group-hover:opacity-100'>
            Scroll
          </p>
          {/* ↓ Arrow always visible and centered */}
          <p className='font-mono text-2xl leading-none text-primary-foreground'>
            ↓
          </p>
        </div>
      </motion.div>
    </div>
  )
}
