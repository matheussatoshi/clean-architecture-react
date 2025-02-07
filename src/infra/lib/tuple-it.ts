import { AxiosResponse } from "axios";

export type TupleRequest<T> = Promise<AxiosResponse<T, any>>;

export type TuplePromise<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
};

export type TupleResult<T, E> = Promise<[null, TuplePromise<T>] | [E, null]>;

export async function tuple<T = any, E = any>(
  promise: Promise<AxiosResponse<T>>,
): TupleResult<T, E> {
  try {
    const response = await promise;

    const { data, status, statusText, headers, config, request } = response;

    const result: TuplePromise<T> = {
      data,
      status,
      statusText,
      headers,
      config,
      request,
    };

    return [null, result];
  } catch (error) {
    return [error as E, null];
  }
}
