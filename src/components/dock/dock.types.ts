import { HTMLAttributes } from 'react'

export type DockContextType = {
  hovered: boolean
  width?: number
  isLocked: boolean
  addLock: (lockId: string) => void
  removeLock: (lockId: string) => void
}

export type DockItemProps = HTMLAttributes<HTMLLIElement> & {
  id?: string
  isActive?: boolean
  src: string
  alt: string
  priority?: boolean
}
