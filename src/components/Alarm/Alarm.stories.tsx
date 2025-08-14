// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Alarm } from './Alarm';



const meta: Meta<typeof Alarm> = {
  title: 'Components/Alarm',
  component: Alarm,
  parameters: {
    layout:'fullscreen'
  }
};
export default meta;

type Story = StoryObj<typeof Alarm>;

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
