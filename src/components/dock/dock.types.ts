import { HTMLAttributes } from 'react'

export type DockContextType = {
  hovered: boolean
  width?: number
  isLocked: boolean
  setIsLocked: (isLocked: boolean) => void
}

export type DockItemProps = HTMLAttributes<HTMLLIElement> & {
  id?: string
  isActive?: boolean
  src: string
  alt: string
  priority?: boolean
}
