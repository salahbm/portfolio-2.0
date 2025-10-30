import React from 'react'
import { LocationHighlight } from './location-highlight'

const LocationsView: React.FC = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      {' '}
      {/* Location info - single line with proper spacing */}
      <span
        className='mt-4 block max-w-4xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl md:text-2xl'
        data-animation-delay='0.9'
      >
        originally from{' '}
        <LocationHighlight
          name='Bukhara, Uzbekistan'
          gradient='bg-gradient-to-r from-violet-500/30 to-purple-400/30'
          className='font-milkyway text-lg font-normal sm:text-xl md:text-2xl'
        />
        , now creating cool things in{' '}
        <LocationHighlight
          name='Seoul, South Korea'
          gradient='bg-gradient-to-r from-fuchsia-500/30 to-violet-400/30'
          className='font-babygemoy text-lg font-normal sm:text-xl md:text-2xl'
        />
      </span>
    </div>
  )
}

export { LocationsView }
