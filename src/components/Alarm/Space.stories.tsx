// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from './Space';



const meta: Meta<typeof Space> = {
  title: 'Components/Space',
  component: Space,
  parameters: {
    sense:'calm'
  }
};
export default meta;

type Story = StoryObj<typeof Space>;

export const Calm: Story = {
  args: {
    sense: 'calm'
  },
};

export const Charged: Story = {
  args: {
    sense: 'charged'
  },
};
