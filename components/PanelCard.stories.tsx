import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PanelCard from './PanelCard'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'PanelCard',
  component: PanelCard,
} as ComponentMeta<typeof PanelCard>

export const ShortTitle: ComponentStory<typeof PanelCard> = () => (
  <PanelCard title="PanelCard">PanelCard</PanelCard>
)

ShortTitle.args = {
  title: 'test',
}
