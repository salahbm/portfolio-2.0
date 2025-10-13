import { MaskMouse } from '@/components/shared/mask-mouse';
import Hero from '@/pages/hero';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <main>
      <Hero />
      <MaskMouse />
    </main>
  );
}
