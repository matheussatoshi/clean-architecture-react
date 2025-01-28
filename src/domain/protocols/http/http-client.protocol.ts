import { AxiosRequestConfig } from "axios";

export type HttpRequestConfig = Partial<AxiosRequestConfig>;

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
  params?: HttpRequestConfig;
};

export type MakeNoBodyHttpRequestParams = {
  url: string;
  params?: HttpRequestConfig;
};

export type MakeWithBodyHttpRequestParams = {
  url: string;
  body: any;
  params?: HttpRequestConfig;
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
