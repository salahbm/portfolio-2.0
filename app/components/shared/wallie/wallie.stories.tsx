import { Suspense } from 'react';

import RobotGlb from './robot';

import type { Meta, StoryObj } from '@storybook/react-vite';

// Create a wrapper component to handle suspense and error boundaries
const WallieWrapper = () => {
  return (
    <Suspense fallback={<div>Loading 3D components...</div>}>
      <RobotGlb />
    </Suspense>
  );
};

const meta = {
  title: 'Shared/Wallie',
  component: WallieWrapper,
  parameters: {
    layout: 'centered',
    // Disable default Storybook handling of Canvas/WebGL contexts
    chromatic: { disableSnapshot: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WallieWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: 'Idle',
  },
  parameters: {
    docs: {
      description: {
        story: 'A 3D interactive Wallie that animates between light and dark modes.',
      },
    },
  },
};

export const Walking: Story = {
  args: {
    state: 'Walking',
  },
};
