export type UrlMethod =
  | 'PUT'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PATCH'
  | 'TRACE'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS';

export type UTLTemplate = string;

export type UrlSpec = {
  id: string;
  name: string;
  template: string;
  method: UrlMethod;
  tags: string[];
};

export type EnvSpec = {
  id: string;
  name: string;
  baseUrl?: string;
  queryParams?: Record<string, string>;
};

export type UrlBuilderArg = {
  method: string;
  url: string;
  templatesBySpec: Map<UrlSpec, UTLTemplate>;
  envSpecs?: EnvSpec[];
};

export type UrlBuilder = (arg: UrlBuilderArg) => string;

export type DataUrl = {
  baseUrl?: string;
  path: string;
  query: URLSearchParams;
  fragment?: string;
};

export type Header = {
  key: string;
  value: string;
};

export type GlobalEnvSetter = (envId: string | null) => void;
export type GlobalEnvGetter = () => string | null;

export type UrlEnvSetter = (urlId: string, envId?: string) => void;
export type UrlEnvGetter = (urlId: string) => string | null;

export type ResetHandler = () => void;

export type SpecSetter = (obj: unknown) => void;
export type SpecGetter = () => Spec | null;

export type UrlListGetter = () => UrlSpec[];
export type EnvListGetter = () => EnvSpec[];

export type UrlHeadersSetter = (urlId: string, headers: Header[]) => void;
export type GlobalHeadersSetter = (headers: Header[]) => void;
export type UrlHeadersGetter = (url: string) => Header[];
export type GlobalHeadersGetter = () => Header[];

export type FindSpecFn = (
  templatesBySpec: Map<UrlSpec, UTLTemplate>,
  method: string,
  url: string,
) => UrlSpec | null;

export type Pathfinder = {
  buildUrl: UrlBuilder;
  findSpec: FindSpecFn;
  setGlobalEnv: GlobalEnvSetter;
  getGlobalEnv: GlobalEnvGetter;
  setUrlEnv: UrlEnvSetter;
  getUrlEnv: UrlEnvGetter;
  getSpec: SpecGetter;
  setSpec: SpecSetter;
  reset: ResetHandler;
  setGlobalHeaders: GlobalHeadersSetter;
  getGlobalHeaders: GlobalHeadersGetter;
  setEndpointHeaders: UrlHeadersSetter;
  getEndpointHeaders: UrlHeadersGetter;
};

export type DataStorageItemSetter = (
  key: string,
  value: string,
  prefix: string,
) => void;
export type DataStorageItemGetter = (key: string, prefix: string) => string;

export type DataStorage = {
  setItem: DataStorageItemSetter;
  getItem: DataStorageItemGetter;
};

export type PathfinderBuilderOptions = {
  resolver: DataResolver;
  data: DataStorage;
  dataKey: string;
};

export type PathfinderBuilder = (
  options: PathfinderBuilderOptions,
) => Pathfinder;

export type Spec = { urls: UrlSpec[]; envs: EnvSpec[] };

export type Storage = {
  setSpec: (data: Spec) => void;
  getSpec: SpecGetter;
  resetEndpointsEnv: () => void;
  resetGlobalEnv: () => void;
  getEndpointEnv: UrlEnvGetter;
  setEndpointEnv: UrlEnvSetter;
  getGlobalEnv: GlobalEnvGetter;
  setGlobalEnv: GlobalEnvSetter;
  resetGlobalHeaders: () => void;
  resetEndpointsHeaders: () => void;
  setGlobalHeaders: GlobalHeadersSetter;
  getGlobalHeaders: GlobalHeadersGetter;
  setEndpointHeaders: UrlHeadersSetter;
  getEndpointHeaders: UrlHeadersGetter;
};

export type StorageItemSetter = (key: string, value: string) => void;
export type StorageItemGetter = (key: string) => string | null;

export type StorageAdapter = {
  setItem: StorageItemSetter;
  getItem: StorageItemGetter;
};

export type StorageAdapterFn = (
  data: DataStorage,
  storageKey: string,
) => StorageAdapter;

export type GetStorageFn = (adapter: StorageAdapter) => Storage;

export type DataResolver = {
  parse: (obj: unknown) => Spec;
};

export type QueryParameter = {
  schema: Schema;
  in: 'query';
  name: string;
};

export type PathParameter = {
  schema: Schema;
  in: 'path';
  required: true;
  name: string;
};

export type HeaderParameter = {
  schema: Schema;
  in: 'header';
  name: string;
};

export type CookieParameter = {
  schema: Schema;
  in: 'cookie';
  name: string;
};

export type Parameter =
  | QueryParameter
  | PathParameter
  | HeaderParameter
  | CookieParameter;

export interface Server {
  url: string;
  description?: string;
}

export interface Paths {
  [url: string]: PathItem;
}

export type OperationType =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

export type PathItemOperations = {
  [operation in OperationType]?: Operation;
};

export interface PathItem extends PathItemOperations {
  summary?: string;
  description?: string;
  parameters?: Parameter[];
}

export interface Operation {
  operationId: string;
  summary: string;
  tags?: string[];
  description?: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  deprecated?: boolean;
}

export type ContentType = 'application/json';

export interface RequestBody {
  description?: string;
  content: {
    [k in ContentType]: Schema;
  };
  required?: boolean;
}

export interface Schema {
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: [string, ...string[]];
  enum?: [unknown, ...unknown[]];
  type?: 'array' | 'boolean' | 'integer' | 'number' | 'object' | 'string';
  not?: Schema;
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  items?: Schema;
  properties?: {
    [k: string]: Schema;
  };
  additionalProperties?: Schema | boolean;
  description?: string;
  format?: string;
  nullable?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
}

export interface OpenApiSpec {
  servers: Server[];
  paths: Paths;
}

export type ParseResult = { urls: UrlSpec[]; envs: EnvSpec[] };
