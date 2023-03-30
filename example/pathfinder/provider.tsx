import * as React from 'react';
import { Pathfinder, openApiResolver } from '@kode-frontend/pathfinder-web-react';

import storage from '@kode-frontend/pathfinder-web-local-storage';

type Props = {
  children: React.ReactNode;
};

export const PathfinderProvider = ({ children }: Props) => {
  return (
    <Pathfinder
      children={<>{children}</>}
      resolver={openApiResolver}
      storage={storage}
      active={process.env.NODE_ENV !== 'production'}
      dataKey={'pathfinder-storage-key'}
    />
  );
};
