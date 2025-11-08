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
  duration?: string
  type?: string
}

interface TechStack {
  [category: string]: string[]
}

interface WorkExperience {
  company: string
  location: string
  logo?: string
  roles: Role[]
  description: string
  achievements?: string[]
  techStack?: TechStack
  impact?: string
  recognition?: string
  links?: Record<string, string>
  skills: string
}

export const metadata: Metadata = {
  title: 'Work',
  description: 'Check my work and contributions',
}

const workHistory: WorkExperience[] = [
  {
    company: 'Momenti Corp. (주)모멘티)',
    location: 'Seoul, South Korea (On-site)',
    roles: [
      {
        title: 'Senior Software Engineer Team Lead',
        period: 'January 2025 - Present',
        duration: '11 months',
        type: 'Current Role',
      },
      {
        title: 'Software Engineer',
        period: 'May 2024 - March 2025',
        duration: '11 months',
        type: 'Previous Role',
      },
    ],
    description:
      'Leading development teams in mobile application development and driving technical excellence across the organization.',
    achievements: [
      'Promoted to Team Lead within 6 months, managing cross-functional development teams',
      'Worked with big clients like Hyundai, LG, Samsung, Lotte Foods and etc.',
      'Architected and delivered scalable mobile applications serving thousands of users',
      'Established best practices for code quality, testing, and deployment pipelines',
      'Mentored junior developers and conducted technical training sessions',
    ],
    techStack: {
      mobile: [
        'React Native',
        'iOS Development',
        'Android Development',
        'Next.js',
        'Flutter',
      ],
      backend: ['Node.js', 'Express.js', 'API Development', 'NestJS'],
      cloud: ['Amazon Web Services (AWS)', 'EC2', 'S3'],
      database: ['MongoDB', 'PostgreSQL', 'MySQL'],
      tools: ['Git', 'Docker', 'CI/CD', 'Jira'],
    },
    links: {
      web: 'momenti.biz',
    },
    skills:
      'Mobile Application Development, Team Leadership, API Development, AWS, React Native, Node.js, MongoDB, PostgreSQL, Docker, CI/CD',
  },
  {
    company: 'CryptoCare ((주)크립토케어)',
    location: 'Seoul, South Korea (Hybrid)',
    logo: '₿',
    roles: [
      {
        title: 'Full Stack Engineer (Contract)',
        period: 'January 2024 - April 2024',
        duration: '4 months',
      },
    ],
    description:
      'Delivered enterprise-grade blockchain solutions, bridging Web2 and Web3 technologies.',
    achievements: [
      'Architected full-stack crypto trading platform with wallet integration',
      'Implemented Ethereum smart contracts and blockchain network integrations',
      'Developed secure crypto wallet functionalities with multi-signature support',
      'Built RESTful APIs handling high-volume cryptocurrency transactions',
      'Designed responsive UI/UX for both mobile and web platforms',
    ],
    techStack: {
      frontend: ['React.js', 'React Native', 'Next.js', 'TailwindCSS'],
      backend: ['Node.js', 'Express.js', 'Django', 'Python'],
      blockchain: ['Ethereum', 'Smart Contracts', 'Solidity', 'Web3.js'],
      cloud: ['AWS', 'Lambda', 'API Gateway'],
      database: ['MongoDB', 'Redis'],
      state: ['Redux', 'Context API'],
    },
    skills:
      'Blockchain Development, Ethereum, Smart Contracts, React Native, Node.js, Django, AWS, MongoDB, Redux, Crypto Wallets',
  },
  {
    company: 'NiaLabs (주)니아랩스',
    location: 'Seoul, South Korea (Hybrid)',
    logo: '🌐',
    roles: [
      {
        title: 'Mobile Developer',
        period: 'August 2022 - December 2023',
        duration: '1 year 5 months',
      },
    ],
    description:
      'Pioneering Web 3.0 solutions, leading the transition from Web 2.0 to blockchain-powered services.',
    achievements: [
      '🏆 Developed Metaverse payment solution achieving 2nd place in 2022 major platform competition',
      'Architected and launched NFT Marketplace enabling digital intellectual property trading',
      'Built cryptocurrency wallet backend with secure deposit/withdrawal systems',
      'Designed and implemented Smart Contracts for DAO, DeFi, and XToE business models',
      'Provided blockchain consulting across multiple chains (Ethereum, Polygon, Solana, BSC, Avalanche)',
      'Conducted smart contract audits ensuring security and optimization',
    ],
    techStack: {
      frontend: ['React', 'React Native', 'Next.js'],
      backend: ['Node.js', 'Python', 'Spring Boot', 'Java'],
      blockchain: [
        'Ethereum',
        'Polygon',
        'Solana',
        'BSC',
        'Avalanche',
        'Truffle',
        'Hardhat',
        'Infura',
        'Moralis',
      ],
      languages: [
        'JavaScript',
        'TypeScript',
        'Python',
        'Java',
        'Rust',
        'Solidity',
        'C',
        'C++',
      ],
      database: ['MySQL', 'MongoDB'],
    },
    impact:
      'Led Web 3.0 transformation initiatives, establishing the company as a blockchain innovation leader.',
    skills:
      'Blockchain Architecture, NFT Development, Smart Contracts, Solidity, DeFi, DAO, Metaverse, React Native, Node.js, Python, Spring Boot',
  },
  {
    company: 'Vizamaster',
    location: 'Uzbekistan (Hybrid)',
    logo: '✈️',
    roles: [
      {
        title: 'Full-stack Developer (Contract)',
        period: 'May 2020 - January 2022',
        duration: '1 year 9 months',
      },
    ],
    description:
      'Built enterprise-grade visa processing platform with advanced 3D web experiences and serverless architecture.',
    achievements: [
      'Architected complete enterprise ecosystem from scratch (admin + client platforms)',
      'Implemented role-based access control (RBAC) with secure authentication system',
      'Created stunning 3D UI/UX using Three.js for enhanced user engagement',
      'Built real-time document processing and visa application tracking system',
      'Developed multi-language blog system with advanced SEO optimization',
      'Deployed serverless architecture reducing operational costs by 60%',
      'Achieved global performance optimization through edge computing and CDN',
    ],
    techStack: {
      frontend: [
        'Next.js 13+',
        'TypeScript',
        'TailwindCSS',
        'Three.js',
        'WebGL',
      ],
      backend: ['Serverless Functions', 'Edge Functions', 'API Routes'],
      cloud: ['Cloudflare R2', 'Cloudflare Workers', 'Global CDN'],
      database: ['Neon PostgreSQL', 'Prisma ORM'],
      features: ['PWA', 'SEO', 'Analytics', 'Real-time Updates'],
    },
    impact:
      'Transformed visa processing workflow, reducing processing time and improving global user experience.',
    links: {
      web: 'vizamaster.uz',
      admin: 'admin.vizamaster.uz',
    },
    skills:
      'Enterprise Architecture, Serverless, Edge Computing, Three.js, WebGL, Next.js, TypeScript, PostgreSQL, Cloudflare, PWA, RBAC',
  },
]

