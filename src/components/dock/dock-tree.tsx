'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { DockContext } from './dock-provider'
import DockItem from './dock-item'
import { DockDrawer } from './dock-drawer'

import { siteConfig } from '@/config/site-config'
import { navigationItems } from '@/lib/navigation'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { CommandCenter } from '@/components/command-center/command-center'
import { ColorModeDropdownSwitcher } from '@/components/color-mode/color-mode-dropdown-switcher'

const Dock = () => {
  const ref = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)
  const [width, setWidth] = useState<number | undefined>()
  const [isLocked, setIsLocked] = useState(false)
  const pathname = usePathname()

  useEffect(() => setWidth(ref.current?.clientWidth), [])

  return (
    <Fragment>
      {/* Mobile/Tablet Drawer */}
      <DockDrawer
        pathname={pathname}
        navigationItems={navigationItems}
        className='sticky bottom-4 lg:hidden'
      />

      {/* Desktop Dock */}
      <div className='fixed inset-x-0 bottom-6 z-40 hidden justify-center lg:flex'>
        <div className='flex w-full justify-center'>
          <DockContext.Provider
            value={{ hovered, width, isLocked, setIsLocked }}
          >
            <nav
              ref={ref}
              className='bg-grid flex-center h-14 rounded-2xl border bg-popover p-2'
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <ul
                className='flex items-center justify-center space-x-1'
                data-cursor='pointer'
              >
                {navigationItems.map((item) => {
                  const isActive =
                    item.href === '/craft'
                      ? pathname.startsWith(item.href)
                      : item.href === pathname

                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        <Link href={item.href}>
                          <DockItem
                            id={`dock-${item.name}`}
                            isActive={isActive}
                            src={`/dock/${item.icon ?? item.name}.png`}
                            alt={item.name}
                            priority={item.name === 'home'}
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent
                        sideOffset={8}
                        className='flex flex-row items-center gap-1'
                      >
                        <span className='capitalize'>{item.label}</span>
                        <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium tracking-[2px] text-muted-foreground'>
                          {item.shortcutLabel && `(${item.shortcutLabel})`}
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}

                <li className='self-center' aria-hidden='true'>
                  <hr className='mx-2 h-12 w-px border-none bg-border' />
                </li>

                {/* Social links */}
                {Object.entries(siteConfig.socialLinks).map(([key, link]) => (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <a
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <DockItem id={`dock-${key}`} src={link.src} alt={key} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={8}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TooltipContent>
                  </Tooltip>
                ))}

                <li className='self-center' aria-hidden='true'>
                  <hr className='mx-2 h-12 w-px border-none bg-border' />
                </li>

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
    </Fragment>
  )
}

export { Dock, DockItem }
