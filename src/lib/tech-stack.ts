import { HTML5Icon } from '@/components/icons/html5-icon'
import { CSS3Icon } from '@/components/icons/css3-icon'
import { TypescriptIcon } from '@/components/icons/typescript-icon'
import { GraphQLIcon } from '@/components/icons/graphql-icon'
import { SQLIcon } from '@/components/icons/sql-icon'

import { RadixUIIcon } from '@/components/icons/radix-ui-icon'
import { ShadcnUIIcon } from '@/components/icons/shadcn-ui-icon'
import { NextJSSquareIcon } from '@/components/icons/nextjs-square-icon'
import { ReactIcon } from '@/components/icons/react-icon'
import { TailwindCSSIcon } from '@/components/icons/tailwind-css-icon'
import { MotionIcon } from '@/components/icons/motion-icon'
import { ZodIcon } from '@/components/icons/zod-icon'
import { ZustandIcon } from '@/components/icons/zustand-icon'
import { ReduxIcon } from '@/components/icons/redux-icon'
import { ClerkIcon } from '@/components/icons/clerk-icon'
import { ApolloGraphQLIcon } from '@/components/icons/apollo-graphql-icon'
import { ElectronIcon } from '@/components/icons/electron-icon'

import { NestJSIcon } from '@/components/icons/nestjs-icon'
import { MongoDBIcon } from '@/components/icons/mongodb-icon'
import { SupabaseIcon } from '@/components/icons/supabase-icon'

import { VercelIcon } from '@/components/icons/vercel-icon'
import { VSCodeIcon } from '@/components/icons/vscode-icon'
import { NodeJSIcon } from '@/components/icons/nodejs-icon'
import { TurboRepoIcon } from '@/components/icons/turbo-repo-icon'
import { GitHubSquareIcon } from '@/components/icons/github-square-icon'
import { FigmaIcon } from '@/components/icons/figma-icon'
import { PhotoshopIcon } from '@/components/icons/photoshop-icon'

export type TechStackItem = {
  name: string
  Icon: React.FunctionComponent<
    React.PropsWithoutRef<React.HTMLAttributes<SVGElement>>
  >
  tag: string
  href?: string
}

/* ----------------------------- LANGUAGES ----------------------------- */
export const languagesTechStackItems: TechStackItem[] = [
  { name: 'HTML 5', Icon: HTML5Icon, tag: 'frontend' },
  { name: 'CSS 3', Icon: CSS3Icon, tag: 'frontend' },
  {
    name: 'TypeScript',
    Icon: TypescriptIcon,
    tag: 'frontend/backend',
    href: 'https://www.typescriptlang.org/',
  },
  {
    name: 'JavaScript',
    Icon: NextJSSquareIcon,
    tag: 'frontend',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    name: 'GraphQL',
    Icon: GraphQLIcon,
    tag: 'frontend/backend',
    href: 'https://graphql.org/',
  },
  {
    name: 'SQL',
    Icon: SQLIcon,
    tag: 'backend',
  },
  {
    name: 'Dart',
    Icon: NextJSSquareIcon,
    tag: 'mobile',
    href: 'https://dart.dev/',
  },
  {
    name: 'PostgreSQL',
    Icon: NextJSSquareIcon,
    tag: 'database',
    href: 'https://www.postgresql.org/',
  },
]

