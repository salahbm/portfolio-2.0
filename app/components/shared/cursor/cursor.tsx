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

  // --- Manual cursor hide/show (no global CSS)
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

    const onPointerMove = (e: PointerEvent) => {
      if (!visibleRef.current) show();
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onMouseEnter = () => show();
    const onMouseLeave = () => hide();
    const onBlur = () => hide();
    const onFocus = () => show();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, [isMobile]);

  // --- Click feedback (click pulse)
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

  // --- Hover type switching
  useEffect(() => {
    if (isMobile) return;

    const resolveType = (el: Element | null): CursorType => {
      if (!el) return 'default';
      const withData = (el.closest('[data-cursor]') as HTMLElement | null)?.dataset.cursor as
        | CursorType
        | undefined;
      if (withData) return withData;
      if (el.closest('a,button,[role="button"]')) return 'pointer';
      if (el.closest('input,textarea,p,h1,h2,h3,h4,[contenteditable="true"]')) return 'text';
      return 'default';
    };

    const onOver = (e: PointerEvent) => {
      const next = resolveType(e.target as Element);
      if (next !== cursorTypeRef.current) {
        cursorTypeRef.current = next;
        setCursorType(next);
      }
    };

    document.addEventListener('pointerover', onOver, { passive: true });
    return () => document.removeEventListener('pointerover', onOver);
  }, [isMobile]);

  useEffect(() => {
    cursorTypeRef.current = cursorType;
  }, [cursorType]);

  if (isMobile) return null;

  const Icon = IconMap[cursorType];

  return (
    <span
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        'fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-150 ease-out will-change-transform'
      )}
      style={{
        opacity: 0,
        transform: 'translate(-50%, -50%)',
      }}
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
