import React from 'react'
import type { Metadata } from 'next'

import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
  TrophyIcon,
  CodeBracketIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/content/page-header'

interface Role {
  title: string
  period: string
  type?: string
}

interface TechStack {
  [category: string]: string[]
}

interface WorkExperience {
  company: string
  location: string
  roles: Role[]
  description: string
  achievements: string[]
  techStack: TechStack
  impact?: string
  links?: Record<string, string>
  skills: string
}

interface SelectedProjectGroup {
  category: string
  items: string[]
}

export const metadata: Metadata = {
  title: 'Work',
  description: 'Work history, selected projects, and measurable product impact',
}

const impactMetrics = [
  { value: '20,000+', label: 'active users served' },
  { value: '100,000+', label: 'concurrent exhibition users supported' },
  { value: '30%', label: 'faster company project delivery' },
  { value: '40%', label: 'client processing time reduction' },
]

const workHistory: WorkExperience[] = [
  {
    company: '(주)모멘티',
    location: 'Seoul, South Korea',
    roles: [
      {
        title: 'Senior Software Engineer & Team Lead',
        period: 'May 2024 - Present',
        type: 'Current Role',
      },
    ],
    description:
      'Leading web and mobile engineering for enterprise, exhibition, government, and public-sector platforms across Korea.',
    achievements: [
      'Built reusable web/mobile boilerplates and shared component systems adopted across company projects, reducing delivery time by 30%',
      'Led frontend architecture and engineering workflows using React, React Native, Next.js, and TypeScript',
      'Conducted code reviews, technical mentoring, and internal engineering seminars to improve team quality and onboarding',
      'Developed role-based systems for admins, clients, event managers, and mobile users',
      'Managed CI/CD pipelines, deployments, and cross-functional collaboration across product, design, and engineering teams',
      'Delivered platforms for automotive, electronics, food, enterprise, and government/public-sector clients',
      'Built large-scale exhibition systems supporting 100,000+ concurrent users across high-traffic events',
      'Developed mobile event services with mapping, QR, and event-management features used by 15,000+ attendees',
      'Maintained production systems serving 20,000+ users with zero critical outages during tenure',
    ],
    techStack: {
      frontend: [
        'React',
        'React Native',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
      ],
      backend: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'GraphQL'],
      mobile: ['React Native', 'Flutter', 'iOS', 'Android'],
      cloud: ['AWS', 'Cloudflare', 'Docker', 'CI/CD'],
      database: ['MongoDB', 'PostgreSQL', 'MySQL'],
      tools: ['Git', 'Jira', 'Code Review', 'Technical Mentoring'],
    },
    impact:
      'Shipped production systems for high-traffic enterprise and exhibition platforms while improving delivery speed and engineering quality.',
    links: {
      web: 'momenti.biz',
    },
    skills:
      'Team Leadership, Frontend Architecture, Mobile Application Development, CI/CD, Enterprise Platforms, React Native, Next.js, TypeScript',
  },
  {
    company: 'CryptoCare',
    location: 'Seoul, South Korea',
    roles: [
      {
        title: 'Full Stack Engineer',
        period: 'Jan 2024 - Apr 2024',
      },
    ],
    description:
      'Built cross-platform crypto products with mobile, web, backend, and blockchain integrations.',
    achievements: [
      'Built cross-platform mobile and web apps with React Native, React.js, Next.js, and Node.js/Express backends',
      'Integrated Ethereum smart contracts, crypto wallets, and blockchain transaction flows into production',
      'Optimized REST API performance for wallet and transaction workflows',
      'Mentored junior developers on architecture standards and implementation quality',
    ],
    techStack: {
      frontend: ['React.js', 'React Native', 'Next.js'],
      backend: ['Node.js', 'Express.js', 'REST APIs'],
      blockchain: ['Ethereum', 'Smart Contracts', 'Web3', 'Wallet Integration'],
      database: ['MongoDB'],
    },
    skills:
      'Blockchain Development, Crypto Wallets, Ethereum, Smart Contracts, React Native, Node.js, REST APIs',
  },
  {
    company: 'NiaLabs',
    location: 'Seoul, South Korea',
    roles: [
      {
        title: 'Mobile & Web Developer',
        period: 'Aug 2022 - Dec 2023',
      },
    ],
    description:
      'Delivered Web3 products across NFT, wallet, metaverse payment, and DeFi workflows.',
    achievements: [
      'Delivered NFT marketplace, wallet systems, and a metaverse payment solution end-to-end',
      'Implemented DeFi smart contracts and Web3 integrations using React, React Native, NestJS, and Python',
      'Built crypto wallet flows for secure asset movement and production-grade blockchain interactions',
      'Contributed to Web3 product architecture across mobile, web, backend, and smart-contract layers',
    ],
    techStack: {
      frontend: ['React', 'React Native', 'Next.js'],
      backend: ['Node.js', 'NestJS', 'Python'],
      blockchain: ['Ethereum', 'DeFi', 'NFT', 'Smart Contracts', 'Wallets'],
      languages: ['JavaScript', 'TypeScript', 'Python', 'Solidity'],
      database: ['MySQL', 'MongoDB'],
    },
    impact:
      'Built production Web3 systems spanning marketplace, wallet, and metaverse payment experiences.',
    skills:
      'Web3 Engineering, NFT Marketplace, Wallet Systems, Smart Contracts, DeFi, React Native, NestJS, Python',
  },
  {
    company: 'VizaMaster',
    location: 'Uzbekistan',
    roles: [
      {
        title: 'Full Stack Developer',
        period: 'May 2020 - Jan 2022',
      },
    ],
    description:
      'Built an enterprise visa-processing platform with document workflows, RBAC, multilingual content, and a 3D interactive client portal.',
    achievements: [
      'Automated 70% of agency operations through an enterprise platform with RBAC and document workflows',
      'Reduced client processing time by 40% with application tracking and structured admin flows',
      'Built a 3D interactive client portal using Next.js, TypeScript, and Three.js',
      'Delivered PWA, SEO, multilingual support, and analytics for a public-facing platform serving 5,000+ clients per year',
      'Designed serverless backend architecture on Cloudflare Edge and Neon PostgreSQL for global low-latency delivery',
    ],
    techStack: {
      frontend: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'PWA'],
      backend: ['Serverless Functions', 'API Routes', 'Prisma'],
      cloud: ['Cloudflare Edge', 'Cloudflare Workers', 'Global CDN'],
      database: ['Neon PostgreSQL', 'Prisma ORM'],
      features: ['RBAC', 'Document Workflows', 'SEO', 'Multilingual Content'],
    },
    impact:
      'Transformed agency operations with measurable processing, automation, and client-service improvements.',
    links: {
      web: 'vizamaster.uz',
      admin: 'admin.vizamaster.uz',
    },
    skills:
      'Enterprise Architecture, Serverless, Edge Computing, Three.js, Next.js, PostgreSQL, Cloudflare, PWA, RBAC',
  },
]

