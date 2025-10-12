import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';

import starImg from '@/assets/star.png';

export interface StarsProps {
  isDark: boolean;
}

const Stars = ({ isDark }: StarsProps) => {
  const starRefs = useRef<HTMLDivElement[]>([]);

  // Animate stars with twinkling effect
  useEffect(() => {
    // Store refs in local variable to avoid React warnings
    const currentStarRefs = starRefs.current;

    if (isDark) {
      // twinkle stars - create blinking effect
      currentStarRefs.forEach(el => {
        if (el) {
          // Create a blinking effect with opacity
          gsap.to(el, {
            opacity: 0.2, // fade almost completely out
            duration: 0.8 + Math.random() * 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: Math.random() * 1.5, // random delay for each star
          });
        }
      });
    }

    // Cleanup animations when effect changes
    return () => {
      currentStarRefs.forEach(el => {
        if (el) gsap.killTweensOf(el);
      });
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <AnimatePresence>
      {isDark && (
        <motion.div
          key="stars"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          {/* Create a grid of stars with fixed positions to prevent overlapping */}
          {/* Top row - smaller stars */}
          <div
            ref={el => {
              if (el) starRefs.current[0] = el;
            }}
            className="absolute top-2 left-4"
            style={{ width: '10px', transform: 'rotate(15deg)' }}
          >
            <img src={starImg} alt="Star" className="w-full h-auto" />
          </div>
          <div
            ref={el => {
              if (el) starRefs.current[1] = el;
            }}
            className="absolute top-4 left-24"
            style={{ width: '8px', transform: 'rotate(45deg)' }}
          >
            <img src={starImg} alt="Star" className="w-full h-auto" />
          </div>
          <div
            ref={el => {
              if (el) starRefs.current[2] = el;
            }}
            className="absolute top-3 right-6"
            style={{ width: '12px', transform: 'rotate(-20deg)' }}
          >
            <img src={starImg} alt="Star" className="w-full h-auto" />
          </div>
          <div
            ref={el => {
              if (el) starRefs.current[3] = el;
            }}
            className="absolute top-5 right-28"
            style={{ width: '9px', transform: 'rotate(60deg)' }}
          >
            <img src={starImg} alt="Star" className="w-full h-auto" />
          </div>

          {/* Bottom row - larger stars, away from the moon's path */}
          <div
            ref={el => {
              if (el) starRefs.current[4] = el;
            }}
            className="absolute bottom-3 left-8"
            style={{ width: '14px', transform: 'rotate(30deg)' }}
          >
            <img src={starImg} alt="Star" className="w-full h-auto" />
          </div>
          <div
            ref={el => {
              if (el) starRefs.current[5] = el;
            }}
            className="absolute bottom-6 left-32"
            style={{ width: '11px', transform: 'rotate(-15deg)' }}
          >
            <img src={starImg} alt="Star" className="w-full h-auto" />
          </div>
          <div
            ref={el => {
              if (el) starRefs.current[6] = el;
            }}
            className="absolute bottom-4 right-10"
            style={{ width: '13px', transform: 'rotate(75deg)' }}
          >
            <img src={starImg} alt="Star" className="w-full h-auto" />
          </div>
          <div
            ref={el => {
              if (el) starRefs.current[7] = el;
            }}
            className="absolute bottom-7 right-36"
            style={{ width: '10px', transform: 'rotate(-45deg)' }}
          >
            <img src={starImg} alt="Star" className="w-full h-auto" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Stars;
