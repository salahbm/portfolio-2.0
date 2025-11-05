'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Image from 'next/image'

type ImageData = { id: number; src: string }

const hoverImages: Record<string, ImageData[]> = {
  bukhara: [
    { id: 1, src: '/medias/images/avatar.webp' },
    { id: 2, src: '/medias/images/avatar.webp' },
    { id: 3, src: '/medias/images/avatar.webp' },
  ],
  seoul: [
    { id: 1, src: '/medias/images/avatar.webp' },
    { id: 2, src: '/medias/images/avatar.webp' },
    { id: 3, src: '/medias/images/avatar.webp' },
  ],
  dankook: [
    { id: 1, src: '/medias/images/avatar.webp' },
    { id: 2, src: '/medias/images/avatar.webp' },
    { id: 3, src: '/medias/images/avatar.webp' },
  ],
}

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
        { scale: 0 },
        { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)', stagger: 0 }
      )
    } else {
      gsap.to(boxes, { scale: 0, duration: 0.2, ease: 'power2.in' })
    }
  }, [isActive])

  const handleMouseEnter = () => {
    setActiveWord(wordKey)
  }

  const handleMouseLeave = () => {
    setActiveWord(null)
  }

  return (
    <span
      className='relative z-[60] inline-block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.a
        className='inline-block cursor-pointer bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text font-semibold tracking-wide text-transparent opacity-30 outline-none transition-opacity duration-200'
        whileHover={{
          opacity: 1,
          scaleY: 1.15,
          transition: {
            opacity: { duration: 0.2 },
            scaleY: { duration: 0.875, ease: [0.34, 1.56, 0.64, 1] },
          },
        }}
      >
        {label}
      </motion.a>

      {/* Image holders - positioned around the text */}
      {isActive && (
        <div
          className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left image */}
          {imgs[0] && (
            <div
              ref={(el) => {
                boxRefs.current[0] = el
              }}
              className='absolute left-0 top-1/2 -translate-x-[calc(150%+0.75em)] -translate-y-1/2'
              style={{
                width: '8rem',
                aspectRatio: '1',
              }}
            >
              <div
                className='h-full w-full'
                style={{
                  transform:
                    'translate(calc(-0.5 * -80%), calc(-0.5 * 15%)) rotate(-10deg)',
                  transition:
                    'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <Image
                  src={imgs[0].src}
                  alt={`${label} left`}
                  width={128}
                  height={128}
                  className='duration-[250ms] h-full w-full rounded-[0.2em] object-cover opacity-100 shadow-[0px_0.2px_0.2px_rgba(0,0,0,0.34),0.1px_1.4px_1.6px_-0.4px_rgba(0,0,0,0.34),0.1px_2.7px_3px_-0.7px_rgba(0,0,0,0.34),0.2px_4.4px_5px_-1.1px_rgba(0,0,0,0.34),0.3px_7px_7.9px_-1.4px_rgba(0,0,0,0.34),0.4px_10.9px_12.3px_-1.8px_rgba(0,0,0,0.34),0.6px_16.6px_18.7px_-2.1px_rgba(0,0,0,0.34),0.9px_24.4px_27.5px_-2.5px_rgba(0,0,0,0.34)] transition-opacity'
                  style={{
                    mixBlendMode: 'plus-lighter',
                  }}
                  unoptimized
                  priority
                />
              </div>
            </div>
          )}

          {/* Right image */}
          {imgs[1] && (
            <div
              ref={(el) => {
                boxRefs.current[1] = el
              }}
              className='absolute left-full top-1/2 -translate-y-1/2 translate-x-[calc(50%+0.75em)]'
              style={{
                width: '8rem',
                aspectRatio: '1',
              }}
            >
              <div
                className='h-full w-full'
                style={{
                  transform:
                    'translate(calc(0.5 * 25%), calc(0.5 * -35%)) rotate(8deg)',
                  transition:
                    'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <Image
                  src={imgs[1].src}
                  alt={`${label} right`}
                  width={128}
                  height={128}
                  className='duration-[250ms] h-full w-full rounded-[0.2em] object-cover opacity-100 shadow-[0px_0.2px_0.2px_rgba(0,0,0,0.34),0.1px_1.4px_1.6px_-0.4px_rgba(0,0,0,0.34),0.1px_2.7px_3px_-0.7px_rgba(0,0,0,0.34),0.2px_4.4px_5px_-1.1px_rgba(0,0,0,0.34),0.3px_7px_7.9px_-1.4px_rgba(0,0,0,0.34),0.4px_10.9px_12.3px_-1.8px_rgba(0,0,0,0.34),0.6px_16.6px_18.7px_-2.1px_rgba(0,0,0,0.34),0.9px_24.4px_27.5px_-2.5px_rgba(0,0,0,0.34)] transition-opacity'
                  style={{
                    mixBlendMode: 'plus-lighter',
                  }}
                  unoptimized
                  priority
                />
              </div>
            </div>
          )}

          {/* Top image */}
          {imgs[2] && (
            <div
              ref={(el) => {
                boxRefs.current[2] = el
              }}
              className='absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-[70%]'
              style={{
                width: '8rem',
                aspectRatio: '1',
              }}
            >
              <div
                className='h-full w-full'
                style={{
                  transform:
                    'translate(calc(0.5 * 30%), calc(0.5 * 35%)) rotate(-5deg)',
                  transition:
                    'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <Image
                  src={imgs[2].src}
                  alt={`${label} top`}
                  width={128}
                  height={128}
                  className='duration-[250ms] h-full w-full rounded-[0.2em] object-cover opacity-100 shadow-[0px_0.2px_0.2px_rgba(0,0,0,0.34),0.1px_1.4px_1.6px_-0.4px_rgba(0,0,0,0.34),0.1px_2.7px_3px_-0.7px_rgba(0,0,0,0.34),0.2px_4.4px_5px_-1.1px_rgba(0,0,0,0.34),0.3px_7px_7.9px_-1.4px_rgba(0,0,0,0.34),0.4px_10.9px_12.3px_-1.8px_rgba(0,0,0,0.34),0.6px_16.6px_18.7px_-2.1px_rgba(0,0,0,0.34),0.9px_24.4px_27.5px_-2.5px_rgba(0,0,0,0.34)] transition-opacity'
                  style={{
                    mixBlendMode: 'plus-lighter',
                  }}
                  unoptimized
                  priority
                />
              </div>
            </div>
          )}
        </div>
      )}
    </span>
  )
}

export default HoverText
