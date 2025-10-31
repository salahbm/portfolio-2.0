import { InstagramChatWidget } from '../widgets/instagram-widget'
import { BentoCard } from '../grids/bento-card'

export function InstagramBentoItem() {
  return (
    <BentoCard className='col-span-1 row-span-1 aspect-square' variant='grid'>
      <InstagramChatWidget />
    </BentoCard>
  )
}
