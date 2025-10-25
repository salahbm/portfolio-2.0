'use client'

import { BentoCard } from '@/components/grids/bento-card'
import { MusicPlayerWidget } from '@/components/widgets/music-player-widget'

export function MusicBentoItem() {
  return (
    <BentoCard
      className='col-span-1 row-span-1 max-lg:min-h-[320px] max-md:min-h-[300px]'
      variant='grid'
    >
      <MusicPlayerWidget />
    </BentoCard>
  )
}
