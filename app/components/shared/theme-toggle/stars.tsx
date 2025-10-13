import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';

import starImg from '@/assets/star.png';

export interface StarsProps {
  isDark: boolean;
  width?: number;
  height?: number;
}

const Stars = ({ isDark, width = 128, height = 56 }: StarsProps) => {
  const starRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const currentStars = starRefs.current;
    currentStars.forEach(el => el && gsap.killTweensOf(el));

    if (isDark) {
      currentStars.forEach(el => {
        if (!el) return;

        gsap.to(el, {
          opacity: 0.2 + Math.random() * 0.5,
          duration: 0.8 + Math.random() * 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 1.5,
        });
      });
    }

    return () => {
      currentStars.forEach(el => el && gsap.killTweensOf(el));
    };
  }, [isDark]);

  if (!isDark) return null;

  // Stars positioned based on fixed container proportions
  const stars = [
    { top: 4, left: 6, size: 10, rotate: 15 },
    { top: 10, left: 30, size: 6, rotate: 45 },
    { top: 8, right: 6, size: 12, rotate: -20 },
    { top: 14, right: 28, size: 9, rotate: 60 },
    { bottom: 6, left: 10, size: 14, rotate: 30 },
    { bottom: 10, left: 45, size: 11, rotate: -15 },
    { bottom: 8, right: 10, size: 7, rotate: 75 },
    { bottom: 12, right: 36, size: 10, rotate: -45 },
    { bottom: 16, right: 60, size: 8, rotate: 35 },
    { bottom: 20, right: 20, size: 15, rotate: 15 },
  ];

  return (
    <AnimatePresence>
      {isDark && (
        <motion.div
          key="stars"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width, height }}
        >
          {stars.map((star, i) => (
            <div
              key={`star-${i}`}
              ref={el => {
                if (el) starRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                top: star.top,
                left: star.left,
                right: star.right,
                bottom: star.bottom,
                width: `${star.size}px`,
                transform: `rotate(${star.rotate}deg)`,
                opacity: 0.9,
              }}
            >
              <img src={starImg} alt="Star" className="w-full h-auto" />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Stars;
