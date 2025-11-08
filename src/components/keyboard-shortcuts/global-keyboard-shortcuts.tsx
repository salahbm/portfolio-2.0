'use client'

import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'

/**
 * Global keyboard shortcuts handler
 * Implements navigation shortcuts (G+H, G+A, G+T, G+W, G+C)
 */
export function GlobalKeyboardShortcuts() {
  const router = useRouter()

  // Home: G+H
  useHotkeys(
    'g+h',
    () => {
      router.push('/')
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    }
  )

  // Dashboard: G+A
  useHotkeys(
    'g+a',
    () => {
      router.push('/dashboard')
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    }
  )

  // Tech Stack: G+T
  useHotkeys(
    'g+t',
    () => {
      router.push('/tech-stack')
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    }
  )

  // Work: G+W
  useHotkeys(
    'g+w',
    () => {
      router.push('/work')
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    }
  )

  // Craft: G+C
  useHotkeys(
    'g+c',
    () => {
      router.push('/craft')
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    }
  )

  return null
}
