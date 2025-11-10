import { PageContent } from '@/components/content/page-content'
import { BentoGrid } from '@/components/grids/bento-grid'
import { SmartStack } from '@/components/shared/smart-stack'
import { GitHubBentoItem } from '@/components/bento/github-bento-item'
import { HeroBentoItem } from '@/components/bento/hero-bento-item'
import { TwitterBentoItem } from '@/components/bento/twitter-bento-item'
import { LinkedInBentoItem } from '@/components/bento/linkedin-bento-item'
import { StandByBentoItem } from '@/components/bento/stand-by-bento-item'
import { TechStackBentoItem } from '@/components/bento/tech-stack-bento-item'
import { WorkBentoItem } from '@/components/bento/work-bento-item'
import { CraftBentoItem } from '@/components/bento/craft-bento-item'
import { MusicBentoItem } from '@/components/bento/music-bento-item'
import { WeatherBentoItem } from '@/components/bento/weather-bento-item'
import { InstagramBentoItem } from '@/components/bento/instagram-bento-item'

export default async function DashboardPage() {
  return (
    <PageContent className='mt-10 min-h-screen items-center justify-center gap-0'>
      <BentoGrid>
        <HeroBentoItem />
        <GitHubBentoItem />
        <TwitterBentoItem />
        <InstagramBentoItem />
        <LinkedInBentoItem />
        <div className='hidden lg:block'>
          <MusicBentoItem />
        </div>
        <SmartStack
          className='col-span-2 row-span-1 min-h-full max-lg:min-h-[220px] max-md:min-h-[180px]'
          roundedValuePx={16}
        >
          <StandByBentoItem />
          <TechStackBentoItem />
          <WorkBentoItem />
          <CraftBentoItem />
        </SmartStack>
        <div className='block lg:hidden'>
          <MusicBentoItem />
        </div>
        <WeatherBentoItem />
      </BentoGrid>
    </PageContent>
  )
}
