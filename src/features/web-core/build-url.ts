import { FindSpecFn, UrlBuilder, UrlEnvGetter } from '../../types';
import { CreateUrlFn } from './create-url';

import { ParseUrlFn } from './parse-url';

type UrlBuilderFabric = (arg: {
  specGetter: FindSpecFn;
  urlEnvGetter: UrlEnvGetter;
  createUrl: CreateUrlFn;
  parseUrl: ParseUrlFn;
  basePath: string;
}) => UrlBuilder;

/**
 *
 * Преобразует переданный URL с учетом параметров которые укзаны для данного запроса в pathfinder
 * Параметры: baseUrl, env query params (UrlSpec)
 *
 */
export const makeBuildUrl: UrlBuilderFabric =
  ({ specGetter, urlEnvGetter, createUrl, parseUrl, basePath }) =>
  ({ templatesBySpec, method, url, envSpecs }) => {
    const urlSpec = specGetter(templatesBySpec, method, url, basePath);
    const parsedUrl = parseUrl(url);

    const prefix = new URL(basePath).pathname

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

    parsedUrl.path = parsedUrl.path.replace(prefix, '/'); // Тут замена на / так как если префикса нет,
    // то new URL().pathname возвращает / и она заменяется
    const result = createUrl({ ...parsedUrl });

    return result || url;
  };
