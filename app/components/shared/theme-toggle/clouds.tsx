import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';

import cloudImg from '@/assets/cloud.png';

export interface CloudsProps {
  isDark: boolean;
}

const Clouds = ({ isDark }: CloudsProps) => {
  const cloudRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const currentClouds = cloudRefs.current;

    // clear old tweens first
    currentClouds.forEach(el => el && gsap.killTweensOf(el));

    if (!isDark) {
      currentClouds.forEach((el, i) => {
        if (!el) return;

        // individual speed / depth
        const drift = i < 2 ? 80 : 120; // bigger drift range
        const direction = i % 2 === 0 ? 1 : -1;

        // start position: random
        const startX = direction === 1 ? -drift : drift;
        gsap.set(el, { x: startX, y: Math.random() * 8 - 4 });

        // build looping horizontal drift
        const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } });
        tl.to(el, {
          duration: 10 + Math.random() * 4,
          x: direction * drift,
          y: '+=' + (Math.random() * 8 - 4),
          rotation: (Math.random() - 0.5) * 6,
        }).to(el, {
          duration: 10 + Math.random() * 4,
          x: -direction * drift,
          y: '-=' + (Math.random() * 8 - 4),
          rotation: (Math.random() - 0.5) * 6,
        });

        // subtle scaling “puff”
        gsap.to(el, {
          scale: 0.95 + Math.random() * 0.1,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }

    return () => {
      currentClouds.forEach(el => el && gsap.killTweensOf(el));
    };
  }, [isDark]);

  if (isDark) return null;

  return (
    <AnimatePresence>
      {!isDark && (
        <motion.div
          key="clouds"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {/* Background layer (larger, slower) */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`bg-cloud-${i}`}
              ref={el => {
                if (el) cloudRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                top: `${8 + i * 8}px`,
                left: `${10 + i * 60}px`,
                width: `${40 + i * 10}px`,
                zIndex: 1,
                filter: 'blur(1px)',
              }}
            >
              <img src={cloudImg} alt="Background Cloud" className="w-full h-auto opacity-50" />
            </div>
          ))}

          {/* Foreground layer (smaller, faster) */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`fg-cloud-${i}`}
              ref={el => {
                if (el) cloudRefs.current[i + 2] = el;
              }}
              className="absolute"
              style={{
                top: `${18 + i * 10}px`,
                left: `${i * 45 + 25}px`,
                width: `${28 + Math.random() * 10}px`,
                zIndex: 2,
              }}
            >
              <img
                src={cloudImg}
                alt="Foreground Cloud"
                className="w-full h-auto opacity-75 drop-shadow-sm"
              />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Clouds;
