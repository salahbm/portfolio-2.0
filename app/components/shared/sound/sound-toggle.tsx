import { gsap } from 'gsap';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import Wave from './analog-wave';

export function SoundToggle() {
  const [muted, setMuted] = useState(false);

  const waveGroupRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const waveContainerRef = useRef<HTMLDivElement>(null);

  // 🌊 Seamless wave scroll
  useEffect(() => {
    const waveGroup = waveGroupRef.current;
    if (!waveGroup) return;
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(waveGroup, { x: '-50%', duration: 2.5, ease: 'none' });
    return () => {
      tl.kill();
    };
  }, []);

  // 🔁 Toggle animation
  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();

    // Ensure refs exist (guards against nulls)
    if (!iconContainerRef.current || !waveContainerRef.current || !iconRef.current) return;

    const isMuted = !muted;
    setMuted(isMuted);

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
    });

    // --- Layout Motion ---
    const shift = 56; // centralized motion offset
    tl.to(
      [iconContainerRef.current, waveContainerRef.current],
      {
        y: i => (i === 0 ? (isMuted ? shift : 0) : isMuted ? -shift : 0),
        duration: 0.6,
      },
      0
    );

    // --- Icon Pop Feedback ---
    tl.fromTo(
      iconRef.current,
      { scale: 1.4 },
      { scale: 1, duration: 0.25, ease: 'back.out(2)' },
      0.15
    );
  };

  return (
    <div
      ref={containerRef}
      onClick={handleToggle}
      onKeyDown={e => {
        const isShift = e.shiftKey;

        if (isShift && (e.key.toLowerCase() === 'm' || e.key.toLowerCase() === 'p')) {
          e.preventDefault();

          if (e.key.toLowerCase() === 'm') {
            setMuted(true);
            handleToggle(e);
          }

          if (e.key.toLowerCase() === 'p') {
            setMuted(false);
            handleToggle(e);
          }
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={!muted}
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
      className={cn(
        `relative w-16 h-36 rounded-full p-2 flex flex-col items-center justify-center
         bg-gradient-to-b from-gray-50 via-gray-200 to-gray-300
         overflow-visible transition-all duration-300`
      )}
    >
      {/* pseudo “rim” layer */}
      <div className="absolute inset-[0.5px] rounded-full border-5  border-gray-400/30 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_4px_rgba(0,0,0,0.2)] pointer-events-none" />
      {/* Icon with side padding */}
      <motion.div ref={iconContainerRef} className="z-10 relative">
        <button
          ref={iconRef}
          className="px-4 py-2 text-accent bg-transparent border-0 cursor-pointer select-none"
          type="button"
        >
          {muted ? (
            <VolumeX size={28} />
          ) : (
            <Volume2 size={28} className="text-primary-foreground" />
          )}
        </button>
      </motion.div>

      {/* Wave */}
      <motion.div ref={waveContainerRef} className="relative w-full h-14 overflow-hidden">
        <div ref={waveGroupRef} className="absolute flex w-[200%] h-full">
          <Wave isMuted={muted} />
          <Wave isMuted={muted} />
        </div>
      </motion.div>
    </div>
  );
}
