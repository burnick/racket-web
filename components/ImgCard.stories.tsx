import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ImgCard from './ImgCard';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/ImgCard',
  component: ImgCard,
} as ComponentMeta<typeof ImgCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ImgCard> = (args) => (
  <ImgCard {...args} />
);

export const ShortTitle = Template.bind({});

ShortTitle.args = {
  title: 'test',
  imgUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  description: <>www.instagram.com</>,
};

export const LongTitle = Template.bind({});

LongTitle.args = {
  title:
    'Ipusm some really long title uis expected here to see how it will look',
  imgUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  description: <>www.instagram.com</>,
};
