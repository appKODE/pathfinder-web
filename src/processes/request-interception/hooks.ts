import intercept from 'fetch-intercept';
import {
  createTemplatesBySpec,
  Pathfinder,
} from '@kode-frontend/pathfinder-web-core';
import { useEffect } from 'react';
import { Header } from '@kode-frontend/pathfinder-web-core/dist/types';

type TMergeGlobalEndEndpointHeadersArg = {
  globalHeaders: Header[];
  endpointHeaders: Header[];
};
const mergeGlobalAndEndpointHeaders = ({
  endpointHeaders,
  globalHeaders,
}: TMergeGlobalEndEndpointHeadersArg): Record<string, string> => {
  if (globalHeaders.length === 0) {
    return endpointHeaders.reduce((acc, current) => {
      return { ...acc, [current.key]: current.value };
    }, {});
  }

  return globalHeaders.reduce((acc, current) => {
    const endpointHeader = endpointHeaders.find((h) => h.key === current.key);

    const headerValue = endpointHeader?.value || current.value;

    return { ...acc, [current.key]: headerValue };
  }, {});
};

export function useRequestInterception(
  pathfinder: Pathfinder,
  active: boolean
) {
  // fetch
  useEffect(() => {
    if (!active) {
      return;
    }

    const unregister = intercept.register({
      request(
        url: string,
        config: RequestInit | undefined
      ): Promise<any[]> | any[] {
        const spec = pathfinder.getSpec();

        const templatesBySpec = spec?.urls
          ? createTemplatesBySpec(spec.urls)
          : null;

        const method = config?.method || 'GET';

        const endpointSpec = templatesBySpec
          ? pathfinder.findSpec(templatesBySpec, method, url)
          : null;

        const endpointHeaders: Header[] = endpointSpec
          ? pathfinder.getEndpointHeaders(endpointSpec.id)
          : [];

        const globalHeaders = pathfinder.getGlobalHeaders();

        const newHeaders = mergeGlobalAndEndpointHeaders({
          globalHeaders,
          endpointHeaders,
        });

        if (config?.headers) {
          config.headers = { ...config.headers, ...newHeaders };
        } else {
          config = { ...config, headers: { ...newHeaders } };
        }

        const envSpecs = spec?.envs;

        const newUrl = templatesBySpec
          ? pathfinder.buildUrl({
              templatesBySpec,
              method,
              url,
              envSpecs,
            })
          : url;
        return [newUrl, config];
      },
    });

    return () => {
      unregister();
    };
  }, [pathfinder, active]);

  // XMLHttpRequest
  useEffect(() => {
    if (!active) {
      return;
    }
    const open = XMLHttpRequest.prototype.open;
    const setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL
    ) {
      const urlString = typeof url === 'string' ? url : url.toString();
      const spec = pathfinder.getSpec();
      const envSpecs = spec?.envs;
      const templatesBySpec = spec?.urls
        ? createTemplatesBySpec(spec.urls)
        : null;

      const endpointSpec = templatesBySpec
        ? pathfinder.findSpec(templatesBySpec, method.toUpperCase(), urlString)
        : null;

      const endpointHeaders: Header[] = endpointSpec
        ? pathfinder.getEndpointHeaders(endpointSpec.id)
        : [];

      const globalHeaders = pathfinder.getGlobalHeaders();

      const newUrl = templatesBySpec
        ? pathfinder.buildUrl({
            templatesBySpec,
            method,
            url: urlString,
            envSpecs,
          })
        : urlString;

      arguments[1] = newUrl;

      const newHeaders = mergeGlobalAndEndpointHeaders({
        globalHeaders,
        endpointHeaders,
      });

      open.apply(this, arguments as any);

      Object.getOwnPropertyNames(newHeaders).forEach((header) => {
        if (newHeaders[header]) {
          setRequestHeader.apply(this, [header, newHeaders[header]]);
        }
      });
    };

    return () => {
      XMLHttpRequest.prototype.open = open;
      XMLHttpRequest.prototype.setRequestHeader = setRequestHeader;
    };
  }, [pathfinder, active]);
}
