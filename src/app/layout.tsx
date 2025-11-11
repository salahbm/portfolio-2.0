import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { cn } from '@/lib/utils'
import { env } from '@/config/env'
import { baseUrl, siteConfig } from '@/config/site-config'

import { ProvidersTree } from '@/providers'
import { Dock } from '@/components/dock'

import { sfMedium, monumentExtended, syne } from './font'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.socialLinks.twitter.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Prevents viewport changes when mobile browser UI shows/hides
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          monumentExtended.variable,
          syne.variable,
          sfMedium.variable
        )}
      >
        <ProvidersTree>
          <main className='relative flex min-h-dvh w-screen flex-col'>
            {children}
            <Dock />
          </main>
        </ProvidersTree>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
