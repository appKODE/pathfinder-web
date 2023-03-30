import { FindSpecFn, UrlBuilder, UrlEnvGetter } from '../types';
import { CreateUrlFn } from './create-url';

import { ParseUrlFn } from './parse-url';

type UrlBuilderFabric = (arg: {
  specGetter: FindSpecFn;
  urlEnvGetter: UrlEnvGetter;
  createUrl: CreateUrlFn;
  parseUrl: ParseUrlFn;
}) => UrlBuilder;

/**
 *
 * Преобразует переданный URL с учетом параметров которые укзаны для данного запроса в pathfinder
 * Параметры: baseUrl, env query params (UrlSpec)
 *
 */
export const makeBuildUrl: UrlBuilderFabric =
  ({ specGetter, urlEnvGetter, createUrl, parseUrl }) => ({ templatesBySpec, method, url, envSpecs }) => {
    const urlSpec = specGetter(templatesBySpec, method, url);
    const parsedUrl = parseUrl(url);

    if (!urlSpec || !parsedUrl) {
      return url;
    }

    const envId = urlEnvGetter(urlSpec.id);

    const env = envSpecs?.find(item => item.id === envId);

    if (env?.baseUrl) {
      parsedUrl.baseUrl = env.baseUrl;
    }

    if (env?.queryParams) {
      for (const queryKey of Object.keys(env.queryParams)) {
        const queryVal = env.queryParams[queryKey];
        parsedUrl.query.set(queryKey, queryVal);
      }
    }

    const result = createUrl({ ...parsedUrl });

    return result || url;
  };
