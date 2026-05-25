'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { BentoCard } from '@/components/grids/bento-card'
import { cn } from '@/lib/utils'

type HeroNotesBentoItemProps = {
  title: string
  body: string
  className?: string
}

function NotesLines() {
  return (
    <div
      aria-hidden='true'
      className='absolute inset-0 opacity-70'
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent 0, transparent 29px, rgba(190,146,46,0.14) 29px, rgba(190,146,46,0.14) 30px)',
      }}
    />
  )
}

export function HeroNotesBentoItem({
  title,
  body,
  className,
}: HeroNotesBentoItemProps) {
  return (
    <BentoCard
      className={cn(
        'relative z-10 min-h-[120px] w-[min(32vw,320px)] min-w-[220px] overflow-hidden rounded-[22px] border-[#d8c179] bg-[#f7e7a9] text-[#5b4311] shadow-[0_18px_48px_rgba(96,72,8,0.22)]',
        className
      )}
      variant='grid'
    >
      <div className='relative flex h-full flex-col'>
        <div className='relative flex items-center justify-between border-b border-[#d3bb71] bg-[linear-gradient(180deg,#faefb8_0%,#f3df95_100%)] px-4 py-2.5'>
          <div className='min-w-0'>
            <p className='truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f631b]/75'>
              Notes
            </p>
            <h3 className='truncate text-sm font-semibold text-[#5f4610]'>
              {title}
            </h3>
          </div>
          <div className='flex h-7 w-7 items-center justify-center rounded-full bg-white/35 text-[#7e6118] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]'>
            <Pencil1Icon className='h-3.5 w-3.5' />
          </div>
        </div>

        <div className='relative flex flex-1 items-center px-4 py-3'>
          <NotesLines />
          <p className='relative z-[1] max-w-[24ch] text-[15px] font-medium leading-[1.55] text-[#5f4610]'>
            {body}
          </p>
        </div>
      </div>
    </BentoCard>
  )
}

export function HeroWelcomeNotesBentoItem({
  className,
}: {
  className?: string
}) {
  return (
    <HeroNotesBentoItem
      title='Welcome'
      body='Welcome to my portfolio. Scroll down to see more.'
      className={className}
    />
  )
}

export function HeroRoleNotesBentoItem({ className }: { className?: string }) {
  return (
    <HeroNotesBentoItem
      title='About Me'
      body='Full stack software engineer.'
      className={className}
    />
  )
}
