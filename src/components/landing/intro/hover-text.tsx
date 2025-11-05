'use client'

import { useRef } from 'react'
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
  containerRefs,
}: {
  wordKey: string
  label: string
  activeWord: string | null
  setActiveWord: (word: string | null) => void
  containerRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>
}) => {
  const imgs = hoverImages[wordKey] || []
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({})

  const hideImages = (word: string) => {
    const container = containerRefs.current[word]
    if (!container) return
    const imgs = container.querySelectorAll('.hover-image')
    gsap.to(imgs, {
      opacity: 0,
      scale: 0.85,
      duration: 0.35,
      stagger: 0.04,
      ease: 'power2.in',
      onComplete: () => {
        if (activeWord === word) setActiveWord(null)
      },
    })
  }

  const handleMouseEnter = (word: string) => {
    if (timeoutRefs.current[word]) {
      clearTimeout(timeoutRefs.current[word])
      delete timeoutRefs.current[word]
    }
    setActiveWord(word)
  }

  const handleMouseLeave = (word: string) => {
    timeoutRefs.current[word] = setTimeout(() => {
      hideImages(word)
      delete timeoutRefs.current[word]
    }, 150)
  }

  return (
    <motion.span
      className='relative z-[60] mx-2 inline-block cursor-pointer bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text font-semibold tracking-wide text-transparent transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(180,160,255,0.7)]'
      onMouseEnter={() => handleMouseEnter(wordKey)}
      onMouseLeave={() => handleMouseLeave(wordKey)}
      whileHover={{
        scale: 1.06,
        transition: { duration: 0.25 },
      }}
    >
      {label}

      {activeWord === wordKey && (
        <div
          ref={(el) => {
            if (el) containerRefs.current[wordKey] = el
          }}
          onMouseEnter={() => handleMouseEnter(wordKey)}
          onMouseLeave={() => handleMouseLeave(wordKey)}
          className='pointer-events-auto absolute left-1/2 top-1/2 z-[100] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2'
        >
          {imgs[0] && (
            <motion.div
              className='hover-image absolute left-1/2 top-[-180px] -translate-x-1/2'
              style={{ rotate: '-5deg' }}
            >
              <Image
                src={imgs[0].src}
                alt={`${label} top`}
                width={150}
                height={150}
                className='rounded-3xl border border-white/30 bg-white/5 object-cover shadow-[0_8px_30px_rgba(175,130,255,0.4)] backdrop-blur-lg transition-transform duration-300 hover:scale-105'
                unoptimized
                priority
              />
            </motion.div>
          )}
          {imgs[1] && (
            <motion.div
              className='hover-image absolute left-[-200px] top-1/2 -translate-y-1/2'
              style={{ rotate: '-10deg' }}
            >
              <Image
                src={imgs[1].src}
                alt={`${label} left`}
                width={140}
                height={140}
                className='rounded-3xl border border-white/30 bg-white/5 object-cover shadow-[0_8px_30px_rgba(120,180,255,0.4)] backdrop-blur-lg transition-transform duration-300 hover:scale-105'
                unoptimized
                priority
              />
            </motion.div>
          )}
          {imgs[2] && (
            <motion.div
              className='hover-image absolute right-[-200px] top-1/2 -translate-y-1/2'
              style={{ rotate: '10deg' }}
            >
              <Image
                src={imgs[2].src}
                alt={`${label} right`}
                width={140}
                height={140}
                className='rounded-3xl border border-white/30 bg-white/5 object-cover shadow-[0_8px_30px_rgba(200,150,255,0.4)] backdrop-blur-lg transition-transform duration-300 hover:scale-105'
                unoptimized
                priority
              />
            </motion.div>
          )}
        </div>
      )}
    </motion.span>
  )
}

export default HoverText
