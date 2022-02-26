// THIS FILE IS A GENERATED CODE.
// DO NOT EDIT THIS CODE BY YOUR OWN HANDS
// generated version: v2.6.1

import {
  GetProfileRequest as AccountGetProfileRequest,
  GetProfileResponse as AccountGetProfileResponse,
} from './classes/account/types';

import {
  PostLoginRequest as AuthPostLoginRequest,
  PostLoginResponse as AuthPostLoginResponse,
  PostLogoutRequest as AuthPostLogoutRequest,
  PostLogoutResponse as AuthPostLogoutResponse,
} from './classes/auth/types';

import { GetRequest as GetRequest, GetResponse as GetResponse } from './classes/types';

export interface MiddlewareContext {
  httpMethod: string;
  endpoint: string;
  request: unknown;
  response?: unknown;
  baseURL: string;
  headers: { [key: string]: string };
  options: { [key: string]: any };
}

export enum MiddlewareResult {
  CONTINUE = 1,
  MIDDLEWARE_STOP = 2,
  STOP = 4,
}

export type ApiClientMiddlewareFunc = (
  context: MiddlewareContext,
) => Promise<MiddlewareResult | boolean>;

export interface middlewareSet {
  beforeMiddleware?: ApiClientMiddlewareFunc[];
  afterMiddleware?: ApiClientMiddlewareFunc[];
}

class AccountClient {
  private beforeMiddleware: ApiClientMiddlewareFunc[] = [];
  private afterMiddleware: ApiClientMiddlewareFunc[] = [];
  constructor(
    private headers: { [key: string]: string },
    private options: { [key: string]: any },
    private baseURL: string,
    middleware: middlewareSet,
  ) {
    this.beforeMiddleware = middleware.beforeMiddleware!;
    this.afterMiddleware = middleware.afterMiddleware!;
  }

  getRequestObject(obj: any, routingPath: string[], isGET: boolean): { [key: string]: any } {
    let res: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      if (isGET && obj[key] == null) {
        return;
      }
      if (routingPath.indexOf(key) === -1) {
        let val = obj[key];
        if (isGET) {
          val = val.toString();
        }
        res[key] = val;
      }
    });
    return res;
  }

  async callMiddleware(middlewares: ApiClientMiddlewareFunc[], context: MiddlewareContext) {
    for (const m of middlewares) {
      const func: ApiClientMiddlewareFunc = m;
      const mr = await func(context);
      if (typeof mr === 'boolean') {
        if (!mr) {
          break;
        }
      } else {
        if (mr === MiddlewareResult.CONTINUE) {
          continue;
        } else if (mr === MiddlewareResult.MIDDLEWARE_STOP) {
          break;
        } else if (mr === MiddlewareResult.STOP) {
          throw new ApiMiddlewareStop();
        }
      }
    }
  }

  async getProfile(
    param: AccountGetProfileRequest,
    options?: {
      headers?: { [key: string]: string };
      options?: { [key: string]: any };
    },
  ): Promise<AccountGetProfileResponse>;
  /** @deprecated */
  async getProfile(
    param: AccountGetProfileRequest,
    headers?: { [key: string]: string },
    options?: { [key: string]: any },
  ): Promise<AccountGetProfileResponse>;

  async getProfile(
    param: AccountGetProfileRequest,
    arg1?: any,
    arg2?: any,
  ): Promise<AccountGetProfileResponse> {
    let headers: { [key: string]: string } | undefined;
    let options: { [key: string]: any } | undefined;

    if (
      arg2 !== undefined ||
      arg1 === undefined ||
      Object.values(arg1).filter((v) => typeof v !== 'string').length === 0
    ) {
      headers = arg1;
      options = arg2;
    } else {
      headers = arg1.headers;
      options = arg1.options;
    }

    const excludeParams: string[] = [];
    let mockHeaders: { [key: string]: string } = {};
    if (options && options['mock_option']) {
      mockHeaders['Api-Gen-Option'] = JSON.stringify(options['mock_option']);
      delete options['mock_option'];
    }

    const reqHeader = {
      ...this.headers,
      ...headers,
      ...mockHeaders,
    };
    const reqOption = {
      ...this.options,
      ...options,
    };
    const context: MiddlewareContext = {
      httpMethod: 'GET',
      endpoint: `${this.baseURL}/account/profile`,
      request: param,
      baseURL: this.baseURL,
      headers: reqHeader,
      options: reqOption,
    };
    await this.callMiddleware(this.beforeMiddleware, context);
    const url =
      `${this.baseURL}/account/profile?` +
      new URLSearchParams(this.getRequestObject(param, excludeParams, true)).toString();
    const resp = await fetch(url, {
      method: 'GET',
      headers: reqHeader,
      ...reqOption,
    });

    if (Math.floor(resp.status / 100) !== 2) {
      const responseText = await resp.text();
      throw new ApiError(resp, responseText);
    }
    const res = (await resp.json()) as AccountGetProfileResponse;
    context.response = res;
    await this.callMiddleware(this.afterMiddleware, context);
    return res;
  }
}

