import { FlipBoard } from '@/components/flipboard'
import { ScrollStory } from '@/components/scroll-story'

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-white text-black dark:bg-black dark:text-white'>
      <section className='flex flex-col items-center justify-center py-40 text-center'>
        <h1 className='mb-6 text-6xl font-extrabold md:text-8xl'>About Me</h1>
        <p className='max-w-2xl text-xl text-gray-600 dark:text-gray-300'>
          Hey, I’m Muhammad — a full-stack engineer who enjoys crafting clean,
          performant web experiences using TypeScript, Next.js, and Tailwind.
        </p>
      </section>

      <ScrollStory />

      <section className='py-40 text-center'>
        <h2 className='mb-4 text-5xl font-bold'>Let’s build something cool</h2>
        <p className='text-lg text-gray-600 dark:text-gray-300'>
          I’m always excited to collaborate on creative ideas or solve complex
          engineering problems.
        </p>
      </section>

      <FlipBoard />
    </div>
  )
}
