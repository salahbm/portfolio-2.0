'use client'

import Link from 'next/link'
import {
  ClockIcon,
  BeakerIcon,
  CodeBracketSquareIcon,
} from '@heroicons/react/24/outline'
import { CategoryTag } from '@/components/content/category-tag'
import { format, parseISO } from 'date-fns'

export function CraftCard({
  slug,
  title,
  summary,
  category,
  publishedAt,
}: {
  slug: string
  title: string
  summary: string
  category?: string
  publishedAt: string
}) {
  const isLab = category?.includes('Lab')
  const parsedDate = parseISO(publishedAt)

  return (
    <Link
      href={`/craft/${slug}`}
      className='group relative col-span-2 flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border border-border/60 bg-stone-50/70 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.4),0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 ease-out hover:scale-[1.03] hover:border-border/80 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:bg-stone-900/60'
    >
      {/* Gradient glow background */}
      <div className='bg-gradient-lilac/40 dark:bg-gradient-dark/40 absolute inset-0 z-[1] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100' />

      <div className='absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>

      {/* Content */}
      <div className='relative z-[2] flex h-full w-full flex-col gap-4 p-6 max-lg:gap-3'>
        {/* Header */}
        <div className='flex flex-none flex-row items-center gap-4'>
          <div className='flex flex-auto flex-row items-center truncate'>
            <h1 className='text-gradient-lilac truncate text-xl font-semibold tracking-tight'>
              {title}
            </h1>
          </div>
          <div className='flex flex-none items-center text-muted-foreground transition-colors group-hover:text-foreground'>
            {isLab ? (
              <BeakerIcon className='size-5' />
            ) : (
              <CodeBracketSquareIcon className='size-5' />
            )}
          </div>
        </div>

        {/* Summary */}
        <div className='flex w-full flex-none flex-col gap-4'>
          <p className='line-clamp-2 text-sm font-medium leading-6 text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90'>
            {summary}
          </p>

          {/* Footer */}
          <div className='flex w-full flex-row items-center justify-between'>
            {category ? (
              <CategoryTag className='transition-all group-hover:scale-[1.03]'>
                {category}
              </CategoryTag>
            ) : null}

            <div className='flex items-center gap-1 text-muted-foreground'>
              <ClockIcon className='size-3 opacity-70' />
              <time
                dateTime={parsedDate.toISOString()}
                className='text-xs font-semibold'
              >
                {format(parsedDate, 'MMM d, yyyy')}
              </time>
            </div>
          </div>
        </div>
      </div>

      {/* Glow Border Outline on Hover */}
      <div className='pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-primary/0 transition-all duration-500 group-hover:ring-[1.5px] group-hover:ring-primary/40' />
    </Link>
  )
}
