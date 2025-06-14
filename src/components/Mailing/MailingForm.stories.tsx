// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MailingForm } from './MailingForm';


const meta: Meta<typeof MailingForm> = {
  title: 'Components/MailingForm',
  component: MailingForm,
  parameters: {
    layout:'fullscreen'
  }
};
export default meta;

type Story = StoryObj<typeof MailingForm>;

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
