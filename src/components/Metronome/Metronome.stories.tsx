// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Metronome } from './Metronome';



const meta: Meta<typeof Metronome> = {
  title: 'Components/Metronome',
  component: Metronome,
  parameters: {
    layout:'fullscreen'
  }
};
export default meta;

type Story = StoryObj<typeof Metronome>;

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
