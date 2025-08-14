// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { LatticeTimer } from './LatticeTimer';



const meta: Meta<typeof LatticeTimer> = {
  title: 'Components/LatticeTimer',
  component: LatticeTimer,
  parameters: {
    layout:'fullscreen'
  }
};
export default meta;

type Story = StoryObj<typeof LatticeTimer>;

export const Mobile_Pixel: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'pixelxl', // built-in Storybook viewport
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet', // or define your own
    },
  },
};
