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
  const isInsideViewportRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)

  // motion values
  const x = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  )
  const y = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  )

  // Inject the hide-cursor CSS once
  const ensureStyleTag = useCallback(() => {
    if (isTouchDevice) return
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
      /* Hide OS pointer anywhere over your page, including root/background */
      html.cursor-hidden, html.cursor-hidden body, html.cursor-hidden * { cursor: none !important; }

      /* Optional: hide text caret while custom cursor is active */
      /* html.cursor-hidden input, html.cursor-hidden textarea, html.cursor-hidden [contenteditable="true"] { caret-color: transparent !important; } */
    `
    document.head.appendChild(style)
  }, [isTouchDevice])

  const uninstallStyleTag = useCallback(() => {
    const style = document.getElementById(STYLE_ID)
    if (style?.parentNode) style.parentNode.removeChild(style)
  }, [])

  // Toggle the class while the pointer is inside your document & focused
  const setHidden = useCallback(
    (on: boolean) => {
      if (isTouchDevice) return
      document.documentElement.classList.toggle('cursor-hidden', on)
    },
    [isTouchDevice]
  )

  // show/hide visual cursor element
  const show = useCallback(() => {
    const el = cursorRef.current
    if (!el) return
    isVisibleRef.current = true
    el.style.opacity = '1'
    setHidden(true)
  }, [setHidden])

  const hide = useCallback(() => {
    const el = cursorRef.current
    if (!el) return
    isVisibleRef.current = false
    el.style.opacity = '0'
    setHidden(false)
  }, [setHidden])

  // pointer tracking with RAF optimization
  const onMouseMove = useEvent((e: MouseEvent) => {
    lastMousePosRef.current = { x: e.clientX, y: e.clientY }

    if (!isVisibleRef.current) {
      show()
    }

    // Cancel any pending RAF
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
    }

    // Update position immediately for responsiveness
    rafIdRef.current = requestAnimationFrame(() => {
      x.set(e.clientX)
      y.set(e.clientY)
      rafIdRef.current = null
    })
  })

  // Enhanced focus/blur handling for omnibox issue
  const onFocus = useCallback(() => {
    if (isTouchDevice) return

    // Only show cursor if mouse is actually inside viewport
    if (isInsideViewportRef.current) {
      show()
      x.set(lastMousePosRef.current.x)
      y.set(lastMousePosRef.current.y)
      setHidden(true)
    }
  }, [isTouchDevice, show, setHidden, x, y])

  const onBlur = useCallback(() => {
    // Only hide if we're actually losing focus (not just omnibox)
    // Use setTimeout to check if focus returns quickly (omnibox case)
    setTimeout(() => {
      if (!document.hasFocus() && !isInsideViewportRef.current) {
        hide()
        setHidden(false)
      }
    }, 100)
  }, [hide, setHidden])

  // Track mouse enter/leave for viewport detection
  const onMouseEnter = useCallback(() => {
    isInsideViewportRef.current = true
    if (document.hasFocus()) {
      show()
    }
  }, [show])

  const onMouseLeave = useCallback(() => {
    isInsideViewportRef.current = false
    hide()
  }, [hide])

  // Visibility change (tab switches)
  useEffect(() => {
    if (isTouchDevice) return
    const handleVis = () => {
      if (document.visibilityState === 'visible') {
        // Check if mouse is still in viewport before showing
        if (isInsideViewportRef.current) {
          onFocus()
        }
      } else {
        onBlur()
      }
    }
    document.addEventListener('visibilitychange', handleVis)
    return () => document.removeEventListener('visibilitychange', handleVis)
  }, [isTouchDevice, onFocus, onBlur])

  // Core lifecycle
  useEffect(() => {
    if (isTouchDevice || !mounted) {
      setHidden(false)
      uninstallStyleTag()
      return
    }

    ensureStyleTag()

    if (document.hasFocus()) {
      setHidden(true)
      show()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      setHidden(false)
      uninstallStyleTag()

      // Cleanup RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [
    isTouchDevice,
    mounted,
    ensureStyleTag,
    uninstallStyleTag,
    onMouseMove,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    show,
    hide,
    setHidden,
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
