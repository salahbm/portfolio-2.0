'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StoryProgressProps {
  total: number
  current: number
  progress: number
  className?: string
}

export const StoryProgress: React.FC<StoryProgressProps> = ({
  total,
  current,
  progress,
  className,
}) => {
  return (
    <div className={cn('flex w-full gap-1', className)}>
      {Array.from({ length: total }).map((_, index) => {
        // Calculate the fill percentage for each bar
        let fillPercent = 0
        if (index < current) {
          fillPercent = 100 // Completed stories
        } else if (index === current) {
          fillPercent = progress // Current story progress
        }
        // Future stories remain at 0

        return (
          <div
            key={index}
            className='relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/30'
          >
            <motion.div
              className='absolute inset-0 origin-left bg-white'
              initial={{ scaleX: 0 }}
              animate={{ scaleX: fillPercent / 100 }}
              transition={{
                duration: 0.1,
                ease: 'linear',
              }}
              style={{
                transformOrigin: 'left',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
