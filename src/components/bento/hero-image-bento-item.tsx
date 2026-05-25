'use client'

import { BentoCard } from '@/components/grids/bento-card'
import {
  Reel,
  ReelContent,
  ReelImage,
  ReelItem,
  ReelNavigation,
  ReelProgress,
} from '@/components/ui/reel'
import type { ReelItem as ReelItemType } from '@/components/ui/reel'
import { cn } from '@/lib/utils'

const photos: ReelItemType[] = [
  {
    id: 'seoul-1',
    type: 'image',
    src: '/intro/seoul-1.jpg',
    alt: 'Seoul street view',
    duration: 4,
  },
  {
    id: 'bukhara-1',
    type: 'image',
    src: '/intro/bukhara-1.jpg',
    alt: 'Bukhara architecture',
    duration: 4,
  },
  {
    id: 'dankook-1',
    type: 'image',
    src: '/intro/dankook-1.jpg',
    alt: 'Dankook campus photo',
    duration: 4,
  },
  {
    id: 'seoul-3',
    type: 'image',
    src: '/intro/seoul-3.jpg',
    alt: 'Seoul night photo',
    duration: 4,
  },
]

export function HeroImageBentoItem({ className }: { className?: string }) {
  return (
    <BentoCard
      className={cn(
        'relative w-[min(34vw,320px)] shrink-0 self-end overflow-hidden rounded-[22px] xl:w-[270px] 2xl:w-[460px]',
        className
      )}
      variant='grid'
    >
      <Reel
        data={photos}
        autoPlay
        defaultIndex={0}
        defaultMuted
        defaultPlaying
        className='aspect-square h-full w-full'
      >
        <ReelProgress className='left-0 right-0 top-0 z-30 px-3 pt-3'>
          {(_item, _index, _isActive, progress) => (
            <div className='h-[3px] overflow-hidden rounded-full bg-white/20'>
              <div
                className='h-full rounded-full bg-primary transition-none'
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </ReelProgress>

        <ReelContent>
          {(item) => (
            <ReelItem key={item.id}>
              <ReelImage
                alt={item.alt || ''}
                className='object-cover'
                duration={item.duration}
                src={item.src}
              />
              <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_34%,rgba(0,0,0,0.08)_52%,rgba(0,0,0,0.44)_100%)]' />
            </ReelItem>
          )}
        </ReelContent>

        <ReelNavigation />
      </Reel>
    </BentoCard>
  )
}