/* --------------------------- FRONTEND STACK --------------------------- */
export const frontendTechnologiesTechStackItems: TechStackItem[] = [
  {
    name: 'Radix UI',
    Icon: RadixUIIcon,
    tag: 'UI/UX',
    href: 'https://www.radix-ui.com/primitives',
  },
  {
    name: 'shadcn/ui',
    Icon: ShadcnUIIcon,
    tag: 'UI/UX',
    href: 'https://ui.shadcn.com/',
  },
  {
    name: 'Next.js',
    Icon: NextJSSquareIcon,
    tag: 'frontend',
    href: 'https://nextjs.org/',
  },
  {
    name: 'React',
    Icon: ReactIcon,
    tag: 'frontend',
    href: 'https://react.dev/',
  },
  {
    name: 'Tailwind CSS',
    Icon: TailwindCSSIcon,
    tag: 'frontend',
    href: 'https://tailwindcss.com/',
  },
  {
    name: 'Framer Motion',
    Icon: MotionIcon,
    tag: 'animation',
    href: 'https://motion.dev/',
  },
  {
    name: 'GSAP',
    Icon: NextJSSquareIcon,
    tag: 'animation',
    href: 'https://gsap.com/',
  },
  {
    name: 'Three.js',
    Icon: NextJSSquareIcon,
    tag: '3D graphics',
    href: 'https://threejs.org/',
  },
  {
    name: 'React Three Fiber',
    Icon: NextJSSquareIcon,
    tag: '3D graphics',
    href: 'https://docs.pmnd.rs/react-three-fiber',
  },
  {
    name: 'Liveblocks',
    Icon: NextJSSquareIcon,
    tag: 'real-time collaboration',
    href: 'https://liveblocks.io/',
  },
  {
    name: 'Zod',
    Icon: ZodIcon,
    tag: 'validation',
    href: 'https://zod.dev/',
  },
  {
    name: 'Zustand',
    Icon: ZustandIcon,
    tag: 'state management',
    href: 'https://zustand-demo.pmnd.rs/',
  },
  {
    name: 'Redux',
    Icon: ReduxIcon,
    tag: 'state management',
    href: 'https://redux.js.org/',
  },
  {
    name: 'Recoil',
    Icon: NextJSSquareIcon,
    tag: 'state management',
    href: 'https://recoiljs.org/',
  },
  {
    name: 'Apollo GraphQL',
    Icon: ApolloGraphQLIcon,
    tag: 'data fetching',
    href: 'https://www.apollographql.com/',
  },
  {
    name: 'SWR',
    Icon: NextJSSquareIcon,
    tag: 'data fetching',
    href: 'https://swr.vercel.app/',
  },
  {
    name: 'TanStack Query',
    Icon: NextJSSquareIcon,
    tag: 'data fetching',
    href: 'https://tanstack.com/query/latest',
  },
  {
    name: 'Better Auth',
    Icon: NextJSSquareIcon,
    tag: 'authentication',
    href: 'https://better-auth.com/',
  },
  {
    name: 'Clerk',
    Icon: ClerkIcon,
    tag: 'authentication',
    href: 'https://clerk.com/',
  },
  {
    name: 'NextAuth.js',
    Icon: NextJSSquareIcon,
    tag: 'authentication',
    href: 'https://next-auth.js.org/',
  },
  {
    name: 'nuqs',
    Icon: NextJSSquareIcon,
    tag: 'query params',
    href: 'https://nuqs.47ng.com/',
  },
  {
    name: 'Electron',
    Icon: ElectronIcon,
    tag: 'desktop',
    href: 'https://www.electronjs.org/',
  },
]

/* ---------------------------- BACKEND STACK --------------------------- */
export const backendTechnologiesTechStackItems: TechStackItem[] = [
  {
    name: 'NestJS',
    Icon: NestJSIcon,
    tag: 'server framework',
    href: 'https://nestjs.com/',
  },
  {
    name: 'Express.js',
    Icon: NextJSSquareIcon,
    tag: 'server framework',
    href: 'https://expressjs.com/',
  },
  {
    name: 'Prisma',
    Icon: NextJSSquareIcon,
    tag: 'ORM',
    href: 'https://www.prisma.io/',
  },
  {
    name: 'MongoDB',
    Icon: MongoDBIcon,
    tag: 'database',
    href: 'https://www.mongodb.com/',
  },
  {
    name: 'Supabase',
    Icon: SupabaseIcon,
    tag: 'database',
    href: 'https://supabase.com/',
  },
  {
    name: 'Neon',
    Icon: NextJSSquareIcon,
    tag: 'database',
    href: 'https://neon.tech/',
  },
  {
    name: 'Appwrite',
    Icon: NextJSSquareIcon,
    tag: 'BaaS',
    href: 'https://appwrite.io/',
  },
  {
    name: 'Firebase',
    Icon: NextJSSquareIcon,
    tag: 'BaaS',
    href: 'https://firebase.google.com/',
  },
  {
    name: 'Twilio',
    Icon: NextJSSquareIcon,
    tag: 'communication',
    href: 'https://www.twilio.com/',
  },
  {
    name: 'Stripe',
    Icon: NextJSSquareIcon,
    tag: 'payments',
    href: 'https://stripe.com/',
  },
  {
    name: 'Cloudinary',
    Icon: NextJSSquareIcon,
    tag: 'media storage',
    href: 'https://cloudinary.com/',
  },
]

