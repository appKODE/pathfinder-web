import { DataResolver, Storage, DataUrl, Spec, UrlSpec } from '../types';

export const endpointTemplate = '/user/v2/content';
export const endpointTemplateMatcher = /\/user\/v2\/content/gm;

export const anotherEndpointTemplateMatcher = /\/user\/v2\/profile/gm;

const baseUrl = 'https://domain.dev';

export const urlSpec: UrlSpec = {
  id: 'get-user-content',
  method: 'GET',
  name: 'user content',
  tags: ['user'],
  template: endpointTemplate,
};

export const url = 'https://domain.dev/user/v2/content/1/?group=admin#fragment';
export const parsedUrl: DataUrl = {
  baseUrl,
  fragment: 'fragment',
  path: '/user/v2/content/1/',
  query: new URLSearchParams('group=admin'),
};

export const url2 = 'https://domain.dev/user/v2/content/1/';
export const parsedUrl2: DataUrl = {
  baseUrl,
  path: '/user/v2/content/1/',
  query: new URLSearchParams(''),
};

export const url3 = baseUrl;
export const parsedUrl3: DataUrl = {
  baseUrl,
  path: '',
  query: new URLSearchParams(''),
};

export const parsedUrlWithoutDomain: DataUrl = {
  path: '/api/v1/users/1/',
  query: new URLSearchParams(),
};

const spec: Spec = {
  envs: [
    {
      id: 'dev',
      name: 'dev stand',
      baseUrl,
    },
  ],
  urls: [urlSpec],
};

export const dataResolver: DataResolver = {
  parse: () => spec,
};

export const dataStorage: Storage = {
  getEndpointEnv: () => '',
  getGlobalEnv: () => '',
  getSpec: () => spec,
  resetEndpointsEnv: () => null,
  resetGlobalEnv: () => null,
  setEndpointEnv: () => null,
  setGlobalEnv: () => null,
  setSpec: () => null,
  getEndpointHeaders: () => [],
  getGlobalHeaders: () => [],
  setEndpointHeaders: () => null,
  setGlobalHeaders: () => null,
  resetEndpointsHeaders: () => null,
  resetGlobalHeaders: () => null,
};
