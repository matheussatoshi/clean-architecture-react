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

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NOT_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER = 500,
}

type Response = {
  message: string;
  status: HttpStatus;
  resolve: boolean;
};

export type PromiseStatusResponse = Response;
