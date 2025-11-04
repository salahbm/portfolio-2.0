import type { Metadata } from 'next'

import { getMDXPages } from '@/db/mdx-content'
import { sortPagesByPublicationDate } from '@/lib/mdx-content'

import { PageHeader } from '@/components/content/page-header'
import { PageContent } from '@/components/content/page-content'
import { CraftGrid } from '@/components/grids/craft-grid'
import { CraftCard } from '@/components/grids/craft-card'
import { Fragment } from 'react'

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
