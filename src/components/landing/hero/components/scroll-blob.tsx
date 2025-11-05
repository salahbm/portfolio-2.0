'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'motion/react'
import { useUserAgent } from '@/hooks/use-user-agent'
import { cn } from '@/lib/utils'

export default function ScrollBlob() {
  const controls = useAnimation()
  const { isMobile } = useUserAgent()
  const blobRef = useRef<SVGPathElement>(null)
  const [hovered, setHovered] = useState(false)
  const [deform, setDeform] = useState({ tx: 0, ty: 0, s: 1 })

  // === Entrance animation (pop-in then breathing) ===
  useEffect(() => {
    controls
      .start({
        scale: [0.7, 1],
        opacity: [0, 1],
        transition: { duration: 1, ease: 'easeOut' },
      })
      .then(() => {
        controls.start({
          scale: [1, 1.05, 1.03, 1.04, 1.02, 1.01, 1],
          transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
        })
      })
  }, [controls])

  // === Pointer deformation ===
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

  // === Click scroll to next section ===
  const handleScroll = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: window.innerHeight / 2, behavior: 'smooth' })
    }
  }

  // === Blob paths ===
  const defaultPath =
    'M50,-60C70,-40,90,-20,90,0C90,20,70,40,50,60C30,80,10,100,-10,100C-30,100,-50,80,-70,60C-90,40,-100,20,-100,0C-100,-20,-90,-40,-70,-60C-50,-80,-30,-100,-10,-100C10,-100,30,-80,50,-60Z'
  const hoveredPath =
    'M55,-65C75,-45,95,-25,95,0C95,25,75,45,55,65C35,85,15,105,-10,105C-35,105,-55,85,-75,65C-95,45,-105,25,-105,0C-105,-25,-95,-45,-75,-65C-55,-85,-35,-105,-10,-105C15,-105,35,-85,55,-65Z'

  return (
    <div className='absolute right-6 top-12 z-10'>
      <motion.div
        animate={controls}
        onClick={handleScroll}
        data-cursor='pointer'
        className={cn(
          `group relative flex cursor-pointer items-center justify-center`,
          isMobile ? 'size-20' : 'size-24 lg:size-[150px]'
        )}
      >
        <svg
          width={isMobile ? '100' : '150'}
          height={isMobile ? '100' : '150'}
          viewBox='0 0 200 200'
          className='overflow-visible'
          xmlns='http://www.w3.org/2000/svg'
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          cursor='pointer'
        >
          <defs>
            {/* ====== GLOW + DROP SHADOW FILTER ====== */}
            <filter id='blob-glow' x='-50%' y='-50%' width='200%' height='200%'>
              {/* Drop Shadow */}
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='4'
                result='shadow-blur'
              />
              <feOffset in='shadow-blur' dx='0' dy='4' result='shadow-offset' />
              <feFlood
                floodColor='#000000'
                floodOpacity='0.3'
                result='shadow-color'
              />
              <feComposite
                in='shadow-color'
                in2='shadow-offset'
                operator='in'
                result='shadow'
              />

              {/* Colored glow that scales with hover */}
              <feGaussianBlur
                in='SourceGraphic'
                stdDeviation={hovered ? 14 : 6}
                result='blurred'
              />
              <feFlood
                floodColor='hsl(var(--primary))'
                floodOpacity={hovered ? 0.75 : 0.45}
                result='color'
              />
              <feComposite
                in='color'
                in2='blurred'
                operator='in'
                result='glow'
              />

              {/* Merge everything together */}
              <feMerge>
                <feMergeNode in='shadow' />
                <feMergeNode in='glow' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>

          <g transform='translate(100, 100)'>
            <motion.path
              ref={blobRef}
              d={hovered ? hoveredPath : defaultPath}
              animate={{
                x: deform.tx,
                y: deform.ty,
                scale: hovered ? deform.s + 0.1 : deform.s,
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              fill='hsl(var(--accent))'
              filter='url(#blob-glow)'
              style={{
                transformOrigin: 'center',
              }}
            />
          </g>
        </svg>
        {/* ===== Centered Text & Arrow ===== */}
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <motion.div
            className='flex flex-col items-center justify-center'
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.p
              className='font-mono text-sm text-primary-foreground'
              animate={{
                opacity: hovered ? 1 : 0,
                y: hovered ? 0 : -6,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ rotate: -90 }}
            >
              Scroll
            </motion.p>

            <motion.p
              className='animate-bounce font-mono text-2xl leading-none text-primary-foreground'
              animate={{ marginTop: hovered ? 25 : 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              ↓
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
