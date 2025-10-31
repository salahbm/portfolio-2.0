'use client'
import { useState } from 'react'
import useEvent from 'react-use-event-hook'
import { Bars3Icon } from '@heroicons/react/24/outline'

import { cn, toUpperFirst } from '@/lib/utils'
import { type NavigationItem, navigationItemsIcons } from '@/lib/navigation'
import { siteConfig } from '@/config/site-config'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { NavigationDockItemLink } from '@/components/dock/dock-link'
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons'
import { TwitterLogoIcon } from '@/components/icons/twitter-logo-icon'
import { CommandCenter } from '@/components/command-center/command-center'
import { ColorModeDropdownSwitcher } from '@/components/color-mode/theme-switcher'
import { MusicPlayerSwitcher } from '../music/music-player-switcher'

const socialIconMap = {
  github: GitHubLogoIcon,
  linkedin: LinkedInLogoIcon,
  twitter: TwitterLogoIcon,
  instagram: InstagramLogoIcon,
}

export function DockDrawer({
  className,
  pathname,
  navigationItems,
}: {
  className?: string
  pathname: string
  navigationItems: NavigationItem[]
}) {
  const [open, setOpen] = useState<boolean>(false)
  const handleLinkClick = useEvent((): void => {
    setOpen(false)
  })

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type='button'
          aria-label='Open navigation drawer'
          onClick={() => setOpen(true)}
          className={cn(
            'group relative mx-auto flex aspect-video h-11 items-center justify-center gap-2 rounded-2xl',
            'bg-gradient-glow',
            'border border-white/20 shadow-md backdrop-blur-xl',
            'transition-all duration-300 ease-out hover:shadow-lg hover:brightness-105 active:scale-95',
            className
          )}
        >
          <span
            className='absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
            aria-hidden='true'
          />

          <Bars3Icon
            className='h-5 w-5 text-[oklch(0.28_0.05_260)] drop-shadow-sm transition-transform duration-300 group-hover:scale-110'
            strokeWidth={1.8}
          />

          <span className='text-sm font-medium text-primary-foreground'>
            Menu
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent className='!outline-none' aria-describedby={undefined}>
        <div className='flex w-full flex-col px-4 pb-4'>
          <DrawerHeader className='sm:text-center'>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeader>
          <div className='mx-auto grid w-full max-w-[496px] grid-cols-2 gap-4'>
            {navigationItems.map((navigationItem) => {
              const isActive = navigationItem.href === pathname
              const Icon = navigationItemsIcons[navigationItem.name]

              return (
                <div key={navigationItem.href} className='flex flex-col'>
                  <NavigationDockItemLink
                    href={navigationItem.href}
                    name={navigationItem.name}
                    active={isActive}
                    variant='drawer'
                    className='col-span-1'
                    onClick={handleLinkClick}
                  >
                    <Icon className='size-6' />
                    {toUpperFirst(navigationItem.label)}
                  </NavigationDockItemLink>
                </div>
              )
            })}
          </div>

          {/* Social Links */}
          <div className='mx-auto mt-6 w-full max-w-[496px]'>
            <h3 className='mb-3 text-sm font-semibold text-muted-foreground'>
              Connect
            </h3>
            <div className='grid grid-cols-4 gap-3'>
              {Object.entries(siteConfig.socialLinks).map(([key, link]) => {
                const Icon = socialIconMap[key as keyof typeof socialIconMap]
                return (
                  <a
                    key={key}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors hover:bg-accent'
                    onClick={handleLinkClick}
                  >
                    <Icon className='h-5 w-5' />
                    <span className='text-xs capitalize'>{key}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Utilities */}
          <div className='mx-auto mt-6 flex w-full max-w-[496px] items-center justify-center gap-3 border-t pt-4'>
            <CommandCenter />
            <MusicPlayerSwitcher />
            <ColorModeDropdownSwitcher />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
