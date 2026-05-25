'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

type PageTransitionContextValue = {
  navigate: (href: string) => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
)

const COVER_DURATION = 0.5
const REVEAL_DURATION = 0.4

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

function getInternalHref(anchor: HTMLAnchorElement) {
  if (
    (anchor.target && anchor.target.toLowerCase() !== '_self') ||
    anchor.hasAttribute('download')
  ) {
    return null
  }

  const url = new URL(anchor.href)

  if (url.origin !== window.location.origin) {
    return null
  }

  const currentHref = `${window.location.pathname}${window.location.search}`
  const nextHref = `${url.pathname}${url.search}`

  if (currentHref === nextHref) {
    return null
  }

  return `${url.pathname}${url.search}${url.hash}`
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)

  if (!context) {
    throw new Error(
      'usePageTransition must be used within PageTransitionProvider'
    )
  }

  return context
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement[]>([])
  const isInitialMount = useRef(true)
  const isTransitioning = useRef(false)
  const pendingNavigation = useRef<string | null>(null)

  const animateCover = useCallback(() => {
    const elements = elementsRef.current
    if (!elements.length) return Promise.resolve()

    return new Promise<void>((resolve) => {
      gsap.killTweensOf(elements)
      gsap.set(elements, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: 'left center',
      })

      gsap.to(elements, {
        scaleX: 1,
        opacity: 0.9,
        duration: COVER_DURATION,
        ease: 'power2.inOut',
        stagger: { amount: 0.15, from: 'center' },
        onComplete: resolve,
      })
    })
  }, [])

  const animateReveal = useCallback(() => {
    const elements = elementsRef.current
    if (!elements.length) {
      isTransitioning.current = false
      return
    }

    gsap.killTweensOf(elements)
    gsap.to(elements, {
      scaleX: 0,
      opacity: 0,
      transformOrigin: 'right center',
      duration: REVEAL_DURATION,
      ease: 'power2.inOut',
      stagger: { amount: 0.1, from: 'center' },
      onComplete: () => {
        gsap.set(elements, {
          scaleX: 0,
          opacity: 0,
          transformOrigin: 'left center',
        })
        isTransitioning.current = false
      },
    })
  }, [])

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href)
      const currentHref = `${window.location.pathname}${window.location.search}`
      const nextHref = `${url.pathname}${url.search}`

      if (currentHref === nextHref || isTransitioning.current) {
        return
      }

      isTransitioning.current = true
      pendingNavigation.current = nextHref

      void animateCover().then(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`)
      })
    },
    [animateCover, router]
  )

  const contextValue = useMemo(() => ({ navigate }), [navigate])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        isModifiedClick(event)
      ) {
        return
      }

      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest<HTMLAnchorElement>('a[href]')

      if (!anchor) {
        return
      }

      const href = getInternalHref(anchor)

      if (!href) {
        return
      }

      event.preventDefault()
      navigate(href)
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [navigate])

  useGSAP(
    () => {
      if (isInitialMount.current) {
        isInitialMount.current = false
        return
      }

      if (pendingNavigation.current) {
        pendingNavigation.current = null
        animateReveal()
      }
    },
    { dependencies: [pathname, animateReveal], scope: overlayRef }
  )

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}
      <div
        ref={overlayRef}
        className='pointer-events-none fixed inset-0 z-[9999] select-none'
        aria-hidden='true'
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) elementsRef.current[i] = el
            }}
            className={cn(
              'absolute inset-0',
              'bg-[linear-gradient(135deg,transparent,hsl(var(--primary)/0.25),transparent)]',
              'backdrop-blur-sm',
              'will-change-opacity will-change-transform'
            )}
            style={{
              transform: 'scaleX(0)',
              opacity: 0,
              transformOrigin: 'left center',
            }}
          />
        ))}
      </div>
    </PageTransitionContext.Provider>
  )
}
