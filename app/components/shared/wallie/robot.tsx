import React, { useEffect } from 'react';

import * as WallieLogic from './robot-init';

const RobotGlb: React.FC = () => {
  useEffect(() => {
    WallieLogic.init();
  }, []);

  return <div className="w-full h-full" id="robot-container" />;
};

export default RobotGlb;
