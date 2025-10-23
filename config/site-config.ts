import { env } from '@/config/env'

export const baseUrl = env.NEXT_PUBLIC_PROJECT_BASE_URL
export const siteConfig = {
  title: 'Muhammad (Salah)',
  description: 'Creative software engineer crafting interfaces and products.',
  socialLinks: {
    twitter: {
      url: 'https://twitter.com/im__salah',
      name: '@im__salah',
    },
    bluesky: {
      url: 'https://bsky.app/profile/im__salah',
      name: '@im__salah',
    },
    github: {
      url: 'https://github.com/salahbm',
      name: 'SalahBM',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/salahbm/',
      name: 'SalahBM',
    },
  },
  authors: [
    {
      name: 'Muhammad (Salah)',
      url: baseUrl,
    },
  ],
  creator: 'Muhammad (Salah)',
}
export type SiteConfig = typeof siteConfig
