import { HTMLAttributes, ReactNode } from 'react'

export type DockContextType = {
  hovered: boolean
  width?: number
}

export type DockItemProps = HTMLAttributes<HTMLLIElement> & {
  id?: string
  href?: string
  external?: boolean
  tooltip?: string
  isActive?: boolean
  onClick?: () => void
  children: ReactNode
}
