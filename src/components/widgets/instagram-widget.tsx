'use client'

import { motion } from 'motion/react'

import { InstagramLogoIcon, PaperPlaneIcon } from '@radix-ui/react-icons'

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
        <div className='rounded-full bg-muted px-2 py-1.5 text-start text-xs font-medium text-muted-foreground shadow-[0_0_12px_rgba(198,255,121,0.35)]'>
          Hey, what&apos;s ur IG?
        </div>
      </motion.div>

      {/* === Input Bar Mock === */}
      <div className='mt-auto flex w-full items-center gap-2 rounded-full border bg-muted p-0.5 px-1.5 backdrop-blur-sm'>
        <span className='text-xs font-semibold text-neutral-300'>
          @mkhd.salah
        </span>
        <button className='bg-gradient-sunrise ml-auto rounded-full p-1 text-primary'>
          <PaperPlaneIcon className='size-3' />
        </button>
      </div>
    </div>
  )
}
