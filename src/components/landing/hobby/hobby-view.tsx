'use client'
import React, { Fragment, ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Reel,
  ReelContent,
  ReelItem as ReelItemType,
  ReelItem,
  ReelNavigation,
  ReelVideo,
  ReelImage,
  ReelProgress,
} from '@/components/ui/reel'
import { IPhoneMockup } from '@/components/landing/hobby/iphone-mockup'
import { StoryOverlay } from '@/components/landing/hobby/story-overlay'
import HobbyScroll from './hobby-sroll'

const reels: ReelItemType[] = [
  {
    id: 1,
    type: 'video',
    src: '/reel/gym.MOV',
    duration: 16,
    title: 'Gym Routine',
    description:
      'After a long day of coding, I like to unwind with a good workout.',
  },
  {
    id: 2,
    type: 'video',
    src: '/reel/food.MOV',
    duration: 7,
    title: 'Food Experiment',
    description:
      'I like to try new recipes and experiment with different ingredients.',
  },
  {
    id: 3,
    type: 'video',
    src: '/reel/cafe.MOV',
    duration: 13,
    title: 'Cafe Break',
    description:
      'I love exploring new cafes and trying different coffee blends.',
  },
]

const HobbyView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <Fragment>
      <HobbyScroll />
      <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20'>
        {/* Gradient lights */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{
            scale: [0, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0, 0.25, 0.15],
          }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className='bg-gradient-lilac absolute left-16 top-24 h-72 w-72 rounded-full blur-3xl'
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{
            scale: [0, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0, 0.25, 0.15],
          }}
          viewport={{ once: true }}
          transition={{
            duration: 2.5,
            ease: 'easeOut',
            delay: 0.3,
          }}
          className='bg-gradient-glow absolute bottom-20 right-10 h-80 w-80 rounded-full blur-3xl'
        />

        {/* Reel */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotateY: -30 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className='w-full shrink-0 md:max-w-md xl:max-w-xl'
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
              <ReelProgress className='left-0 right-0 top-10 px-3'>
                {(_item, _index, _isActive, progressValue): ReactNode => (
                  <div className='relative h-[2px] w-full overflow-hidden rounded-full bg-white/30'>
                    <div
                      className='absolute inset-0 origin-left bg-white transition-all duration-100 ease-linear'
                      style={{
                        transform: `scaleX(${progressValue / 100})`,
                        transformOrigin: 'left',
                      }}
                    />
                  </div>
                )}
              </ReelProgress>

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
    </Fragment>
  )
}

export { HobbyView }
