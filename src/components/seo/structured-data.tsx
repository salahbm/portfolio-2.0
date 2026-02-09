'use client'

import { siteConfig, baseUrl } from '@/config/site-config'

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad (Salah)',
    url: baseUrl,
    image: `${baseUrl}/avatar.png`,
    sameAs: [
      siteConfig.socialLinks.github.url,
      siteConfig.socialLinks.linkedin.url,
      siteConfig.socialLinks.twitter.url,
      siteConfig.socialLinks.instagram.url,
    ],
    jobTitle: 'Full-Stack Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    description: siteConfig.description,
    knowsAbout: siteConfig.keywords,
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Global',
      },
      skills: siteConfig.keywords,
    },
    offers: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Software Development Services',
        description:
          'Professional web and mobile app development services including custom software solutions, UI/UX design, and consulting.',
        serviceType: siteConfig.services,
      },
    },
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
