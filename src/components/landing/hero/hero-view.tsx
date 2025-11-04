import NameComponent from './components/name.component'
import ScrollBlob from './components/scroll-blob'
import MacOSWaves from './components/macos-bg'

export function Hero() {
  return (
    <section className='relative flex h-screen flex-col overflow-hidden'>
      {/* background */}
      <MacOSWaves />
      <ScrollBlob />
      <NameComponent />
    </section>
  )
}
