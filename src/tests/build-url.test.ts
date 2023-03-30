import { UrlSpec } from '..';
import { createUrl, findSpec, parseUrl } from '../utils';
import { makeBuildUrl } from '../utils/build-url';

export const specSimple: UrlSpec = {
  id: 'get-user-content',
  method: 'GET',
  name: 'user content',
  tags: ['user'],
  template: '/user/v2/content',
};

export const specWithPathParam: UrlSpec = {
  id: 'get-with-path-aram',
  method: 'GET',
  name: 'user content',
  tags: ['user'],
  template: '/user/v2/customers/{customerId}',
};

export const specWithWithPathParamSearch: UrlSpec = {
  id: 'get-with-path-path-param-search',
  method: 'GET',
  name: 'user content',
  tags: ['user'],
  template: '/user/v2/customers/search/{q}',
};

const templateSimple = '/user/v2/content';
const templateWithPathParam = '/user/v2/customers/{customerId}';
const templateWithPathParamSearch = '/user/v2/customers/search/{q}';

const templatesBySpec = new Map()
  .set(specWithWithPathParamSearch, templateWithPathParamSearch)
  .set(specSimple, templateSimple)
  .set(specWithPathParam, templateWithPathParam);

const getUrlEnvMock = () => 'dev';

const buildUrl = makeBuildUrl({
  specGetter: findSpec,
  urlEnvGetter: getUrlEnvMock,
  createUrl,
  parseUrl,
});

describe('Test for buildUrl', () => {
  it('Should not change url', () => {
    const url =
      'https://domain.dev/user/v2/customers/some-path-param/?page=1&pageSize=3';
    const result = buildUrl({
      templatesBySpec,
      method: 'GET',
      url,
      envSpecs: [],
    });

    expect(result).toEqual(url);
  });

  it('Should change only base path', () => {
    const url =
      'https://domain.dev/user/v2/customers/some-path-param/?page=1&pageSize=3';
    const result = buildUrl({
      templatesBySpec,
      method: 'GET',
      url,
      envSpecs: [
        {
          id: 'dev',
          name: 'dev',
          baseUrl: 'https://some-dev-base-path.dev',
        },
      ],
    });

    expect(result).toEqual(
      'https://some-dev-base-path.dev/user/v2/customers/some-path-param/?page=1&pageSize=3',
    );
  });

  it('Should change only query params', () => {
    const url =
      'https://domain.dev/user/v2/customers/some-path-param/?page=1&pageSize=3';
    const result = buildUrl({
      templatesBySpec,
      method: 'GET',
      url,
      envSpecs: [
        {
          id: 'dev',
          name: 'dev',
          queryParams: { 'some-new-param': 'test' },
        },
      ],
    });

    expect(result).toEqual(
      'https://domain.dev/user/v2/customers/some-path-param/?page=1&pageSize=3&some-new-param=test',
    );
  });
  it('Should change base path and  query params', () => {
    const url =
      'https://domain.dev/user/v2/customers/some-path-param/?page=1&pageSize=3';
    const result = buildUrl({
      templatesBySpec,
      method: 'GET',
      url,
      envSpecs: [
        {
          id: 'dev',
          name: 'dev',
          queryParams: { 'some-new-param': 'test' },
          baseUrl: 'https://some-dev-base-path.dev',
        },
      ],
    });

    expect(result).toEqual(
      'https://some-dev-base-path.dev/user/v2/customers/some-path-param/?page=1&pageSize=3&some-new-param=test',
    );
  });
});
