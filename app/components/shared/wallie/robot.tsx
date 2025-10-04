import React, { useEffect, useRef } from 'react';

// Import the Three.js logic from the JavaScript file
import { onKeyDown, onKeyUp } from './robot-controllers';
import * as WallieLogic from './robot-init';

const RobotGlb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Initialize the Three.js scene with the container element
      WallieLogic.init(containerRef.current);

      // Add event listeners for keyboard controls and window resize
      window.addEventListener('resize', WallieLogic.onWindowResize);
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
    }

    // Clean up function
    return () => {
      // Remove event listeners
      window.removeEventListener('resize', WallieLogic.onWindowResize);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default RobotGlb;
