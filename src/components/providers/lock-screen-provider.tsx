'use client'

import { useState, useEffect } from 'react'
import { LockScreen } from '../lock-screen'

interface LockScreenProviderProps {
  children: React.ReactNode
  /**
   * Loading duration in milliseconds
   * @default 3000
   */
  loadingDuration?: number
  /**
   * User name to display
   * @default "Salah"
   */
  userName?: string
  /**
   * Avatar URL
   * @default "/medias/avatar.jpg"
   */
  avatarUrl?: string
  /**
   * Whether to show the lock screen
   * Set to false to disable the lock screen entirely
   * @default true
   */
  enabled?: boolean
}

/**
 * Provider component that wraps your app and shows the lock screen on initial load
 *
 * @example
 * ```tsx
 * // In your layout.tsx or page.tsx
 * <LockScreenProvider loadingDuration={3000}>
 *   <YourApp />
 * </LockScreenProvider>
 * ```
 */
export const LockScreenProvider: React.FC<LockScreenProviderProps> = ({
  children,
  loadingDuration = 1600,
  userName = 'Salah',
  avatarUrl = '/images/avatar.webp',
  enabled = true,
}) => {
  const [isLoading, setIsLoading] = useState(enabled)
  const [showContent, setShowContent] = useState(!enabled)

  useEffect(() => {
    if (!enabled) {
      setShowContent(true)
    }
  }, [enabled])

  const handleLoadComplete = () => {
    setIsLoading(false)
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  return (
    <>
      {isLoading && (
        <LockScreen
          onLoadComplete={handleLoadComplete}
          loadingDuration={loadingDuration}
          userName={userName}
          avatarUrl={avatarUrl}
        />
      )}
      {showContent && <div className='lock-screen-content'>{children}</div>}
    </>
  )
}
