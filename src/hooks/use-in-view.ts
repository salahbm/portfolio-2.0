'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A lightweight IntersectionObserver hook to detect when an element is in the viewport.
 *
 * @param options IntersectionObserverInit (e.g., { threshold: 0.25, rootMargin: '0px' })
 * @returns [ref, isInView] - attach the ref to any element you want to observe.
 */
export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      options ?? { threshold: 0.25 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options])

  return [ref, isInView]
}
