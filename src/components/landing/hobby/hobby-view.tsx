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
import { IPhoneMockup } from '@/components/landing/hobby/iphone-mockup'
import { StoryOverlay } from '@/components/landing/hobby/story-overlay'

const reels: ReelItemType[] = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=700&fit=crop',
    duration: 5,
    title: 'A Quiet Morning',
    description:
      'Most days start slow — coffee, playlists, and a promise to lift something heavier than yesterday.',
  },
  {
    id: 2,
    type: 'video',
    src: 'https://wajxiz6qhqyqkm0o.public.blob.vercel-storage.com/grok-imagine-1.mp4',
    duration: 6,
    title: 'The Rhythm of Routine',
    description:
      'Between commits and cooldowns, there’s this sweet balance where motion meets stillness.',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=700&fit=crop',
    duration: 5,
    title: 'Small Escapes',
    description:
      'Cafés tucked in quiet corners. The smell of espresso. Maybe a new recipe waiting to be ruined just right.',
  },
]

const HobbyView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    }

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: 0.7,
        }
      )
    }
  }, [])

  return (
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20'>
      {/* Gradient lights */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          scale: [0, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0, 0.25, 0.15],
        }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className='bg-gradient-lilac absolute left-16 top-24 h-72 w-72 rounded-full blur-3xl'
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          scale: [0, 1.3, 1],
          rotate: [0, -90, 0],
          opacity: [0, 0.25, 0.15],
        }}
        transition={{
          duration: 2.5,
          ease: 'easeOut',
          delay: 0.3,
        }}
        className='bg-gradient-glow absolute bottom-20 right-10 h-80 w-80 rounded-full blur-3xl'
      />

      <div className='relative z-10 flex w-full max-w-7xl flex-col items-center gap-12 px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16'>
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='flex-1 text-center lg:text-left'
        >
          <h1
            ref={titleRef}
            className='mb-8 text-5xl font-semibold leading-tight text-primary md:text-6xl lg:text-7xl'
          >
            Outside the Code
          </h1>

          <p
            ref={textRef}
            className='max-w-2xl text-base leading-relaxed tracking-wide text-muted-foreground md:text-lg lg:text-xl'
          >
            Except for coding, I spend a fair bit of time at the gym — mostly
            convincing myself that stretching counts as a workout. When I’m not
            pretending to lift heavy things, I love experimenting in the kitchen
            (success rate: confidential). And some weekends, I’ll find a quiet
            corner café — the kind that plays jazz too loud and serves coffee
            too strong — and call it “research for better focus”. It’s the
            balance I never planned for but somehow keep chasing.
          </p>
        </motion.div>

        {/* Reel */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className='w-full max-w-sm shrink-0 md:max-w-md lg:max-w-sm xl:max-w-md'
        >
          <IPhoneMockup>
            <Reel
              data={reels}
              className='h-full w-full'
              autoPlay
              onIndexChange={setCurrentIndex}
              index={currentIndex}
            >
              {/* Progress bars */}
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
                        alt={reel.title || 'Story'}
                        duration={reel.duration}
                        className='h-full w-full object-cover'
                      />
                    )}
                    <StoryOverlay
                      title={reel.title || ''}
                      description={reel.description}
                      isActive={true}
                    />
                  </ReelItem>
                )}
              </ReelContent>

              <ReelNavigation />
            </Reel>
          </IPhoneMockup>
        </motion.div>
      </div>
    </div>
  )
}

export { HobbyView }
