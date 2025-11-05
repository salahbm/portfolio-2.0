import NameComponent from './components/name.component'
import ScrollBlob from './components/scroll-blob'

export function Hero() {
  return (
    <section className='relative flex h-screen flex-col overflow-hidden'>
      {/* background */}
      <ScrollBlob />
      <NameComponent />
    </section>
  )
}
