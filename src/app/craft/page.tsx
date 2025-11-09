import type { Metadata } from 'next'

import { getMDXPages } from '@/db/mdx-content'
import { sortPagesByPublicationDate } from '@/lib/mdx-content'

import { PageHeader } from '@/components/content/page-header'
import { PageContent } from '@/components/content/page-content'
import { CraftGrid } from '@/components/grids/craft-grid'
import { CraftCard } from '@/components/grids/craft-card'
import { Fragment } from 'react'
import { VFXBorderBeam } from '@/components/ui-vfx/vfx-border-beam'

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Check my personal work I craft',
}

export default async function CraftPage() {
  const pages = await getMDXPages('craft')
  const sortedPages = sortPagesByPublicationDate(pages)

  return (
    <Fragment>
      <PageHeader
        title='Craft'
        description='A dazzling playground of creativity and fun. Take a dip into my personal craft and let the imagination run wild!'
      />
      <div className='relative mx-4 my-12 max-w-4xl self-center rounded-xl border border-neutral-300 bg-white/60 p-6 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/40'>
        <h2 className='mb-3 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white'>
          Note
        </h2>
        <p className='leading-relaxed text-neutral-700 dark:text-neutral-300'>
          Here’s a selection of the things I’ve built. Some work isn’t listed
          because it was created for private clients /companies. If you’d like
          to see more, feel free to browse my GitHub for additional projects and
          experiments.
        </p>
        <VFXBorderBeam className='vfx-border-beam-duration-[15s] vfx-border-beam-color-from-[#6c29e2] vfx-border-beam-color-to-[#ec6a5f] vfx-border-beam-size-[52px] max-md:vfx-border-beam-size-10' />
      </div>

      <PageContent>
        <CraftGrid>
          {sortedPages.map((page) => (
            <CraftCard
              key={page.slug}
              slug={page.slug}
              title={page.metadata.title}
              summary={page.metadata.summary}
              category={page.metadata.category}
              publishedAt={page.metadata.publishedAt}
            />
          ))}
        </CraftGrid>
      </PageContent>
    </Fragment>
  )
}
