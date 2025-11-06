import { Header } from '@/components/header'
import MacOSWaves from './components/macos-bg'
import NameComponent from './components/name.component'
import ScrollBlob from './components/scroll-blob'

export function Hero() {
  return (
    <section className='relative flex h-dvh flex-col overflow-hidden'>
      <Header />
      <ScrollBlob />
      <MacOSWaves />
      <NameComponent />
    </section>
  )
}
