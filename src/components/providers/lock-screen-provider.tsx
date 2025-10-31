'use client'

import { useState, useEffect, Fragment } from 'react'
import { LockScreen } from '../lock-screen'

interface LockScreenProviderProps {
  children: React.ReactNode

  /**
   * Whether to show the lock screen
   * Set to false to disable the lock screen entirely
   * @default true
   */
  enabled?: boolean
}

export const LockScreenProvider: React.FC<LockScreenProviderProps> = ({
  children,
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
    <Fragment>
      {isLoading && <LockScreen onLoadComplete={handleLoadComplete} />}
      {showContent && <div className='lock-screen-content'>{children}</div>}
    </Fragment>
  )
}
