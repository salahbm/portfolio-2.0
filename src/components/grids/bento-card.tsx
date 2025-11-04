'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { VFXBackgroundDot } from '@/components/ui-vfx/vfx-background-dot'

const bentoCardVariants = cva(
  'relative flex flex-col overflow-hidden rounded-2xl border cursor-pointer bg-card/80 backdrop-blur-xl transition-all duration-200',
  {
    variants: {
      variant: {
        grid: 'transform-gpu ease-linear hover:scale-[1.03] border-border/70 shadow-[0_0_1px_1px_hsl(var(--border)/0.4),_0_8px_24px_-6px_hsl(var(--border)/0.2)]',
      },
    },
  }
)

type BentoCardProps = {
  className?: string
  children?: React.ReactNode
} & VariantProps<typeof bentoCardVariants>

export function BentoCard({
  variant,
  className = '',
  children,
}: BentoCardProps) {
  return (
    <div className={cn(bentoCardVariants({ variant, className }))}>
      <div className='relative flex size-full flex-col overflow-hidden'>
        <VFXBackgroundDot />
        <div className='relative z-[2] flex size-full flex-col'>{children}</div>
      </div>
    </div>
  )
}
