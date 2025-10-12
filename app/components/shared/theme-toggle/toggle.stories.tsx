import { Suspense } from 'react';
import { action } from 'storybook/actions';

import { ThemeToggle, type ThemeToggleProps } from './toggle';

import type { Meta, StoryObj } from '@storybook/react-vite';

// Create a wrapper component to handle suspense and error boundaries
const ThemeToggleWrapper = ({
  initialDark = false,
  onToggle = action('theme-toggled'),
}: ThemeToggleProps) => {
  return (
    <Suspense fallback={<div>Loading 3D components...</div>}>
      <div className="flex items-center justify-center w-dvw h-dvh">
        <ThemeToggle initialDark={initialDark} onToggle={onToggle} />
      </div>
    </Suspense>
  );
};

const meta = {
  title: 'Shared/Theme Toggle',
  component: ThemeToggleWrapper,
  parameters: {
    layout: 'centered',
    // Disable default Storybook handling of Canvas/WebGL contexts
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          'A beautiful 3D interactive theme toggle switch that animates between light and dark modes with smooth transitions.',
      },
    },
  },
  argTypes: {
    initialDark: {
      control: 'boolean',
      description: 'Initial theme state (dark or light)',
      table: {
        type: { summary: 'boolean' as const },
        defaultValue: { summary: 'false' as const },
      },
    },
    onToggle: {
      // Using action in argTypes
      description: 'Callback fired when theme is toggled',
      table: {
        type: { summary: '(isDark: boolean) => void' as const },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggleWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialDark: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default light theme toggle switch.',
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    initialDark: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle switch initialized in dark mode.',
      },
    },
  },
};

export const WithCustomAction: Story = {
  args: {
    initialDark: false,
    onToggle: (isDark: boolean) => {
      action('custom-toggle-action')(isDark ? 'Switched to Dark Mode' : 'Switched to Light Mode');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle switch with custom action handler that logs the current theme state.',
      },
    },
  },
};
