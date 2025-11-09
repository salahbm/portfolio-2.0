'use client'

import { useEffect } from 'react'
import { useMusicPlayerStore } from '@/store/music-player-store'

/**
 * Global music player initializer.
 * Initializes the audio element once at the app level.
 * This ensures music continues playing even when components unmount (e.g., mobile drawer closes).
 */
export function MusicPlayerInitializer() {
  const { initAudio } = useMusicPlayerStore()

  useEffect(() => {
    // Initialize audio once on app mount
    initAudio()

    // No cleanup - audio should persist globally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