class AuthClient {
  private beforeMiddleware: ApiClientMiddlewareFunc[] = [];
  private afterMiddleware: ApiClientMiddlewareFunc[] = [];
  constructor(
    private headers: { [key: string]: string },
    private options: { [key: string]: any },
    private baseURL: string,
    middleware: middlewareSet,
  ) {
    this.beforeMiddleware = middleware.beforeMiddleware!;
    this.afterMiddleware = middleware.afterMiddleware!;
  }

  getRequestObject(obj: any, routingPath: string[], isGET: boolean): { [key: string]: any } {
    let res: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      if (isGET && obj[key] == null) {
        return;
      }
      if (routingPath.indexOf(key) === -1) {
        let val = obj[key];
        if (isGET) {
          val = val.toString();
        }
        res[key] = val;
      }
    });
    return res;
  }

  async callMiddleware(middlewares: ApiClientMiddlewareFunc[], context: MiddlewareContext) {
    for (const m of middlewares) {
      const func: ApiClientMiddlewareFunc = m;
      const mr = await func(context);
      if (typeof mr === 'boolean') {
        if (!mr) {
          break;
        }
      } else {
        if (mr === MiddlewareResult.CONTINUE) {
          continue;
        } else if (mr === MiddlewareResult.MIDDLEWARE_STOP) {
          break;
        } else if (mr === MiddlewareResult.STOP) {
          throw new ApiMiddlewareStop();
        }
      }
    }
  }

  async postLogin(
    param: AuthPostLoginRequest,
    options?: {
      headers?: { [key: string]: string };
      options?: { [key: string]: any };
    },
  ): Promise<AuthPostLoginResponse>;
  /** @deprecated */
  async postLogin(
    param: AuthPostLoginRequest,
    headers?: { [key: string]: string },
    options?: { [key: string]: any },
  ): Promise<AuthPostLoginResponse>;

  async postLogin(
    param: AuthPostLoginRequest,
    arg1?: any,
    arg2?: any,
  ): Promise<AuthPostLoginResponse> {
    let headers: { [key: string]: string } | undefined;
    let options: { [key: string]: any } | undefined;

    if (
      arg2 !== undefined ||
      arg1 === undefined ||
      Object.values(arg1).filter((v) => typeof v !== 'string').length === 0
    ) {
      headers = arg1;
      options = arg2;
    } else {
      headers = arg1.headers;
      options = arg1.options;
    }

    const excludeParams: string[] = [];
    let mockHeaders: { [key: string]: string } = {};
    if (options && options['mock_option']) {
      mockHeaders['Api-Gen-Option'] = JSON.stringify(options['mock_option']);
      delete options['mock_option'];
    }

    const reqHeader = {
      'Content-Type': 'application/json',
      ...this.headers,
      ...headers,
      ...mockHeaders,
    };
    const reqOption = {
      ...this.options,
      ...options,
    };
    const context: MiddlewareContext = {
      httpMethod: 'POST',
      endpoint: `${this.baseURL}/auth/login`,
      request: param,
      baseURL: this.baseURL,
      headers: reqHeader,
      options: reqOption,
    };
    await this.callMiddleware(this.beforeMiddleware, context);
    const url = `${this.baseURL}/auth/login`;
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.getRequestObject(param, excludeParams, false)),
      headers: reqHeader,
      ...reqOption,
    });

    if (Math.floor(resp.status / 100) !== 2) {
      const responseText = await resp.text();
      throw new ApiError(resp, responseText);
    }
    const res = (await resp.json()) as AuthPostLoginResponse;
    context.response = res;
    await this.callMiddleware(this.afterMiddleware, context);
    return res;
  }

  async postLogout(
    param: AuthPostLogoutRequest,
    options?: {
      headers?: { [key: string]: string };
      options?: { [key: string]: any };
    },
  ): Promise<AuthPostLogoutResponse>;
  /** @deprecated */
  async postLogout(
    param: AuthPostLogoutRequest,
    headers?: { [key: string]: string },
    options?: { [key: string]: any },
  ): Promise<AuthPostLogoutResponse>;

  async postLogout(
    param: AuthPostLogoutRequest,
    arg1?: any,
    arg2?: any,
  ): Promise<AuthPostLogoutResponse> {
    let headers: { [key: string]: string } | undefined;
    let options: { [key: string]: any } | undefined;

    if (
      arg2 !== undefined ||
      arg1 === undefined ||
      Object.values(arg1).filter((v) => typeof v !== 'string').length === 0
    ) {
      headers = arg1;
      options = arg2;
    } else {
      headers = arg1.headers;
      options = arg1.options;
    }

    const excludeParams: string[] = [];
    let mockHeaders: { [key: string]: string } = {};
    if (options && options['mock_option']) {
      mockHeaders['Api-Gen-Option'] = JSON.stringify(options['mock_option']);
      delete options['mock_option'];
    }

    const reqHeader = {
      'Content-Type': 'application/json',
      ...this.headers,
      ...headers,
      ...mockHeaders,
    };
    const reqOption = {
      ...this.options,
      ...options,
    };
    const context: MiddlewareContext = {
      httpMethod: 'POST',
      endpoint: `${this.baseURL}/auth/logout`,
      request: param,
      baseURL: this.baseURL,
      headers: reqHeader,
      options: reqOption,
    };
    await this.callMiddleware(this.beforeMiddleware, context);
    const url = `${this.baseURL}/auth/logout`;
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.getRequestObject(param, excludeParams, false)),
      headers: reqHeader,
      ...reqOption,
    });

    if (Math.floor(resp.status / 100) !== 2) {
      const responseText = await resp.text();
      throw new ApiError(resp, responseText);
    }
    const res = (await resp.json()) as AuthPostLogoutResponse;
    context.response = res;
    await this.callMiddleware(this.afterMiddleware, context);
    return res;
  }
}

