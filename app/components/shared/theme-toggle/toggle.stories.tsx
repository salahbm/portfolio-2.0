import { Suspense } from 'react';

import { ThemeToggle } from './toggle';

import type { Meta, StoryObj } from '@storybook/react-vite';

// Create a wrapper component to handle suspense and error boundaries
const ThemeToggleWrapper = () => {
  return (
    <Suspense fallback={<div>Loading 3D components...</div>}>
      <div style={{ width: '600px', height: '600px' }}>
        <ThemeToggle />
      </div>
    </Suspense>
  );
};

const meta = {
  title: 'Shared/ThemeToggle',
  component: ThemeToggleWrapper,
  parameters: {
    layout: 'centered',
    // Disable default Storybook handling of Canvas/WebGL contexts
    chromatic: { disableSnapshot: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggleWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'A 3D interactive theme toggle switch that animates between light and dark modes.',
      },
    },
  },
};

// We don't need the InContainer story since our wrapper already provides a container
// If you want to keep it, you can uncomment this code
/*
export const InContainer: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'ThemeToggle component displayed within a container with fixed dimensions.',
      },
    },
  },
};
*/
