import React from 'react';

import type { Preview } from '@storybook/react-vite';
import '../app/styles/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    // Properly handle WebGL contexts
    canvas: {
      // Disable Storybook's default handling of WebGL contexts
      disableWebGL: false,
    },
    // Disable snapshots for Three.js components
    chromatic: { disableSnapshot: true },
  },
  // Add decorators if needed for global providers
  decorators: [
    Story => {
      return React.createElement(Story);
    },
  ],
};

export default preview;
