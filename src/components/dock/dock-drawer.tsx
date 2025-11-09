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
import { TwitterLogoIcon } from '@/components/shared/icons/twitter-logo-icon'
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
          className={cn(
            'relative mx-auto flex h-11 w-11 items-center justify-center',
            'rounded-2xl backdrop-blur-2xl',
            'border border-white/25 bg-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.25)]',
            'transition-all duration-300 ease-out hover:bg-white/20 active:scale-95',
            className
          )}
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-white/5 opacity-60'
          />

          <Bars3Icon
            className='relative h-5 w-5 text-primary drop-shadow-md transition-transform duration-300 group-hover:scale-110'
            strokeWidth={1.6}
          />
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
          <div className='mx-auto mt-6 flex w-full items-center justify-center gap-3 border-t pt-4'>
            <CommandCenter />
            <MusicPlayerSwitcher />
            <ColorModeDropdownSwitcher />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
