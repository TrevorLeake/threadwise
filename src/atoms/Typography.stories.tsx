// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import {Heading, Subheading, Paragraph }  from './TypographySC';
import { HR, PageContainer } from './Container';


const TypographyStoryComponent = () => {
  return (
    <PageContainer>
      <Heading>On Clear Impressions</Heading>
      <Subheading>And subtle side effects</Subheading>
      <HR></HR>
      <Paragraph>
        Open with a hook. 
        Make yourself feel naked.
        Make feel them naked.
        Excite them. 
        <br/>
        <br/>
        Then relax.
        Leave them wanting more.
      </Paragraph>
    </PageContainer>
  )
}

const meta: Meta<typeof TypographyStoryComponent> = {
  title: 'Components/TypographyStoryComponent',
  component: TypographyStoryComponent,
  parameters: {
    layout:'fullscreen'
  }
};
export default meta;

type Story = StoryObj<typeof TypographyStoryComponent>;

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
