'use client'

import { BentoCard } from '@/components/grids/bento-card'
import { WeatherToggle } from '@/components/color-mode/toggle'

export function WeatherBentoItem() {
  return (
    <BentoCard
      className='col-span-1 row-span-1 max-lg:min-h-[320px] max-md:min-h-[300px]'
      variant='grid'
    >
      <WeatherToggle />
    </BentoCard>
  )
}
