import { HTML5Icon } from '@/components/shared/icons/html5-icon'
import { CSS3Icon } from '@/components/shared/icons/css3-icon'
import { TypescriptIcon } from '@/components/shared/icons/typescript-icon'
import { GraphQLIcon } from '@/components/shared/icons/graphql-icon'
import { SQLIcon } from '@/components/shared/icons/sql-icon'
import { JavaScriptIcon } from '@/components/shared/icons/javascript-icon'
import { DartIcon } from '@/components/shared/icons/dart-icon'
import { PostgreSQLIcon } from '@/components/shared/icons/postgresql-icon'

import { RadixUIIcon } from '@/components/shared/icons/radix-ui-icon'
import { ShadcnUIIcon } from '@/components/shared/icons/shadcn-ui-icon'
import { NextJSSquareIcon } from '@/components/shared/icons/nextjs-square-icon'
import { ReactIcon } from '@/components/shared/icons/react-icon'
import { TailwindCSSIcon } from '@/components/shared/icons/tailwind-css-icon'
import { MotionIcon } from '@/components/shared/icons/motion-icon'
import { GSAPIcon } from '@/components/shared/icons/gsap-icon'
import { ThreeJSIcon } from '@/components/shared/icons/threejs-icon'
import { ReactThreeFiberIcon } from '@/components/shared/icons/react-three-fiber-icon'
import { LiveblocksIcon } from '@/components/shared/icons/liveblocks-icon'
import { ZodIcon } from '@/components/shared/icons/zod-icon'
import { ZustandIcon } from '@/components/shared/icons/zustand-icon'
import { ReduxIcon } from '@/components/shared/icons/redux-icon'
import { RecoilIcon } from '@/components/shared/icons/recoil-icon'
import { ApolloGraphQLIcon } from '@/components/shared/icons/apollo-graphql-icon'
import { SWRIcon } from '@/components/shared/icons/swr-icon'
import { TanStackQueryIcon } from '@/components/shared/icons/tanstack-query-icon'
import { BetterAuthIcon } from '@/components/shared/icons/better-auth-icon'
import { ClerkIcon } from '@/components/shared/icons/clerk-icon'
import { NextAuthIcon } from '@/components/shared/icons/nextauth-icon'
import { NuqsIcon } from '@/components/shared/icons/nuqs-icon'
import { ElectronIcon } from '@/components/shared/icons/electron-icon'

import { NestJSIcon } from '@/components/shared/icons/nestjs-icon'
import { ExpressIcon } from '@/components/shared/icons/express-icon'
import { PrismaIcon } from '@/components/shared/icons/prisma-icon'
import { MongoDBIcon } from '@/components/shared/icons/mongodb-icon'
import { SupabaseIcon } from '@/components/shared/icons/supabase-icon'
import { NeonIcon } from '@/components/shared/icons/neon-icon'
import { AppwriteIcon } from '@/components/shared/icons/appwrite-icon'
import { FirebaseIcon } from '@/components/shared/icons/firebase-icon'
import { TwilioIcon } from '@/components/shared/icons/twilio-icon'
import { StripeIcon } from '@/components/shared/icons/stripe-icon'
import { CloudinaryIcon } from '@/components/shared/icons/cloudinary-icon'

import { VercelIcon } from '@/components/shared/icons/vercel-icon'
import { NetlifyIcon } from '@/components/shared/icons/netlify-icon'
import { RenderIcon } from '@/components/shared/icons/render-icon'
import { RailwayIcon } from '@/components/shared/icons/railway-icon'
import { CloudflareIcon } from '@/components/shared/icons/cloudflare-icon'
import { AppStoreIcon } from '@/components/shared/icons/app-store-icon'

import { ExpoIcon } from '@/components/shared/icons/expo-icon'
import { ReactNativeIcon } from '@/components/shared/icons/react-native-icon'

