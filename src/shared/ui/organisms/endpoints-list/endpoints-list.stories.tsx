import { ComponentProps } from 'react';
import { Meta } from '@storybook/react';
import { EndpointsList } from './endpoints-list';

type Props = ComponentProps<typeof EndpointsList>;
type PartialProps = Partial<Props>;

const args: PartialProps = {
  environments: [
    {
      label: 'label',
      value: '1',
    },
  ],
  initialValues: {
    '1': '',
  },
  items: [
    {
      id: '1',
      method: 'POST',
      name: 'Endpoint name',
      template: '/user',
    },
    {
      id: '2',
      method: 'POST',
      name: 'Endpoint name',
      template: '/user',
    },
  ],
};

export default {
  title: 'Pathfinder/organisms/EndpointList',
  component: EndpointsList,
  args,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as Meta;

export const Basic = EndpointsList
