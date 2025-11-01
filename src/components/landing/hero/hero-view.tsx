import { HeroText } from './components/hero-texts'
import AvatarView from './components/avatar'
import NameComponent from './components/name.component'
import ScrollBlob from './components/scroll-blob'
import MacOSWaves from './components/macos-bg'

export function Hero() {
  return (
    <section className='relative flex h-screen flex-col overflow-hidden'>
      {/* background */}
      <MacOSWaves />
      <ScrollBlob />
      {/* foreground content */}
      <div className='relative z-10 flex flex-1 items-center lg:items-end'>
        <div className='mb-5 flex flex-col items-center gap-4 lg:flex-row lg:px-10'>
          <AvatarView />
          <HeroText />
        </div>
      </div>
      <NameComponent />
    </section>
  )
}
