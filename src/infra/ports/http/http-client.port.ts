import { ProposalTryStatementsResponseToHttpRequest } from "../proposal-statements";
import type {
  MakeNoBodyHttpRequestParams,
  MakeWithBodyHttpRequestParams,
} from "./http-client.protocol";

export interface HttpClientPort {
  setAuthorization(token: string): void | undefined;

  setTokenExpirationStrategy: (
    tokenExpireStrategy: () => Promise<string | null>,
  ) => void | undefined;

  getAuthorization(): string | undefined;

  get<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): ProposalTryStatementsResponseToHttpRequest<T>;

  post<T>(
    params: MakeWithBodyHttpRequestParams,
  ): ProposalTryStatementsResponseToHttpRequest<T>;

  patch<T>(
    params: MakeWithBodyHttpRequestParams,
  ): ProposalTryStatementsResponseToHttpRequest<T>;

  put<T>(
    params: MakeWithBodyHttpRequestParams,
  ): ProposalTryStatementsResponseToHttpRequest<T>;

  delete<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): ProposalTryStatementsResponseToHttpRequest<T>;

  head<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): ProposalTryStatementsResponseToHttpRequest<T>;

  options<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): ProposalTryStatementsResponseToHttpRequest<T>;

  trace<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): ProposalTryStatementsResponseToHttpRequest<T>;

  connect<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): ProposalTryStatementsResponseToHttpRequest<T>;
}
