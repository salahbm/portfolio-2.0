import { MouseDefault } from './cursor-assets/cursor-default'
import { MouseGrab } from './cursor-assets/mouse-grab'
import { MouseHand } from './cursor-assets/mouse-hand'
import { MousePointer } from './cursor-assets/mouse-pointer'
import { MousePointerClick } from './cursor-assets/mouse-pointer-click'
import { MouseText } from './cursor-assets/mouse-text'

export type CursorType =
  | 'default'
  | 'pointer'
  | 'click'
  | 'hand'
  | 'grab'
  | 'text'

export const IconMap = {
  default: MouseDefault,
  pointer: MousePointer,
  click: MousePointerClick,
  hand: MouseHand,
  grab: MouseGrab,
  text: MouseText,
}

export const ColorMap: Record<CursorType, string> = {
  default: 'text-gray-500',
  pointer: 'text-blue-400',
  click: 'text-green-400',
  hand: 'text-yellow-400',
  grab: 'text-pink-400',
  text: 'text-purple-400',
}
