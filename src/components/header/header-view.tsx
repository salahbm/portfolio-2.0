'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date): string =>
    date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <header
      className={cn(
        'sticky top-0 hidden w-full shrink-0 font-sf-medium md:flex',
        'h-8 select-none items-center justify-between px-3',
        // ⬇️ Real glass effect
        'bg-white/5 backdrop-blur-xl dark:bg-white/5',
        'before:absolute before:inset-0 before:rounded-none before:bg-gradient-to-b before:from-white/20 before:via-white/10 before:to-transparent dark:before:from-white/10 dark:before:via-white/5 dark:before:to-transparent',
        'after:absolute after:inset-0 after:backdrop-saturate-[180%]',
        // Border & shadow like macOS
        'border-b border-white/20 dark:border-white/10',
        'shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.3),0_1px_8px_rgba(0,0,0,0.15)]',
        'text-[11.5px] tracking-tight text-foreground/90 dark:text-foreground/80',
        'relative z-50 overflow-hidden'
      )}
    >
      {/* top glossy line */}
      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/40 via-white/60 to-white/40 dark:from-white/10 dark:via-white/20 dark:to-white/10' />

      {/* Left */}
      <div className='relative z-10 flex items-center space-x-3'>
        <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
        </svg>
        <span className='text-[11.5px] font-semibold'>Finder</span>
        {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((item) => (
          <span
            key={item}
            className='cursor-pointer text-[11.5px] transition-colors duration-100 hover:text-foreground'
          >
            {item}
          </span>
        ))}
      </div>

      {/* Right */}
      <div className='relative z-10 flex items-center space-x-3 font-sf-medium'>
        <span className='opacity-90'>100%</span>
        <svg
          className='h-5 w-5 opacity-90'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z' />
        </svg>
        <svg
          className='h-5 w-5 opacity-90'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
        </svg>
        <svg
          viewBox='0 0 29 29'
          width='16'
          height='16'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          className='opacity-90'
        >
          <path d='M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z' />
        </svg>

        <span>{formatDate(currentTime)}</span>
        <span>{formatTime(currentTime)}</span>
      </div>
    </header>
  )
}
