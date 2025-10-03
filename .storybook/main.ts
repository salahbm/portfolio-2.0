import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Note: We'll disable telemetry via environment variable instead
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        // Tell Storybook to use our custom Vite config
        viteConfigPath: './.storybook/vite.config.ts',
      },
    },
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      plugins: [tailwindcss(), tsconfigPaths()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../app'),
        },
      },
      // Explicitly add server configuration
      server: {
        host: '0.0.0.0',
        port: 6006,
        allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0'],
      },
    });
  },
};
export default config;
