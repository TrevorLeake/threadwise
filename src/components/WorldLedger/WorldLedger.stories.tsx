// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import type { PropsWithChildren, ReactNode } from 'react';
import type { CSSProperties } from 'styled-components';
import type React from 'react';
import WorldLedger from './WorldLedger';



const meta: Meta<typeof WorldLedger> = {
  title: 'Components/WorldLedger',
  component: WorldLedger,
  parameters: {
    layout:'fullscreen'
  }
};
export default meta;

type Story = StoryObj<typeof WorldLedger>;

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
