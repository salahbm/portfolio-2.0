import { MaskMouse } from '@/components/shared/mask-mouse';
import { defaultMeta } from '@/lib/meta';
import Hero from '@/pages/hero';

export const meta = defaultMeta;

export default function Home() {
  return (
    <main>
      <Hero />
      <MaskMouse />
    </main>
  );
}
