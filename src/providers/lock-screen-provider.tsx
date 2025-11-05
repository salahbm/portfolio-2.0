'use client'

import { LockScreen } from '@/components/lock-screen'
import { useState, Fragment, PropsWithChildren } from 'react'

export const LockScreenProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

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
      {showContent ? children : null}
    </Fragment>
  )
}
