'use client'

import { useHotkeys } from 'react-hotkeys-hook'
import { usePageTransition } from '@/components/page-transition'

/**
 * Global keyboard shortcuts handler
 * Implements navigation shortcuts (G+H, G+A, G+T, G+W, G+C)
 */
export function GlobalKeyboardShortcuts() {
  const { navigate } = usePageTransition()

  // Home: G+H
  useHotkeys(
    'g+h',
    () => {
      navigate('/')
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
      navigate('/dashboard')
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
      navigate('/tech-stack')
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
      navigate('/work')
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
      navigate('/craft')
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    }
  )

  return null
}
