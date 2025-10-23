import { CursorType } from './cursor.types'
import { useCursorContext } from './cursor-provider'

export const useCursor = (): { setCursor: (type: CursorType) => void } => {
  const { setCursorType } = useCursorContext()
  return { setCursor: setCursorType }
}
