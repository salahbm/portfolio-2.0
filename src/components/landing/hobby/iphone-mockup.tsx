'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface IPhoneMockupProps {
  children: React.ReactNode
  className?: string
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'relative before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-purple-500/40 before:to-cyan-500/30 before:blur-2xl',
        className
      )}
      style={{ perspective: '1000px' }}
    >
      {/* iPhone Frame */}
      <div className='/* Mobile */ /* Small tablet */ /* Large tablet */ /* Desktop */ relative mx-auto h-[500px] w-[240px] sm:h-[600px] sm:w-[300px] md:h-[650px] md:w-[320px] lg:h-[700px] lg:w-[340px]'>
        <div className='absolute inset-0 rounded-[55px] bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl'>
          <div className='absolute inset-[3px] rounded-[52px] bg-black'>
            <div className='absolute left-1/2 top-0 z-50 h-[30px] w-[150px] -translate-x-1/2 rounded-b-3xl bg-black'>
              <div className='absolute left-1/2 top-[10px] h-[6px] w-[60px] -translate-x-1/2 rounded-full bg-gray-800' />
              <div className='absolute right-[20px] top-[10px] h-[10px] w-[10px] rounded-full bg-gray-800 ring-2 ring-gray-700' />
            </div>

            {/* Screen */}
            <div className='absolute inset-[8px] overflow-hidden rounded-[44px] bg-black'>
              {children}
            </div>
          </div>

          {/* Side Buttons */}
          <div className='absolute -left-[3px] top-[120px] h-[30px] w-[3px] rounded-l-sm bg-gray-700' />
          <div className='absolute -left-[3px] top-[165px] h-[30px] w-[3px] rounded-l-sm bg-gray-700' />
          <div className='absolute -left-[3px] top-[90px] h-[20px] w-[3px] rounded-l-sm bg-gray-700' />
          <div className='absolute -right-[3px] top-[140px] h-[50px] w-[3px] rounded-r-sm bg-gray-700' />
        </div>

        <div className='pointer-events-none absolute inset-0 rounded-[55px] bg-gradient-to-br from-white/10 via-transparent to-transparent' />
      </div>
    </motion.div>
  )
}
