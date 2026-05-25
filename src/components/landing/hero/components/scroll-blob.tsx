'use client'

import { ArrowDownIcon } from '@radix-ui/react-icons'
import { motion } from 'motion/react'

export default function ScrollBlob() {
  const handleScroll = () => {
    window.scrollTo({ top: 320, behavior: 'smooth' })
  }

  return (
    <div className='pointer-events-none absolute bottom-14 left-8 z-10 hidden lg:block xl:bottom-16 xl:left-10'>
      <motion.button
        type='button'
        onClick={handleScroll}
        data-cursor='pointer'
        className='hover:bg-white/14 pointer-events-auto flex items-center gap-3 rounded-[20px] border border-white/20 bg-white/10 px-4 py-3 text-left text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-colors xl:px-4 xl:py-3'
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{
          opacity: 1,
          y: [0, -3, 0],
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.7, ease: 'easeOut' },
          scale: { duration: 0.7, ease: 'easeOut' },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className='bg-white/18 ring-white/18 flex h-11 w-11 items-center justify-center rounded-[14px] ring-1 xl:h-10 xl:w-10'>
          <ArrowDownIcon className='h-5 w-5 text-white' />
        </div>

        <div className='flex flex-col'>
          <span className='text-[10px] font-medium uppercase tracking-[0.18em] text-white/65'>
            Scroll
          </span>
          <span className='text-sm font-semibold tracking-tight text-white/95'>
            Explore more
          </span>
        </div>
      </motion.button>
    </div>
  )
}
