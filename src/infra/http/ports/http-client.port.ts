import type {
  MakeNoBodyHttpRequestParams,
  MakeWithBodyHttpRequestParams,
} from "@/data/protocols/http-client.protocol";
import { TupleTreatment } from "@/infra/middleware/tuple-it";

export interface HttpClientPort {
  setAuthorization(token: string): void | undefined;

  setTokenExpirationStrategy: (
    tokenExpireStrategy: () => Promise<string | null>,
  ) => void | undefined;

  getAuthorization(): string | undefined;

  get<T = any>(params: MakeNoBodyHttpRequestParams): TupleTreatment<T>;

  post<T>(params: MakeWithBodyHttpRequestParams): TupleTreatment<T>;

  patch<T>(params: MakeWithBodyHttpRequestParams): TupleTreatment<T>;

  put<T>(params: MakeWithBodyHttpRequestParams): TupleTreatment<T>;

  delete<T = any>(params: MakeNoBodyHttpRequestParams): TupleTreatment<T>;

  head<T = any>(params: MakeNoBodyHttpRequestParams): TupleTreatment<T>;

  options<T = any>(params: MakeNoBodyHttpRequestParams): TupleTreatment<T>;

  trace<T = any>(params: MakeNoBodyHttpRequestParams): TupleTreatment<T>;

  connect<T = any>(params: MakeNoBodyHttpRequestParams): TupleTreatment<T>;
}
