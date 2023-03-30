import { Header } from "../../types";


export const stringifyHeaders = (headers: Header[]): string => {
  return headers.map((h) => `${h.key}: ${h.value}`).join('\n');
};
