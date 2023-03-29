import { UrlMethod } from '@kode-frontend/pathfinder-web-core';

export type TUrlItem = {
  id: string;
  method: UrlMethod;
  template: string;
  name: string;
};

export type TBasePathChangeHandler = (urlId: string, envId?: string) => void;

export type THeadersChangeHandler = (
  headers: string,
  endpointId: string
) => void;

type TUrlId = string;

export type TUrlHeaders = Record<TUrlId, string>;
