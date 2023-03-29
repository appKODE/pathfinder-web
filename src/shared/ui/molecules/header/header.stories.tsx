import { ComponentProps } from 'react';
import { Meta } from '@storybook/react';
import { Header as PanelHeader } from './header';

type Props = Partial<ComponentProps<typeof PanelHeader>>;
const args: Props = {};

export default {
  title: 'UI/molecules/Header',
  component: PanelHeader,
  args: args,
} as Meta;

export const Basic = PanelHeader;
