'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Reel,
  ReelContent,
  ReelItem as ReelItemType,
  ReelItem,
  ReelNavigation,
  ReelVideo,
  ReelImage,
} from '@/components/ui/reel'
import { IPhoneMockup } from '@/components/ui/iphone-mockup'
import { StoryOverlay } from '@/components/ui/story-overlay'

const reels: ReelItemType[] = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=700&fit=crop',
    duration: 5,
    title: '💪 The Iron Temple',
    description:
      'Where discipline meets determination. Every rep is a step closer to greatness.',
  },
  {
    id: 2,
    type: 'video',
    src: 'https://wajxiz6qhqyqkm0o.public.blob.vercel-storage.com/grok-imagine-1.mp4',
    duration: 6,
    title: '🏋️ Strength & Code',
    description:
      'Building mental and physical resilience. Strong body, stronger mind.',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=700&fit=crop',
    duration: 5,
    title: '🔥 Beyond Limits',
    description:
      'Pushing boundaries in the gym translates to breaking barriers in code.',
  },
]

const HobbyView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Animate main title on mount
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.2,
        }
      )
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.6,
        }
      )
    }
  }, [])

  return (
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20'>
      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          scale: [0, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0, 0.2, 0.1],
        }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className='absolute left-10 top-20 h-64 w-64 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl'
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          scale: [0, 1.3, 1],
          rotate: [0, -90, 0],
          opacity: [0, 0.2, 0.1],
        }}
        transition={{
          duration: 2.5,
          ease: 'easeOut',
          delay: 0.3,
        }}
        className='absolute bottom-20 right-10 h-80 w-80 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 blur-3xl'
      />

      {/* Content Container */}
      <div className='relative z-10 flex w-full max-w-7xl flex-col items-center gap-12 px-4 lg:flex-row lg:items-start lg:justify-between lg:gap-16'>
        {/* Header Section - Left side on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className='flex-1 text-center lg:text-left'
        >
          <h1
            ref={titleRef}
            className='mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-6xl lg:text-7xl'
          >
            Beyond The Code 💪
          </h1>
          <p
            ref={subtitleRef}
            className='mb-6 text-lg text-gray-400 md:text-xl lg:text-2xl'
          >
            When I'm not coding, I'm crushing it at the gym
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className='space-y-4 text-left text-gray-300'
          >
            <p className='flex items-start gap-3'>
              <span className='text-2xl'>🎯</span>
              <span>
                <strong className='text-white'>Discipline:</strong> The gym
                teaches consistency - showing up even when motivation fades
              </span>
            </p>
            <p className='flex items-start gap-3'>
              <span className='text-2xl'>⚡</span>
              <span>
                <strong className='text-white'>Energy:</strong> Physical fitness
                fuels mental clarity for better problem-solving
              </span>
            </p>
            <p className='flex items-start gap-3'>
              <span className='text-2xl'>💯</span>
              <span>
                <strong className='text-white'>Growth:</strong> Progressive
                overload in fitness mirrors continuous learning in tech
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* iPhone Mockup with Reel - Right side on desktop */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className='shrink-0'
        >
          <IPhoneMockup>
            <Reel
              data={reels}
              className='h-full w-full'
              autoPlay
              onIndexChange={setCurrentIndex}
              index={currentIndex}
            >
              {/* Instagram-style Progress Bars */}
              <div className='absolute left-0 right-0 top-10 z-40 flex gap-1 px-3'>
                {reels.map((_, index) => {
                  const isActive = index === currentIndex
                  const isPast = index < currentIndex
                  return (
                    <div
                      key={index}
                      className='relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/30'
                    >
                      <motion.div
                        className='absolute inset-0 origin-left bg-white'
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: isPast ? 1 : isActive ? 1 : 0,
                        }}
                        transition={{
                          duration: isActive ? reels[index].duration : 0.3,
                          ease: 'linear',
                        }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Story Content */}
              <ReelContent>
                {(reel) => (
                  <ReelItem key={reel.id}>
                    {reel.type === 'video' ? (
                      <ReelVideo
                        src={reel.src}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <ReelImage
                        src={reel.src}
                        alt={reel.title || 'Gym story'}
                        duration={reel.duration}
                        className='h-full w-full object-cover'
                      />
                    )}
                    {/* Story Overlay with Animations */}
                    <StoryOverlay
                      title={reel.title || ''}
                      description={reel.description}
                      isActive={true}
                    />
                  </ReelItem>
                )}
              </ReelContent>

              {/* Navigation (tap left/right) */}
              <ReelNavigation />
            </Reel>
          </IPhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Info - Centered at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className='absolute bottom-8 left-0 right-0 text-center text-sm text-gray-500'
      >
        <p>👆 Tap left or right to navigate • {reels.length} stories</p>
      </motion.div>
    </div>
  )
}

export { HobbyView }