/* ------------------------- DEPLOYMENT & HOSTING ------------------------ */
export const hoistingAndDeploymentTechStackItems: TechStackItem[] = [
  {
    name: 'Vercel',
    Icon: VercelIcon,
    tag: 'hosting/deployment',
    href: 'https://vercel.com/',
  },
  {
    name: 'Netlify',
    Icon: NextJSSquareIcon,
    tag: 'hosting/deployment',
    href: 'https://www.netlify.com/',
  },
  {
    name: 'Render',
    Icon: NextJSSquareIcon,
    tag: 'hosting/deployment',
    href: 'https://render.com/',
  },
  {
    name: 'Railway',
    Icon: NextJSSquareIcon,
    tag: 'hosting/deployment',
    href: 'https://railway.app/',
  },
  {
    name: 'Cloudflare',
    Icon: NextJSSquareIcon,
    tag: 'edge/infra',
    href: 'https://www.cloudflare.com/',
  },
  {
    name: 'App Store',
    Icon: NextJSSquareIcon,
    tag: 'mobile deployment',
    href: 'https://developer.apple.com/app-store/',
  },
]

/* ----------------------------- MOBILE STACK ---------------------------- */
export const mobileTechnologiesTechStackItems: TechStackItem[] = [
  {
    name: 'Expo',
    Icon: NextJSSquareIcon,
    tag: 'mobile framework',
    href: 'https://expo.dev/',
  },
  {
    name: 'React Native',
    Icon: NextJSSquareIcon,
    tag: 'mobile framework',
    href: 'https://reactnative.dev/',
  },
]

/* -------------------------- TOOLS & SOFTWARES -------------------------- */
export const toolsAndSoftwaresBaseTechStackItems: TechStackItem[] = [
  {
    name: 'VSCode',
    Icon: VSCodeIcon,
    tag: 'code editor',
    href: 'https://code.visualstudio.com/',
  },
  {
    name: 'Node.js',
    Icon: NodeJSIcon,
    tag: 'runtime',
    href: 'https://nodejs.org/',
  },
]

export const toolsAndSoftwaresRepoTechStackItems: TechStackItem[] = [
  {
    name: 'Turborepo',
    Icon: TurboRepoIcon,
    tag: 'monorepo',
    href: 'https://turbo.build/',
  },
  {
    name: 'GitHub',
    Icon: GitHubSquareIcon,
    tag: 'git',
    href: 'https://github.com/',
  },
]

export const toolsAndSoftwaresDesignTechStackItems: TechStackItem[] = [
  {
    name: 'Figma',
    Icon: FigmaIcon,
    tag: 'design',
    href: 'https://www.figma.com/',
  },
  {
    name: 'Photoshop',
    Icon: PhotoshopIcon,
    tag: 'design',
    href: 'https://www.adobe.com/products/photoshop.html',
  },
  {
    name: 'Illustrator',
    Icon: NextJSSquareIcon,
    tag: 'design',
    href: 'https://www.adobe.com/products/illustrator.html',
  },
  {
    name: 'After Effects',
    Icon: NextJSSquareIcon,
    tag: 'motion graphics',
    href: 'https://www.adobe.com/products/aftereffects.html',
  },
]
