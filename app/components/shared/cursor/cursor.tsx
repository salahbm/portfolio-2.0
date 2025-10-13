import {
  MousePointer2,
  MousePointerClick,
  Pointer,
  Hand,
  HandGrab,
  TextCursor,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const { isTouchable } = useIsMobile();

  const [cursorType, setCursorType] = useState<CursorType>('default');

  const visibleRef = useRef(false);
  const innerRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const cursorTypeRef = useRef<CursorType>('default');
  const styleRef = useRef<HTMLStyleElement | null>(null);

  const applyHideStyle = () => {
    if (styleRef.current) {
      document.head.removeChild(styleRef.current);
    }
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);
    styleRef.current = style;
  };

  const show = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    visibleRef.current = true;
    cursor.style.opacity = '1';
    applyHideStyle(); // Re-apply the hide style every time we show
  }, []);

  const hide = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    visibleRef.current = false;
    cursor.style.opacity = '0';
  }, []);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      if (!visibleRef.current) show();
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    },
    [show]
  );

  // --- Hide native cursor globally and manual custom cursor hide/show
  useEffect(() => {
    if (isTouchable) return;

    // Initial apply
    applyHideStyle();

    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('mouseenter', show);
    document.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);
    window.addEventListener('focus', show);

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseenter', show);
      document.removeEventListener('mouseleave', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('focus', show);
    };
  }, [isTouchable, onPointerMove, show, hide]);

  // --- Add document focus/blur for better handling in fullscreen
  useEffect(() => {
    if (isTouchable) return;

    const onDocFocus = () => show();
    const onDocBlur = () => hide();

    document.addEventListener('focus', onDocFocus);
    document.addEventListener('blur', onDocBlur);

    return () => {
      document.removeEventListener('focus', onDocFocus);
      document.removeEventListener('blur', onDocBlur);
    };
  }, [isTouchable, show, hide]);

  // --- Click feedback (click pulse)
  useEffect(() => {
    if (isTouchable) return;
    const onDown = () => {
      if (cursorTypeRef.current !== 'pointer') return;
      setCursorType('click');
      innerRef.current?.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
        { duration: 150, easing: 'ease-out' }
      );
      setTimeout(() => setCursorType('pointer'), 150);
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [isTouchable]);

  // --- Hover type switching
  useEffect(() => {
    if (isTouchable) return;

    const resolveType = (el: Element | null): CursorType => {
      if (!el) return 'default';
      const withData = (el.closest('[data-cursor]') as HTMLElement | null)?.dataset.cursor as
        | CursorType
        | undefined;
      if (withData) return withData;
      if (el.closest('a,button,[role="button"]')) return 'pointer';
      if (el.closest('input,textarea,[contenteditable="true"]')) return 'text';
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
  }, [isTouchable]);

  useEffect(() => {
    cursorTypeRef.current = cursorType;
  }, [cursorType]);

  if (isTouchable) return null;

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