const selectedProjects: SelectedProjectGroup[] = [
  {
    category: 'Web & Full Stack',
    items: [
      'Medical exhibition platform with real-time data, high traffic, and zero-downtime launch requirements',
      'High-traffic B2B event systems for Korean enterprise and exhibition operators',
      'E-commerce and content platform for a national retail business',
      'Agency operations system serving 5,000+ clients/year with document workflows and RBAC',
      'Corporate website rebuild that improved organic traffic by 120%',
      'Enterprise admin system for millions of records with analytics and role management',
    ],
  },
  {
    category: 'Mobile',
    items: [
      'Event mobile app with maps, QR, step tracking, and data sync for 15,000+ attendees',
      'QR-based check-in system that reduced event entry queues by 80%',
      'SLAM-based iPhone scanning with a Three.js point-cloud desktop viewer',
      'In-car entertainment app with automotive-optimized interaction flows',
      'Global Web3 crypto wallet with 10,000+ active users',
    ],
  },
  {
    category: 'Blockchain & Web3',
    items: [
      'NFT marketplace and wallet system with Ethereum and DeFi smart contracts',
      'Crypto wallet management platform with on-chain transactions across mobile and web',
    ],
  },
]

const WorkHistoryUpdate = () => {
  return (
    <div className='no-scrollbar h-dvh overflow-y-auto pb-20 lg:pb-28'>
      <PageHeader
        title='Professional Work History'
        description='Full-stack web and mobile engineering across enterprise platforms, event systems, and Web3 products'
      />

      <div className='mx-auto flex max-w-4xl flex-col gap-y-8 px-4 md:px-0'>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {impactMetrics.map((metric) => (
            <div
              key={metric.label}
              className='rounded-xl border bg-card/80 p-4 shadow-sm'
            >
              <div className='text-2xl font-bold text-primary'>
                {metric.value}
              </div>
              <div className='mt-1 text-sm text-muted-foreground'>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {workHistory.map((work, index) => (
          <div
            key={work.company}
            className={cn(
              'group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300',
              'hover:shadow-md'
            )}
          >
            <div className='absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]' />

            <div className='relative z-[2] p-6 md:p-8'>
              <div className='mb-6 flex items-start justify-between'>
                <div>
                  <div className='mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                    Experience {String(index + 1).padStart(2, '0')}
                  </div>
                  <h2 className='text-2xl font-bold text-card-foreground'>
                    {work.company}
                  </h2>
                  <div className='mt-2 flex items-center gap-2 text-muted-foreground'>
                    <MapPinIcon className='h-4 w-4' />
                    <span className='text-sm'>{work.location}</span>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                {work.roles.map((role, roleIndex) => (
                  <div
                    key={`${work.company}-${role.title}`}
                    className={cn(
                      'pb-4',
                      roleIndex < work.roles.length - 1 && 'border-b'
                    )}
                  >
                    <div className='mb-2 flex flex-wrap items-center gap-3'>
                      <BriefcaseIcon className='h-5 w-5 text-primary' />
                      <h3 className='text-xl font-semibold text-card-foreground'>
                        {role.title}
                      </h3>
                      {role.type && (
                        <span className='rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
                          {role.type}
                        </span>
                      )}
                    </div>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <CalendarIcon className='h-4 w-4' />
                      <span>{role.period}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className='mb-6 mt-6 leading-relaxed text-muted-foreground'>
                {work.description}
              </p>

              <div className='mb-6'>
                <div className='mb-3 flex items-center gap-2'>
                  <TrophyIcon className='h-5 w-5 text-primary' />
                  <h4 className='font-semibold text-card-foreground'>
                    Key Outcomes
                  </h4>
                </div>
                <ul className='space-y-2'>
                  {work.achievements.map((achievement) => (
                    <li key={achievement} className='flex items-start gap-3'>
                      <BoltIcon className='mt-1 h-4 w-4 shrink-0 text-primary' />
                      <span className='text-sm leading-relaxed text-muted-foreground'>
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mb-6'>
                <div className='mb-3 flex items-center gap-2'>
                  <CodeBracketIcon className='h-5 w-5 text-primary' />
                  <h4 className='font-semibold text-card-foreground'>
                    Tech Stack
                  </h4>
                </div>
                <div className='space-y-3'>
                  {Object.entries(work.techStack).map(([category, techs]) => (
                    <div key={category}>
                      <span className='text-sm font-medium capitalize text-muted-foreground'>
                        {category}:{' '}
                      </span>
                      <div className='mt-1 inline-flex flex-wrap gap-2'>
                        {techs.map((tech) => (
                          <span
                            key={tech}
                            className='rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground'
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {work.impact && (
                <div className='rounded-lg border bg-accent/5 p-4'>
                  <p className='text-sm italic text-muted-foreground'>
                    {work.impact}
                  </p>
                </div>
              )}

              {work.links && (
                <div className='mt-4 flex flex-wrap gap-4'>
                  {Object.entries(work.links).map(([key, url]) => (
                    <a
                      key={key}
                      href={`https://${url}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm font-medium text-primary hover:underline'
                    >
                      {key}: {url}
                    </a>
                  ))}
                </div>
              )}

              <div className='mt-6 border-t pt-4'>
                <p className='text-sm text-muted-foreground'>
                  <span className='font-medium text-card-foreground'>
                    Skills:{' '}
                  </span>
                  {work.skills}
                </p>
              </div>
            </div>
          </div>
        ))}

        <section className='rounded-xl border bg-card p-6 shadow-sm md:p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-card-foreground'>
              Selected Projects
            </h2>
            <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
              A focused sample of shipped work across web, mobile, enterprise
              platforms, and Web3 systems.
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-3'>
            {selectedProjects.map((group) => (
              <div key={group.category}>
                <h3 className='mb-3 font-semibold text-card-foreground'>
                  {group.category}
                </h3>
                <ul className='space-y-2'>
                  {group.items.map((item) => (
                    <li key={item} className='flex items-start gap-2'>
                      <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary' />
                      <span className='text-sm leading-relaxed text-muted-foreground'>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default WorkHistoryUpdate
