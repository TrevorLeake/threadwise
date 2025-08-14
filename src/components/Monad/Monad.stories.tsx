// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Monad } from './Monad';



const meta: Meta<typeof Monad> = {
  title: 'Components/Monad',
  component: Monad,
  parameters: {
    layout:'fullscreen'
  }
};
export default meta;

type Story = StoryObj<typeof Monad>;

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
