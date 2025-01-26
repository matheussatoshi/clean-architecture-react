import { AxiosResponse } from "axios";

export type ProposalTryStatementsResponse<T> = Promise<
  [boolean, boolean | null, T | null | undefined | undefined]
>;

export type ProposalResponse<T> = Promise<
  ProposalTryStatementsResponse<AxiosResponse<T, any>>
>;

export type ProposalTryStatementsError = {
  message?: string;
};
