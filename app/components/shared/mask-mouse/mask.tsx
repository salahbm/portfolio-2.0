import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import '@styles/mask-mouse.css';

const MaskMouse: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const maskContentRef = useRef<HTMLDivElement | null>(null);
  const hiddenContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const maskContent = maskContentRef.current;
    const hiddenContent = hiddenContentRef.current;

    if (!section || !maskContent || !hiddenContent) return;

    /** quickSetters for vars */
    const xSetter = gsap.quickSetter(hiddenContent, '--x', 'px');
    const ySetter = gsap.quickSetter(hiddenContent, '--y', 'px');

    /** timeline for text hover enlarge */
    const tl = gsap.timeline({ paused: true });
    tl.to(hiddenContent, { duration: 0.6, '--size': 200, ease: 'back.out(1.7)' });

    /** hover trigger */
    const texts = maskContent.querySelectorAll('.mask-text');
    const handleEnter = () => tl.play();
    const handleLeave = () => tl.reverse();

    texts.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    /** mousemove inside section */
    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xSetter(x);
      ySetter(y);

      // 👇 force browser to re-evaluate the CSS mask using updated vars
      hiddenContent.style.maskImage = `radial-gradient(circle at ${x}px ${y}px, black var(--size), transparent calc(var(--size) + 1px))`;
    };

    const handleEnterSection = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xSetter(x);
      ySetter(y);
      gsap.set(hiddenContent, { autoAlpha: 1, '--size': 0 });
    };

    const handleLeaveSection = () => {
      tl.reverse();
      gsap.to(hiddenContent, { '--size': 0, duration: 0.4 });
    };

    section.addEventListener('mousemove', handleMove);
    section.addEventListener('mouseenter', handleEnterSection);
    section.addEventListener('mouseleave', handleLeaveSection);

    return () => {
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseenter', handleEnterSection);
      section.removeEventListener('mouseleave', handleLeaveSection);
      texts.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <section className="relative py-20 h-dvh overflow-hidden bg-background" ref={sectionRef}>
      <div className="relative h-full w-full overflow-hidden">
        {/* Visible text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-16 text-center px-10 lg:px-14"
          ref={maskContentRef}
        >
          <div>
            <p className="mask-text text-4xl md:text-5xl lg:text-6xl">
              I once swore I’d finally master one JavaScript framework and stay loyal forever
            </p>
          </div>
        </div>

        {/* Hidden layer */}
        <div
          className="hidden-content pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-16 text-center opacity-100 px-10 lg:px-14"
          ref={hiddenContentRef}
        >
          <div>
            <p className="text-4xl md:text-5xl lg:text-6xl text-gradient-dark">
              Then React, Vue, Vite, and Next.js started fighting for custody of my weekend
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { MaskMouse };
