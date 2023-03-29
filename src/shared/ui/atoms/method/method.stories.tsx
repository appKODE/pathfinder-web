import { ComponentProps } from 'react';
import { Method } from '.';

type Props = Partial<ComponentProps<typeof Method>>;

const args: Props = {};

export default {
  title: 'Method',
  component: Method,
  argTypes: {},
  args,
};

export const Basic = Method;