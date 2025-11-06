'use client'

import { useEffect } from 'react'
import { useUserAgent } from '@/hooks/use-user-agent'

// Color mapping for each cursor type
const CURSOR_COLORS = {
  default: '#647BD8',
  pointer: '#60a5fa',
  click: '#4ade80',
  grab: '#facc15',
  grabbing: '#f472b6',
  text: '#c084fc',
}

// SVG cursor generators with colors
const generateCursorSVG = (
  type: keyof typeof CURSOR_COLORS,
  customColor?: string,
  size: number = 24 // Increased default size
): string => {
  const color = customColor || CURSOR_COLORS[type]
  let svgContent = ''

  switch (type) {
    case 'default':
      svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z'/></svg>`
      break
    case 'pointer':
      svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M22 14a8 8 0 0 1-8 8'/><path d='M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2'/><path d='M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1'/><path d='M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10'/><path d='M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'/></svg>`
      break
    case 'click':
      svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M22 14a8 8 0 0 1-8 8'/><path d='M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2'/><path d='M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1'/><path d='M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10'/><path d='M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'/></svg>`
      break
    case 'grab':
      svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2'/><path d='M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2'/><path d='M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8'/><path d='M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'/></svg>`
      break
    case 'grabbing':
      svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2'/><path d='M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2'/><path d='M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8'/><path d='M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'/><circle cx='12' cy='12' r='1' fill='${color}'/></svg>`
      break
    case 'text':
      svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M10 4h4'/><path d='M12 4v16'/><path d='M8 20h8'/></svg>`
      break
  }

  // Convert SVG to base64 data URI
  const base64 = btoa(svgContent)
  return `data:image/svg+xml;base64,${base64}`
}

export function CursorStyleInjector() {
  const { isTouchDevice } = useUserAgent()

  useEffect(() => {
    // Don't apply custom cursors on touch devices
    if (isTouchDevice) return

    const style = document.createElement('style')
    style.id = 'custom-cursor-styles'

    // Default cursor size (adjust this to make cursors larger/smaller)
    const defaultSize = 36
    const pointerSize = 36
    const textSize = 36
    const clickSize = 34

    style.textContent = `
      /* Base cursor (default) */
      html, body, *, 
      .cursor-default {
        cursor: url('${generateCursorSVG('default', undefined, defaultSize)}') ${defaultSize / 2} ${defaultSize / 2}, auto !important;
      }

      /* Pointer (links, buttons, etc.) */
      a, button, [role="button"], .cursor-pointer {
        cursor: url('${generateCursorSVG('pointer', undefined, pointerSize)}') ${pointerSize / 2} ${pointerSize / 2}, pointer !important;
      }

      /* Text fields */
      input, p, textarea, [contenteditable="true"], .cursor-text {
        cursor: url('${generateCursorSVG('text', undefined, textSize)}') ${textSize / 2} ${textSize / 2}, text !important;
      }

      /* Hand cursor */
      .cursor-grab {
        cursor: url('${generateCursorSVG('grab', undefined, pointerSize)}') ${pointerSize / 2} ${pointerSize / 2}, grab !important;
      }

      /* Grab cursor (active state) */
      .cursor-grabbing, .grabbing, [aria-grabbed="true"] {
        cursor: url('${generateCursorSVG('grabbing', undefined, pointerSize)}') ${pointerSize / 2} ${pointerSize / 2}, grabbing !important;
      }

      /* Click feedback on active state */
      a:active, button:active, [role="button"]:active {
        cursor: url('${generateCursorSVG('click', undefined, clickSize)}') ${clickSize / 2} ${clickSize / 2}, pointer !important;
      }

      /* VFX Presence Surface - custom colored cursors */
      [data-cursor-color="violet"] * {
        cursor: url('${generateCursorSVG('default', '#8b5cf6', defaultSize)}') ${defaultSize / 2} ${defaultSize / 2}, auto !important;
      }
      [data-cursor-color="orange"] * {
        cursor: url('${generateCursorSVG('default', '#ea580c', defaultSize)}') ${defaultSize / 2} ${defaultSize / 2}, auto !important;
      }
      [data-cursor-color="sky"] * {
        cursor: url('${generateCursorSVG('default', '#0284c7', defaultSize)}') ${defaultSize / 2} ${defaultSize / 2}, auto !important;
      }
      [data-cursor-color="fuchsia"] * {
        cursor: url('${generateCursorSVG('default', '#c026d3', defaultSize)}') ${defaultSize / 2} ${defaultSize / 2}, auto !important;
      }
    `
    document.head.appendChild(style)

    // Fix for cursor reset when returning from omnibox
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Re-trigger cursor update by forcing a style recalculation
        document.body.style.cursor = 'none'
        requestAnimationFrame(() => {
          document.body.style.cursor = ''
        })
      }
    }

    const handleFocus = () => {
      // Force cursor refresh on window focus
      document.body.style.cursor = 'none'
      requestAnimationFrame(() => {
        document.body.style.cursor = ''
      })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      document.getElementById('custom-cursor-styles')?.remove()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [isTouchDevice])

  return null
}
