import {
  HomeIcon,
  ComputerDesktopIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline'
import type { HeroiconsIcon } from '@/lib/heroicons'
import type { Keys } from 'react-hotkeys-hook'

export type NavigationItemName =
  | 'home'
  | 'dashboard'
  | 'tech-stack'
  | 'work'
  | 'craft'
export type NavigationItem = {
  href: string
  name: NavigationItemName
  label: string
  shortcutLabel: string
  shortcutKeys: Keys
  icon?: string
}

export const navigationItems: NavigationItem[] = [
  {
    href: '/',
    name: 'home',
    label: 'home',
    shortcutLabel: 'G+H',
    shortcutKeys: 'g+h',
    icon: 'home',
  },
  {
    href: '/dashboard',
    name: 'dashboard',
    label: 'dashboard',
    shortcutLabel: 'G+A',
    shortcutKeys: 'g+a',
    icon: 'launchpad',
  },
  {
    href: '/tech-stack',
    name: 'tech-stack',
    label: 'tech stack',
    shortcutLabel: 'G+T',
    shortcutKeys: 'G+T',
    icon: 'settings',
  },
  {
    href: '/work',
    name: 'work',
    label: 'work',
    shortcutLabel: 'G+W',
    shortcutKeys: 'g+w',
    icon: 'mission-control',
  },
  {
    href: '/craft',
    name: 'craft',
    label: 'craft',
    shortcutLabel: 'G+C',
    shortcutKeys: 'g+c',
    icon: 'tips',
  },
]

export const navigationItemsIcons: Record<NavigationItemName, HeroiconsIcon> = {
  home: HomeIcon,
  dashboard: ComputerDesktopIcon,
  'tech-stack': WrenchScrewdriverIcon,
  work: BriefcaseIcon,
  craft: LightBulbIcon,
}
