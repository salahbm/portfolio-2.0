'use client'

import { cn } from '@/lib/utils'
import { useUserAgent } from '@/hooks/use-user-agent'

import { ReactIcon } from '@/components/icons/react-icon'
import { NextJSSquareIcon } from '@/components/icons/nextjs-square-icon'

import { VFXWavingHand } from '@/components/ui-vfx/vfx-waving-hand'
import { VFXPresenceSurface } from '@/components/ui-vfx/vfx-presence-surface'

import { BentoCard } from '@/components/grids/bento-card'
import { TagLink } from '@/components/content/tag-link'

const TagPill = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur-sm transition-colors duration-300 dark:bg-secondary/40',
      className
    )}
  >
    {children}
  </span>
)

export function HeroBentoItem() {
  const { isMobile } = useUserAgent()

  return (
    <BentoCard
      className='col-span-4 row-span-1 max-lg:min-h-[220px] max-md:min-h-[200px] max-sm:col-span-2'
      variant='grid'
    >
      <VFXPresenceSurface disabled={isMobile}>
        <div className='relative flex h-full w-full flex-col items-center justify-center text-center font-sf-medium'>
          <div className='flex h-full w-full flex-col justify-between max-sm:p-2 md:p-4'>
            {/* ---- Header ---- */}
            <h1 className='text-center text-3xl font-semibold leading-snug tracking-tight max-sm:text-xl'>
              Hey there <VFXWavingHand />
              <br />
              I&apos;m{' '}
              <span className='text-gradient-lilac bg-clip-text font-bold text-transparent'>
                Muhammad (Salah)
              </span>
            </h1>

            {/* ---- Body ---- */}
            <div className='mt-6 text-center text-[15px] leading-loose text-muted-foreground max-sm:text-[13px]'>
              I&apos;m a software engineer from{' '}
              <span className='align-middle font-semibold text-foreground'>
                Uzbekistan 🇺🇿
              </span>
              , passionate about crafting <br className='max-md:hidden' />
              smooth, user-centric interfaces with{' '}
              <TagLink
                href='https://react.dev/'
                className='mx-1 inline-flex cursor-none items-center align-middle font-medium'
              >
                <ReactIcon className='mr-1 h-3 w-3' />
                React ⚛️
              </TagLink>{' '}
              and{' '}
              <TagLink
                href='https://nextjs.org/'
                className='inline-flex cursor-none items-center align-middle font-medium'
              >
                <NextJSSquareIcon className='mr-1 h-3 w-3' />
                Next.js ⚡
              </TagLink>
              . <br className='max-md:hidden' />
              Currently building cool things at{' '}
              <TagLink
                href='https://momenti.biz'
                className='inline-flex cursor-none items-center align-middle font-semibold'
              >
                <span className='mr-1 inline-flex flex-col items-center justify-center -space-y-1'>
                  <span className='size-2.5 rounded-full bg-blue-500' />
                  <span className='size-2.5 rounded-full bg-neutral-200 mix-blend-multiply dark:bg-neutral-400' />
                </span>
                Momenti
              </TagLink>{' '}
              🚀 in <span className='font-semibold text-foreground'>Seoul</span>{' '}
              🇰🇷{' '}
              <span
                aria-label='Seoul tower'
                role='img'
                className='align-middle'
              >
                🗼
              </span>
              .
            </div>

            {/* ---- Footer ---- */}
            <div className='mt-8 flex flex-col items-center justify-center gap-2'>
              <div className='flex flex-wrap items-center justify-center gap-2'>
                <TagPill>Full-Stack Engineer ⚙️</TagPill>
                <TagPill>Gym Rat 🦍</TagPill>
              </div>
              <span className='text-[10px] tracking-wide text-muted-foreground'>
                &copy; 2025 • Designed with ☕ + ❤️
              </span>
            </div>
          </div>
        </div>
      </VFXPresenceSurface>
    </BentoCard>
  )
}
