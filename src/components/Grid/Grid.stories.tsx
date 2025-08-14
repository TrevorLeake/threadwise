// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';



const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout:'fullscreen'
  }
};
export default meta;

type Story = StoryObj<typeof Grid>;

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
