import { HeroIcons } from './components/hero-icons'
import { HeroText } from './components/hero-texts'
import AvatarView from './components/avatar'
import NameComponent from './components/name.component'

export function Hero() {
  return (
    <section className='relative flex h-screen flex-col overflow-x-hidden px-20 pb-20'>
      <HeroIcons />

      <div className='flex flex-1 items-end'>
        <div className='flex-center gap-6'>
          <AvatarView />
          <HeroText />
        </div>
      </div>
      <NameComponent />
    </section>
  )
}
