export type HttpParams = Record<string, string | number | boolean>;

export enum HttpMethods {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
  HEAD = "head",
  OPTIONS = "options",
  TRACE = "trace",
  CONNECT = "connect",
  UNKNOWN = "unknown",
}

export type MakeHttpRequestParams = {
  method: HttpMethods;
  url: string;
  data?: any;
  params?: HttpParams;
};

export type MakeNoBodyHttpRequestParams = {
  url: string;
  params?: HttpParams;
};

export type MakeWithBodyHttpRequestParams = {
  url: string;
  body: any;
  params?: HttpParams;
};
