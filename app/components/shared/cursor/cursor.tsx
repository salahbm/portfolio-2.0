import {
  MousePointer2,
  MousePointerClick,
  Pointer,
  Hand,
  HandGrab,
  TextCursor,
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

import { useIsMobile } from '@/hooks/common/use-device';
import { cn } from '@/lib/utils';

type CursorType = 'default' | 'pointer' | 'click' | 'hand' | 'grab' | 'text';

const Icon = {
  default: MousePointer2,
  pointer: Pointer,
  click: MousePointerClick,
  hand: Hand,
  grab: HandGrab,
  text: TextCursor,
};

const colorMap: Record<CursorType, string> = {
  default: 'text-gray-500',
  pointer: 'text-blue-400',
  click: 'text-green-400',
  hand: 'text-yellow-400',
  grab: 'text-pink-400',
  text: 'text-purple-400',
};

export function Cursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const cursorTypeRef = useRef<CursorType>('default');
  const isMobile = useIsMobile();
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    cursorTypeRef.current = cursorType;
  }, [cursorType]);

  // hide system cursor
  useEffect(() => {
    if (isMobile) return;

    const style = document.createElement('style');
    style.innerHTML = `
      html, body, button, a, input, textarea, * { cursor: none !important; }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, [isMobile]);

  // smooth follow motion
  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener('mousemove', move);

    const render = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.35;
      pos.current.y += (target.current.y - pos.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    return () => window.removeEventListener('mousemove', move);
  }, [isMobile]);

  // Click feedback
  useEffect(() => {
    if (isMobile) return;
    // Desktop: normal click behavior
    const onDown = () => {
      if (cursorTypeRef.current !== 'pointer') return;
      setCursorType('click');

      innerRef.current?.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
        { duration: 150, easing: 'ease-out' }
      );

      setTimeout(() => setCursorType('pointer'), 150);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [isMobile]);

  // hover detection
  useEffect(() => {
    if (isMobile) return;
    const addHoverListeners = (selector: string, type: CursorType) => {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => setCursorType(type));
        el.addEventListener('mouseleave', () => setCursorType('default'));
      });
    };

    addHoverListeners('button, a, [data-cursor="pointer"]', 'pointer');
    addHoverListeners('[data-cursor="click"]', 'click');
    addHoverListeners('[data-cursor="hand"]', 'hand');
    addHoverListeners('[data-cursor="grab"]', 'grab');
    addHoverListeners('input, textarea, [data-cursor="text"]', 'text');
  }, [isMobile]);

  const IconComponent = Icon[cursorType];

  return (
    <span
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        'fixed top-0 left-0 z-[9999] pointer-events-none transition-transform duration-150 ease-out',
        isMobile ? 'hidden' : ''
      )}
    >
      <span ref={innerRef} className="block transition-transform duration-150 ease-out">
        <IconComponent
          size={cursorType === 'click' ? 36 : 28}
          className={cn('mix-blend-difference', colorMap[cursorType])}
        />
      </span>
    </span>
  );
}
