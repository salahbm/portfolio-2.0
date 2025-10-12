import { Suspense } from 'react';

import { SoundToggle } from './sound-toggle';

import type { Meta } from '@storybook/react-vite';

export const SoundToggleWrapper = () => {
  return (
    <Suspense fallback={<div>Loading 3D components...</div>}>
      <div className="flex items-center justify-center w-screen h-dvh">
        <SoundToggle />
      </div>
    </Suspense>
  );
};

const meta = {
  title: 'Shared/Sound Toggle',
  component: SoundToggle,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component: 'A beautiful 3D interactive sound toggle ',
      },
    },
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof SoundToggle>;

export default meta;
