'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseLockScreenOptions {
  /**
   * Minimum loading duration in milliseconds
   * @default 2000
   */
  minDuration?: number
  /**
   * Assets to preload (images, fonts, etc.)
   */
  assetsToPreload?: string[]
  /**
   * Custom loading function that returns a promise
   */
  customLoader?: () => Promise<void>
}

interface UseLockScreenReturn {
  isLoading: boolean
  progress: number
  error: Error | null
}

/**
 * Hook to manage lock screen loading state with asset preloading
 *
 * @example
 * ```tsx
 * const { isLoading } = useLockScreen({
 *   minDuration: 3000,
 *   assetsToPreload: ['/images/hero.jpg', '/fonts/custom.woff2']
 * })
 *
 * return (
 *   <>
 *     {isLoading && <LockScreen />}
 *     <MainContent />
 *   </>
 * )
 * ```
 */
export const useLockScreen = (
  options: UseLockScreenOptions = {}
): UseLockScreenReturn => {
  const { minDuration = 2000, assetsToPreload = [], customLoader } = options

  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      img.src = src
    })
  }, [])

  const preloadAssets = useCallback(async () => {
    if (assetsToPreload.length === 0) return

    const loadPromises = assetsToPreload.map((asset) => {
      if (asset.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        return preloadImage(asset)
      }
      // For other assets, we can add more preload logic here
      return Promise.resolve()
    })

    await Promise.all(loadPromises)
  }, [assetsToPreload, preloadImage])

  useEffect(() => {
    let mounted = true
    const startTime = Date.now()

    const load = async () => {
      try {
        // Run custom loader and asset preloading in parallel
        const loadingTasks = []

        if (customLoader) {
          loadingTasks.push(customLoader())
        }

        if (assetsToPreload.length > 0) {
          loadingTasks.push(preloadAssets())
        }

        // Simulate progress during loading
        const progressInterval = setInterval(() => {
          if (!mounted) return
          setProgress((prev) => {
            const newProgress = prev + Math.random() * 15
            return newProgress >= 95 ? 95 : newProgress
          })
        }, 100)

        // Wait for all loading tasks
        await Promise.all(loadingTasks)

        clearInterval(progressInterval)

        // Ensure minimum duration is met
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, minDuration - elapsed)

        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime))
        }

        if (mounted) {
          setProgress(100)
          // Small delay before hiding to show 100%
          setTimeout(() => {
            if (mounted) {
              setIsLoading(false)
            }
          }, 300)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Loading failed'))
          // Still hide loading screen on error after a delay
          setTimeout(() => {
            if (mounted) {
              setIsLoading(false)
            }
          }, 1000)
        }
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [minDuration, customLoader, assetsToPreload, preloadAssets])

  return { isLoading, progress, error }
}