const WorkHistoryUpdate = () => {
  return (
    <div className='bg-background pb-16 lg:pb-24'>
      <PageHeader
        title='Professional Work History'
        description='Building exceptional products with React, Next.js, and cutting-edge technologies'
      />
      <div className='mx-auto max-w-4xl space-y-8 px-4 md:p-0'>
        {workHistory.map((work, index) => (
          <div
            key={index}
            className={cn(
              'group relative rounded-xl border bg-card shadow-sm transition-all duration-300',
              'hover:shadow-md'
            )}
          >
            <div className='absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'></div>

            <div className='p-8'>
              {/* Header */}
              <div className='mb-6 flex items-start justify-between'>
                <div className='flex items-center gap-4'>
                  {work.logo && <div className='text-4xl'>{work.logo}</div>}
                  <div>
                    <h2 className='text-2xl font-bold text-card-foreground'>
                      {work.company}
                    </h2>
                    <div className='mt-1 flex items-center gap-2 text-muted-foreground'>
                      <MapPinIcon className='h-4 w-4' />
                      <span className='text-sm'>{work.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roles */}
              <div className='space-y-4'>
                {work.roles.map((role, roleIndex) => (
                  <div
                    key={roleIndex}
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
                      {role.duration && (
                        <>
                          <span>•</span>
                          <span>{role.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className='mb-6 mt-6 leading-relaxed text-muted-foreground'>
                {work.description}
              </p>

              {/* Achievements */}
              {work.achievements && work.achievements.length > 0 && (
                <div className='mb-6'>
                  <div className='mb-3 flex items-center gap-2'>
                    <TrophyIcon className='h-5 w-5 text-accent-foreground' />
                    <h4 className='font-semibold text-card-foreground'>
                      Key Achievements
                    </h4>
                  </div>
                  <ul className='space-y-2'>
                    {work.achievements.map((achievement, i) => (
                      <li key={i} className='flex items-start gap-3'>
                        <BoltIcon className='mt-1 h-4 w-4 shrink-0 text-primary' />
                        <span className='text-sm text-muted-foreground'>
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {work.techStack && (
                <div className='mb-6'>
                  <div className='mb-3 flex items-center gap-2'>
                    <CodeBracketIcon className='h-5 w-5 text-secondary-foreground' />
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
                          {techs.map((tech, i) => (
                            <span
                              key={i}
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
              )}

              {/* Impact/Recognition */}
              {(work.impact || work.recognition) && (
                <div className='rounded-lg border bg-accent/5 p-4'>
                  <p className='text-sm italic text-muted-foreground'>
                    💡 {work.impact || work.recognition}
                  </p>
                </div>
              )}

              {/* Links */}
              {work.links && (
                <div className='mt-4 flex flex-wrap gap-4'>
                  {Object.entries(work.links).map(([key, url]) => (
                    <a
                      key={key}
                      href={`https://${url}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='z-[3] text-sm font-medium text-primary hover:underline'
                    >
                      {key}: {url}
                    </a>
                  ))}
                </div>
              )}

              {/* Skills Summary */}
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
      </div>
    </div>
  )
}

export default WorkHistoryUpdate
