import { ComponentProps } from 'react';
import { Args, Meta, Story } from '@storybook/react';
import Component from './panel-button';

type Props = ComponentProps<typeof Component>;
type StoryProps<T> = T extends {} ? T : Args;

export default {
  title: 'UI/atoms/Panel Button',
  component: Component,
} as Meta<StoryProps<Props>>;

export const PanelButton: Story<StoryProps<Props>> = props => (
  <Component {...props} />
);
