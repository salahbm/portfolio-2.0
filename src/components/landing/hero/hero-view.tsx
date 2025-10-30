import { HeroIcons } from './components/hero-icons'
import { HeroText } from './components/hero-texts'
import AvatarView from './components/avatar'
import NameComponent from './components/name.component'
import ScrollBlob from './components/scroll-blob'

export function Hero() {
  return (
    <section className='relative flex h-screen flex-col overflow-x-hidden px-20 pb-20'>
      <HeroIcons />

      <ScrollBlob />

      <div className='flex flex-1 items-end'>
        <div className='flex-center mb-5 gap-4 px-10'>
          <AvatarView />
          <HeroText />
        </div>
      </div>
      <NameComponent />
    </section>
  )
}
