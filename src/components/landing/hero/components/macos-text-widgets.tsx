'use client'

import { FileTextIcon, Pencil1Icon, ReaderIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

type WidgetProps = {
  className?: string
}

export function MacOSTipsWidget({ className }: WidgetProps) {
  return (
    <div
      className={cn(
        'ring-white/18 relative overflow-hidden rounded-[22px] bg-[#ffc517] text-white shadow-[0_18px_48px_rgba(70,44,0,0.28)] ring-1',
        className
      )}
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_38%)]' />
      <div className='relative flex h-full min-h-[132px] flex-col px-4 py-3 xl:min-h-[118px] xl:px-3.5 xl:py-2.5'>
        <div className='flex items-center gap-2 text-[11px] font-medium text-white/90 xl:text-[10px]'>
          <ReaderIcon className='h-3.5 w-3.5 xl:h-3 xl:w-3' />
          Tips
        </div>

        <div className='mt-auto grid grid-cols-[1.05fr_1fr] gap-4 pb-1 pt-5 xl:gap-3 xl:pt-4'>
          <p className='text-[26px] font-semibold leading-[1.05] tracking-tight xl:text-[21px]'>
            Welcome to my portfolio
          </p>
          <p className='text-white/92 self-center text-[12px] font-medium leading-[1.35] xl:text-[11px]'>
            Scroll down to see more.
          </p>
        </div>
      </div>
    </div>
  )
}

export function MacOSNotesWidget({ className }: WidgetProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[18px] bg-[#1f1f1f] text-white shadow-[0_18px_48px_rgba(0,0,0,0.32)] ring-1 ring-white/10',
        className
      )}
    >
      <div className='border-white/8 flex items-center gap-2 border-b bg-[#ffbf00] px-3 py-2 text-[11px] font-medium text-white xl:px-2.5 xl:py-1.5 xl:text-[10px]'>
        <FileTextIcon className='h-3.5 w-3.5 xl:h-3 xl:w-3' />
        Notes
      </div>

      <div className='grid gap-0'>
        <div className='border-b border-dashed border-white/10 px-3 py-2.5 xl:px-2.5 xl:py-2'>
          <p className='text-[12px] font-medium text-white/90 xl:text-[11px]'>
            Hi, I&apos;m Salah
          </p>
        </div>

        <div className='flex items-center justify-between border-b border-dashed border-white/10 px-3 py-2.5 xl:px-2.5 xl:py-2'>
          <p className='text-white/62 text-[11px] xl:text-[10px]'>
            Full stack software engineer
          </p>
          <div className='xl:h-4.5 xl:w-4.5 flex h-5 w-5 items-center justify-center rounded-md bg-white/70 text-[#6c6c6c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)]'>
            <Pencil1Icon className='h-3 w-3 xl:h-2.5 xl:w-2.5' />
          </div>
        </div>

        <div className='flex items-center justify-between px-3 py-2.5 xl:px-2.5 xl:py-2'>
          <p className='text-white/72 text-[11px] font-semibold tracking-[0.01em] xl:text-[10px]'>
            Building thoughtful products for web and mobile.
          </p>
          <div className='xl:h-4.5 xl:w-4.5 flex h-5 w-5 items-center justify-center rounded-md bg-white/70 text-[#6c6c6c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)]'>
            <Pencil1Icon className='h-3 w-3 xl:h-2.5 xl:w-2.5' />
          </div>
        </div>
      </div>
    </div>
  )
}
