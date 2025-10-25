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
 * - Apply to html and all descendants, including pseudo-elements
 */
const TRANSPARENT_CURSOR =
  "url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==') 0 0, none"

const STYLE_ID = 'cursor-hide-style__force'

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

  // --- style tag install/uninstall ---

  const installHideStyle = useCallback(() => {
    // Never hide cursor on mobile/tablet
    if (isTouchDevice) return

    // Remove any stale tag first
    const prev = document.getElementById(STYLE_ID)
    if (prev?.parentNode) prev.parentNode.removeChild(prev)

    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
      html.cursor-hidden,
      html.cursor-hidden body,
      html.cursor-hidden body *,
      html.cursor-hidden *::before,
      html.cursor-hidden *::after {
        cursor: ${TRANSPARENT_CURSOR} !important;
      }
    `
    // rAF to apply after UA focus restorations
    requestAnimationFrame(() => {
      document.head.appendChild(style)
      document.documentElement.classList.add('cursor-hidden')
    })
  }, [isTouchDevice])

  const uninstallHideStyle = useCallback(() => {
    document.documentElement.classList.remove('cursor-hidden')
    const style = document.getElementById(STYLE_ID)
    if (style?.parentNode) style.parentNode.removeChild(style)
  }, [])

  // Optional: also apply to same-origin iframes (safe try/catch for cross-origin)
  const installHideStyleInFrames = useCallback(() => {
    if (isTouchDevice) return
    const frames = Array.from(document.querySelectorAll('iframe'))
    for (const frame of frames) {
      try {
        const doc = frame.contentDocument
        if (!doc) continue
        const prev = doc.getElementById(STYLE_ID)
        if (prev?.parentNode) prev.parentNode.removeChild(prev)
        const style = doc.createElement('style')
        style.id = STYLE_ID
        style.textContent = `
          html.cursor-hidden,
          html.cursor-hidden body,
          html.cursor-hidden body *,
          html.cursor-hidden *::before,
          html.cursor-hidden *::after {
            cursor: ${TRANSPARENT_CURSOR} !important;
          }
        `
        doc.head.appendChild(style)
        doc.documentElement.classList.add('cursor-hidden')
      } catch {
        // cross-origin; ignore
      }
    }
  }, [isTouchDevice])

  // --- show/hide helpers for the visual cursor element (opacity gate only) ---
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

  // --- ultra-fast re-hide paths ---

  // Capture-phase pointer handler: re-assert hide before app handlers run
  const onPointerAny = useEvent(() => {
    installHideStyle()
    installHideStyleInFrames()
  })

  // Next-move positioning for visual cursor
  const onMouseMove = useEvent((e: MouseEvent) => {
    lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    if (!isVisibleRef.current) show()
    x.set(e.clientX)
    y.set(e.clientY)
  })

  // After focus, ensure the NEXT user action re-applies hide pre-paint
  const armOneShotRehide = useCallback(() => {
    if (isTouchDevice) return
    const onceRehide = () => {
      installHideStyle()
      installHideStyleInFrames()
      window.removeEventListener('pointermove', onceRehide, true)
      window.removeEventListener('pointerover', onceRehide, true)
      window.removeEventListener('pointerdown', onceRehide, true)
    }
    window.addEventListener('pointermove', onceRehide, {
      capture: true,
      once: true,
    })
    window.addEventListener('pointerover', onceRehide, {
      capture: true,
      once: true,
    })
    window.addEventListener('pointerdown', onceRehide, {
      capture: true,
      once: true,
    })
  }, [isTouchDevice, installHideStyle, installHideStyleInFrames])

  // Focus regain (omnibox/tab switch) — multiple assertions to cover late UA restores
  const onFocus = useCallback(() => {
    if (isTouchDevice) return
    show()
    // Update cursor position to last known position
    x.set(lastMousePosRef.current.x)
    y.set(lastMousePosRef.current.y)

    // Aggressive re-application schedule to combat browser cursor restoration
    installHideStyle()
    installHideStyleInFrames()
    requestAnimationFrame(() => {
      installHideStyle()
      installHideStyleInFrames()
    })
    armOneShotRehide()
    // Extended schedule with more frequent checks
    ;[16, 32, 60, 100, 120, 200, 300, 400, 600, 1000].forEach((delay) => {
      setTimeout(() => {
        installHideStyle()
        installHideStyleInFrames()
      }, delay)
    })
  }, [
    isTouchDevice,
    show,
    installHideStyle,
    installHideStyleInFrames,
    armOneShotRehide,
    x,
    y,
  ])

  const onBlur = useCallback(() => {
    hide()
    // Keep style installed so coming back is instantaneous
  }, [hide])

  // Visibility change (tab switches)
  useEffect(() => {
    if (isTouchDevice) return
    const handleVis = () => {
      if (document.visibilityState === 'visible') {
        onFocus()
        // More aggressive schedule for visibility changes
        ;[0, 16, 32, 50, 100, 150, 200, 300, 400, 600, 800, 1200].forEach(
          (delay) => {
            setTimeout(() => {
              installHideStyle()
              installHideStyleInFrames()
            }, delay)
          }
        )
      } else {
        onBlur()
      }
    }
    document.addEventListener('visibilitychange', handleVis, { capture: true })
    return () =>
      document.removeEventListener('visibilitychange', handleVis, {
        capture: true,
      })
  }, [
    isTouchDevice,
    onFocus,
    onBlur,
    installHideStyle,
    installHideStyleInFrames,
  ])

  // Core lifecycle hooks
  useEffect(() => {
    // If mobile/tablet, ensure any residue is removed and bail out
    if (isTouchDevice || !mounted) {
      uninstallHideStyle()
      return
    }

    // Initial install (if the doc is already focused, show cursor immediately)
    installHideStyle()
    installHideStyleInFrames()
    if (document.hasFocus()) show()

    // Persistent fast-path listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('pointermove', onPointerAny, {
      passive: true,
      capture: true,
    })
    window.addEventListener('pointerover', onPointerAny, {
      passive: true,
      capture: true,
    })
    window.addEventListener('pointerdown', onPointerAny, {
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
      window.removeEventListener('pointermove', onPointerAny, {
        capture: true,
      })
      window.removeEventListener('pointerover', onPointerAny, {
        capture: true,
      })
      window.removeEventListener('pointerdown', onPointerAny, {
        capture: true,
      })
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
    installHideStyleInFrames,
    uninstallHideStyle,
    onMouseMove,
    onPointerAny,
    onFocus,
    onBlur,
    show,
    hide,
  ])

  // Document-level focus/blur (capture) for better handling in fullscreen; desktop only
  useEffect(() => {
    if (isTouchDevice) return

    const onDocFocus = () => show()
    const onDocBlur = () => hide()

    document.addEventListener('focus', onDocFocus, true)
    document.addEventListener('blur', onDocBlur, true)

    return () => {
      document.removeEventListener('focus', onDocFocus, true)
      document.removeEventListener('blur', onDocBlur, true)
    }
  }, [isTouchDevice, show, hide])

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

  // MutationObserver to detect and combat any cursor style changes
  useEffect(() => {
    if (isTouchDevice || !mounted) return

    const observer = new MutationObserver(() => {
      // If html doesn't have cursor-hidden class, re-apply
      if (!document.documentElement.classList.contains('cursor-hidden')) {
        installHideStyle()
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    })

    return () => observer.disconnect()
  }, [isTouchDevice, mounted, installHideStyle])

  return (
    <CursorContext.Provider
      value={{ cursorType, setCursorType, cursorRef, x, y, color, setColor }}
    >
      {children}
    </CursorContext.Provider>
  )
}
