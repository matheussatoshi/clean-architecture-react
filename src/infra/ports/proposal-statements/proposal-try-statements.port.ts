import { AxiosResponse } from "axios";

export type ProposalTryStatementsResponse<T> = Promise<
  [boolean, string | null, T | null | undefined | undefined]
>;

export type ProposalTryStatementsResponseToHttpRequest<T> = Promise<
  ProposalTryStatementsResponse<AxiosResponse<T, any>>
>;

export type ProposalTryStatementsError = {
  message?: string;
};
