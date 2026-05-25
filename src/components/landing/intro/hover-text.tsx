'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Image from 'next/image'

type ImageData = {
  id: number
  src: string
  width: number
  height: number
}

const hoverImages: Record<string, ImageData[]> = {
  bukhara: [
    { id: 1, src: '/intro/bukhara-1.jpg', width: 900, height: 519 },
    { id: 2, src: '/intro/bukhara-2.jpg', width: 900, height: 628 },
    { id: 3, src: '/intro/bukhara-3.jpg', width: 675, height: 900 },
  ],
  seoul: [
    { id: 1, src: '/intro/seoul-1.jpg', width: 900, height: 600 },
    { id: 2, src: '/intro/seoul-2.jpg', width: 900, height: 628 },
    { id: 3, src: '/intro/seoul-3.jpg', width: 675, height: 900 },
  ],
  dankook: [
    { id: 1, src: '/intro/dankook-1.jpg', width: 900, height: 884 },
    { id: 2, src: '/intro/dankook-2.jpg', width: 900, height: 546 },
    { id: 3, src: '/intro/dankook-3.jpg', width: 675, height: 900 },
  ],
}

const imagePositions = [
  {
    className:
      'left-0 top-1/2 -translate-x-[calc(150%+0.75em)] -translate-y-1/2',
    transform: 'translate(40%, -7.5%) rotate(-10deg)',
    enter: { x: -18, y: -6, rotate: -14 },
    exit: { x: -52, y: 18, rotate: -24 },
  },
  {
    className:
      'left-full top-1/2 -translate-y-1/2 translate-x-[calc(50%+0.75em)]',
    transform: 'translate(12.5%, -17.5%) rotate(8deg)',
    enter: { x: 18, y: -18, rotate: 14 },
    exit: { x: 54, y: -22, rotate: 24 },
  },
  {
    className: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-[70%]',
    transform: 'translate(15%, 17.5%) rotate(-5deg)',
    enter: { x: 6, y: -22, rotate: -8 },
    exit: { x: 10, y: -58, rotate: 15 },
  },
]

const HoverText = ({
  wordKey,
  label,
  activeWord,
  setActiveWord,
}: {
  wordKey: string
  label: string
  activeWord: string | null
  setActiveWord: (word: string | null) => void
}) => {
  const imgs = hoverImages[wordKey] || []
  const boxRefs = useRef<(HTMLDivElement | null)[]>([])
  const isActive = activeWord === wordKey

  useEffect(() => {
    const boxes = boxRefs.current.filter(Boolean)
    if (boxes.length === 0) return

    if (isActive) {
      gsap.fromTo(
        boxes,
        (index: number) => ({
          scale: 0.62,
          autoAlpha: 0,
          x: imagePositions[index].enter.x,
          y: imagePositions[index].enter.y,
          rotate: imagePositions[index].enter.rotate,
          filter: 'blur(10px) saturate(0.85)',
        }),
        {
          scale: 1,
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotate: 0,
          filter: 'blur(0px) saturate(1)',
          duration: 0.72,
          ease: 'elastic.out(1, 0.55)',
          stagger: 0.045,
        }
      )
    } else {
      gsap.to(boxes, {
        scale: 0.48,
        autoAlpha: 0,
        x: (index) => imagePositions[index].exit.x,
        y: (index) => imagePositions[index].exit.y,
        rotate: (index) => imagePositions[index].exit.rotate,
        filter: 'blur(8px) saturate(0.7)',
        duration: 0.32,
        ease: 'power3.in',
        stagger: 0.035,
      })
    }
  }, [isActive])

  const handleMouseEnter = () => {
    setActiveWord(wordKey)
  }

  const handleMouseLeave = () => {
    setActiveWord(null)
  }

  return (
    <div
      className='relative z-[60] inline-block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.p
        className='hover-word relative inline-block cursor-pointer font-bold tracking-wide !text-[hsl(var(--accent))] drop-shadow-[0_0_16px_hsl(var(--accent)/0.18)] transition-all duration-300'
        whileHover={{
          scaleY: 1.1,
          transition: {
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          },
        }}
      >
        {label}
      </motion.p>

      <div
        className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        aria-hidden='true'
      >
        {imgs.map((img, index) => (
          <div
            key={img.id}
            ref={(el) => {
              boxRefs.current[index] = el
            }}
            className={`invisible absolute opacity-0 ${imagePositions[index].className}`}
            style={{
              width: '8rem',
              aspectRatio: '1',
            }}
          >
            <div
              className='h-full w-full'
              style={{
                transform: imagePositions[index].transform,
              }}
            >
              <Image
                src={img.src}
                alt=''
                width={img.width}
                height={img.height}
                sizes='8rem'
                className='h-full w-full rounded-[0.2em] object-cover opacity-100 shadow-[0px_0.2px_0.2px_rgba(0,0,0,0.24),0.1px_1.4px_1.6px_-0.4px_rgba(0,0,0,0.24),0.2px_4.4px_5px_-1.1px_rgba(0,0,0,0.24),0.4px_10.9px_12.3px_-1.8px_rgba(0,0,0,0.22),0.9px_24.4px_27.5px_-2.5px_rgba(0,0,0,0.22)]'
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HoverText
