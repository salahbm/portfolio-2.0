import { env } from '@/config/env'

export const baseUrl = env.NEXT_PUBLIC_PROJECT_BASE_URL
export const siteConfig = {
  title: 'Muhammad (Salah)',
  description:
    'Creative full-stack developer crafting interfaces and products.',
  socialLinks: {
    twitter: {
      url: 'https://twitter.com/im__salah',
      name: '@im__salah',
    },
    instagram: {
      url: 'https://instagram.com/mkhd.salah',
      name: '@mkhd.salah',
    },
    github: {
      url: 'https://github.com/salahbm',
      name: 'Muhammad (Salah)',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/salahbm/',
      name: 'Muhammad (Salah)',
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
