import { Suspense } from 'react';

import { Cursor } from './cursor';

import type { Meta } from '@storybook/react-vite';

export const CursorWrapper = () => {
  return (
    <Suspense fallback={<div>Loading 3D components...</div>}>
      <div className="flex items-center justify-center w-screen h-dvh">
        <Cursor />

        <div className="flex gap-10 flex-wrap cursor-none">
          <span data-cursor="default">Default</span>
          <button type="button" data-cursor="pointer">
            Pointer
          </button>
          <button type="button" data-cursor="click">
            Click
          </button>
          <button type="button" data-cursor="hand">
            Hand
          </button>
          <button type="button" data-cursor="grab">
            Grab
          </button>
          <button type="button" data-cursor="text">
            Text
          </button>
        </div>
      </div>
    </Suspense>
  );
};

const meta = {
  title: 'Shared/Cursor',
  component: Cursor,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component: 'A beautiful 3D interactive cursor ',
      },
    },
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Cursor>;

export default meta;
