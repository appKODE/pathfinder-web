import React from 'react';
import { Meta, Story } from '@storybook/react';
import Component from './button';

export default { title: 'UI/atoms/Button', component: Component } as Meta;

export const Button: Story<React.ComponentProps<typeof Component>> = (
  props
) => <Component {...props}>Text</Component>;
