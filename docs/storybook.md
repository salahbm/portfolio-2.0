# Storybook Setup for Portfolio 2.0

This document explains how to set up and use Storybook in this project, including troubleshooting common issues.

## What is Storybook?

Storybook is a tool for developing UI components in isolation. It makes building stunning UIs organized and efficient.

## Project Storybook Structure

In this project, we follow the component co-location pattern:

```
app/
├── components/
│   ├── ui/
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   └── button.stories.tsx  # Stories next to components
```

## Storybook Configuration Files

- `.storybook/main.ts`: Main configuration file
- `.storybook/preview.ts`: Preview configuration
- `.storybook/vite.config.ts`: Dedicated Vite config for Storybook

## Getting Started

### Running Storybook Locally

```bash
# Start Storybook development server
bun run storybook

# Build Storybook for production
bun run build-storybook
```

### Running Storybook in Docker

```bash
# Start all services including Storybook
docker-compose up

# Or just start Storybook
docker-compose up storybook
```

## Storybook Configuration Details

### Main Configuration (.storybook/main.ts)

```typescript
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

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
    });
  },
};
export default config;
```

### Preview Configuration (.storybook/preview.ts)

```typescript
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
  },
};

export default preview;
```

### Dedicated Vite Config (.storybook/vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

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
    allowedHosts: true,
  },
});
```

## Creating Stories

### Basic Story Structure

```tsx
// button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};
```

## Common Issues and Solutions

### Issue: React Router Vite Plugin Conflict

**Error:**

```
Error: The React Router Vite plugin requires the use of a Vite config file
```

**Solution:**

1. Create a dedicated Vite config for Storybook that doesn't include the React Router plugin
2. Configure Storybook to use this dedicated config:

```typescript
"core": {
  "builder": {
    "name": "@storybook/builder-vite",
    "options": {
      "viteConfigPath": "./.storybook/vite.config.ts"
    }
  }
}
```

3. Exclude React Router from optimizeDeps:

```typescript
optimizeDeps: {
  exclude: ['@react-router/dev'];
}
```

4. Explicitly set server configuration in both the dedicated Vite config and the viteFinal function:

```typescript
// In .storybook/vite.config.ts
server: {
  host: '0.0.0.0',
  port: 6006,
  allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0']
}

// In .storybook/main.ts viteFinal function
async viteFinal(config) {
  return mergeConfig(config, {
    // other config...
    server: {
      host: '0.0.0.0',
      port: 6006,
      allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0']
    }
  });
}
```

5. For Docker environments, create a custom start script that handles telemetry and xdg-open issues:

```javascript
// .storybook/docker-start.js
#!/usr/bin/env node

// Disable telemetry
process.env.STORYBOOK_DISABLE_TELEMETRY = '1';
process.env.CI = 'true';

// Mock xdg-open to prevent errors
const originalSpawn = require('child_process').spawn;
require('child_process').spawn = function(cmd, args, options) {
  if (cmd === 'xdg-open') {
    return { on: () => {}, stdout: { on: () => {} }, stderr: { on: () => {} } };
  }
  return originalSpawn(cmd, args, options);
};

// Run Storybook
require('storybook/bin');
```

### Issue: allowedHosts Warning in Docker

**Warning:**

```
'host' is set to '0.0.0.0' but 'allowedHosts' is not defined.
Defaulting 'allowedHosts' to true, which permits all hostnames.
```

**Solution:**

This warning is harmless as it defaults to allowing all hosts, but if you want to suppress it, you can:

1. Set explicit `allowedHosts` in both Vite config and viteFinal:

```typescript
server: {
  host: '0.0.0.0',
  port: 6006,
  allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0']
}
```

2. Intercept and filter the warning in a custom start script:

```javascript
// Intercept console.log to filter out the allowedHosts warning
const originalConsoleLog = console.log;
console.log = function () {
  // Check if this is the allowedHosts warning
  const message = Array.from(arguments).join(' ');
  if (message.includes("'host' is set to '0.0.0.0' but 'allowedHosts' is not defined")) {
    // Skip logging this warning
    return;
  }
  // Pass through all other messages
  originalConsoleLog.apply(console, arguments);
};
```

### Issue: CSS Not Loading in Storybook

**Solution:**
Import your CSS files in `.storybook/preview.ts`:

```typescript
import '../app/styles/app.css';
```

### Issue: Stories Not Found

**Solution:**
Make sure your stories path in `.storybook/main.ts` matches your project structure:

```typescript
"stories": [
  "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"
]
```

## Best Practices

1. **Co-locate Stories**: Keep story files next to component files
2. **Use Args**: Define component props as args for better controls
3. **Use Controls**: Configure argTypes for better documentation
4. **Use Autodocs**: Add `tags: ['autodocs']` for automatic documentation
5. **Use Parameters**: Configure parameters for better presentation

## Useful Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook Vite Builder](https://storybook.js.org/docs/builders/vite)
- [Component-Driven Development](https://www.componentdriven.org/)
