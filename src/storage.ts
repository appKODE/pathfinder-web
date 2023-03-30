import {
  GetStorageFn,
  GlobalEnvGetter,
  GlobalEnvSetter,
  GlobalHeadersGetter,
  GlobalHeadersSetter,
  Header,
  Spec,
  SpecGetter,
  Storage,
  UrlEnvGetter,
  UrlEnvSetter,
  UrlHeadersGetter,
  UrlHeadersSetter,
} from './types';

export const ENDPOINTS_KEY = 'endpoints';
export const GLOBAL_ENV_KEY = 'global';
export const SPEC_KEY = 'spec';
export const ENDPOINTS_HEADERS_KEY = 'edpoints-headers';
export const GLOBAL_HEADERS_KEY = 'global-headers';

export const getStorage: GetStorageFn = adapter => {
  const getEndpointsOptions = <T>(
    key: string,
  ): Record<string, T> | undefined => {
    let result;

    try {
      const optionsString = adapter.getItem(key);

      if (optionsString) {
        const parsedOptions = JSON.parse(optionsString) as Record<string, T>;

        if (typeof parsedOptions === 'object') {
          result = parsedOptions;
        }
      }
    } catch (e) {
      console.error(e);
    }

    return result;
  };

  /* Env */

  const getEndpointEnv: UrlEnvGetter = urlId => {
    const options = getEndpointsOptions<string>(ENDPOINTS_KEY);

    if (options && options[urlId]) {
      return options[urlId];
    }

    return null;
  };

  const setEndpointEnv: UrlEnvSetter = (urlId, envId) => {
    const options = getEndpointsOptions<string>(ENDPOINTS_KEY);
    const res = { ...options, [urlId]: envId };

    adapter.setItem(ENDPOINTS_KEY, JSON.stringify(res));
  };

  const resetEndpointsEnv = () => {
    adapter.setItem(ENDPOINTS_KEY, '{}');
  };

  const resetGlobalEnv = () => {
    adapter.setItem(GLOBAL_ENV_KEY, '{}');
  };

  const getGlobalEnv: GlobalEnvGetter = () => adapter.getItem(GLOBAL_ENV_KEY);

  const setGlobalEnv: GlobalEnvSetter = envId => {
    if (envId) {
      adapter.setItem(GLOBAL_ENV_KEY, envId);
    }
  };

  /* Specification */

  const setSpec = (data: Spec) => {
    adapter.setItem(SPEC_KEY, JSON.stringify(data));
  };

  const getSpec: SpecGetter = () => {
    const rawSpec = adapter.getItem(SPEC_KEY);

    if (rawSpec) {
      try {
        return JSON.parse(rawSpec) as Spec;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  /* Headers */

  const setGlobalHeaders: GlobalHeadersSetter = data => {
    adapter.setItem(GLOBAL_HEADERS_KEY, JSON.stringify(data));
  };

  const getGlobalHeaders: GlobalHeadersGetter = () => {
    const rawData = adapter.getItem(GLOBAL_HEADERS_KEY);

    if (rawData) {
      try {
        return JSON.parse(rawData) as Header[];
      } catch (e) {
        return [];
      }
    }

    return [];
  };

  const setEndpointHeaders: UrlHeadersSetter = (urlId, headers) => {
    const options = getEndpointsOptions<Header[]>(ENDPOINTS_HEADERS_KEY);
    const res = { ...options, [urlId]: headers };

    adapter.setItem(ENDPOINTS_HEADERS_KEY, JSON.stringify(res));
  };

  const getEndpointHeaders: UrlHeadersGetter = urlId => {
    const options = getEndpointsOptions<Header[]>(ENDPOINTS_HEADERS_KEY);

    if (options && options[urlId]) {
      return options[urlId];
    }

    return [];
  };

  const resetGlobalHeaders: () => void = () => {
    adapter.setItem(GLOBAL_HEADERS_KEY, '');
  };

  const resetEndpointsHeaders: () => void = () => {
    adapter.setItem(ENDPOINTS_HEADERS_KEY, '');
  };

  const storage: Storage = {
    getSpec,
    setSpec,
    getEndpointEnv,
    setEndpointEnv,
    resetEndpointsEnv,
    resetGlobalEnv,
    getGlobalEnv,
    setGlobalEnv,
    getEndpointHeaders,
    getGlobalHeaders,
    resetEndpointsHeaders,
    resetGlobalHeaders,
    setEndpointHeaders,
    setGlobalHeaders,
  };

  return storage;
};
