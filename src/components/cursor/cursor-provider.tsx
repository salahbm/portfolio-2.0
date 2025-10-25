'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useMotionValue } from 'motion/react'
import useEvent from 'react-use-event-hook'
import { CursorType } from './cursor.types'
import { useUserAgent } from '@/hooks/use-user-agent'
import { useMounted } from '@/hooks/use-mounted'

interface CursorContextProps {
  cursorType: CursorType
  setCursorType: (type: CursorType) => void
  cursorRef: React.RefObject<HTMLSpanElement | null>
  x: ReturnType<typeof useMotionValue<number>>
  y: ReturnType<typeof useMotionValue<number>>
  color: string | null
  setColor: (color: string | null) => void
}

const CursorContext = createContext<CursorContextProps | undefined>(undefined)

export const useCursorContext = () => {
  const ctx = useContext(CursorContext)
  if (!ctx)
    throw new Error('useCursorContext must be used within CursorProvider')
  return ctx
}

const STYLE_ID = 'cursor-hide-style'

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isTouchDevice } = useUserAgent()
  const mounted = useMounted()

  // public state
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [color, setColor] = useState<string | null>(null)

  // refs
  const cursorRef = useRef<HTMLSpanElement>(null)
  const isVisibleRef = useRef(false)
  const cursorTypeRef = useRef<CursorType>('default')
  const lastMousePosRef = useRef({ x: 0, y: 0 })

  // motion values - initialize with current mouse position
  const x = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  )
  const y = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  )

  // --- Simple cursor hiding with CSS ---
  const installHideStyle = useCallback(() => {
    if (isTouchDevice) return

    const prev = document.getElementById(STYLE_ID)
    if (prev) return // Already installed

    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
      html.cursor-hidden * {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)
    document.documentElement.classList.add('cursor-hidden')
  }, [isTouchDevice])

  const uninstallHideStyle = useCallback(() => {
    document.documentElement.classList.remove('cursor-hidden')
    const style = document.getElementById(STYLE_ID)
    if (style?.parentNode) style.parentNode.removeChild(style)
  }, [])

  // --- show/hide helpers for the visual cursor element ---
  const show = useCallback(() => {
    const el = cursorRef.current
    if (!el) return
    isVisibleRef.current = true
    el.style.opacity = '1'
  }, [])

  const hide = useCallback(() => {
    const el = cursorRef.current
    if (!el) return
    isVisibleRef.current = false
    el.style.opacity = '0'
  }, [])

  // Mouse move handler
  const onMouseMove = useEvent((e: MouseEvent) => {
    lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    if (!isVisibleRef.current) show()
    x.set(e.clientX)
    y.set(e.clientY)
  })

  // Focus/blur handlers
  const onFocus = useCallback(() => {
    if (isTouchDevice) return
    show()
    x.set(lastMousePosRef.current.x)
    y.set(lastMousePosRef.current.y)
    installHideStyle()
  }, [isTouchDevice, show, installHideStyle, x, y])

  const onBlur = useCallback(() => {
    hide()
  }, [hide])

  // Visibility change (tab switches)
  useEffect(() => {
    if (isTouchDevice) return
    const handleVis = () => {
      if (document.visibilityState === 'visible') {
        onFocus()
      } else {
        onBlur()
      }
    }
    document.addEventListener('visibilitychange', handleVis)
    return () => document.removeEventListener('visibilitychange', handleVis)
  }, [isTouchDevice, onFocus, onBlur])

  // Core lifecycle hooks
  useEffect(() => {
    if (isTouchDevice || !mounted) {
      uninstallHideStyle()
      return
    }

    installHideStyle()
    if (document.hasFocus()) show()

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    document.addEventListener('mouseenter', show)
    document.addEventListener('mouseleave', hide)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mouseleave', hide)
      uninstallHideStyle()
    }
  }, [
    isTouchDevice,
    mounted,
    installHideStyle,
    uninstallHideStyle,
    onMouseMove,
    onFocus,
    onBlur,
    show,
    hide,
  ])

  // Click feedback pulse when in "pointer" or "hand" mode
  useEffect(() => {
    if (isTouchDevice) return
    const onDown = () => {
      const current = cursorTypeRef.current
      if (current === 'pointer') {
        setCursorType('click')
        setTimeout(() => setCursorType('pointer'), 150)
      } else if (current === 'hand') {
        setCursorType('grab')
      }
    }
    const onUp = () => {
      const current = cursorTypeRef.current
      if (current === 'grab') {
        setCursorType('hand')
      }
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [isTouchDevice])

  // Hover type switching
  useEffect(() => {
    if (isTouchDevice) return

    const resolveType = (el: Element | null): CursorType => {
      if (!el) return 'default'
      const withData = (el.closest('[data-cursor]') as HTMLElement | null)
        ?.dataset.cursor as CursorType | undefined
      if (withData) return withData
      if (el.closest('a,button,[role="button"]')) return 'pointer'
      if (el.closest('input,textarea,[contenteditable="true"]')) return 'text'
      return 'default'
    }

    const onOver = (e: PointerEvent) => {
      const next = resolveType(e.target as Element)
      if (next !== cursorTypeRef.current) {
        cursorTypeRef.current = next
        setCursorType(next)
      }
    }

    document.addEventListener('pointerover', onOver, { passive: true })
    return () => document.removeEventListener('pointerover', onOver)
  }, [isTouchDevice])

  // Keep ref mirror in sync
  useEffect(() => {
    cursorTypeRef.current = cursorType
  }, [cursorType])

  return (
    <CursorContext.Provider
      value={{ cursorType, setCursorType, cursorRef, x, y, color, setColor }}
    >
      {children}
    </CursorContext.Provider>
  )
}