export class APIClient {
  private headers: { [key: string]: string };
  private options: { [key: string]: any };
  private baseURL: string;

  private beforeMiddleware: ApiClientMiddlewareFunc[] = [];
  private afterMiddleware: ApiClientMiddlewareFunc[] = [];

  public account: AccountClient;

  public auth: AuthClient;

  constructor(opt: {
    token?: string;
    commonHeaders?: { [key: string]: string };
    baseURL?: string;
    commonOptions?: { [key: string]: any };
    middleware?: middlewareSet;
  });
  constructor(
    token?: string,
    commonHeaders?: { [key: string]: string },
    baseURL?: string,
    commonOptions?: { [key: string]: any },
    middleware?: middlewareSet,
  );

  constructor(
    token?: any,
    commonHeaders?: { [key: string]: string },
    baseURL?: string,
    commonOptions?: { [key: string]: any },
    middleware?: middlewareSet,
  ) {
    if (token !== null && typeof token === 'object') {
      commonHeaders = token.commonHeaders;
      baseURL = token.baseURL;
      commonOptions = token.commonOptions;
      middleware = token.middleware;
      token = token.token;
    }

    const headers: { [key: string]: string } = {
      ...commonHeaders,
    };

    if (token !== undefined) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    this.baseURL = baseURL === undefined ? '' : baseURL;
    this.options = commonOptions ?? {};
    this.headers = headers;

    if (middleware) {
      this.beforeMiddleware = middleware.beforeMiddleware ?? [];
      this.afterMiddleware = middleware.afterMiddleware ?? [];
    }
    const childMiddlewareSet: middlewareSet = {
      beforeMiddleware: this.beforeMiddleware,
      afterMiddleware: this.afterMiddleware,
    };

    this.account = new AccountClient(headers, this.options, this.baseURL, childMiddlewareSet);

    this.auth = new AuthClient(headers, this.options, this.baseURL, childMiddlewareSet);
  }

