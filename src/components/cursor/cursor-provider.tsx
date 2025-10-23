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

/**
 * Strongest possible "hide native cursor" rule:
 * - Transparent 1x1 GIF as cursor URL (works even when 'none' is ignored for a frame)
 * - Fallback to 'none'
 * - Apply to html and all descendants
 * Notes:
 *   data:image/gif;base64,R0lGODlhAQABAAAAACw= is a minimal transparent GIF; we use a common variant below.
 */
const TRANSPARENT_CURSOR =
  "url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==') 0 0, none"

const STYLE_ID = 'cursor-hide-style__force'

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isMobile } = useUserAgent()
  const mounted = useMounted()

  // public state
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [color, setColor] = useState<string | null>(null)

  // refs
  const cursorRef = useRef<HTMLSpanElement>(null)
  const isVisibleRef = useRef(false)
  const cursorTypeRef = useRef<CursorType>('default')

  // motion values (if you render a visual cursor elsewhere)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // ----- Install / re-install the global hide style

  const installHideStyle = useCallback(() => {
    // remove any stale tag first
    const prev = document.getElementById(STYLE_ID)
    if (prev?.parentNode) prev.parentNode.removeChild(prev)

    const style = document.createElement('style')
    style.id = STYLE_ID
    // Highest specificity + !important to beat site/UA styles
    style.textContent = `
      html.cursor-hidden, html.cursor-hidden * {
        cursor: ${TRANSPARENT_CURSOR} !important;
      }
    `
    // rAF: ensure we apply *after* Chrome restores focus styles
    requestAnimationFrame(() => {
      document.head.appendChild(style)
      document.documentElement.classList.add('cursor-hidden')
    })
  }, [])

  const uninstallHideStyle = useCallback(() => {
    document.documentElement.classList.remove('cursor-hidden')
    const style = document.getElementById(STYLE_ID)
    if (style?.parentNode) style.parentNode.removeChild(style)
  }, [])

  // ----- show/hide helpers (just opacity gate for your visual cursor)
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

  // ----- ultra-fast re-hide paths

  // 1) First pointer event after focus/return: re-assert hide before the next paint
  const onPointerAny = useEvent(() => {
    // Synchronous + rAF + micro-delays to cover all Blink paths
    installHideStyle()
  })

  // 2) Mouse move (if you track a visual cursor, keep it too)
  const onMouseMove = useEvent((e: MouseEvent) => {
    const el = cursorRef.current
    if (!el) return
    if (!isVisibleRef.current) show()
    x.set(e.clientX)
    y.set(e.clientY)
  })

  // 3) Focus regain (omnibox/tab switch fix): re-apply multiple times in a short window
  const onFocus = useCallback(() => {
    show()
    // Immediately assert…
    installHideStyle()
    // …then again after Blink finishes restoring system cursor
    requestAnimationFrame(() => installHideStyle())
    // …and multiple times with increasing delays to catch all late paths
    setTimeout(() => installHideStyle(), 60)
    setTimeout(() => installHideStyle(), 120)
    setTimeout(() => installHideStyle(), 200)
    setTimeout(() => installHideStyle(), 400)
  }, [installHideStyle, show])

  const onBlur = useCallback(() => {
    hide()
    // Keep the style installed; we don’t remove it on blur,
    // so coming back is instantaneous.
  }, [hide])

  // Visibility change (tab switches)
  useEffect(() => {
    const handleVis = () => {
      if (document.visibilityState === 'visible') {
        onFocus()
        // Extra aggressive re-hide after visibility change
        const intervals = [0, 50, 100, 200, 400, 800]
        intervals.forEach((delay) => {
          setTimeout(() => installHideStyle(), delay)
        })
      } else {
        onBlur()
      }
    }
    document.addEventListener('visibilitychange', handleVis)
    return () => document.removeEventListener('visibilitychange', handleVis)
  }, [onFocus, onBlur, installHideStyle])

  // Core lifecycle hooks
  useEffect(() => {
    if (isMobile || !mounted) return

    // Initial install (if the doc is already focused, hide right away)
    installHideStyle()
    if (document.hasFocus()) show()

    // Fast-path listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    // Capture-level pointer events fire *before* page handlers: great for re-hide
    window.addEventListener('pointermove', onPointerAny, {
      passive: true,
      capture: true,
    })
    window.addEventListener('pointerover', onPointerAny, {
      passive: true,
      capture: true,
    })

    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    // In/out of the document viewport
    document.addEventListener('mouseenter', show)
    document.addEventListener('mouseleave', hide)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('pointermove', onPointerAny, { capture: true })
      window.removeEventListener('pointerover', onPointerAny, { capture: true })
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mouseleave', hide)
      uninstallHideStyle()
    }
  }, [
    isMobile,
    mounted,
    installHideStyle,
    uninstallHideStyle,
    onMouseMove,
    onPointerAny,
    onFocus,
    onBlur,
    show,
    hide,
  ])

  // --- Add document focus/blur for better handling in fullscreen
  useEffect(() => {
    if (isMobile) return

    const onDocFocus = () => show()
    const onDocBlur = () => hide()

    document.addEventListener('focus', onDocFocus)
    document.addEventListener('blur', onDocBlur)

    return () => {
      document.removeEventListener('focus', onDocFocus)
      document.removeEventListener('blur', onDocBlur)
    }
  }, [isMobile, show, hide])

  // --- Click feedback (click pulse)
  useEffect(() => {
    if (isMobile) return
    const onDown = () => {
      if (cursorTypeRef.current !== 'pointer') return
      setCursorType('click')
      // pointerdown click feedback — use transform scale to avoid position issues
      const el = cursorRef.current
      if (el) {
        el.animate(
          [
            { transform: 'translate(-50%, -50%) scale(1)' },
            { transform: 'translate(-50%, -50%) scale(1.25)' },
            { transform: 'translate(-50%, -50%) scale(1)' },
          ],
          { duration: 150, easing: 'ease-out' }
        )
      }
      setTimeout(() => setCursorType('pointer'), 150)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [isMobile])

  // --- Hover type switching
  useEffect(() => {
    if (isMobile) return

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
  }, [isMobile])

  useEffect(() => {
    cursorTypeRef.current = cursorType
  }, [cursorType])

  return (
    <CursorContext.Provider
      value={{ cursorType, setCursorType, cursorRef, x, y, color, setColor }}
    >
      {children}
      {/* If you render a visual mask cursor, mount it here or elsewhere.
          This span only controls opacity for "show/hide". */}
      <span ref={cursorRef} aria-hidden='true' style={{ opacity: 0 }} />
    </CursorContext.Provider>
  )
}
