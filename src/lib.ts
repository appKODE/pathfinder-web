import { getStorage } from './storage';
import {
  EnvSpec,
  GlobalEnvGetter,
  GlobalEnvSetter,
  PathfinderBuilder,
  ResetHandler,
  SpecGetter,
  SpecSetter,
  UrlEnvGetter,
  UrlEnvSetter,
  UrlSpec,
} from './types';

import {
  createUrl,
  parseUrl,
  findSpec,
  getStorageAdapter,
  makeBuildUrl,
} from './utils';

export function createTemplatesBySpec(
  urlList: UrlSpec[],
): Map<UrlSpec, string> {
  const templatesBySpec = new Map<UrlSpec, string>();

  for (const urlSpec of urlList) {
    templatesBySpec.set(urlSpec, urlSpec.template);
  }

  return templatesBySpec;
}

const createSpec = () => {
  let urls: UrlSpec[] = [];
  let envs: EnvSpec[] = [];
  return {
    setUrls(data: UrlSpec[]) {
      urls = data;
    },
    setEnvs(data: EnvSpec[]) {
      envs = data;
    },
    getTemplatesBySpec() {
      return createTemplatesBySpec(urls);
    },
    getUrls() {
      return [...urls];
    },
    getEnvs() {
      return [...envs];
    },
    getEnv(id: string) {
      return envs.find(envItem => envItem.id === id);
    },
  };
};

export const createPathFinder: PathfinderBuilder = ({
  resolver,
  data,
  dataKey,
}) => {
  const spec = createSpec();

  const storage = getStorage(getStorageAdapter(data, dataKey));

  const getGlobalEnv: GlobalEnvGetter = () => storage.getGlobalEnv();
  const getUrlEnv: UrlEnvGetter = urlId => storage.getEndpointEnv(urlId) || getGlobalEnv();

  const buildUrl = makeBuildUrl({
    specGetter: findSpec,
    urlEnvGetter: getUrlEnv,
    createUrl,
    parseUrl,
  });

  const setGlobalEnv: GlobalEnvSetter = envId => {
    storage.setGlobalEnv(envId);
  };

  const setUrlEnv: UrlEnvSetter = (urlId, envId) => {
    storage.setEndpointEnv(urlId, envId);
  };

  const setSpec: SpecSetter = (obj: unknown) => {
    try {
      const { envs, urls } = resolver.parse(obj);

      spec.setEnvs(envs);
      spec.setUrls(urls);
      storage.setSpec({ envs, urls });
    } catch (e) {
      console.log(e);
    }
  };

  const getSpec: SpecGetter = () => storage.getSpec();

  const reset: ResetHandler = () => {
    storage.resetEndpointsEnv();
    storage.resetGlobalEnv();
    storage.resetGlobalHeaders();
    storage.resetEndpointsHeaders();
  };

  const { setGlobalHeaders } = storage;
  const { getGlobalHeaders } = storage;
  const { setEndpointHeaders } = storage;
  const { getEndpointHeaders } = storage;

  return {
    findSpec,
    getSpec,
    setSpec,
    buildUrl,
    setGlobalEnv,
    getGlobalEnv,
    setUrlEnv,
    getUrlEnv,
    reset,
    getEndpointHeaders,
    getGlobalHeaders,
    setEndpointHeaders,
    setGlobalHeaders,
  };
};
