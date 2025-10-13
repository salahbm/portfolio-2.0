import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';

import cloudImg from '@/assets/cloud.png';

export interface CloudsProps {
  isDark: boolean;
  width?: number;
  height?: number;
}

const Clouds = ({ isDark, width = 128, height = 56 }: CloudsProps) => {
  const cloudRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const currentClouds = cloudRefs.current;

    // stop any old animations
    currentClouds.forEach(el => el && gsap.killTweensOf(el));

    if (!isDark) {
      currentClouds.forEach((el, i) => {
        if (!el) return;

        // simple gentle drift within small area
        const drift = i % 2 === 0 ? 15 : 12;
        const direction = i % 2 === 0 ? 1 : -1;
        const startX = direction === 1 ? -drift : drift;

        gsap.set(el, { x: startX, y: Math.random() * 8 - 4 });

        const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } });
        tl.to(el, {
          duration: 5 + Math.random() * 4,
          x: direction * drift,
          y: '+=' + (Math.random() * 3 - 1.5),
          rotation: (Math.random() - 0.5) * 3,
        }).to(el, {
          duration: 5 + Math.random() * 2,
          x: -direction * drift,
          y: '-=' + (Math.random() * 3 - 1.5),
          rotation: (Math.random() - 0.5) * 3,
        });

        // subtle scaling “puff” animation
        gsap.to(el, {
          scale: 0.95 + Math.random() * 0.05,
          duration: 2 + Math.random() * 1.5,
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
          style={{ width, height }}
        >
          {/* Background clouds (larger, slower) */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`bg-cloud-${i}`}
              ref={el => {
                if (el) cloudRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                top: i * 10,
                left: i * 22,
                width: 25 + i * 8,
                zIndex: 1,
                filter: 'blur(1px)',
                opacity: 0.2 * (i + 1),
              }}
            >
              <img src={cloudImg} alt="Cloud" className="w-full h-auto" />
            </div>
          ))}

          {/* Foreground clouds (smaller, faster) */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`fg-cloud-${i}`}
              ref={el => {
                if (el) cloudRefs.current[i + 3] = el;
              }}
              className="absolute"
              style={{
                top: i + Math.random() * 8,
                left: i * 18,
                width: 20 + Math.random() * 7,
                zIndex: 2,
                opacity: 0.3 * (i + 1),
              }}
            >
              <img src={cloudImg} alt="Cloud" className="w-full h-auto drop-shadow-sm" />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Clouds;
