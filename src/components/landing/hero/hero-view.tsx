import { Header } from '@/components/header'
import MacOSWaves from './components/macos-bg'
import { HeroImageBentoItem } from '@/components/bento/hero-image-bento-item'
import {
  MacOSNotesWidget,
  MacOSTipsWidget,
} from './components/macos-text-widgets'

export function Hero() {
  return (
    <section className='relative flex h-dvh flex-col overflow-hidden'>
      <Header />
      {/* <ScrollBlob /> */}
      <MacOSWaves />
      <div className='xl:top-18 pointer-events-none absolute right-5 top-14 z-10 flex w-[min(32vw,300px)] min-w-[220px] flex-col gap-4 xl:right-6 xl:w-[270px] 2xl:right-10 2xl:top-16 2xl:w-[360px]'>
        <HeroImageBentoItem className='m-0 w-full min-w-0 2xl:w-full' />
        <MacOSNotesWidget className='w-full' />
        <MacOSTipsWidget className='w-full' />
      </div>
      {/* <NameComponent /> */}
    </section>
  )
}
