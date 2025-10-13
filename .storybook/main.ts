import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import type { StorybookConfig } from '@storybook/react-vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: './.storybook/vite.config.ts',
      },
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tailwindcss(), tsconfigPaths()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../app'),
        },
      },
      server: {
        host: '0.0.0.0',
        port: 6006,
        allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0'],
      },
      optimizeDeps: {
        include: ['@react-spring/three', '@react-three/drei', '@react-three/fiber', 'three'],
      },
      assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.jpg', '**/*.jpeg', '**/*.png'],
    });
  },
};

export default config;
