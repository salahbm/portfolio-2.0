import { HeroText } from './components/hero-texts'
import AvatarView from './components/avatar'
import NameComponent from './components/name.component'
import ScrollBlob from './components/scroll-blob'

export function Hero() {
  return (
    <section className='relative flex h-screen flex-col overflow-hidden px-20 pb-20'>
      <ScrollBlob />

      <div className='flex flex-1 items-center lg:items-end'>
        <div className='mb-5 flex flex-col items-center gap-4 lg:flex-row lg:px-10'>
          <AvatarView />
          <HeroText />
        </div>
      </div>
      <NameComponent />
    </section>
  )
}