import { VSCodeIcon } from '@/components/shared/icons/vscode-icon'
import { NodeJSIcon } from '@/components/shared/icons/nodejs-icon'
import { TurboRepoIcon } from '@/components/shared/icons/turbo-repo-icon'
import { GitHubSquareIcon } from '@/components/shared/icons/github-square-icon'
import { FigmaIcon } from '@/components/shared/icons/figma-icon'
import { PhotoshopIcon } from '@/components/shared/icons/photoshop-icon'
import { IllustratorIcon } from '@/components/shared/icons/illustrator-icon'
import { AfterEffectsIcon } from '@/components/shared/icons/after-effects-icon'

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
    Icon: JavaScriptIcon,
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
    Icon: DartIcon,
    tag: 'mobile',
    href: 'https://dart.dev/',
  },
  {
    name: 'PostgreSQL',
    Icon: PostgreSQLIcon,
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
    Icon: GSAPIcon,
    tag: 'animation',
    href: 'https://gsap.com/',
  },
  {
    name: 'Three.js',
    Icon: ThreeJSIcon,
    tag: '3D graphics',
    href: 'https://threejs.org/',
  },
  {
    name: 'React Three Fiber',
    Icon: ReactThreeFiberIcon,
    tag: '3D graphics',
    href: 'https://docs.pmnd.rs/react-three-fiber',
  },
  {
    name: 'Liveblocks',
    Icon: LiveblocksIcon,
    tag: 'real-time',
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
    Icon: RecoilIcon,
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
    Icon: SWRIcon,
    tag: 'data fetching',
    href: 'https://swr.vercel.app/',
  },
  {
    name: 'TanStack Query',
    Icon: TanStackQueryIcon,
    tag: 'data fetching',
    href: 'https://tanstack.com/query/latest',
  },
  {
    name: 'Better Auth',
    Icon: BetterAuthIcon,
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
    Icon: NextAuthIcon,
    tag: 'authentication',
    href: 'https://next-auth.js.org/',
  },
  {
    name: 'nuqs',
    Icon: NuqsIcon,
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
    Icon: ExpressIcon,
    tag: 'server framework',
    href: 'https://expressjs.com/',
  },
  {
    name: 'Prisma',
    Icon: PrismaIcon,
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
    Icon: NeonIcon,
    tag: 'database',
    href: 'https://neon.tech/',
  },
  {
    name: 'Appwrite',
    Icon: AppwriteIcon,
    tag: 'BaaS',
    href: 'https://appwrite.io/',
  },
  {
    name: 'Firebase',
    Icon: FirebaseIcon,
    tag: 'BaaS',
    href: 'https://firebase.google.com/',
  },
  {
    name: 'Twilio',
    Icon: TwilioIcon,
    tag: 'communication',
    href: 'https://www.twilio.com/',
  },
  {
    name: 'Stripe',
    Icon: StripeIcon,
    tag: 'payments',
    href: 'https://stripe.com/',
  },
  {
    name: 'Cloudinary',
    Icon: CloudinaryIcon,
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
    Icon: NetlifyIcon,
    tag: 'hosting/deployment',
    href: 'https://www.netlify.com/',
  },
  {
    name: 'Render',
    Icon: RenderIcon,
    tag: 'hosting/deployment',
    href: 'https://render.com/',
  },
  {
    name: 'Railway',
    Icon: RailwayIcon,
    tag: 'hosting/deployment',
    href: 'https://railway.app/',
  },
  {
    name: 'Cloudflare',
    Icon: CloudflareIcon,
    tag: 'edge/infra',
    href: 'https://www.cloudflare.com/',
  },
  {
    name: 'App Store',
    Icon: AppStoreIcon,
    tag: 'mobile deployment',
    href: 'https://developer.apple.com/app-store/',
  },
]

/* ----------------------------- MOBILE STACK ---------------------------- */
export const mobileTechnologiesTechStackItems: TechStackItem[] = [
  {
    name: 'Expo',
    Icon: ExpoIcon,
    tag: 'mobile framework',
    href: 'https://expo.dev/',
  },
  {
    name: 'React Native',
    Icon: ReactNativeIcon,
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
    Icon: IllustratorIcon,
    tag: 'design',
    href: 'https://www.adobe.com/products/illustrator.html',
  },
  {
    name: 'After Effects',
    Icon: AfterEffectsIcon,
    tag: 'motion graphics',
    href: 'https://www.adobe.com/products/aftereffects.html',
  },
]
