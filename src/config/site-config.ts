import { env } from '@/config/env'

export const baseUrl = env.NEXT_PUBLIC_PROJECT_BASE_URL
export const siteConfig = {
  title:
    'Muhammad (Salah) - Full-Stack Software Engineer | Web & App Development',
  description:
    'Expert full-stack software engineer specializing in web development, mobile app development, and custom software solutions. Building modern, scalable applications with React, Next.js, TypeScript, Flutter, and Node.js. Available for freelance projects and consulting.',
  keywords: [
    'software engineer',
    'full-stack developer',
    'web development',
    'app development',
    'mobile app developer',
    'React developer',
    'Next.js developer',
    'TypeScript developer',
    'Flutter developer',
    'Node.js developer',
    'freelance developer',
    'custom software development',
    'website builder',
    'app builder',
    'UI/UX developer',
    'frontend developer',
    'backend developer',
    'GSAP animations',
    'responsive web design',
    'progressive web apps',
    'API development',
    'database design',
    'cloud deployment',
    'software consulting',
  ],
  socialLinks: {
    twitter: {
      url: 'https://twitter.com/im__salah',
      name: '@im__salah',
      src: '/dock/twitter-x.png',
    },
    instagram: {
      url: 'https://instagram.com/mkhd.salah',
      name: '@mkhd.salah',
      src: '/dock/instagram.png',
    },
    github: {
      url: 'https://github.com/salahbm',
      name: 'salahbm',
      src: '/dock/github.png',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/salahbm/',
      name: 'salahbm',
      src: '/dock/linkedin.png',
    },
  },
  authors: [
    {
      name: 'Muhammad (Salah)',
      url: baseUrl,
    },
  ],
  creator: 'Muhammad (Salah)',
  services: [
    'Custom Web Development',
    'Mobile App Development (iOS & Android)',
    'Progressive Web Apps (PWA)',
    'E-commerce Solutions',
    'API Development & Integration',
    'UI/UX Design & Development',
    'Website Redesign & Optimization',
    'Software Consulting',
    'Performance Optimization',
    'Cloud Deployment & DevOps',
  ],
}
export type SiteConfig = typeof siteConfig
