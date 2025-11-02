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
      {/* foreground content */}
      <div className='relative flex w-full flex-1 flex-col items-start justify-start gap-4 lg:flex-row lg:p-6'>
        <div className='flex w-full flex-col items-center gap-4 lg:flex-row'>
          <AvatarView />
          <HeroText />
        </div>
        <ScrollBlob />
      </div>

      <NameComponent />
    </section>
  )
}
