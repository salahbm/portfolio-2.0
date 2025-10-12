'use client';
import {
  MousePointer2,
  MousePointerClick,
  Pointer,
  Hand,
  HandGrab,
  TextCursor,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useIsMobile } from '@/hooks/common/use-device';
import { cn } from '@/lib/utils';

type CursorType = 'default' | 'pointer' | 'click' | 'hand' | 'grab' | 'text';

const IconMap = {
  default: MousePointer2,
  pointer: Pointer,
  click: MousePointerClick,
  hand: Hand,
  grab: HandGrab,
  text: TextCursor,
};

const ColorMap: Record<CursorType, string> = {
  default: 'text-gray-500',
  pointer: 'text-blue-400',
  click: 'text-green-400',
  hand: 'text-yellow-400',
  grab: 'text-pink-400',
  text: 'text-purple-400',
};

export function Cursor() {
  const isMobile = useIsMobile();

  const cursorRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const [cursorType, setCursorType] = useState<CursorType>('default');
  const cursorTypeRef = useRef<CursorType>('default');
  const visibleRef = useRef(false);

  // --- Hide native cursor globally & persist on refocus
  useEffect(() => {
    if (isMobile) return;

    const STYLE_ID = 'hide-system-cursor';
    const ensureHidden = () => {
      if (!document.getElementById(STYLE_ID)) {
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.innerHTML = `html, body, * { cursor: none !important; }`;
        document.head.appendChild(style);
      }
      document.body.style.cursor = 'none';
    };

    ensureHidden();
    const onFocus = () => ensureHidden();
    const onVis = () => {
      if (document.visibilityState === 'visible') setTimeout(ensureHidden, 0);
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVis);
      document.body.style.cursor = '';
      const s = document.getElementById(STYLE_ID);
      if (s) s.remove();
    };
  }, [isMobile]);

  // --- Instant follow + window-edge hide/show
  useEffect(() => {
    if (isMobile) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const show = () => {
      visibleRef.current = true;
      cursor.style.opacity = '1';
    };
    const hide = () => {
      visibleRef.current = false;
      cursor.style.opacity = '0';
    };

    // Pointer moves INSIDE viewport -> update position + ensure visible
    const onPointerMove = (e: PointerEvent) => {
      // If we somehow got a move while hidden due to blur/leave, show it.
      if (!visibleRef.current) show();
      // Instant follow
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    // True page exit (to browser UI) -> mouseout with relatedTarget === null
    const onMouseOut = (e: MouseEvent) => {
      // Leaving the document entirely
      if (!e.relatedTarget) hide();
    };

    // Fallback page exit from root element (covers some browsers)
    const onDocLeave = () => hide();

    // Lose app focus (alt-tab, click omnibox, etc.)
    const onBlur = () => hide();

    // Regain focus does NOT automatically show; we wait for pointermove.
    // (Pointermove happens as soon as user re-enters, and we call show there.)

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onDocLeave, { passive: true });
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onDocLeave);
      window.removeEventListener('blur', onBlur);
    };
  }, [isMobile]);

  // --- Click feedback (only when in pointer mode)
  useEffect(() => {
    if (isMobile) return;
    const onDown = () => {
      if (cursorTypeRef.current !== 'pointer') return;
      setCursorType('click');
      innerRef.current?.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
        { duration: 120, easing: 'ease-out' }
      );
      setTimeout(() => setCursorType('pointer'), 120);
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [isMobile]);

  // --- Hover type switching via delegation (cheap & robust)
  useEffect(() => {
    if (isMobile) return;

    const resolveType = (el: Element | null): CursorType => {
      if (!el) return 'default';
      // explicit data-cursor
      const withData = (el.closest('[data-cursor]') as HTMLElement | null)?.dataset.cursor as
        | CursorType
        | undefined;
      if (withData) return withData;

      // semantic fallbacks
      if (el.closest('a,button,[role="button"]')) return 'pointer';
      if (el.closest('input,textarea, p, h1, h2, h3, h4, [contenteditable="true"]')) return 'text';

      return 'default';
    };

    const onOver = (e: PointerEvent) => {
      const next = resolveType(e.target as Element);
      if (next !== cursorTypeRef.current) {
        cursorTypeRef.current = next;
        setCursorType(next);
      }
    };

    const onOut = (e: PointerEvent) => {
      // Ignore internal bubbling; only reset if leaving to an element that doesn't imply a type
      const next = resolveType(e.relatedTarget as Element | null);
      if (next !== cursorTypeRef.current) {
        cursorTypeRef.current = next;
        setCursorType(next);
      }
    };

    // Use pointer events so it works for pen/mouse uniformly
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });

    return () => {
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, [isMobile]);

  // keep ref in sync (used by pointerdown logic)
  useEffect(() => {
    cursorTypeRef.current = cursorType;
  }, [cursorType]);

  if (isMobile) return null;

  const Icon = IconMap[cursorType];

  return (
    <span
      ref={cursorRef}
      aria-hidden="true"
      // opacity transitions give a nice fade; remove transition-* if you want instant hide
      className={cn(
        'fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-120 ease-out will-change-transform'
      )}
      style={{ opacity: 0, transform: 'translate(-50%, -50%)' }}
    >
      <span ref={innerRef} className="block">
        <Icon
          size={cursorType === 'click' ? 36 : 28}
          className={cn('mix-blend-difference', ColorMap[cursorType])}
        />
      </span>
    </span>
  );
}
