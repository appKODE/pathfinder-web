import { Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import { Panel } from './panel';

type Props = Partial<ComponentProps<typeof Panel>>;
const args: Props = {
  config: {
    envList: [
      { id: 'local', name: 'Local' },
      { id: 'prod', name: 'Prod' },
      { id: 'dev', name: 'Dev' },
    ],
    urlList: Array(30)
      .fill(undefined)
      .map((_, index) => ({
        id: index.toString(),
        method: `${index % 2 === 0 ? 'GET' : 'POST'}`,
        template: `/user/${index}/list`,
        name: 'Endpoint Name',
      })),
  },
  defaultEnvId: 'local',
  urlEnvInitialValues: {
    3: 'dev',
    7: 'local',
    8: 'dev',
  },
};

export default {
  title: 'UI/organisms/Panel',
  component: Panel,
  args,
} as Meta;

export const Basic = Panel;
