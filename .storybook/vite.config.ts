import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// This is a separate Vite config specifically for Storybook
// It intentionally does NOT include the React Router plugin
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../app'),
    },
  },
  // Explicitly disable any React Router plugin integration
  optimizeDeps: {
    exclude: ['@react-router/dev'],
  },
  // Add server configuration for Docker
  server: {
    host: '0.0.0.0',
    port: 6006,
    // Allow all hosts to access Storybook
    allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0'],
  },
});
