import type {
  MakeNoBodyHttpRequestParams,
  MakeWithBodyHttpRequestParams,
} from "@/data/protocols/http-client.protocol";
import { ProposalResponse } from "@/infra/middleware/proposal-statements";

export interface HttpClientPort {
  setAuthorization(token: string): void | undefined;

  setTokenExpirationStrategy: (
    tokenExpireStrategy: () => Promise<string | null>,
  ) => void | undefined;

  getAuthorization(): string | undefined;

  get<T = any>(params: MakeNoBodyHttpRequestParams): ProposalResponse<T>;

  post<T>(params: MakeWithBodyHttpRequestParams): ProposalResponse<T>;

  patch<T>(params: MakeWithBodyHttpRequestParams): ProposalResponse<T>;

  put<T>(params: MakeWithBodyHttpRequestParams): ProposalResponse<T>;

  delete<T = any>(params: MakeNoBodyHttpRequestParams): ProposalResponse<T>;

  head<T = any>(params: MakeNoBodyHttpRequestParams): ProposalResponse<T>;

  options<T = any>(params: MakeNoBodyHttpRequestParams): ProposalResponse<T>;

  trace<T = any>(params: MakeNoBodyHttpRequestParams): ProposalResponse<T>;

  connect<T = any>(params: MakeNoBodyHttpRequestParams): ProposalResponse<T>;
}
