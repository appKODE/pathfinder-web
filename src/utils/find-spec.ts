import UrlPattern from 'url-pattern';
import { FindSpecFn, UrlSpec } from '../types';

/**
 *
 * Находит UrlSpec из списка для url и method
 *
 */
export const findSpec: FindSpecFn = (templates, method, url) => {
  let result: UrlSpec | null = null;

  templates.forEach((value, key) => {
    const template = value
      .replace(/{.*}/gm, match => `(/:${match.replace(/(\{|\})/gm, '')})`)
      .replace(/\/\(\//gm, '(/');

    const pattern = new UrlPattern(`${template}(/)`, {
      segmentNameCharset: 'a-zA-Z0-9_-',

    });

    const { pathname } = new URL(url);

    const res = pattern.match(pathname);

    if (res && key.method === method) {
      result = key;
    }
  });

  return result;
};
