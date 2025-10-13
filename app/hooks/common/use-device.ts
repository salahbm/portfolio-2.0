import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);
  const [isTouchable, setIsTouchable] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  React.useEffect(() => {
    const mql = window.matchMedia(`(any-pointer: coarse)`);
    const onChange = () => {
      setIsTouchable(mql.matches);
    };
    mql.addEventListener('change', onChange);
    setIsTouchable(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return {
    isMobile: !!isMobile,
    isTouchable: !!isTouchable,
  };
}
