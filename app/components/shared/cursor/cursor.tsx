'use client';

import { gsap } from 'gsap';
import {
  MousePointer2,
  MousePointerClick,
  Pointer,
  Hand,
  HandGrab,
  TextCursor,
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

type CursorType = 'default' | 'pointer' | 'click' | 'hand' | 'grab' | 'text';

const Icon = {
  default: MousePointer2,
  pointer: Pointer,
  click: MousePointerClick,
  hand: Hand,
  grab: HandGrab,
  text: TextCursor,
};

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const requestRef = useRef<number | null>(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // 🪄 Smooth movement
  useEffect(() => {
    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener('mousemove', move);

    const render = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      gsap.set(cursorRef.current, {
        x: pos.current.x,
        y: pos.current.y,
        xPercent: -50,
        yPercent: -50,
      });

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('mousemove', move);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 🖱️ Click pulse
  useEffect(() => {
    const onDown = () => {
      gsap.to(cursorRef.current, {
        scale: 0.8,
        duration: 0.15,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      });
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, []);

  // ✨ Dynamic state — optional hooks
  useEffect(() => {
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
  }, []);

  const IconComponent = Icon[cursorType];

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0 z-[9999]
        w-10 h-10 rounded-full
        flex items-center justify-center
        text-gray-900 dark:text-gray-100
        mix-blend-difference pointer-events-none
        transition-transform duration-150 ease-out
      "
    >
      <IconComponent size={30} className="text-red-500" />
    </div>
  );
}
