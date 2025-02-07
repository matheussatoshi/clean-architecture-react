import type {
  MakeNoBodyHttpRequestParams,
  MakeWithBodyHttpRequestParams,
} from "@/domain/protocols/http/http-client.protocol";
import { TupleRequest } from "@/infra/lib/tuple-it";

export interface HttpClientPort {
  setAuthorization(token: string): void | undefined;

  setTokenExpirationStrategy: (
    tokenExpireStrategy: () => Promise<string | null>,
  ) => void | undefined;

  getAuthorization(): string | undefined;

  get<T = any>(params: MakeNoBodyHttpRequestParams): TupleRequest<T>;

  post<T>(params: MakeWithBodyHttpRequestParams): TupleRequest<T>;

  patch<T>(params: MakeWithBodyHttpRequestParams): TupleRequest<T>;

  put<T>(params: MakeWithBodyHttpRequestParams): TupleRequest<T>;

  delete<T = any>(params: MakeNoBodyHttpRequestParams): TupleRequest<T>;

  head<T = any>(params: MakeNoBodyHttpRequestParams): TupleRequest<T>;

  options<T = any>(params: MakeNoBodyHttpRequestParams): TupleRequest<T>;

  trace<T = any>(params: MakeNoBodyHttpRequestParams): TupleRequest<T>;

  connect<T = any>(params: MakeNoBodyHttpRequestParams): TupleRequest<T>;
}
