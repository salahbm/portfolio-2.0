'use client'

import { motion } from 'motion/react'

import { InstagramLogoIcon, PaperPlaneIcon } from '@radix-ui/react-icons'
import { VFXBorderBeam } from '../ui-vfx/vfx-border-beam'

export function InstagramChatWidget() {
  return (
    <div className='flex h-full flex-col p-3'>
      {/* === Header === */}
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='flex w-full items-center justify-between gap-2'>
          <span className='bg-gradient-to-r from-[#ff6947] via-[#c6ff79] to-[#6c29e2] bg-clip-text text-lg font-semibold text-transparent'>
            Instagram
          </span>
          <InstagramLogoIcon className='size-5' />
        </div>
        <p className='mt-1 text-xs font-medium text-neutral-400'>
          Direct Messages
        </p>
      </div>

      {/* === Center Message Bubble === */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mt-4 flex w-full flex-col items-start justify-start'
      >
        <div className='relative rounded-full bg-muted px-2 py-1.5 text-start text-xs font-medium text-muted-foreground shadow-[0_0_12px_rgba(198,255,121,0.35)]'>
          Hey, what&apos;s ur IG?
          <VFXBorderBeam className='vfx-border-beam-duration-[4s] vfx-border-beam-color-from-[#6c29e2] vfx-border-beam-color-to-[#ec6a5f] vfx-border-beam-size-[52px] max-md:vfx-border-beam-size-10' />
        </div>
      </motion.div>

      {/* === Input Bar Mock === */}
      <div className='mt-auto flex w-full flex-row items-center justify-between gap-2 rounded-full border border-neutral-200 bg-neutral-50 p-1.5 pl-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 max-md:p-1 max-md:text-[10px]'>
        <span className='text-xs font-semibold'> @mkhd.salah</span>
        <PaperPlaneIcon className='size-3' />
      </div>
    </div>
  )
}
