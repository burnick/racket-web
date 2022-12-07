import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanelCard from './PanelCard';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/PanelCard',
  component: PanelCard,
} as ComponentMeta<typeof PanelCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PanelCard> = (args) => (
  <PanelCard {...args} />
);

export const ShortTitle = Template.bind({});

ShortTitle.args = {
  title: 'test',
  children: 'text',
};