  getRequestObject(obj: any, routingPath: string[], isGET: boolean): { [key: string]: any } {
    let res: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      if (isGET && obj[key] == null) {
        return;
      }
      if (routingPath.indexOf(key) === -1) {
        let val = obj[key];
        if (isGET) {
          val = val.toString();
        }
        res[key] = val;
      }
    });
    return res;
  }

  async callMiddleware(middlewares: ApiClientMiddlewareFunc[], context: MiddlewareContext) {
    for (const m of middlewares) {
      const func: ApiClientMiddlewareFunc = m;
      const mr = await func(context);
      if (typeof mr === 'boolean') {
        if (!mr) {
          break;
        }
      } else {
        if (mr === MiddlewareResult.CONTINUE) {
          continue;
        } else if (mr === MiddlewareResult.MIDDLEWARE_STOP) {
          break;
        } else if (mr === MiddlewareResult.STOP) {
          throw new ApiMiddlewareStop();
        }
      }
    }
  }

  async get(
    param: GetRequest,
    options?: {
      headers?: { [key: string]: string };
      options?: { [key: string]: any };
    },
  ): Promise<GetResponse>;
  /** @deprecated */
  async get(
    param: GetRequest,
    headers?: { [key: string]: string },
    options?: { [key: string]: any },
  ): Promise<GetResponse>;

  async get(param: GetRequest, arg1?: any, arg2?: any): Promise<GetResponse> {
    let headers: { [key: string]: string } | undefined;
    let options: { [key: string]: any } | undefined;

    if (
      arg2 !== undefined ||
      arg1 === undefined ||
      Object.values(arg1).filter((v) => typeof v !== 'string').length === 0
    ) {
      headers = arg1;
      options = arg2;
    } else {
      headers = arg1.headers;
      options = arg1.options;
    }

    const excludeParams: string[] = [];
    let mockHeaders: { [key: string]: string } = {};
    if (options && options['mock_option']) {
      mockHeaders['Api-Gen-Option'] = JSON.stringify(options['mock_option']);
      delete options['mock_option'];
    }

    const reqHeader = {
      ...this.headers,
      ...headers,
      ...mockHeaders,
    };
    const reqOption = {
      ...this.options,
      ...options,
    };
    const context: MiddlewareContext = {
      httpMethod: 'GET',
      endpoint: `${this.baseURL}/`,
      request: param,
      baseURL: this.baseURL,
      headers: reqHeader,
      options: reqOption,
    };
    await this.callMiddleware(this.beforeMiddleware, context);
    const url =
      `${this.baseURL}/?` +
      new URLSearchParams(this.getRequestObject(param, excludeParams, true)).toString();
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.headers,
        ...headers,
        ...mockHeaders,
      },
      ...this.options,
      ...options,
    });

    if (Math.floor(resp.status / 100) !== 2) {
      const responseText = await resp.text();
      throw new ApiError(resp, responseText);
    }
    await resp.text();
    const res = {} as GetResponse;
    context.response = res;
    await this.callMiddleware(this.afterMiddleware, context);
    return res;
  }
}

export class ApiError extends Error {
  private _statusCode: number;
  private _statusText: string;
  private _response: string;

  constructor(response: Response, responseText: string) {
    super();
    this._statusCode = response.status;
    this._statusText = response.statusText;
    this._response = responseText;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get statusText(): string {
    return this._statusText;
  }

  get response(): string {
    return this._response;
  }
}

export class ApiMiddlewareStop extends Error {}

export interface MockOption {
  wait_ms: number;
  target_file: string;
}
