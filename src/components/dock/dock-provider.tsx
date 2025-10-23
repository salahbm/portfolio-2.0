'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

import { siteConfig } from '@/config/site-config'
import { navigationItems, navigationItemsIcons } from '@/lib/navigation'

import { DockContextType } from './dock.types'
import DockItem from './dock-item'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { TwitterLogoIcon } from '@/components/icons/twitter-logo-icon'
import { BlueskyLogoIcon } from '@/components/icons/bluesky-logo-icon'
import { ColorModeDropdownSwitcher } from '@/components/color-mode/color-mode-dropdown-switcher'
import { CommandCenter } from '@/components/command-center/command-center'
import Link from 'next/link'

/**
 * <DockContext> provider.
 * @param hovered - If is hovering <nav> element.
 * @param width - The width of <nav> element.
 */
const DockContext = createContext<DockContextType | null>(null)

export const useDock = () => {
  return useContext(DockContext)
}

const Dock = () => {
  const ref = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)
  const [width, setWidth] = useState<number | undefined>()
  const pathname = usePathname()

  useEffect(() => {
    setWidth(ref?.current?.clientWidth)
  }, [])

  return (
    <div className='fixed inset-x-0 bottom-6 z-40 flex justify-center'>
      <div className='flex w-full justify-center'>
        <DockContext.Provider value={{ hovered, width }}>
          <nav
            ref={ref}
            className='bg-grid flex justify-center rounded-xl border bg-popover p-1'
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
          >
            <ul
              className='flex h-10 items-end justify-center space-x-1'
              data-cursor='pointer'
            >
              {/* Navigation Items */}
              {navigationItems.map((item) => {
                const Icon = navigationItemsIcons[item.name]
                const isActive =
                  item.href === '/craft'
                    ? pathname.startsWith(item.href)
                    : item.href === pathname

                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link href={item.href}>
                        <DockItem id={`dock-${item.name}`} isActive={isActive}>
                          <Icon className='h-4 w-4' />
                        </DockItem>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      className='flex flex-row items-center gap-1'
                      sideOffset={8}
                    >
                      <span className='capitalize'>{item.label}</span>
                      <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium tracking-[2px] text-muted-foreground'>
                        {item.shortcutLabel}
                      </span>
                    </TooltipContent>
                  </Tooltip>
                )
              })}

              <Tooltip key='command-center'>
                <TooltipTrigger asChild>
                  <Link href='/about'>
                    <DockItem id={`dock-command-center`} isActive={false}>
                      <CommandCenter className='h-4 w-4' />
                    </DockItem>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className='flex flex-row items-center gap-1'
                  sideOffset={8}
                >
                  <span className='capitalize'>Command Center</span>
                  <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium tracking-[2px] text-muted-foreground'>
                    {'CMD + A'}
                  </span>
                </TooltipContent>
              </Tooltip>

              {/* Separator */}
              <li className='self-center' aria-hidden='true'>
                <hr className='!mx-2 block h-12 w-px border-none bg-border' />
              </li>

              {/* Social Links */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={siteConfig.socialLinks.linkedin.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <DockItem id='dock-linkedin'>
                      <LinkedInLogoIcon className='h-4 w-4' />
                    </DockItem>
                  </a>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>LinkedIn</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={siteConfig.socialLinks.github.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <DockItem id='dock-github'>
                      <GitHubLogoIcon className='h-4 w-4' />
                    </DockItem>
                  </a>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>GitHub</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={siteConfig.socialLinks.twitter.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <DockItem id='dock-twitter'>
                      <TwitterLogoIcon className='h-4 w-4' />
                    </DockItem>
                  </a>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>Twitter (X)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={siteConfig.socialLinks.instagram.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <DockItem id='dock-bluesky'>
                      <BlueskyLogoIcon className='h-4 w-4' />
                    </DockItem>
                  </a>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>Bluesky 🦋</TooltipContent>
              </Tooltip>

              {/* Separator */}
              <li className='self-center' aria-hidden='true'>
                <hr className='!mx-2 block h-12 w-px border-none bg-border' />
              </li>

              {/* Utilities */}
              <li>
                <CommandCenter />
              </li>
              <li>
                <ColorModeDropdownSwitcher />
              </li>
            </ul>
          </nav>
        </DockContext.Provider>
      </div>
    </div>
  )
}

export { Dock, DockItem }
