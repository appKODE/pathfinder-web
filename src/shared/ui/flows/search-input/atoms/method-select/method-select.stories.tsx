import { ComponentProps } from 'react';
import { MethodSelect } from '.';

type Props = Partial<ComponentProps<typeof MethodSelect>>;

const args: Props = {
  methods: ['get', 'post', 'update', 'delete', 'patch'],
};

export default {
  title: 'ui/flows/search-input/atoms/MethodSelect',
  component: MethodSelect,
  argTypes: {},
  args,
};

export const Basic = MethodSelect;
